import { NextRequest, NextResponse } from "next/server";
import { projectId, dataset } from "@/app/sanity-api/sanity.api";

// Simple obfuscation: encode asset ref to hide the real ID
function decodeAssetId(encoded: string): string {
  try {
    return Buffer.from(encoded, "base64url").toString("utf-8");
  } catch {
    return "";
  }
}

// Allowed origins - add your domains here
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://outline.online",
  "https://www.outline.online",
  "https://preprod-outline-online.vercel.app",
  "https://otf-outline-online.vercel.app",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const encodedId = searchParams.get("id");

  if (!encodedId) {
    return new NextResponse("Missing font ID", { status: 400 });
  }

  // Check Sec-Fetch-Dest header - blocks direct browser navigation
  // Fonts loaded via CSS/@font-face/FontFace API send "font"
  // Direct URL typing sends "document"
  const secFetchDest = request.headers.get("sec-fetch-dest");
  const secFetchMode = request.headers.get("sec-fetch-mode");

  // In development, be more permissive for testing
  // const isDev = process.env.NODE_ENV === "development";
  const isDev = true;

  // Block direct navigation (typing URL in browser)
  // Allow: font, empty (older browsers), or cors requests
  const isDirectNavigation =
    secFetchDest === "document" || secFetchMode === "navigate";

  if (!isDev && isDirectNavigation) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Validate origin/referer
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const refererOrigin = referer ? new URL(referer).origin : null;

  const isAllowed =
    (origin && ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) ||
    (refererOrigin && ALLOWED_ORIGINS.some((o) => refererOrigin.startsWith(o)));

  if (!isDev && !isAllowed) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Decode the asset ID
  const assetRef = decodeAssetId(encodedId);
  if (!assetRef) {
    return new NextResponse("Invalid font ID", { status: 400 });
  }

  // Parse asset ref: file-<id>-<extension>
  // Example: file-abc123-otf
  const match = assetRef.match(/^file-([a-zA-Z0-9]+)-(\w+)$/);
  if (!match) {
    return new NextResponse("Invalid asset reference", { status: 400 });
  }

  const [, assetId, extension] = match;

  // Build Sanity CDN URL
  const sanityUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;

  try {
    const fontResponse = await fetch(sanityUrl, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!fontResponse.ok) {
      return new NextResponse("Font not found", { status: 404 });
    }

    const fontBuffer = await fontResponse.arrayBuffer();

    // Determine content type
    const contentType =
      extension === "woff2"
        ? "font/woff2"
        : extension === "woff"
          ? "font/woff"
          : extension === "ttf"
            ? "font/ttf"
            : extension === "otf"
              ? "font/otf"
              : "application/octet-stream";

    return new NextResponse(fontBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": origin || "*",
        // Prevent direct browser navigation to font
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Font proxy error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
