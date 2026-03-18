"use client";

import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const { currentStep, updateFormData, resetForm } = useTaskFormStore();
  
  const categoryId = searchParams.get('category');
  const subcategoryId = searchParams.get('subcategory');

  useEffect(() => {
    // Եթե URL-ում կան category և subcategory պարամետրեր, թարմացնել formData-ն
    if (categoryId && subcategoryId) {
      updateFormData({
        categoryId,
        subcategoryId,
      });
    }
  }, [categoryId, subcategoryId, updateFormData]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const isLeavingToOtherPage = !window.location.pathname.includes('/create-task');
      if (isLeavingToOtherPage) {
        resetForm();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (!window.location.pathname.includes('/create-task')) {
        resetForm();
      }
    };
  }, [resetForm]);

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
