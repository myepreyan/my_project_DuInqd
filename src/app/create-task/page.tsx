import { Suspense } from 'react';
import CreateTaskContent from '@/components/create-task/CreateTaskContent';

export default function CreateTaskPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
          <div className="text-gray-600 dark:text-zinc-400">Բեռնվում է...</div>
        </div>
      }
    >
      <CreateTaskContent />
    </Suspense>
  );
}
