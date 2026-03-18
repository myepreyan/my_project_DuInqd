import { Suspense } from 'react';
import CreateTaskSubcategoryContent from '@/components/create-task/CreateTaskSubcategoryContent';

export default function CreateTaskPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
          <div className="text-gray-600 dark:text-zinc-400">Բեռնվում է...</div>
        </div>
      }
    >
      <CreateTaskSubcategoryContent />
    </Suspense>
  );
}
