import { useState } from 'react';
import { ArrowRight, ArrowLeft, Banknote } from 'lucide-react';
import { FormStepSection } from './FormStepSection';

interface SalePriceSectionProps {
  value: { price: string; isNonRefundable: boolean };
  onChange: (field: 'price' | 'isNonRefundable', value: string | boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SalePriceSection({ value, onChange, onNext, onBack }: SalePriceSectionProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!value.price.trim()) {
      setError('Please enter the sale price');
      return;
    }
    if (!/^\d+$/.test(value.price) || parseInt(value.price) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    setError('');
    onNext();
  };

  const formatPrice = (input: string) => {
    const digits = input.replace(/\D/g, '');
    return digits;
  };

  return (
    <FormStepSection
      headline={['WHAT IS THE', 'SALE PRICE', '(NU.)?']}
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#111216] dark:text-white mb-2">
            Sale price
          </label>
          <div className="relative">
            <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <span className="absolute left-12 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-gray-400 font-medium">
              Nu.
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={value.price}
              onChange={(e) => {
                onChange('price', formatPrice(e.target.value));
                setError('');
              }}
              placeholder="450000"
              className={`input-modern pl-24 ${error ? 'error' : ''}`}
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
          <p className="mt-2 text-sm text-[#6B7280] dark:text-gray-400">
            Enter the agreed amount in Ngultrum.
          </p>
        </div>

        <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] dark:bg-[#1a1a1a] rounded-xl border border-[#E5E7EB] dark:border-[#333]">
          <input
            type="checkbox"
            id="nonRefundable"
            checked={value.isNonRefundable}
            onChange={(e) => onChange('isNonRefundable', e.target.checked)}
            className="w-5 h-5 mt-0.5 rounded border-[#E5E7EB] dark:border-[#333] text-[#B58CFF] focus:ring-[#B58CFF] cursor-pointer"
          />
          <label htmlFor="nonRefundable" className="text-sm text-[#111216] dark:text-white cursor-pointer">
            Sale is final and non-refundable
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={onBack}
            className="btn-modern btn-secondary w-full sm:flex-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="btn-modern btn-primary w-full sm:flex-1"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </FormStepSection>
  );
}
