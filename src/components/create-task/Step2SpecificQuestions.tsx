"use client";

import { useForm } from 'react-hook-form';
import { useTaskFormStore } from '@/store/useTaskFormStore';
import { getSubcategoryConfig, hasSpecificFields } from '@/utils/form-helpers';
import FormNavigation from './FormNavigation';
import DynamicFormField from './DynamicFormField';
import { useEffect } from 'react';

export default function Step2SpecificQuestions() {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useTaskFormStore();
  
  const config = getSubcategoryConfig(formData.subcategoryId || '');
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: formData.specificAnswers || {},
  });

  useEffect(() => {
    if (!hasSpecificFields(formData.subcategoryId || '')) {
      goToNextStep();
    }
  }, [formData.subcategoryId, goToNextStep]);

  const onSubmit = (data: any) => {
    updateFormData({ specificAnswers: data });
    goToNextStep();
  };

  if (!config || config.specificFields.length === 0) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2 font-serif">
            Լրացուցիչ տեղեկություններ
          </h2>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Պատասխանեք հարցերին՝ ավելի ճշգրիտ առաջարկներ ստանալու համար
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {config.specificFields.map((field) => (
            <DynamicFormField
              key={field.id}
              field={field}
              register={register}
              control={control}
              error={errors[field.id]}
            />
          ))}
        </div>

        <FormNavigation
          currentStep={2}
          totalSteps={7}
          onBack={goToPreviousStep}
          onNext={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}
