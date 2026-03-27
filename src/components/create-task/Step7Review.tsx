"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTaskFormStore } from '@/store/useTaskFormStore';
import { categories } from '@/data/categories';
import { getSubcategoryConfig } from '@/utils/form-helpers';

export default function Step7Review() {
  const router = useRouter();
  const { formData, goToPreviousStep, resetForm, setCurrentStep } = useTaskFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const category = categories.find(cat => cat.id === formData.categoryId);
  const subcategory = category?.subcategories.find(sub => sub.id === formData.subcategoryId);
  const config = getSubcategoryConfig(formData.subcategoryId || '');

  const handlePublish = async () => {
    if (!session) {
      alert('Առաջադրանքը հրապարակելու համար անհրաժեշտ է մուտք գործել կամ գրանցվել:');
      const callbackUrl = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Publishing task:', formData);
      
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, status: 'inactive' })
      });

      if (!res.ok) {
        throw new Error('Failed to publish task');
      }
      
      alert('Առաջադրանքը հրապարակված է!');
      resetForm();
      router.push('/profile/posts');
    } catch (error) {
      console.error('Error publishing task:', error);
      alert('Սխալ։ Խնդրում ենք փորձել կրկին։');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!session) {
      alert('Սևագիրը պահպանելու համար անհրաժեշտ է մուտք գործել կամ գրանցվել:');
      const callbackUrl = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, status: 'draft' })
      });

      if (!res.ok) {
        throw new Error('Failed to save draft');
      }
      
      alert('Սևագիրը պահպանված է!');
      resetForm();
      router.push('/profile/drafts');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Սխալ առաջացավ սևագիրը պահպանելիս:');
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6 font-serif">
        Ստուգեք տեղեկությունները
      </h2>

      <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-6 mb-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-black dark:text-white mb-2">
            📝 {formData.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
          <span>📂</span>
          <span>{category?.name} → {subcategory?.name}</span>
        </div>

        <div className="border-t border-gray-200 dark:border-zinc-700 pt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span>💰</span>
            <span className="text-black dark:text-white font-medium">
              {formData.priceType === 'fixed' 
                ? `${formData.price?.toLocaleString()} դրամ (Ֆիքսված)`
                : 'Բանակցային'
              }
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span className="text-black dark:text-white">
              {formData.deadline === 'urgent' && 'Շտապ (մինչև 24 ժամ)'}
              {formData.deadline === 'normal' && 'Սովորական (2-3 օր)'}
              {formData.deadline === 'flexible' && 'Ճկուն'}
              {formData.deadline === 'specific' && formData.specificDate}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span className="text-black dark:text-white">
              {formData.city}
              {formData.address && `, ${formData.address}`}
            </span>
          </div>
        </div>

        {config && config.specificFields.length > 0 && (
          <div className="border-t border-gray-200 dark:border-zinc-700 pt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              Հատուկ պարամետրեր:
            </p>
            <div className="space-y-1 text-sm text-gray-600 dark:text-zinc-400">
              {config.specificFields.map((field) => {
                const answer = formData.specificAnswers?.[field.id];
                if (!answer) return null;
                
                return (
                  <div key={field.id}>
                    <span className="font-medium">{field.label}:</span>{' '}
                    {Array.isArray(answer) ? answer.join(', ') : answer}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-zinc-700 pt-4">
          <p className="text-gray-600 dark:text-zinc-400 text-sm mb-3">
            {formData.description}
          </p>
          
          {formData.images && formData.images.length > 0 && (
            <div className="flex gap-2 mb-3">
              {formData.images.slice(0, 3).map((img: any, i: number) => (
                <div key={i} className="w-16 h-16 bg-gray-200 dark:bg-zinc-700 rounded" />
              ))}
              {formData.images.length > 0 && (
                <span className="text-sm text-gray-500 dark:text-zinc-500 self-center">
                  {formData.images.length} նկար
                </span>
              )}
            </div>
          )}
          
          <div className="text-sm text-gray-600 dark:text-zinc-400">
            📱 {formData.phone}
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="text-sm text-lime-600 dark:text-lime-500 hover:underline flex items-center gap-1"
          >
            Խմբագրել ✏️
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePublish}
        disabled={isSubmitting}
        className="
          w-full mb-3
          px-6 py-4
          bg-lime-500
          text-white text-lg
          rounded-lg
          hover:bg-lime-600
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all
          font-medium
          shadow-sm
        "
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Հրապարակվում է...
          </span>
        ) : (
          '✓ Հրապարակել առաջադրանքը'
        )}
      </button>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={goToPreviousStep}
          className="
            flex-[2]
            px-4 py-3
            bg-white dark:bg-zinc-900
            border border-gray-300 dark:border-zinc-700
            text-black dark:text-white
            rounded-lg
            hover:bg-gray-50 dark:hover:bg-zinc-800
            transition-colors
            font-medium
          "
        >
          ← Հետ
        </button>

        <button
          type="button"
          onClick={handleSaveDraft}
          className="
            flex-[3]
            px-4 py-3
            bg-white dark:bg-zinc-900
            border border-gray-300 dark:border-zinc-700
            text-black dark:text-white
            rounded-lg
            hover:bg-gray-50 dark:hover:bg-zinc-800
            transition-colors
            font-medium
          "
        >
          Պահպանել սևագիր
        </button>
      </div>
    </div>
  );
}
