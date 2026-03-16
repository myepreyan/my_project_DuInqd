import { useEffect } from 'react';
import { useTaskFormStore } from '@/store/useTaskFormStore';
import { debounce } from '@/utils/debounce';

export function useAutoSave() {
  const { formData } = useTaskFormStore();
  
  useEffect(() => {
    const saveToLocalStorage = debounce(() => {
      console.log('Auto-saved form data to localStorage');
    }, 2000);
    
    saveToLocalStorage();
  }, [formData]);
}
