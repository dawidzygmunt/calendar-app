import prismadb from "@/lib/prismadb";
import { EditEventType } from "@/lib/types";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { eventTypeId: string } }
) {
  try {
    const body = await req.json();
    const { name, events } = body;

    const result = EditEventType.safeParse({ name });
    if (!result.success) {
      let errors = "";
      result.error.issues.forEach((issue) => {
        errors = errors + issue.path[0] + ": " + issue.message + ". ";
      });
      return new NextResponse(errors, { status: 400 });
    }
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
  if (!params.eventTypeId) {
    return new NextResponse("Missing required eventType Id ", { status: 400 });
  }
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
