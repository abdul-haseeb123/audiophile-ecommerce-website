import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET(request: Request) {
  await dbConnect();
  return NextResponse.json({ message: "Hello World!" });
}
