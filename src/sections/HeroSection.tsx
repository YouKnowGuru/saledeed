import { ArrowRight, FileText, Shield, Download } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
  onViewSample: () => void;
}

export function HeroSection({ onStart, onViewSample }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-screen bg-[#F4F6F8] dark:bg-[#111216] flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-0">
              <div className="heading-display text-[#111216] dark:text-white">VEHICLE</div>
              <div className="heading-display text-[#111216] dark:text-white">SALE DEED</div>
              <div className="heading-display text-[#111216] dark:text-white">GENERATOR</div>
            </div>
            
            <p className="text-lg text-[#6B7280] dark:text-gray-400 max-w-md leading-relaxed">
              A step-by-step builder for a legally valid sale deed. Clear, fast, and private.
            </p>
          </div>

          {/* Right Card */}
          <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            <div className="card-modern">
              <h2 className="text-xl font-semibold text-[#111216] dark:text-white mb-6">
                Let's begin
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F3F4F6] dark:bg-[#222] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-[#111216] dark:text-white" />
                  </div>
                  <p className="text-sm text-[#6B7280] dark:text-gray-400">
                    Fill in seller, buyer, vehicle, and sale details
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F3F4F6] dark:bg-[#222] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-[#111216] dark:text-white" />
                  </div>
                  <p className="text-sm text-[#6B7280] dark:text-gray-400">
                    Review a live deed preview as you go
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F3F4F6] dark:bg-[#222] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Download className="w-4 h-4 text-[#111216] dark:text-white" />
                  </div>
                  <p className="text-sm text-[#6B7280] dark:text-gray-400">
                    Download a print-ready PDF instantly
                  </p>
                </div>
              </div>
              
              <button
                onClick={onStart}
                className="btn-modern btn-primary w-full mb-3"
              >
                Start building
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onViewSample}
                className="w-full text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#111216] dark:hover:text-white transition-colors"
              >
                See a sample deed
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
