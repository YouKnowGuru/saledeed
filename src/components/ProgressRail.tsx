import type { FormStep } from '@/types';

interface ProgressRailProps {
  currentStep: FormStep;
  onStepClick?: (step: FormStep) => void;
}

// Steps that appear in the progress rail
type VisibleStep = 'seller-name' | 'seller-cid' | 'seller-location' | 'buyer-name' | 'buyer-cid' | 'buyer-location' | 'vehicle-details' | 'sale-price' | 'witness';

const VISIBLE_STEPS: VisibleStep[] = [
  'seller-name',
  'seller-cid',
  'seller-location',
  'buyer-name',
  'buyer-cid',
  'buyer-location',
  'vehicle-details',
  'sale-price',
  'witness',
];

export function ProgressRail({ currentStep, onStepClick }: ProgressRailProps) {
  const activeVisibleIndex = VISIBLE_STEPS.indexOf(currentStep as VisibleStep);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[200] hidden lg:block">
      <div className="progress-rail flex flex-col items-center gap-3">
        {VISIBLE_STEPS.map((step, index) => {
          const isActive = index === activeVisibleIndex;
          const isCompleted = index < activeVisibleIndex && activeVisibleIndex !== -1;
          
          return (
            <button
              key={step}
              onClick={() => onStepClick?.(step as FormStep)}
              className={`
                w-3 h-3 rounded-full border-2 transition-all duration-300
                ${isActive 
                  ? 'bg-[#111216] border-[#111216] scale-110' 
                  : isCompleted
                    ? 'bg-[#111216] border-[#111216]'
                    : 'bg-transparent border-[#D1D5DB] hover:border-[#111216]'
                }
              `}
              title={step.replace(/-/g, ' ')}
            />
          );
        })}
      </div>
    </div>
  );
}
