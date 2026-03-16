"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskFormStore } from '@/store/useTaskFormStore';
import { step3Schema } from '@/schemas/task-form-schema';
import FormNavigation from './FormNavigation';
import { useState } from 'react';

export default function Step3Description() {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useTaskFormStore();
  const [charCount, setCharCount] = useState(formData.description?.length || 0);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      description: formData.description || '',
    },
  });

  const onSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6 font-serif">
          Նկարագրեք առաջադրանքը
        </h2>

        <div className="space-y-4">
          <div>
            <textarea
              {...register('description', {
                onChange: (e) => setCharCount(e.target.value.length),
              })}
              placeholder="Նկարագրեք ինչ ուզում եք արվի, բոլոր մանրամասները..."
              rows={6}
              className={`
                w-full px-4 py-4
                bg-gray-50 dark:bg-zinc-800
                border-2 rounded-lg
                ${errors.description 
                  ? 'border-red-500' 
                  : 'border-transparent focus:border-lime-500'
                }
                text-black dark:text-white
                placeholder-gray-400 dark:placeholder-zinc-500
                focus:outline-none
                resize-none
              `}
            />
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${charCount < 50 ? 'text-red-500' : 'text-green-600 dark:text-lime-500'}`}>
                Նվազագույնը 50 նիշ ({charCount}/50)
              </span>
              <span className="text-sm text-gray-500 dark:text-zinc-500">
                {charCount}/2000
              </span>
            </div>
            {errors.description && (
              <p className="mt-2 text-sm text-red-500">
                {errors.description.message as string}
              </p>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <div className="flex gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span>
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-medium mb-1">Խորհուրդ՝</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Նշեք ժամանակը և հասցեն</li>
                  <li>Նկարագրեք հատուկ պահանջները</li>
                  <li>Ավելացրեք կարևոր մանրամասները</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <FormNavigation
          currentStep={3}
          totalSteps={7}
          onBack={goToPreviousStep}
          onNext={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}
