import { Check, Download, Printer, Edit3 } from 'lucide-react';
import type { DeedData } from '@/types';
import { numberToWords } from '@/utils/numberToWords';
import { PrintableDeed } from '@/components/PrintableDeed';

interface ReviewSectionProps {
  data: DeedData;
  onDownload: () => void;
  onPrint: () => void;
  onEdit: () => void;
}


export function ReviewSection({ data, onDownload, onPrint, onEdit }: ReviewSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const priceInWords = numberToWords(parseInt(data.sale.price) || 0);

  return (
    <section className="relative w-full min-h-screen bg-[#F4F6F8] dark:bg-[#111216] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Panel - Actions */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#111216] dark:text-white mb-2">
                  Review your deed
                </h2>
                <p className="text-[#6B7280] dark:text-gray-400">
                  Read carefully. You can go back to edit any detail.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onDownload}
                  className="btn-modern btn-primary w-full"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>

                <button
                  onClick={onPrint}
                  className="btn-modern btn-secondary w-full"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>

                <button
                  onClick={onEdit}
                  className="w-full text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#111216] dark:hover:text-white transition-colors py-2"
                >
                  <Edit3 className="w-4 h-4 inline mr-2" />
                  Edit details
                </button>
              </div>

              {/* Summary */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-5 border border-[#E5E7EB] dark:border-[#333]">
                <h3 className="text-sm font-semibold text-[#111216] dark:text-white mb-4 uppercase tracking-wide">
                  Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-[#6B7280] dark:text-gray-400">Seller:</span>
                    <span className="font-medium text-[#111216] dark:text-white">{data.seller.fullName || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-[#6B7280] dark:text-gray-400">Buyer:</span>
                    <span className="font-medium text-[#111216] dark:text-white">{data.buyer.fullName || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-[#6B7280] dark:text-gray-400">Vehicle:</span>
                    <span className="font-medium text-[#111216] dark:text-white">{data.vehicle.model || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-[#6B7280] dark:text-gray-400">Price:</span>
                    <span className="font-medium text-[#111216] dark:text-white">Nu. {parseInt(data.sale.price).toLocaleString() || '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Document Preview */}
          <div className="lg:col-span-8">
            <div className="document-preview deed-formal-content p-12 sm:p-16">
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold uppercase tracking-tight mb-3">
                  Sale Deed
                </h1>
                <div className="w-32 h-[3px] bg-[#111216] dark:bg-white mx-auto mb-6"></div>
              </div>

              <div className="text-right mb-10 text-sm">
                <span>Date: {formatDate(data.date)}</span>
              </div>

              <div className="space-y-8 text-[14px] leading-relaxed">
                <p className="text-justify font-medium">
                  I, <span className="font-bold">{data.seller.title} {data.seller.fullName}</span>, holding CID No. <span className="font-bold underline">{data.seller.cidNumber}</span> from {data.seller.gewog}, {data.seller.dzongkhag}, hereby undersigned, hereby apply for the sale deed of the following vehicle model <span className="font-bold">{data.vehicle.model}</span> with vehicle registration number <span className="font-bold underline">{data.vehicle.registrationNumber}</span> to here buyer <span className="font-bold">{data.buyer.title} {data.buyer.fullName}</span> holding CID No. <span className="font-bold underline">{data.buyer.cidNumber}</span> of {data.buyer.gewog} (Gewog), {data.buyer.dzongkhag} (Dzongkhag). The above-mentioned vehicle Chassis No. <span className="font-bold">{data.vehicle.chassisNumber}</span> and Engine number <span className="font-bold">{data.vehicle.engineNumber}</span> simultaneously. I agree to sell the above-mentioned vehicle to you for the sum of <span className="font-bold underline">Nu. {parseInt(data.sale.price).toLocaleString()}</span> (<span className="capitalize italic">{priceInWords}</span> only).
                </p>

                <div className="space-y-4 pl-6">
                  <div className="flex gap-4">
                    <span className="font-bold min-w-[24px]">1.</span>
                    <p><strong>Ownership transfer</strong> shall be completed by the buyer within fifteen (15) days from the date of this agreement.</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-bold min-w-[24px]">2.</span>
                    <p>There is <strong>no outstanding loan</strong> or any legal issue related to the vehicle mentioned above.</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-bold min-w-[24px]">3.</span>
                    <p>The transaction has been carried out <strong>mutually and willingly</strong> by both parties at an agreed price.</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-bold min-w-[24px]">4.</span>
                    <p>The vehicle has been sold on a <strong>non-refundable basis</strong>, and the full risk and responsibility is transferred to the buyer from the day of execution.</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-bold min-w-[24px]">5.</span>
                    <p>At the time of signing this agreement, <strong>both parties are mentally sound</strong> and <strong>not under the influence of alcohol</strong>.</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-bold min-w-[24px]">6.</span>
                    <p>Any breach of this agreement shall be dealt with in accordance with the <strong>laws of the Kingdom of Bhutan</strong>.</p>
                  </div>
                </div>

                <p className="text-justify">
                  I request you to kindly process the sale deed accordingly, change the vehicle ownership as per rule of Bhutan Construction and Transport Authority and acknowledge receipt of this application.
                </p>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#1F1F1F] border border-[#E5E7EB] dark:border-[#333] p-6 rounded-lg mt-10">
                <p className="text-sm leading-relaxed mb-6">
                  <strong>Seller</strong>
                </p>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <span className="opacity-60 text-xs">Mr./Ms.</span>
                    <div className="border-b border-dotted border-gray-400 dark:border-gray-600 mt-2 pb-1">{data.seller.fullName}</div>
                  </div>
                  <div>
                    <span className="opacity-60 text-xs">CID No:</span>
                    <div className="border-b border-dotted border-gray-400 dark:border-gray-600 mt-2 pb-1">{data.seller.cidNumber}</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#1F1F1F] border border-[#E5E7EB] dark:border-[#333] p-6 rounded-lg">
                <p className="text-sm leading-relaxed mb-6">
                  <strong>Buyer</strong>
                </p>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <span className="opacity-60 text-xs">Mr./Ms.</span>
                    <div className="border-b border-dotted border-gray-400 dark:border-gray-600 mt-2 pb-1">{data.buyer.fullName}</div>
                  </div>
                  <div>
                    <span className="opacity-60 text-xs">CID No:</span>
                    <div className="border-b border-dotted border-gray-400 dark:border-gray-600 mt-2 pb-1">{data.buyer.cidNumber}</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#1F1F1F] border border-[#E5E7EB] dark:border-[#333] p-6 rounded-lg">
                <p className="text-sm leading-relaxed mb-6">
                  <strong>Seller Witness</strong>
                </p>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <span className="opacity-60 text-xs">Mr./Ms.</span>
                    <div className="border-b border-dotted border-gray-400 dark:border-gray-600 mt-2 pb-1">{data.witness.fullName}</div>
                  </div>
                  <div>
                    <span className="opacity-60 text-xs">CID No:</span>
                    <div className="border-b border-dotted border-gray-400 dark:border-gray-600 mt-2 pb-1">{data.witness.cidNumber}</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#1F1F1F] border border-[#E5E7EB] dark:border-[#333] p-6 rounded-lg">
                <p className="text-sm leading-relaxed mb-6">
                  <strong>Buyer Witness</strong>
                </p>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <span className="opacity-60 text-xs">Mr./Ms.</span>
                    <div className="border-b border-dotted border-gray-400 dark:border-gray-600 mt-2 pb-1">_________________________</div>
                  </div>
                  <div>
                    <span className="opacity-60 text-xs">CID No:</span>
                    <div className="border-b border-dotted border-gray-400 dark:border-gray-600 mt-2 pb-1">_________________________</div>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-6 border-t border-[#E5E7EB] dark:border-[#333] text-center">
                <p className="text-[9px] text-[#9CA3AF] dark:text-gray-600 uppercase tracking-wide">
                  Vehicle Sale and Transfer Agreement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Printable Component */}
      <PrintableDeed data={data} />
    </section>
  );
}
