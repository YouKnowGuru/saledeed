import { X } from 'lucide-react';

interface SampleDeedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SampleDeedModal({ isOpen, onClose }: SampleDeedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h2 className="text-xl font-bold text-[#111216]">Sample Vehicle Sale Deed</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="document-preview !shadow-none !border-none">
            <h1 className="text-center text-xl font-bold uppercase tracking-wider mb-6">
              Kingdom of Bhutan<br />
              Vehicle Sale Deed
            </h1>

            <p className="text-right mb-6">
              Date: January 15, 2024
            </p>

            <h2 className="font-bold uppercase text-sm mb-3">Parties to this Agreement</h2>

            <p>
              <strong>SELLER:</strong> I, Mr. Karma Dorji, holder of Citizenship Identity Card (CID) Number 10705001234, residing at Bumthang, Bumthang, hereby declare that I am the lawful owner of the vehicle described below and have agreed to sell the said vehicle to the buyer mentioned herein.
            </p>

            <p>
              <strong>BUYER:</strong> I, Ms. Pema Wangmo, holder of Citizenship Identity Card (CID) Number 10804005678, residing at Thimphu, Thimphu, hereby declare that I have agreed to purchase the vehicle described below from the seller mentioned above for the sum of <strong>Nu. 450,000</strong> (Ngultrum four lakh fifty thousand only).
            </p>

            <h2 className="font-bold uppercase text-sm mb-3">Vehicle Details</h2>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div><strong>Vehicle Model:</strong> Hyundai Creta</div>
              <div><strong>Registration Number:</strong> BP-1-A1234</div>
              <div><strong>Chassis Number:</strong> MALBB51BLDM123456</div>
              <div><strong>Engine Number:</strong> G4FG1234567</div>
            </div>

            <h2 className="font-bold uppercase text-sm mb-3">Terms and Conditions</h2>

            <div className="space-y-2">
              <p>1. The seller declares that the vehicle is free from any outstanding loans, mortgages, legal disputes, or encumbrances of any kind.</p>
              <p>2. The seller confirms that all vehicle documents, including the registration certificate, are genuine and valid.</p>
              <p>3. The buyer has inspected the vehicle and accepts it in its current condition.</p>
              <p>4. Both parties agree to complete the ownership transfer process with the relevant authorities (RCSC/Department of Surface Transport) within 15 (fifteen) days from the date of this agreement.</p>
              <p>5. This sale is final and non-refundable once both parties have signed this document.</p>
              <p>6. The seller shall hand over all vehicle documents, keys, and accessories to the buyer upon receipt of the full payment.</p>
              <p>7. Any disputes arising from this agreement shall be resolved in accordance with the laws of the Kingdom of Bhutan.</p>
            </div>

            <h2 className="font-bold uppercase text-sm mb-3">Declarations</h2>

            <p>Both parties hereby declare that:</p>
            <div className="ml-4 space-y-1">
              <p>• They are of sound mind and have entered into this agreement willingly without any coercion, undue influence, or fraud.</p>
              <p>• They are not under the influence of alcohol or any intoxicating substances at the time of signing this document.</p>
              <p>• All information provided in this deed is true and accurate to the best of their knowledge.</p>
              <p>• They understand the legal implications of this agreement and accept full responsibility for their actions.</p>
            </div>

            <h2 className="font-bold uppercase text-sm mb-3">Witness</h2>

            <p>
              I, Mr. Ugyen Tenzin, holder of CID Number 10603004567, hereby certify that I have witnessed the signing of this Vehicle Sale Deed by both the seller and buyer. I confirm that both parties appeared to be of sound mind and entered into this agreement voluntarily.
            </p>

            <h2 className="font-bold uppercase text-sm mb-6 mt-8">Signatures</h2>

            <div className="grid grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="border-t border-[#111216] pt-2">
                  <p className="font-bold text-sm">Seller</p>
                  <p className="text-xs text-[#6B7280]">Signature & Date</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-[#111216] pt-2">
                  <p className="font-bold text-sm">Buyer</p>
                  <p className="text-xs text-[#6B7280]">Signature & Date</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-[#111216] pt-2">
                  <p className="font-bold text-sm">Witness</p>
                  <p className="text-xs text-[#6B7280]">Signature & Date</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-4 border-t border-[#E5E7EB] text-center text-xs text-[#6B7280]">
              <p>This document is governed by the laws of the Kingdom of Bhutan</p>
              <p>For official use only - Please process through RCSC/Department of Surface Transport</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
