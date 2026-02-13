import { useState } from 'react';
import { ArrowRight, ArrowLeft, Eye, User, CreditCard } from 'lucide-react';
import { FormStepSection } from './FormStepSection';

interface WitnessSectionProps {
  value: { title: string; fullName: string; cidNumber: string };
  onChange: (field: 'title' | 'fullName' | 'cidNumber', value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function WitnessSection({ value, onChange, onNext, onBack }: WitnessSectionProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!value.fullName.trim()) {
      newErrors.fullName = 'Please enter the witness\'s full name';
    }
    if (!value.cidNumber.trim()) {
      newErrors.cidNumber = 'Please enter the witness\'s CID number';
    } else if (!/^\d{11}$/.test(value.cidNumber)) {
      newErrors.cidNumber = 'Please enter a valid 11-digit CID number';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onNext();
  };

  const formatCID = (input: string) => {
    const digits = input.replace(/\D/g, '');
    return digits.slice(0, 11);
  };

  return (
    <FormStepSection
      headline={['WHO WILL', 'WITNESS', 'THIS SALE?']}
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#111216] dark:text-white mb-2">
            Witness full name
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
                  setErrors(prev => ({ ...prev, fullName: '' }));
                }}
                placeholder="Ugyen Tenzin"
                className={`input-modern pl-12 ${errors.fullName ? 'error' : ''}`}
              />
            </div>
          </div>
          {errors.fullName && (
            <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111216] dark:text-white mb-2">
            Witness CID
          </label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              inputMode="numeric"
              value={value.cidNumber}
              onChange={(e) => {
                onChange('cidNumber', formatCID(e.target.value));
                setErrors(prev => ({ ...prev, cidNumber: '' }));
              }}
              placeholder="10603004567"
              maxLength={11}
              className={`input-modern pl-12 ${errors.cidNumber ? 'error' : ''}`}
            />
          </div>
          {errors.cidNumber && (
            <p className="mt-2 text-sm text-red-500">{errors.cidNumber}</p>
          )}
        </div>

        <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] dark:bg-[#1a1a1a] rounded-xl border border-[#E5E7EB] dark:border-[#333]">
          <Eye className="w-5 h-5 text-[#6B7280] dark:text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#6B7280] dark:text-gray-400">
            A witness adds legal validity. Use a CID that's easy to verify.
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
            Review deed
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </FormStepSection>
  );
}
