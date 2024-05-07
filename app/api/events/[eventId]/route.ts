import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
) {
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
  try {
    const body = await req.json();
    const { name, startDate, endDate, eventTypeId } = body;
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
  try {
    const event = await prismadb.event.delete({
      where: { id: params.eventId },
    });
    return NextResponse.json(event);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
