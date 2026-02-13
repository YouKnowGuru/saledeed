import { useState } from 'react';
import { ArrowRight, ArrowLeft, User } from 'lucide-react';
import { FormStepSection } from './FormStepSection';

interface SellerNameSectionProps {
  value: { title: string; fullName: string };
  onChange: (field: 'title' | 'fullName', value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SellerNameSection({ value, onChange, onNext, onBack }: SellerNameSectionProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!value.fullName.trim()) {
      setError('Please enter the seller\'s full name');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <FormStepSection
      headline={['WHAT IS THE', 'SELLER\'S', 'FULL NAME?']}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#111216] dark:text-white mb-2">
            Full name
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={value.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="input-modern w-full sm:w-24 flex-shrink-0"
            >
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
            </select>
            <div className="relative flex-1">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <input
                type="text"
                value={value.fullName}
                onChange={(e) => {
                  onChange('fullName', e.target.value);
                  setError('');
                }}
                placeholder="Karma Dorji"
                className={`input-modern pl-12 ${error ? 'error' : ''}`}
              />
            </div>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
          <p className="mt-2 text-sm text-[#6B7280] dark:text-gray-400">
            Use the name as it appears on your Citizenship ID.
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
