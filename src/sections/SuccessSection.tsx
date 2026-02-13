import { Check, Download, RotateCcw, Mail, HelpCircle } from 'lucide-react';

interface SuccessSectionProps {
  onDownload: () => void;
  onStartNew: () => void;
  onEmail: () => void;
  onFAQ: () => void;
}

export function SuccessSection({ onDownload, onStartNew, onEmail, onFAQ }: SuccessSectionProps) {
  return (
    <section className="relative w-full min-h-screen bg-[#111216] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        {/* Check Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-[#B58CFF]/20 flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-[#B58CFF]" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Your deed is ready
        </h2>

        {/* Subtext */}
        <p className="text-lg text-gray-400 mb-10">
          Download your PDF, print, and sign in front of a witness.
        </p>

        {/* Primary CTA */}
        <div className="mb-8">
          <button
            onClick={onDownload}
            className="btn-modern btn-accent text-lg px-10"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onStartNew}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Start a new deed
          </button>
          
          <button
            onClick={onEmail}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email a copy
          </button>
          
          <button
            onClick={onFAQ}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            See FAQs
          </button>
        </div>

        {/* Privacy Note */}
        <p className="mt-12 text-sm text-gray-500">
          Your data remains private. No information is stored on our servers.
        </p>
      </div>
    </section>
  );
}
