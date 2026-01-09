import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const draft = await draftMode();
  const { searchParams } = new URL(request.url);

  const preview = searchParams.get("sanity-preview-pathname") || "";
  console.log({ preview });
  const target = preview;

  console.log({ target });

  // draftMode().enable();
  draft.enable();
  redirect(target);
}
