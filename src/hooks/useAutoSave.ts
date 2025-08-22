import { useEffect, useRef } from 'react';
import { StoreData } from '../types';

interface UseAutoSaveOptions {
  delay?: number;
  onSave?: () => void;
  onError?: (error: Error) => void;
}

export function useAutoSave(
  data: StoreData,
  saveFunction: (data: StoreData) => void,
  options: UseAutoSaveOptions = {}
) {
  const { delay = 2000, onSave, onError } = options;
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');

  useEffect(() => {
    const currentDataString = JSON.stringify(data);
    
    // Only save if data has actually changed
    if (currentDataString === lastSavedRef.current) {
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      try {
        saveFunction(data);
        lastSavedRef.current = currentDataString;
        onSave?.();
      } catch (error) {
        onError?.(error as Error);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, saveFunction, delay, onSave, onError]);

  // Manual save function
  const saveNow = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    try {
      saveFunction(data);
      lastSavedRef.current = JSON.stringify(data);
      onSave?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return { saveNow };
}