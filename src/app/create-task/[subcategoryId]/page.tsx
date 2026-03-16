"use client";

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useTaskFormStore } from '@/store/useTaskFormStore';
import StepIndicator from '@/components/create-task/StepIndicator';
import Step1BasicInfo from '@/components/create-task/Step1BasicInfo';
import Step2SpecificQuestions from '@/components/create-task/Step2SpecificQuestions';
import Step3Description from '@/components/create-task/Step3Description';
import Step4PriceDeadline from '@/components/create-task/Step4PriceDeadline';
import Step5Location from '@/components/create-task/Step5Location';
import Step6ImagesContact from '@/components/create-task/Step6ImagesContact';
import Step7Review from '@/components/create-task/Step7Review';

export default function CreateTaskPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { currentStep, updateFormData } = useTaskFormStore();
  
  const subcategoryId = params.subcategoryId as string;
  const categoryId = searchParams.get('category');

  useEffect(() => {
    if (subcategoryId && categoryId) {
      updateFormData({
        subcategoryId,
        categoryId,
      });
    }
  }, [subcategoryId, categoryId, updateFormData]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <StepIndicator current={currentStep} total={7} />
        
        {currentStep === 1 && <Step1BasicInfo />}
        {currentStep === 2 && <Step2SpecificQuestions />}
        {currentStep === 3 && <Step3Description />}
        {currentStep === 4 && <Step4PriceDeadline />}
        {currentStep === 5 && <Step5Location />}
        {currentStep === 6 && <Step6ImagesContact />}
        {currentStep === 7 && <Step7Review />}
      </div>
    </div>
  );
}
