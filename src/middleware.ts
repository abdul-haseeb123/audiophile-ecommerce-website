import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/checkout") {
    return NextResponse.next();
  }
  const headersList = request.headers;
  const api_key = headersList.get("api_key");
  if (api_key == process.env.API_KEY) {
    return NextResponse.next();
  } else {
    return new Response("Unauthorized", { status: 401 });
  }
}

export const config = {
  matcher: "/api/:path*",
};
