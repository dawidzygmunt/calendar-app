import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { eventTypeId: string } }
) {
  try {
    const body = await req.json();
    const { name, events } = body;
    const eventType = await prismadb.eventType.update({
      where: {
        id: params.eventTypeId,
      },
      data: {
        name,
        events,
      },
    });
    return NextResponse.json(eventType);
  } catch (error) {
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { eventTypeId: string } }
) {
  try {
    const eventType = await prismadb.eventType.delete({
      where: {
        id: params.eventTypeId,
      },
    });
    return NextResponse.json(eventType);
  } catch (error) {
    return new NextResponse("Internal error ", { status: 500 });
  }
}
