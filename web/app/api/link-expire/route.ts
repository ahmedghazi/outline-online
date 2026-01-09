import { NextResponse } from "next/server";
import archiver from "archiver";
import { PassThrough, Readable } from "stream";
import { client } from "@/app/sanity-api/sanity-client";
import { LinkExpire, LinkExternal } from "@/app/types/schema";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const query = `*[_type == "linkExpire" && token == $token][0]{
    _id,
    zips[]{
      _type,
      link,
      label
    },
    maxDownloads,
    downloads
  }`;

  const data = await client.fetch<LinkExpire>(query, { token } as Record<
    string,
    string
  >);
  // return new NextResponse(JSON.stringify(data), {
  //   status: 200,
  //   headers: { "Content-Type": "application/json" },
  // });
  if (!data) {
    return NextResponse.json({ error: "Invalid link" }, { status: 404 });
  }

  if (
    data.downloads &&
    data.maxDownloads &&
    data.downloads >= data.maxDownloads
  ) {
    return NextResponse.json(
      { error: "Download limit reached" },
      { status: 410 }
    );
  }

  if (!data.zips?.length) {
    return NextResponse.json({ error: "No files found" }, { status: 404 });
  }

  // Increment ONCE per bundle download
  // await client.patch(data._id).inc({ downloads: 1 }).commit();

  // Create archive
  const archive = archiver("zip", { zlib: { level: 9 } });
  const passThrough = new PassThrough();

  // Pipe archive → passthrough
  archive.pipe(passThrough);

  // Append all ZIPs
  for (const zip of data.zips) {
    console.log(zip);
    if (!zip.link) continue;

    const res = await fetch(zip.link);
    if (!res.ok || !res.body) continue;

    const nodeStream = Readable.fromWeb(res.body as any);

    archive.append(nodeStream, {
      name: zip.label ?? "oo-trial.zip",
    });
  }

  // Finalize AFTER all appends
  archive.finalize();

  // Increment download ONCE (safe spot)
  await client.patch(data._id).inc({ downloads: 1 }).commit();
  console.log("linkExpire incremented");
  // Return response
  return new Response(passThrough as any, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="oo-trials.zip"',
      "Cache-Control": "no-store",
    },
  });
}
