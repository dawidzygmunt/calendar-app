import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const eventTypes = await prismadb.eventType.findMany();
    return NextResponse.json(eventTypes);
  } catch (error) {
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  try {
    const eventType = await prismadb.eventType.create({
      data: {
        name,
      },
    });
    return NextResponse.json(eventType);
  } catch (error) {}
}
