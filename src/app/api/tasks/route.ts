import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions as any) as any;
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id || session.user.sub;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      categoryId,
      subcategoryId,
      priceType,
      price,
      deadline,
      specificDate,
      city,
      address,
      phone,
      images,
      specificAnswers,
      status
    } = body;

    if (!title || !description || !categoryId || !subcategoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const task = await db.task.create({
      data: {
        title,
        description,
        categoryId,
        subcategoryId,
        priceType: priceType || "fixed",
        price: price ? parseFloat(price) : null,
        deadline,
        specificDate,
        city,
        address,
        phone,
        images: images || [],
        specificAnswers: specificAnswers || null,
        status: status || "active",
        userId
      } as any
    });

    return NextResponse.json({ success: true, task }, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
