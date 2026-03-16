"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskFormStore } from '@/store/useTaskFormStore';
import { step6Schema } from '@/schemas/task-form-schema';
import FormNavigation from './FormNavigation';
import ImageUploader from './ImageUploader';
import { useState } from 'react';

export default function Step6ImagesContact() {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useTaskFormStore();
  const [images, setImages] = useState<File[]>(formData.images || []);
  
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(step6Schema),
    defaultValues: {
      phone: formData.phone || '',
      email: formData.email || '',
      contactMethods: formData.contactMethods || ['phone'],
      images: formData.images || [],
    },
  });

  const onSubmit = (data: any) => {
    updateFormData({ ...data, images });
    goToNextStep();
  };

  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages);
    setValue('images', newImages, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6 font-serif">
          Նկարներ և կոնտակտ
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
              Նկարներ (մինչև 5, ըստ ցանկության)
            </label>
            <ImageUploader
              images={images}
              onImagesChange={handleImagesChange}
              maxFiles={5}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Կոնտակտային տվյալներ <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500">
                📱
              </span>
              <input
                type="tel"
                {...register('phone')}
                placeholder="+374 __ ______"
                className={`
                  w-full pl-12 pr-4 py-3
                  bg-gray-50 dark:bg-zinc-800
                  border-2 rounded-lg
                  ${errors.phone 
                    ? 'border-red-500' 
                    : 'border-transparent focus:border-lime-500'
                  }
                  text-black dark:text-white
                  placeholder-gray-400 dark:placeholder-zinc-500
                  focus:outline-none
                `}
              />
            </div>
            {errors.phone && (
              <p className="mt-2 text-sm text-red-500">
                {errors.phone.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Email (ըստ ցանկության)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500">
                ✉️
              </span>
              <input
                type="email"
                {...register('email')}
                placeholder="your@email.com"
                className={`
                  w-full pl-12 pr-4 py-3
                  bg-gray-50 dark:bg-zinc-800
                  border-2 rounded-lg
                  ${errors.email 
                    ? 'border-red-500' 
                    : 'border-transparent focus:border-lime-500'
                  }
                  text-black dark:text-white
                  placeholder-gray-400 dark:placeholder-zinc-500
                  focus:outline-none
                `}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
              Նախընտրելի կապի եղանակ <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'phone', label: 'Հեռախոս' },
                { value: 'whatsapp', label: 'WhatsApp' },
                { value: 'telegram', label: 'Telegram' },
                { value: 'email', label: 'Էլ. փոստ' },
              ].map((method) => (
                <label
                  key={method.value}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    {...register('contactMethods')}
                    value={method.value}
                    className="w-4 h-4 text-lime-500 rounded focus:ring-lime-500"
                  />
                  <span className="text-black dark:text-white">{method.label}</span>
                </label>
              ))}
            </div>
            {errors.contactMethods && (
              <p className="mt-2 text-sm text-red-500">
                {errors.contactMethods.message as string}
              </p>
            )}
          </div>
        </div>

        <FormNavigation
          currentStep={6}
          totalSteps={7}
          onBack={goToPreviousStep}
          onNext={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}
