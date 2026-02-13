import type { DeedData } from '@/types';
import { numberToWords } from '@/utils/numberToWords';

interface PrintableDeedProps {
    data: DeedData;
}

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export function PrintableDeed({ data }: PrintableDeedProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const priceInWords = numberToWords(parseInt(data.sale.price));

    if (!mounted) return null;

    return createPortal(
        <div className="printable-deed bg-white text-black max-w-full"
            style={{ padding: '5mm' }}>
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">
                    Sale Deed
                </h1>
                <div className="w-24 h-[2px] bg-black mx-auto mb-4"></div>
            </div>

            <div className="text-right mb-6 text-xs">
                <span>Date: {formatDate(data.date)}</span>
            </div>

            <div className="space-y-5 text-[11px] leading-relaxed font-serif text-justify">
                <p className="font-medium">
                    I, <span className="font-bold">{data.seller.title} {data.seller.fullName}</span>, holding CID No. <span className="font-bold underline">{data.seller.cidNumber}</span> from {data.seller.gewog}, {data.seller.dzongkhag}, hereby undersigned, hereby apply for the sale deed of the following vehicle model <span className="font-bold">{data.vehicle.model}</span> with vehicle registration number <span className="font-bold underline">{data.vehicle.registrationNumber}</span> to the buyer <span className="font-bold">{data.buyer.title} {data.buyer.fullName}</span> holding CID No. <span className="font-bold underline">{data.buyer.cidNumber}</span> of {data.buyer.gewog} (Gewog), {data.buyer.dzongkhag} (Dzongkhag). The above-mentioned vehicle Chassis No. <span className="font-bold">{data.vehicle.chassisNumber}</span> and Engine number <span className="font-bold">{data.vehicle.engineNumber}</span> simultaneously. I agree to sell the above-mentioned vehicle to you for the sum of <span className="font-bold underline">Nu. {parseInt(data.sale.price).toLocaleString()}</span> (<span className="capitalize italic">{priceInWords}</span> only).
                </p>

                <div className="space-y-3 pl-4">
                    <div className="flex gap-3">
                        <span className="font-bold min-w-[20px]">1.</span>
                        <p><strong>Ownership transfer</strong> shall be completed by the buyer within fifteen (15) days from the date of this agreement.</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-bold min-w-[20px]">2.</span>
                        <p>There is <strong>no outstanding loan</strong> or any legal issue related to the vehicle mentioned above.</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-bold min-w-[20px]">3.</span>
                        <p>The transaction has been carried out <strong>mutually and willingly</strong> by both parties at an agreed price.</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-bold min-w-[20px]">4.</span>
                        <p>The vehicle has been sold on a <strong>non-refundable basis</strong>, and the full risk and responsibility is transferred to the buyer from the day of execution.</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-bold min-w-[20px]">5.</span>
                        <p>At the time of signing this agreement, <strong>both parties are mentally sound</strong> and <strong>not under the influence of alcohol</strong>.</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-bold min-w-[20px]">6.</span>
                        <p>Any breach of this agreement shall be dealt with in accordance with the <strong>laws of the Kingdom of Bhutan</strong>.</p>
                    </div>
                </div>

                <p className="pt-2">
                    I request you to kindly process the sale deed accordingly, change the vehicle ownership as per rule of Bhutan Construction and Transport Authority and acknowledge receipt of this application.
                </p>

                <div className="border border-black p-4 mt-6 bg-gray-50 print:bg-white">
                    <p className="text-[10px] leading-relaxed mb-4">
                        <strong>Seller</strong>
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-[10px]">
                        <div>
                            <span className="opacity-60">Mr./Ms.</span>
                            <div className="border-b border-dotted border-black mt-1 pb-1">{data.seller.fullName}</div>
                        </div>
                        <div>
                            <span className="opacity-60">CID No:</span>
                            <div className="border-b border-dotted border-black mt-1 pb-1">{data.seller.cidNumber}</div>
                        </div>
                    </div>
                </div>

                <div className="border border-black p-4 mt-4 bg-gray-50 print:bg-white">
                    <p className="text-[10px] leading-relaxed mb-4">
                        <strong>Buyer</strong>
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-[10px]">
                        <div>
                            <span className="opacity-60">Mr./Ms.</span>
                            <div className="border-b border-dotted border-black mt-1 pb-1">{data.buyer.fullName}</div>
                        </div>
                        <div>
                            <span className="opacity-60">CID No:</span>
                            <div className="border-b border-dotted border-black mt-1 pb-1">{data.buyer.cidNumber}</div>
                        </div>
                    </div>
                </div>

                <div className="border border-black p-4 mt-4 bg-gray-50 print:bg-white">
                    <p className="text-[10px] leading-relaxed mb-4">
                        <strong>Seller Witness</strong>
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-[10px]">
                        <div>
                            <span className="opacity-60">Mr./Ms.</span>
                            <div className="border-b border-dotted border-black mt-1 pb-1">{data.witness.fullName}</div>
                        </div>
                        <div>
                            <span className="opacity-60">CID No:</span>
                            <div className="border-b border-dotted border-black mt-1 pb-1">{data.witness.cidNumber}</div>
                        </div>
                    </div>
                </div>

                <div className="border border-black p-4 mt-4 bg-gray-50 print:bg-white">
                    <p className="text-[10px] leading-relaxed mb-4">
                        <strong>Buyer Witness</strong>
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-[10px]">
                        <div>
                            <span className="opacity-60">Mr./Ms.</span>
                            <div className="border-b border-dotted border-black mt-1 pb-1">_________________________</div>
                        </div>
                        <div>
                            <span className="opacity-60">CID No:</span>
                            <div className="border-b border-dotted border-black mt-1 pb-1">_________________________</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-black text-center">
                <p className="text-[8px] uppercase opacity-60 tracking-wide">
                    Vehicle Sale and Transfer Agreement
                </p>
            </div>
        </div >,
        document.body
    );
}
