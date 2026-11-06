import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import { PaperSize } from '../types/cv';

interface ExportOptions {
  element: HTMLElement;
  fileName?: string;
  paperSize?: PaperSize;
}

function sanitizeFileName(name?: string): string {
  if (!name || !name.trim()) return 'CVCraft_Resume';
  return name.trim().replace(/[^a-zA-Z0-9_-]/g, '_');
}

export function fireSuccessConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#14B8A6', '#F59E0B', '#6366F1'],
    });
  } catch (e) {
    // Ignore if canvas confetti isn't available
  }
}

/**
 * High-quality PDF export supporting multiple pages and custom paper dimensions
 */
export async function downloadCVAsPDF({
  element,
  fileName = 'Resume',
  paperSize = 'a4',
}: ExportOptions): Promise<void> {
  const safeName = sanitizeFileName(fileName);

  // Capture canvas with high resolution scale
  const canvas = await html2canvas(element, {
    scale: 2.2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);

  // Standard dimensions in millimeters
  const isA4 = paperSize === 'a4';
  const pdfWidth = isA4 ? 210 : 215.9; // mm
  const pdfHeight = isA4 ? 297 : 279.4; // mm

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: isA4 ? 'a4' : 'letter',
  });

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
  heightLeft -= pdfHeight;

  // Add subsequent pages if CV content exceeds one page
  while (heightLeft > 5) {
    position = -(imgHeight - heightLeft);
    doc.addPage(isA4 ? 'a4' : 'letter', 'portrait');
    doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;
  }

  doc.save(`${safeName}.pdf`);
  fireSuccessConfetti();
}

/**
 * High-resolution PNG export
 */
export async function downloadCVAsPNG({
  element,
  fileName = 'Resume',
}: ExportOptions): Promise<void> {
  const safeName = sanitizeFileName(fileName);

  const canvas = await html2canvas(element, {
    scale: 2.5,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const link = document.createElement('a');
  link.download = `${safeName}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  fireSuccessConfetti();
}

/**
 * High-resolution JPG export
 */
export async function downloadCVAsJPG({
  element,
  fileName = 'Resume',
}: ExportOptions): Promise<void> {
  const safeName = sanitizeFileName(fileName);

  const canvas = await html2canvas(element, {
    scale: 2.5,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const link = document.createElement('a');
  link.download = `${safeName}.jpg`;
  link.href = canvas.toDataURL('image/jpeg', 0.95);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  fireSuccessConfetti();
}
