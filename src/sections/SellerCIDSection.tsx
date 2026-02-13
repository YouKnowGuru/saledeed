import { useState } from 'react';
import { ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';
import { FormStepSection } from './FormStepSection';

interface SellerCIDSectionProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SellerCIDSection({ value, onChange, onNext, onBack }: SellerCIDSectionProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!value.trim()) {
      setError('Please enter the seller\'s CID number');
      return;
    }
    if (!/^\d{11}$/.test(value)) {
      setError('Please enter a valid 11-digit CID number');
      return;
    }
    setError('');
    onNext();
  };

  const formatCID = (input: string) => {
    // Only allow digits
    const digits = input.replace(/\D/g, '');
    // Limit to 11 digits
    return digits.slice(0, 11);
  };

  return (
    <FormStepSection
      headline={['WHAT IS THE', 'SELLER\'S', 'CID NUMBER?']}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#111216] dark:text-white mb-2">
            Citizenship ID (CID)
          </label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              inputMode="numeric"
              value={value}
              onChange={(e) => {
                onChange(formatCID(e.target.value));
                setError('');
              }}
              placeholder="10705001234"
              maxLength={11}
              className={`input-modern pl-12 ${error ? 'error' : ''}`}
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
          <p className="mt-2 text-sm text-[#6B7280] dark:text-gray-400">
            11-digit CID as shown on your Bhutan ID card.
          </p>
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
