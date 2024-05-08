import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { z } from "zod";
import { AddEventSchema } from "@/lib/types";

export async function GET() {
  try {
    const events = await prismadb.event.findMany();
    return NextResponse.json(events);
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, startDate, endDate, eventTypeId } = body;

  const result = AddEventSchema.safeParse(body);
  if (!result.success) {
    let errors = "";
    result.error.issues.forEach((issue) => {
      errors = errors + issue.path[0] + ": " + issue.message + ". ";
    });
    return new NextResponse(errors, { status: 400 });
  }

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
    console.log(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}
