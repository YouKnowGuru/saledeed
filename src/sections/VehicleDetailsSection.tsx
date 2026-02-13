import { useState } from 'react';
import { ArrowRight, ArrowLeft, Car } from 'lucide-react';
import { FormStepSection } from './FormStepSection';

interface VehicleDetailsSectionProps {
  value: {
    model: string;
    registrationNumber: string;
    chassisNumber: string;
    engineNumber: string;
  };
  onChange: (field: keyof VehicleDetailsSectionProps['value'], value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function VehicleDetailsSection({ value, onChange, onNext, onBack }: VehicleDetailsSectionProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!value.model.trim()) {
      newErrors.model = 'Please enter the vehicle model';
    }
    if (!value.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Please enter the registration number';
    }
    if (!value.chassisNumber.trim()) {
      newErrors.chassisNumber = 'Please enter the chassis number';
    }
    if (!value.engineNumber.trim()) {
      newErrors.engineNumber = 'Please enter the engine number';
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
      headline={['WHAT ARE THE', 'VEHICLE', 'DETAILS?']}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#111216] dark:text-white mb-2">
              Vehicle model
            </label>
            <div className="relative">
              <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <input
                type="text"
                value={value.model}
                onChange={(e) => {
                  onChange('model', e.target.value);
                  setErrors(prev => ({ ...prev, model: '' }));
                }}
                placeholder="Hyundai Creta"
                className={`input-modern pl-12 ${errors.model ? 'error' : ''}`}
              />
            </div>
            {errors.model && (
              <p className="mt-1 text-sm text-red-500">{errors.model}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111216] dark:text-white mb-2">
              Registration number
            </label>
            <input
              type="text"
              value={value.registrationNumber}
              onChange={(e) => {
                onChange('registrationNumber', e.target.value.toUpperCase());
                setErrors(prev => ({ ...prev, registrationNumber: '' }));
              }}
              placeholder="BP-1-A1234"
              className={`input-modern ${errors.registrationNumber ? 'error' : ''}`}
            />
            {errors.registrationNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.registrationNumber}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#111216] dark:text-white mb-2">
              Chassis number
            </label>
            <input
              type="text"
              value={value.chassisNumber}
              onChange={(e) => {
                onChange('chassisNumber', e.target.value.toUpperCase());
                setErrors(prev => ({ ...prev, chassisNumber: '' }));
              }}
              placeholder="MALBB51BLDM123456"
              className={`input-modern ${errors.chassisNumber ? 'error' : ''}`}
            />
            {errors.chassisNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.chassisNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111216] dark:text-white mb-2">
              Engine number
            </label>
            <input
              type="text"
              value={value.engineNumber}
              onChange={(e) => {
                onChange('engineNumber', e.target.value.toUpperCase());
                setErrors(prev => ({ ...prev, engineNumber: '' }));
              }}
              placeholder="G4FG1234567"
              className={`input-modern ${errors.engineNumber ? 'error' : ''}`}
            />
            {errors.engineNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.engineNumber}</p>
            )}
          </div>
        </div>

        <p className="text-sm text-[#6B7280] dark:text-gray-400">
          These must match the vehicle registration book.
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
