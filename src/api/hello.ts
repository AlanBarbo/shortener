import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json("Hello from Nextjs!", { status: 200 });
}
