"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskFormStore } from '@/store/useTaskFormStore';
import { categories } from '@/data/categories';
import { step1Schema } from '@/schemas/task-form-schema';
import FormNavigation from './FormNavigation';
import { useEffect, useState, useMemo } from 'react';
import { hasSpecificFields } from '@/utils/form-helpers';
import { getPlaceholderForSubcategory } from '@/data/placeholder-examples';

export default function Step1BasicInfo() {
  const { formData, updateFormData, goToNextStep, setCurrentStep } = useTaskFormStore();
  const [showDropdowns, setShowDropdowns] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      title: formData.title || '',
      categoryId: formData.categoryId || '',
      subcategoryId: formData.subcategoryId || '',
    },
  });

  // Թարմացնել ձևի արժեքները երբ formData-ն փոխվում է
  useEffect(() => {
    if (formData.categoryId) {
      setValue('categoryId', formData.categoryId);
    }
    if (formData.subcategoryId) {
      setValue('subcategoryId', formData.subcategoryId);
    }
  }, [formData.categoryId, formData.subcategoryId, setValue]);

  const selectedCategoryId = watch('categoryId');
  const selectedSubcategoryId = watch('subcategoryId');
  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
  const selectedSubcategory = selectedCategory?.subcategories.find(sub => sub.id === selectedSubcategoryId);
  
  // Դինամիկ placeholder
  const placeholder = useMemo(() => {
    if (selectedSubcategoryId) {
      return getPlaceholderForSubcategory(selectedSubcategoryId);
    }
    return 'Օրինակ՝ լրացրեք առաջադրանքի վերնագիրը';
  }, [selectedSubcategoryId]);
  
  const handleChangeCategory = () => {
    setShowDropdowns(true);
    setValue('categoryId', '');
    setValue('subcategoryId', '');
  };

  const onSubmit = (data: any) => {
    updateFormData(data);
    
    // Եթե ենթակատեգորիայի համար հատուկ դաշտեր չկան, բաց թողնել քայլ 2-ը
    if (!hasSpecificFields(data.subcategoryId)) {
      setCurrentStep(3);
    } else {
      goToNextStep();
    }
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
              placeholder={placeholder}
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
            
            {selectedCategory && selectedSubcategory && !showDropdowns ? (
              <div className="space-y-3">
                <input type="hidden" {...register('categoryId')} />
                <input type="hidden" {...register('subcategoryId')} />
                
                <div className="px-4 py-3 bg-lime-50 dark:bg-lime-900/20 border-2 border-lime-500 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-zinc-400 mb-1">Կատեգորիա</p>
                      <p className="text-base font-medium text-black dark:text-white">{selectedCategory.name}</p>
                    </div>
                    <svg className="w-5 h-5 text-lime-600 dark:text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="px-4 py-3 bg-lime-50 dark:bg-lime-900/20 border-2 border-lime-500 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-zinc-400 mb-1">Ենթակատեգորիա</p>
                      <p className="text-base font-medium text-black dark:text-white">{selectedSubcategory.name}</p>
                    </div>
                    <svg className="w-5 h-5 text-lime-600 dark:text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleChangeCategory}
                  className="text-sm text-lime-600 dark:text-lime-500 hover:underline"
                >
                  Փոխել կատեգորիան
                </button>
              </div>
            ) : (
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
            )}
            
            {(errors.categoryId || errors.subcategoryId) && (
              <p className="mt-2 text-sm text-red-500">
                Ընտրեք կատեգորիա
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
