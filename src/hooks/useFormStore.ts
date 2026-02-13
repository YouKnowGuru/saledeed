import { useState, useCallback, useEffect } from 'react';
import type { DeedData, FormStep } from '@/types';
import { INITIAL_DEED_DATA } from '@/types';

const STORAGE_KEY = 'vehicle-sale-deed-draft';

export function useFormStore() {
  const [formData, setFormData] = useState<DeedData>(INITIAL_DEED_DATA);
  const [currentStep, setCurrentStep] = useState<FormStep>('hero');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save draft to localStorage whenever formData changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  const updateSeller = useCallback((field: keyof DeedData['seller'], value: string) => {
    setFormData(prev => ({
      ...prev,
      seller: { ...prev.seller, [field]: value },
    }));
  }, []);

  const updateBuyer = useCallback((field: keyof DeedData['buyer'], value: string) => {
    setFormData(prev => ({
      ...prev,
      buyer: { ...prev.buyer, [field]: value },
    }));
  }, []);

  const updateVehicle = useCallback((field: keyof DeedData['vehicle'], value: string) => {
    setFormData(prev => ({
      ...prev,
      vehicle: { ...prev.vehicle, [field]: value },
    }));
  }, []);

  const updateWitness = useCallback((field: keyof DeedData['witness'], value: string) => {
    setFormData(prev => ({
      ...prev,
      witness: { ...prev.witness, [field]: value },
    }));
  }, []);

  const updateSale = useCallback((field: keyof DeedData['sale'], value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      sale: { ...prev.sale, [field]: value },
    }));
  }, []);

  const clearDraft = useCallback(() => {
    setFormData(INITIAL_DEED_DATA);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const saveDraft = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const goToStep = useCallback((step: FormStep) => {
    setCurrentStep(step);
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_DEED_DATA);
    setCurrentStep('hero');
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    formData,
    currentStep,
    isLoaded,
    updateSeller,
    updateBuyer,
    updateVehicle,
    updateWitness,
    updateSale,
    clearDraft,
    saveDraft,
    goToStep,
    resetForm,
    setCurrentStep,
  };
}
