import type { ReactNode } from 'react';

interface FormStepSectionProps {
  headline: string[];
  children: ReactNode;
}

export function FormStepSection({ headline, children }: FormStepSectionProps) {
  return (
    <section className="relative w-full min-h-screen bg-[#F4F6F8] dark:bg-[#111216] flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Question (Left) */}
          <div className="space-y-0">
            {headline.map((line, index) => (
              <div 
                key={index} 
                className="heading-section text-[#111216] dark:text-white"
              >
                {line}
              </div>
            ))}
          </div>

          {/* Input Card (Right) */}
          <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            <div className="card-modern">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
