import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "@core/config";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTES.authentication.login, request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTES.users.root, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
