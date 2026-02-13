import { useState, useCallback } from 'react';

export interface ValidationErrors {
  [key: string]: string;
}

export function useValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateCID = useCallback((cid: string): boolean => {
    return /^\d{11}$/.test(cid);
  }, []);

  const validateRequired = useCallback((value: string): boolean => {
    return value.trim().length > 0;
  }, []);

  const validatePrice = useCallback((price: string): boolean => {
    return /^\d+$/.test(price) && parseInt(price) > 0;
  }, []);

  const validateField = useCallback((field: string, value: string, rules: string[]): boolean => {
    for (const rule of rules) {
      if (rule === 'required' && !validateRequired(value)) {
        setErrors(prev => ({ ...prev, [field]: 'This field is required' }));
        return false;
      }
      if (rule === 'cid' && !validateCID(value)) {
        setErrors(prev => ({ ...prev, [field]: 'Please enter a valid 11-digit CID number' }));
        return false;
      }
      if (rule === 'price' && !validatePrice(value)) {
        setErrors(prev => ({ ...prev, [field]: 'Please enter a valid amount' }));
        return false;
      }
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    return true;
  }, [validateCID, validateRequired, validatePrice]);

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    validateCID,
    validateRequired,
    validatePrice,
    clearError,
    clearAllErrors,
  };
}
