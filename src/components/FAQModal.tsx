import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = [
  {
    question: 'What is a Vehicle Sale Deed?',
    answer: 'A Vehicle Sale Deed is a legal document that records the transfer of ownership of a vehicle from a seller to a buyer. It includes details about the parties involved, the vehicle, the sale price, and the terms and conditions of the sale. In Bhutan, this document is required for processing ownership transfer with the Department of Surface Transport.',
  },
  {
    question: 'Is this deed legally valid?',
    answer: 'Yes, the deed generated follows the standard format recognized in Bhutan. However, for the deed to be fully legally binding, it must be signed by both parties and a witness in the presence of each other. The signed document should then be submitted to the RCSC or Department of Surface Transport for official ownership transfer.',
  },
  {
    question: 'What information do I need to provide?',
    answer: 'You will need to provide: (1) Seller details (name, CID, location), (2) Buyer details (name, CID, location), (3) Vehicle details (model, registration number, chassis number, engine number), (4) Sale price in Ngultrum, and (5) Witness information (name and CID).',
  },
  {
    question: 'How long does the ownership transfer take?',
    answer: 'According to standard practice in Bhutan, both parties should complete the ownership transfer process with the relevant authorities within 15 days from the date of the sale agreement. This timeline is included in the deed by default.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Absolutely. This tool operates entirely in your browser. No data is sent to or stored on any server. Your information remains private and secure on your device. You can verify this by checking that the website works even when offline after the initial load.',
  },
  {
    question: 'Can I save my progress?',
    answer: 'Yes, you can save your progress by clicking the "Save draft" button in the top right corner. Your data will be stored locally in your browser and will be available when you return to the site. You can also clear the draft at any time.',
  },
  {
    question: 'What if I make a mistake?',
    answer: 'You can go back and edit any field at any time before generating the final PDF. On the review page, click "Edit details" to return to the form and make changes.',
  },
  {
    question: 'Do I need a witness?',
    answer: 'Yes, having a witness is highly recommended as it adds legal validity to the document. The witness should be a neutral third party who is present when both parties sign the deed. The witness must also provide their CID number.',
  },
  {
    question: 'What happens after I download the PDF?',
    answer: 'After downloading the PDF, both the seller and buyer should sign the document in the presence of the witness. The witness should also sign. Then, submit the signed document along with other required documents to the RCSC or Department of Surface Transport to complete the ownership transfer.',
  },
  {
    question: 'Can I use this for commercial vehicles?',
    answer: 'This deed format is primarily designed for private vehicle sales. For commercial vehicles or special categories, you may need additional documentation. Please consult with the Department of Surface Transport for specific requirements.',
  },
];

export function FAQModal({ isOpen, onClose }: FAQModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h2 className="text-xl font-bold text-[#111216]">Frequently Asked Questions</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[#E5E7EB] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F9FAFB] transition-colors"
                >
                  <span className="font-medium text-[#111216] pr-4">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-4 pb-4">
                    <p className="text-[#6B7280] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
