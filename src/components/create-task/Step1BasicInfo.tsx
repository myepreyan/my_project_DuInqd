"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskFormStore } from '@/store/useTaskFormStore';
import { categories } from '@/data/categories';
import { step1Schema } from '@/schemas/task-form-schema';
import FormNavigation from './FormNavigation';

export default function Step1BasicInfo() {
  const { formData, updateFormData, goToNextStep } = useTaskFormStore();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      title: formData.title || '',
      categoryId: formData.categoryId || '',
      subcategoryId: formData.subcategoryId || '',
    },
  });

  const selectedCategoryId = watch('categoryId');
  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

  const onSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6 font-serif">
          Ինչպե՞ս անվանել առաջադրանքը
        </h2>

        <div className="space-y-6">
          <div>
            <input
              type="text"
              {...register('title')}
              placeholder="Օրինակ՝ լվացել անվադողեր"
              className={`
                w-full px-4 py-4 text-base
                bg-gray-50 dark:bg-zinc-800
                border-2 rounded-lg
                ${errors.title 
                  ? 'border-red-500 dark:border-red-500' 
                  : 'border-transparent focus:border-lime-500 dark:focus:border-lime-500'
                }
                text-black dark:text-white
                placeholder-gray-400 dark:placeholder-zinc-500
                focus:outline-none
                transition-colors
              `}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-500">
                {errors.title.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Կատեգորիա
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select
                {...register('categoryId')}
                className={`
                  w-full px-4 py-3
                  bg-gray-50 dark:bg-zinc-800
                  border-2 rounded-lg
                  ${errors.categoryId 
                    ? 'border-red-500' 
                    : 'border-transparent focus:border-lime-500'
                  }
                  text-black dark:text-white
                  focus:outline-none
                  cursor-pointer
                `}
              >
                <option value="">Կատեգորիա</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                {...register('subcategoryId')}
                disabled={!selectedCategoryId}
                className={`
                  w-full px-4 py-3
                  bg-gray-50 dark:bg-zinc-800
                  border-2 rounded-lg
                  ${errors.subcategoryId 
                    ? 'border-red-500' 
                    : 'border-transparent focus:border-lime-500'
                  }
                  text-black dark:text-white
                  focus:outline-none
                  cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <option value="">Ենթակատեգորիա</option>
                {selectedCategory?.subcategories.map((subcat) => (
                  <option key={subcat.id} value={subcat.id}>
                    {subcat.name}
                  </option>
                ))}
              </select>
            </div>
            {(errors.categoryId || errors.subcategoryId) && (
              <p className="mt-2 text-sm text-red-500">
                Ընտրեք կատեգորիա
              </p>
            )}
            {selectedCategoryId && !errors.categoryId && (
              <p className="mt-2 text-sm text-green-600 dark:text-lime-500">
                ✓ Կատեգորիան ընտրված է
              </p>
            )}
          </div>
        </div>

        <FormNavigation
          currentStep={1}
          totalSteps={7}
          onBack={() => {}}
          onNext={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}
