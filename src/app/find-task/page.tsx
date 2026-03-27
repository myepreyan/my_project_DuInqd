import { db } from "@/lib/db";
import FindTaskLayout from "./FindTaskLayout";

// Force dynamic if needed, but Next.js usually infers it if using db directly.
export const dynamic = 'force-dynamic'

export default async function FindTaskPage() {
  const tasks = await db.task.findMany({
    where: {
      status: "active",
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const formattedTasks = (tasks as any[]).map((task: any) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    price: task.price || 0,
    priceType: task.priceType,
    categoryId: task.categoryId,
    subcategoryId: task.subcategoryId,
    tag: "Ակտիվ", 
    date: new Date(task.createdAt).toLocaleDateString("hy-AM", { day: 'numeric', month: 'long', year: 'numeric' }),
    location: task.city || "Առցանց"
  }));

  return <FindTaskLayout tasks={formattedTasks as any} />;
}
