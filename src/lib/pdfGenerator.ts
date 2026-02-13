import jsPDF from 'jspdf';
import type { DeedData } from '@/types';
import { numberToWords } from '@/utils/numberToWords';

export function generateSaleDeedPDF(data: DeedData): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20; // Slightly larger margin for formal look
  const contentWidth = pageWidth - 2 * margin;
  let y = 20;

  // Helper for text wrapping
  const addWrappedText = (text: string, yPos: number, fontSize: number = 10, font: string = 'times', fontStyle: string = 'normal', align: 'left' | 'center' | 'right' | 'justify' = 'justify') => {
    doc.setFontSize(fontSize);
    doc.setFont(font, fontStyle);

    if (align === 'center') {
      doc.text(text, pageWidth / 2, yPos, { align: 'center', maxWidth: contentWidth });
      // Calculate height approximation since splitTextToSize isn't used for center directly usually
      // But for single lines it's fine. For multi-line center, we might need more logic
      return 6;
    }

    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, yPos, { align: align === 'justify' ? 'justify' : 'left', maxWidth: contentWidth });
    const lineHeight = fontSize * 0.5; // Approx ratio
    return lines.length * lineHeight + 2;
  };

  // --- Header ---
  doc.setFontSize(16);
  doc.setFont('times', 'bold');
  doc.text('SALE DEED', pageWidth / 2, y, { align: 'center' });
  y += 2;
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 15, y, pageWidth / 2 + 15, y); // Underline
  y += 10;

  // --- Date ---
  const dateStr = new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.setFontSize(10);
  doc.setFont('times', 'normal');
  doc.text(`Date: ${dateStr}`, pageWidth - margin, y, { align: 'right' });
  y += 10;

  // --- Narrative Body ---
  // Construct the full narrative text from PrintableDeed.tsx
  const priceWords = numberToWords(parseInt(data.sale.price) || 0);

  const narrative = `I, ${data.seller.title} ${data.seller.fullName}, holding CID No. ${data.seller.cidNumber} from ${data.seller.gewog}, ${data.seller.dzongkhag}, hereby undersigned, hereby apply for the sale deed of the following vehicle model ${data.vehicle.model} with vehicle registration number ${data.vehicle.registrationNumber} to here buyer ${data.buyer.title} ${data.buyer.fullName} holding CID No. ${data.buyer.cidNumber} of ${data.buyer.gewog} (Gewog), ${data.buyer.dzongkhag} (Dzongkhag). The above-mentioned vehicle Chassis No. ${data.vehicle.chassisNumber} and Engine number ${data.vehicle.engineNumber} simultaneously. I agree to sell the above-mentioned vehicle to you for the sum of Nu. ${parseInt(data.sale.price).toLocaleString()} (${priceWords} only).`;

  y += addWrappedText(narrative, y, 10, 'times', 'normal', 'justify');
  y += 5;

  // --- Covenants (Numbered List) ---
  const covenants = [
    { num: '1.', text: 'Ownership transfer shall be completed by the buyer within fifteen (15) days from the date of this agreement.' },
    { num: '2.', text: 'There is no outstanding loan or any legal issue related to the vehicle mentioned above.' },
    { num: '3.', text: 'The transaction has been carried out mutually and willingly by both parties at an agreed price.' },
    { num: '4.', text: 'The vehicle has been sold on a non-refundable basis, and the full risk and responsibility is transferred to the buyer from the day of execution.' },
    { num: '5.', text: 'At the time of signing this agreement, both parties are mentally sound and not under the influence of alcohol.' },
    { num: '6.', text: 'Any breach of this agreement shall be dealt with in accordance with the laws of the Kingdom of Bhutan.' }
  ];

  doc.setFontSize(10);
  doc.setFont('times', 'normal');

  covenants.forEach(item => {
    // Draw number
    doc.text(item.num, margin + 2, y);

    // Draw text with hanging indent
    const wrappedText = doc.splitTextToSize(item.text, contentWidth - 12);
    doc.text(wrappedText, margin + 12, y, { align: 'justify', maxWidth: contentWidth - 12 });

    y += (wrappedText.length * 5) + 3; // Line height + spacing
  });

  y += 5;

  // --- Closing Request ---
  const closingText = "I request you to kindly process the sale deed accordingly, change the vehicle ownership as per rule of Bhutan Construction and Transport Authority and acknowledge receipt of this application.";
  y += addWrappedText(closingText, y, 10, 'times', 'normal', 'justify');
  y += 10;

  // --- Signatures / Boxes ---
  // We need 4 boxes: Seller, Buyer, Seller Witness, Buyer Witness
  // Check if we need a new page
  if (y > 220) {
    doc.addPage();
    y = 20;
  }

  const boxHeight = 25;
  const boxGap = 5;

  // Helper to draw a party box
  const drawPartyBox = (title: string, name: string, cid: string, yPos: number) => {
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.setFillColor(252, 252, 252); // Very light gray like bg-gray-50
    doc.rect(margin, yPos, contentWidth, boxHeight, 'FD');

    // Title
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.text(title, margin + 5, yPos + 6);

    // Grid for details
    // Column 1: Name
    doc.setFont('times', 'normal');
    doc.setFontSize(9);

    // "Mr./Ms." label
    doc.setTextColor(100); // Gray
    doc.setFontSize(8);
    doc.text('Mr./Ms.', margin + 5, yPos + 13);
    doc.setTextColor(0); // Black
    doc.setFontSize(9);

    // Name value with dotted underline
    doc.text(name, margin + 5, yPos + 19);
    doc.setLineDash([1, 1], 0);
    doc.line(margin + 5, yPos + 20, margin + (contentWidth / 2) - 5, yPos + 20);
    doc.setLineDash([], 0);

    // Column 2: CID
    const col2X = margin + (contentWidth / 2) + 5;

    // "CID No:" label
    doc.setTextColor(100);
    doc.setFontSize(8);
    doc.text('CID No:', col2X, yPos + 13);
    doc.setTextColor(0);
    doc.setFontSize(9);

    // CID value with dotted underline
    doc.text(cid, col2X, yPos + 19);
    doc.setLineDash([1, 1], 0);
    doc.line(col2X, yPos + 20, margin + contentWidth - 5, yPos + 20);
    doc.setLineDash([], 0);
  };

  drawPartyBox('Seller', data.seller.fullName, data.seller.cidNumber, y);
  y += boxHeight + boxGap;

  drawPartyBox('Buyer', data.buyer.fullName, data.buyer.cidNumber, y);
  y += boxHeight + boxGap;

  drawPartyBox('Seller Witness', data.witness.fullName, data.witness.cidNumber, y);
  y += boxHeight + boxGap;

  drawPartyBox('Buyer Witness', '_________________________', '_________________________', y);
  y += boxHeight + boxGap + 10;

  // --- Footer ---
  // Position specifically at bottom
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFontSize(7);
  doc.setTextColor(100);
  doc.text('VEHICLE SALE AND TRANSFER AGREEMENT', pageWidth / 2, footerY, { align: 'center' });

  return doc;
}

export function downloadPDF(data: DeedData): void {
  const doc = generateSaleDeedPDF(data);
  const fileName = `Vehicle_Sale_Deed_${data.vehicle.registrationNumber || 'Document'}.pdf`;
  doc.save(fileName);
}
