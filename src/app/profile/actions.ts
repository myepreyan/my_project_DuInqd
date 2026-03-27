"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function activateTask(taskId: string) {
  const session = await getServerSession(authOptions as any) as any;
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id || session.user.sub;

  const task = await db.task.findUnique({
    where: { id: taskId }
  });

  if (!task || task.userId !== userId) {
    throw new Error("Task not found or not authorized");
  }

  await db.task.update({
    where: { id: taskId },
    data: { status: "active" }
  });

  revalidatePath("/profile");
  revalidatePath("/profile/posts");
}

export async function deactivateTask(taskId: string) {
  const session = await getServerSession(authOptions as any) as any;
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id || session.user.sub;

  const task = await db.task.findUnique({
    where: { id: taskId }
  });

  if (!task || task.userId !== userId) {
    throw new Error("Task not found or not authorized");
  }

  await db.task.update({
    where: { id: taskId },
    data: { status: "inactive" }
  });

  revalidatePath("/profile");
  revalidatePath("/profile/posts");
  revalidatePath("/find-task"); // Ensure public search clears it immediately
}

export async function deleteTask(taskId: string) {
  const session = await getServerSession(authOptions as any) as any;
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id || session.user.sub;

  const task = await db.task.findUnique({
    where: { id: taskId }
  });

  if (!task || task.userId !== userId) {
    throw new Error("Task not found or not authorized");
  }

  await db.task.delete({
    where: { id: taskId }
  });

  revalidatePath("/profile");
  revalidatePath("/profile/posts");
  revalidatePath("/profile/drafts");
  revalidatePath("/find-task");
}

export async function publishDraft(taskId: string) {
  const session = await getServerSession(authOptions as any) as any;
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id || session.user.sub;

  const task = await db.task.findUnique({
    where: { id: taskId }
  });

  if (!task || task.userId !== userId) {
    throw new Error("Task not found or not authorized");
  }

  await db.task.update({
    where: { id: taskId },
    data: { status: "inactive" }
  });

  revalidatePath("/profile/drafts");
  revalidatePath("/profile/posts");
}
