import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  if (!params.eventId) {
    return new NextResponse("Missing event Id", { status: 400 });
  }
  try {
    const event = await prismadb.event.findFirst({
      where: { id: params.eventId },
    });
    return NextResponse.json(event);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  if (!params.eventId) {
    return new NextResponse("Missing event Id", { status: 400 });
  }
  const body = await req.json();
  const { name, startDate, endDate, eventTypeId } = body;
  if (!name || !startDate || !endDate || !eventTypeId) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  if (startDate >= endDate) {
    return new NextResponse("Start date must be before end date", {
      status: 400,
    });
  }
  try {
    const event = await prismadb.event.update({
      where: {
        id: params.eventId,
      },
      data: {
        name,
        startDate,
        endDate,
        eventTypeId,
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  if (!params.eventId) {
    return new NextResponse("Missing event Id", { status: 400 });
  }
  try {
    const event = await prismadb.event.delete({
      where: { id: params.eventId },
    });
    return NextResponse.json(event);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
