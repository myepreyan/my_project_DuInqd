import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TaskFormData } from '@/types/form';

interface TaskFormStore {
  currentStep: number;
  formData: Partial<TaskFormData>;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<TaskFormData>) => void;
  resetForm: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const useTaskFormStore = create<TaskFormStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {},
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      updateFormData: (data) => 
        set((state) => ({ 
          formData: { ...state.formData, ...data } 
        })),
      
      resetForm: () => set({ currentStep: 1, formData: {} }),
      
      goToNextStep: () => 
        set((state) => ({ 
          currentStep: Math.min(state.currentStep + 1, 7) 
        })),
      
      goToPreviousStep: () => 
        set((state) => ({ 
          currentStep: Math.max(state.currentStep - 1, 1) 
        })),
    }),
    {
      name: 'task-form-storage',
    }
  )
);
