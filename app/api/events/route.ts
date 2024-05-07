import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prismadb.event.findMany();
    return NextResponse.json(events);
  } catch (error) {
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, startDate, endDate, eventTypeId } = body;

  try {
    const newEvent = await prismadb.event.create({
      data: {
        name,
        startDate,
        endDate,
        eventTypeId,
      },
    });
    return NextResponse.json(newEvent);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
