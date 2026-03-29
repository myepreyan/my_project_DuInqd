"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskFormStore } from '@/store/useTaskFormStore';
import { step5Schema } from '@/schemas/task-form-schema';
import FormNavigation from './FormNavigation';

const cities = [
  'Երևան',
  'Գյումրի',
  'Վանաձոր',
  'Էջմիածին',
  'Հրազդան',
  'Աբովյան',
  'Կապան',
  'Արմավիր',
  'Գավառ',
  'Իջևան',
];

export default function Step5Location() {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useTaskFormStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      city: formData.city || '',
      address: formData.address || '',
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
          Տեղակայություն
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Քաղաք <span className="text-red-500">*</span>
            </label>
            <select
              {...register('city')}
              className={`
                w-full px-4 py-3
                bg-gray-50 dark:bg-zinc-800
                border-2 rounded-lg
                ${errors.city 
                  ? 'border-red-500' 
                  : 'border-transparent focus:border-lime-500'
                }
                text-black dark:text-white
                focus:outline-none
                cursor-pointer
              `}
            >
              <option value="">Ընտրեք քաղաք</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-2 text-sm text-red-500">
                {errors.city.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Հասցե <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('address')}
              placeholder="Օրինակ՝ Աբովյան 10"
              className={`
                w-full px-4 py-3
                bg-gray-50 dark:bg-zinc-800
                border-2 rounded-lg
                ${errors.address 
                  ? 'border-red-500' 
                  : 'border-transparent focus:border-lime-500'
                }
                text-black dark:text-white
                placeholder-gray-400 dark:placeholder-zinc-500
                focus:outline-none
              `}
            />
            {errors.address && (
              <p className="mt-2 text-sm text-red-500">
                {errors.address.message as string}
              </p>
            )}
          </div>

          <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-zinc-700">
            <div className="flex items-start gap-2">
              <span className="text-lg">📍</span>
              <div className="text-sm text-gray-600 dark:text-zinc-400">
                <p className="font-medium mb-1">Քարտեզի վրա ցույց տալ</p>
                <p>Հասցեի ճշգրտության համար կարող եք նշել տեղակայությունը քարտեզի վրա (ավելացվելու է հետագայում)</p>
              </div>
            </div>
          </div>
        </div>

        <FormNavigation
          currentStep={5}
          totalSteps={7}
          onBack={goToPreviousStep}
          onNext={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}
