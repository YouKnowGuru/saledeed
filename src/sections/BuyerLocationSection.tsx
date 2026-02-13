import { useState } from 'react';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { FormStepSection } from './FormStepSection';

interface BuyerLocationSectionProps {
  value: { gewog: string; dzongkhag: string };
  onChange: (field: 'gewog' | 'dzongkhag', value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function BuyerLocationSection({ value, onChange, onNext, onBack }: BuyerLocationSectionProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!value.gewog.trim()) {
      newErrors.gewog = 'Please enter the Gewog';
    }
    if (!value.dzongkhag.trim()) {
      newErrors.dzongkhag = 'Please enter the Dzongkhag';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onNext();
  };

  return (
    <FormStepSection
      headline={['WHERE IS THE', 'BUYER', 'LOCATED?']}
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#111216] dark:text-white mb-2">
            Gewog
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              value={value.gewog}
              onChange={(e) => {
                onChange('gewog', e.target.value);
                setErrors(prev => ({ ...prev, gewog: '' }));
              }}
              placeholder="Thimphu"
              className={`input-modern pl-12 ${errors.gewog ? 'error' : ''}`}
            />
          </div>
          {errors.gewog && (
            <p className="mt-2 text-sm text-red-500">{errors.gewog}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111216] dark:text-white mb-2">
            Dzongkhag
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              value={value.dzongkhag}
              onChange={(e) => {
                onChange('dzongkhag', e.target.value);
                setErrors(prev => ({ ...prev, dzongkhag: '' }));
              }}
              placeholder="Thimphu"
              className={`input-modern pl-12 ${errors.dzongkhag ? 'error' : ''}`}
            />
          </div>
          {errors.dzongkhag && (
            <p className="mt-2 text-sm text-red-500">{errors.dzongkhag}</p>
          )}
        </div>

        <p className="text-sm text-[#6B7280] dark:text-gray-400">
          This will appear in the deed as the buyer's address.
        </p>

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
