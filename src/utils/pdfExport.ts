import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { formatHref } from './linkHelpers';

export interface PDFExportOptions {
  fileName?: string;
  onProgress?: (progress: number, statusText: string) => void;
}

interface PDFLinkEntry {
  url: string;
  xMm: number;
  yMm: number;
  wMm: number;
  hMm: number;
}

/**
 * Direct PDF Download: Converts the element into a high-DPI PDF document,
 * scans and embeds standard PDF link annotations for full mobile and desktop interactivity,
 * and immediately triggers browser file download.
 */
export async function downloadDirectPDF(
  elementId: string = 'resume-printable-area',
  options: PDFExportOptions = {}
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id #${elementId} not found`);
    return false;
  }

  const { fileName = 'ABIR_HASAN_SQA_Resume.pdf', onProgress } = options;

  try {
    if (onProgress) onProgress(10, 'Preparing document canvas...');

    // Clone element to an offscreen container to avoid preview zoom/transform interference
    const clone = element.cloneNode(true) as HTMLElement;
    clone.id = 'resume-print-clone';
    clone.style.position = 'fixed';
    clone.style.top = '0';
    clone.style.left = '-10000px';
    clone.style.width = '794px'; // 210mm standard A4 width at 96 DPI
    clone.style.minHeight = '1123px'; // 297mm standard A4 height at 96 DPI
    clone.style.transform = 'none';
    clone.style.margin = '0';
    clone.style.padding = '0';
    clone.style.boxShadow = 'none';
    clone.style.zIndex = '-9999';
    clone.style.backgroundColor = '#ffffff';

    document.body.appendChild(clone);

    // Wait a brief tick for images and fonts to initialize in the cloned DOM tree
    await new Promise((resolve) => setTimeout(resolve, 180));

    if (onProgress) onProgress(30, 'Extracting interactive links (LinkedIn, GitHub, Email)...');

    // Extract all link coordinates from the DOM tree before removing the clone
    const cloneRect = clone.getBoundingClientRect();
    const pdfWidth = 210; // mm
    const pdfHeight = 297; // mm
    const pxToMm = pdfWidth / (clone.offsetWidth || 794);

    const collectedLinks: PDFLinkEntry[] = [];
    const processedElements = new Set<HTMLElement>();

    // 1. Scan all <a> elements and elements with custom data-href attributes
    const linkElements = clone.querySelectorAll<HTMLElement>('a[href], [data-href], [data-pdf-href]');
    linkElements.forEach((el) => {
      processedElements.add(el);
      const rawHref = el.getAttribute('href') || el.getAttribute('data-href') || el.getAttribute('data-pdf-href') || '';
      const formatted = formatHref(rawHref);
      if (!formatted || formatted === '#') return;

      const rect = el.getBoundingClientRect();
      const relX = rect.left - cloneRect.left;
      const relY = rect.top - cloneRect.top;
      const widthPx = rect.width;
      const heightPx = rect.height;

      if (widthPx <= 0 || heightPx <= 0) return;

      const xMm = relX * pxToMm;
      const yMm = relY * pxToMm;
      // Extra touch margin for comfortable mobile finger tapping (minimum 6mm wide, 4.5mm high)
      const wMm = Math.max(widthPx * pxToMm, 6);
      const hMm = Math.max(heightPx * pxToMm, 4.5);

      collectedLinks.push({
        url: formatted,
        xMm,
        yMm,
        wMm,
        hMm,
      });
    });

    // 2. Scan leaf elements for raw URLs or handles (e.g. linkedin.com, github.com, emails) if not inside <a>
    const textNodes = clone.querySelectorAll<HTMLElement>('span, p, div');
    textNodes.forEach((node) => {
      if (processedElements.has(node) || node.closest('a')) return;
      if (node.children.length > 0) return; // Only check direct leaf text elements

      const text = (node.textContent || '').trim();
      if (!text) return;

      let detectedUrl: string | null = null;
      if (text.includes('linkedin.com/')) {
        detectedUrl = formatHref(text, 'linkedin');
      } else if (text.includes('github.com/')) {
        detectedUrl = formatHref(text, 'github');
      } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        detectedUrl = formatHref(text, 'email');
      }

      if (detectedUrl) {
        const rect = node.getBoundingClientRect();
        const relX = rect.left - cloneRect.left;
        const relY = rect.top - cloneRect.top;
        if (rect.width > 0 && rect.height > 0) {
          collectedLinks.push({
            url: detectedUrl,
            xMm: relX * pxToMm,
            yMm: relY * pxToMm,
            wMm: Math.max(rect.width * pxToMm, 6),
            hMm: Math.max(rect.height * pxToMm, 4.5),
          });
        }
      }
    });

    // Render high quality canvas
    if (onProgress) onProgress(50, 'Rendering high-resolution vector snapshot (300 DPI)...');

    const canvas = await html2canvas(clone, {
      scale: 2, // Ultra crisp print quality
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      windowWidth: 794,
      imageTimeout: 15000,
    });

    // Cleanup offscreen clone
    if (clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }

    if (onProgress) onProgress(75, 'Formatting standard A4 PDF & embedding interactive links...');

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Handle multi-page if resume content overflows A4
    while (heightLeft > 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    // Embed real PDF Link Annotations into the PDF document pages
    const totalPages = pdf.getNumberOfPages();
    collectedLinks.forEach((link) => {
      const pageIndex = Math.floor(link.yMm / pdfHeight);
      const pageNumber = pageIndex + 1;
      const pageYMm = link.yMm - pageIndex * pdfHeight;

      if (pageNumber <= totalPages) {
        pdf.setPage(pageNumber);

        // Keep coordinates safely within page boundaries
        const boundedX = Math.max(0, Math.min(link.xMm, pdfWidth - 2));
        const boundedY = Math.max(0, Math.min(pageYMm, pdfHeight - 2));
        const boundedW = Math.min(link.wMm, pdfWidth - boundedX);
        const boundedH = Math.min(link.hMm, pdfHeight - boundedY);

        // This creates an interactive /Type /Annot /Subtype /Link in the PDF stream,
        // which works seamlessly across all mobile PDF readers (iOS/Android) and desktop apps!
        pdf.link(boundedX, boundedY, boundedW, boundedH, { url: link.url });
      }
    });

    if (onProgress) onProgress(95, 'Finalizing download...');
    pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);

    if (onProgress) onProgress(100, 'Download complete!');
    return true;
  } catch (error) {
    console.error('Direct PDF export error:', error);
    // Cleanup any lingering clone in case of error
    const lingeringClone = document.getElementById('resume-print-clone');
    if (lingeringClone && lingeringClone.parentNode) {
      lingeringClone.parentNode.removeChild(lingeringClone);
    }
    return false;
  }
}

/**
 * Opens resume in a clean standalone window with direct print trigger
 * to completely bypass iframe restrictions.
 */
export function openPrintWindow(elementId: string = 'resume-printable-area') {
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  const printWindow = window.open('', '_blank', 'width=900,height=1000');
  if (!printWindow) {
    // If popup is blocked, fallback to window.print()
    window.print();
    return;
  }

  // Get all styles from current page
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((el) => el.outerHTML)
    .join('\n');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Resume</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${styles}
        <style>
          @page {
            size: A4 portrait;
            margin: 0;
          }
          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          #resume-wrapper {
            width: 210mm;
            min-height: 297mm;
            background: white;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #resume-wrapper * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print-toolbar {
            position: fixed;
            top: 10px;
            right: 10px;
            background: #1e293b;
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-family: sans-serif;
            font-size: 13px;
            font-weight: bold;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
          @media print {
            .no-print-toolbar {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <button class="no-print-toolbar" onclick="window.print()">🖨️ Click to Print / Save PDF</button>
        <div id="resume-wrapper">
          ${element.outerHTML}
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 600);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

/**
 * Downloads standalone HTML file of the resume
 */
export function downloadStandaloneHTML(elementId: string = 'resume-printable-area', fileName: string = 'Resume.html') {
  const element = document.getElementById(elementId);
  if (!element) return;

  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((el) => el.outerHTML)
    .join('\n');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${fileName.replace('.html', '')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${styles}
        <style>
          @page { size: A4 portrait; margin: 0; }
          body { margin: 0; padding: 20px; display: flex; justify-content: center; background: #f1f5f9; font-family: system-ui, sans-serif; }
          .container { width: 210mm; min-height: 297mm; background: #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
          @media print {
            body { padding: 0; background: #ffffff; }
            .container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${element.outerHTML}
        </div>
      </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
