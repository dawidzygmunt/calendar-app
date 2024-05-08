import prismadb from "@/lib/prismadb";
import { EditEventType } from "@/lib/types";
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

  const result = EditEventType.safeParse({ name });
  if (!result.success) {
    let errors = "";
    result.error.issues.forEach((issue) => {
      errors = errors + issue.path[0] + ": " + issue.message + ". ";
    });
    return new NextResponse(errors, { status: 400 });
  }

  try {
    const eventType = await prismadb.eventType.create({
      data: {
        name,
      },
    });
    return NextResponse.json(eventType);
  } catch (error) {}
}
