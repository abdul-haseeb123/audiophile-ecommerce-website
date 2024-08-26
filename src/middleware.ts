import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
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
