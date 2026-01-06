import { _linkResolver } from "@/app/utils-old/utils";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  // const target = type === "project" ? `/project/${slug}` : `/${slug}`
  let target = "";
  switch (type) {
    case "home":
      target = `/`;
      break;
    case "product":
      target = `/product/${slug}`;
      break;
    case "page":
      target = `/page/${slug}`;
      break;

    default:
      target = `/${slug}`;
      break;
  }
  // console.log(request.url)
  // console.log(type, slug, target)

  draftMode().enable();
  redirect(target);
}
