import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Stubbed - migrating to NextAuth
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  return NextResponse.redirect(`${origin}/sign-in`);
}
