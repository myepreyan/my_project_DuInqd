interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
}

export default function FormNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isNextDisabled = false,
  isSubmitting = false,
}: FormNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex gap-3 mt-8">
      {!isFirstStep && (
        <button
          type="button"
          onClick={onBack}
          className="
            flex-[2] md:flex-[2]
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
      )}
      
      <button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled || isSubmitting}
        className={`
          ${isFirstStep ? 'flex-1' : 'flex-[3] md:flex-[3]'}
          px-6 py-3
          bg-lime-500
          text-white
          rounded-lg
          hover:bg-lime-600
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all
          font-medium
          shadow-sm
        `}
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
          isLastStep ? 'Հրապարակել' : 'Հաջորդը →'
        )}
      </button>
    </div>
  );
}
