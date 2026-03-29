"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskFormStore } from '@/store/useTaskFormStore';
import { step4Schema } from '@/schemas/task-form-schema';
import FormNavigation from './FormNavigation';

export default function Step4PriceDeadline() {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useTaskFormStore();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      priceType: formData.priceType || 'fixed',
      price: formData.price || undefined,
      deadline: formData.deadline || 'normal',
      specificDate: formData.specificDate || '',
    },
  });

  const priceType = watch('priceType');
  const deadline = watch('deadline');

  const onSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6 font-serif">
          Գնային տեղեկություններ
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
              Գնի տիպը <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  {...register('priceType')}
                  value="fixed"
                  className="peer sr-only"
                />
                <div className="p-4 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent peer-checked:border-lime-500 peer-checked:bg-lime-50 dark:peer-checked:bg-lime-950/30 rounded-lg text-center transition-all">
                  <span className="font-medium text-black dark:text-white">● Ֆիքսված</span>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  {...register('priceType')}
                  value="negotiable"
                  className="peer sr-only"
                />
                <div className="p-4 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent peer-checked:border-lime-500 peer-checked:bg-lime-50 dark:peer-checked:bg-lime-950/30 rounded-lg text-center transition-all">
                  <span className="font-medium text-black dark:text-white">○ Բանակցային</span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Բյուջե (դրամ) {priceType === 'fixed' && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              {...register('price', { valueAsNumber: true })}
              placeholder="15,000"
              className={`
                w-full px-4 py-3
                bg-gray-50 dark:bg-zinc-800
                border-2 rounded-lg
                ${errors.price 
                  ? 'border-red-500' 
                  : 'border-transparent focus:border-lime-500'
                }
                text-black dark:text-white
                placeholder-gray-400 dark:placeholder-zinc-500
                focus:outline-none
              `}
            />
            {errors.price && (
              <p className="mt-2 text-sm text-red-500">
                {errors.price.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Ժամկետ <span className="text-red-500">*</span>
            </label>
            <select
              {...register('deadline')}
              className={`
                w-full px-4 py-3
                bg-gray-50 dark:bg-zinc-800
                border-2 rounded-lg
                ${errors.deadline 
                  ? 'border-red-500' 
                  : 'border-transparent focus:border-lime-500'
                }
                text-black dark:text-white
                focus:outline-none
                cursor-pointer
              `}
            >
              <option value="urgent">Շտապ (մինչև 24 ժամ)</option>
              <option value="normal">Սովորական (2-3 օր)</option>
              <option value="flexible">Ճկուն</option>
              <option value="specific">Կոնկրետ ամսաթիվ</option>
            </select>
          </div>

          {deadline === 'specific' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Ամսաթիվ
              </label>
              <input
                type="date"
                {...register('specificDate')}
                className="
                  w-full px-4 py-3
                  bg-gray-50 dark:bg-zinc-800
                  border-2 border-transparent
                  focus:border-lime-500
                  rounded-lg
                  text-black dark:text-white
                  focus:outline-none
                "
              />
            </div>
          )}
        </div>

        <FormNavigation
          currentStep={4}
          totalSteps={7}
          onBack={goToPreviousStep}
          onNext={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}
