import jsPDF from 'jspdf';
import type { DeedData } from '@/types';

export function generateSaleDeedPDF(data: DeedData): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let y = 15;

  // Helper functions
  const addCenteredText = (text: string, yPos: number, size: number = 10, bold: boolean = false) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (pageWidth - textWidth) / 2, yPos);
  };

  const addWrappedText = (text: string, yPos: number, maxWidth: number, size: number = 9, font: string = 'times', xPos: number = margin) => {
    doc.setFontSize(size);
    doc.setFont(font, 'normal');
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, xPos, yPos);
    return lines.length * (size / 2 + 1);
  };

  // Title
  addCenteredText('SALE DEED', y, 14, true);
  y += 3;
  doc.setLineWidth(0.8);
  doc.line(pageWidth / 2 - 15, y, pageWidth / 2 + 15, y);
  y += 10;

  // Date
  const dateStr = new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  doc.setFontSize(9);
  doc.setFont('times', 'normal');
  const dateText = `Date: ${dateStr}`;
  doc.text(dateText, pageWidth - margin - doc.getTextWidth(dateText), y);
  y += 8;

  // Introduction
  doc.setFont('times', 'normal');
  const introText = `THIS VEHICLE SALE AND TRANSFER AGREEMENT (the "Agreement") is made this ${dateStr} by and between the following parties:`;
  y += addWrappedText(introText, y, contentWidth, 9, 'times') + 5;

  // Seller Details
  doc.setFont('times', 'bold');
  doc.text('I. THE SELLER:', margin, y);
  y += 4;
  const sellerText = `${data.seller.title} ${data.seller.fullName}, holder of Citizenship Identity Card (CID) No. ${data.seller.cidNumber}, resident of ${data.seller.gewog}, ${data.seller.dzongkhag}, Bhutan.`;
  y += addWrappedText(sellerText, y, contentWidth, 9, 'times') + 4;

  // Buyer Details
  doc.setFont('times', 'bold');
  doc.text('II. THE BUYER:', margin, y);
  y += 4;
  const buyerText = `${data.buyer.title} ${data.buyer.fullName}, holder of Citizenship Identity Card (CID) No. ${data.buyer.cidNumber}, resident of ${data.buyer.gewog}, ${data.buyer.dzongkhag}, Bhutan.`;
  y += addWrappedText(buyerText, y, contentWidth, 9, 'times') + 5;

  // Subject
  doc.setFont('times', 'bold');
  doc.text('III. SUBJECT OF AGREEMENT', margin, y);
  y += 4;
  const subjectText = `The Seller hereby agrees to sell and the Buyer hereby agrees to purchase the following vehicle (the "Vehicle") subject to the terms and conditions set forth herein:`;
  y += addWrappedText(subjectText, y, contentWidth, 9, 'times') + 4;

  // Vehicle Details Box
  doc.setDrawColor(200);
  doc.setFillColor(249, 250, 251);
  doc.rect(margin, y - 3, contentWidth, 24, 'F');
  doc.rect(margin, y - 3, contentWidth, 24, 'S');

  doc.setFontSize(8);
  doc.setFont('times', 'bold');
  doc.text('VEHICLE DESCRIPTION', margin + 3, y + 1);
  y += 6;

  doc.setFont('times', 'normal');
  doc.text(`Model & Year: ${data.vehicle.model}`, margin + 3, y);
  doc.text(`Registration Number: ${data.vehicle.registrationNumber}`, pageWidth / 2 + 3, y);
  y += 6;
  doc.text(`Chassis Number: ${data.vehicle.chassisNumber}`, margin + 3, y);
  doc.text(`Engine Number: ${data.vehicle.engineNumber}`, pageWidth / 2 + 3, y);
  y += 12;

  // Consideration
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.text('IV. CONSIDERATION', margin, y);
  y += 4;
  const priceWords = numberToWords(parseInt(data.sale.price));
  const considerationText = `The total consideration for the sale of the Vehicle is Nu. ${parseInt(data.sale.price).toLocaleString()} (Ngultrum ${priceWords} only), which has been paid/settled by the Buyer to the Seller.`;
  y += addWrappedText(considerationText, y, contentWidth, 9, 'times') + 4;

  // Covenants
  doc.setFont('times', 'bold');
  doc.text('V. TERMS AND COVENANTS', margin, y);
  y += 4;
  const covenants = [
    '5.1 The Seller warrants that they are the sole lawful owner of the Vehicle and that the Vehicle is free from all encumbrances, liens, or legal encumbrances.',
    '5.2 The Buyer acknowledges having inspected the Vehicle and accepts the same in its current condition ("AS-IS").',
    '5.3 The transfer of ownership shall be completed within 15 (fifteen) business days of this Agreement.'
  ];

  for (const cov of covenants) {
    y += addWrappedText(cov, y, contentWidth, 8.5, 'times') + 2;
  }
  y += 5;

  // Witness Box
  doc.setFillColor(243, 244, 246);
  doc.rect(margin, y - 3, contentWidth, 16, 'F');
  doc.rect(margin, y - 3, contentWidth, 16, 'S');
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.text('VI. WITNESS CERTIFICATION', margin + 3, y + 1);
  y += 5;
  const witnessText = `I, ${data.witness.title} ${data.witness.fullName} (CID: ${data.witness.cidNumber}), do hereby solemnly affirm that this Agreement was executed in my presence by the aforementioned parties.`;
  doc.setFont('times', 'italic');
  y += addWrappedText(witnessText, y + 1, contentWidth - 6, 8.5, 'times', margin + 3) + 6;

  // Signatures
  // Compact signature section
  if (y > 260) {
    doc.addPage();
    y = 20;
  }

  const sigWidth = (contentWidth - 10) / 3;

  // Stamp box for Seller
  doc.rect(margin, y, sigWidth, 20);
  doc.setFontSize(7);
  doc.setFont('times', 'normal');
  doc.text('AFFIX LEGAL', margin + sigWidth / 2, y + 8, { align: 'center' });
  doc.text('STAMP', margin + sigWidth / 2, y + 12, { align: 'center' });

  // Signature lines
  doc.line(margin + sigWidth + 5, y + 20, margin + 2 * sigWidth + 5, y + 20);
  doc.line(margin + 2 * (sigWidth + 5), y + 20, pageWidth - margin, y + 20);

  y += 24;
  doc.setFont('times', 'bold');
  doc.setFontSize(8);
  doc.text('SELLER', margin + sigWidth / 2, y, { align: 'center' });
  doc.text('BUYER', margin + sigWidth + 5 + sigWidth / 2, y, { align: 'center' });
  doc.text('WITNESS', margin + 2 * (sigWidth + 5) + sigWidth / 2, y, { align: 'center' });

  // Footer at bottom
  y = doc.internal.pageSize.getHeight() - 10;
  doc.setFontSize(7);
  doc.setFont('times', 'normal');
  doc.text('Vehicle Sale and Transfer Agreement', pageWidth / 2, y, { align: 'center' });

  return doc;
}

// Helper function to convert numbers to words
function numberToWords(num: number): string {
  if (num === 0) return 'zero';

  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  const convertLessThanThousand = (n: number): string => {
    if (n === 0) return '';
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) {
      return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    }
    return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 !== 0 ? ' and ' + convertLessThanThousand(n % 100) : '');
  };

  const convert = (n: number): string => {
    if (n === 0) return '';
    if (n < 1000) return convertLessThanThousand(n);
    if (n < 100000) {
      return convertLessThanThousand(Math.floor(n / 1000)) + ' thousand' + (n % 1000 !== 0 ? ' ' + convertLessThanThousand(n % 1000) : '');
    }
    if (n < 10000000) {
      return convertLessThanThousand(Math.floor(n / 100000)) + ' lakh' + (n % 100000 !== 0 ? ' ' + convert(n % 100000) : '');
    }
    return convertLessThanThousand(Math.floor(n / 10000000)) + ' crore' + (n % 10000000 !== 0 ? ' ' + convert(n % 10000000) : '');
  };

  return convert(num);
}

export function downloadPDF(data: DeedData): void {
  const doc = generateSaleDeedPDF(data);
  const fileName = `Vehicle_Sale_Deed_${data.vehicle.registrationNumber || 'Document'}.pdf`;
  doc.save(fileName);
}
