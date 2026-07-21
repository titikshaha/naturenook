import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AddressSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = AddressSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid data", details: parsed.error.format() }, { status: 400 });

    const data = parsed.data;
    const address = await prisma.address.create({
      data: {
        userId: session.user.id,
        type: data.type,
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      }
    });
    return NextResponse.json({ success: true, address });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, ...updateDataRaw } = body;
    
    if (!id) return NextResponse.json({ error: "Address ID required" }, { status: 400 });
    
    const parsed = AddressSchema.partial().safeParse(updateDataRaw);
    if (!parsed.success) return NextResponse.json({ error: "Invalid data", details: parsed.error.format() }, { status: 400 });

    const existing = await prisma.address.findUnique({ where: { id } });
    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found or unauthorized" }, { status: 403 });
    }

    const address = await prisma.address.update({
      where: { id },
      data: parsed.data
    });
    return NextResponse.json({ success: true, address });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
