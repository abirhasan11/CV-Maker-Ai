import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  FileText, 
  X, 
  Check, 
  Loader2, 
  ExternalLink, 
  Sparkles,
  HelpCircle,
  FileCode
} from 'lucide-react';
import { downloadDirectPDF, openPrintWindow, downloadStandaloneHTML } from '../../utils/pdfExport';
import { ResumeData, UILanguage } from '../../types';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  lang: UILanguage;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  resume,
  lang,
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const fileNameBase = (resume.personalInfo.fullName || 'Resume')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_');

  const handleDirectPDF = async () => {
    setIsGeneratingPDF(true);
    setProgress(10);
    setStatusText(lang === 'bn' ? 'সিভি প্রস্তুত করা হচ্ছে...' : 'Initializing high-res PDF engine...');
    setSuccess(false);

    try {
      const ok = await downloadDirectPDF('resume-printable-area', {
        fileName: `${fileNameBase}_SQA_Resume.pdf`,
        onProgress: (p, msg) => {
          setProgress(p);
          setStatusText(msg);
        },
      });

      if (ok) {
        setSuccess(true);
        setTimeout(() => {
          setIsGeneratingPDF(false);
        }, 2000);
      } else {
        setIsGeneratingPDF(false);
        // Fallback to print window
        openPrintWindow('resume-printable-area');
      }
    } catch (e) {
      console.error(e);
      setIsGeneratingPDF(false);
      openPrintWindow('resume-printable-area');
    }
  };

  const handlePrintPopup = () => {
    openPrintWindow('resume-printable-area');
  };

  const handleDownloadHTML = () => {
    downloadStandaloneHTML('resume-printable-area', `${fileNameBase}_Resume.html`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs modal-overlay animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold">
              <Download className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">
                {lang === 'bn' ? 'সিভি ডাউনলোড করুন' : 'Export & Download CV'}
              </h3>
              <p className="text-xs text-white/80">
                {lang === 'bn' ? 'পিডিএফ, প্রিন্ট অথবা এইচটিএমএল ফরম্যাটে সেভ করুন' : 'Choose your preferred export format'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {isGeneratingPDF ? (
            <div className="py-8 px-4 text-center space-y-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                {success ? (
                  <Check className="w-8 h-8 animate-in zoom-in" />
                ) : (
                  <Loader2 className="w-8 h-8 animate-spin" />
                )}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-800">
                  {success
                    ? (lang === 'bn' ? 'পিডিএফ ডাউনলোড সম্পন্ন হয়েছে!' : 'PDF Downloaded Successfully!')
                    : (lang === 'bn' ? 'পিডিএফ তৈরি করা হচ্ছে...' : 'Generating High-Quality PDF...')}
                </h4>
                <p className="text-xs text-slate-600">{statusText}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Option 1: Direct High-Res PDF Download (Recommended) */}
              <button
                type="button"
                onClick={handleDirectPDF}
                className="w-full p-4 rounded-xl border-2 border-emerald-600 bg-emerald-50/60 hover:bg-emerald-100/70 transition-all text-left flex items-start justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-slate-900">
                        {lang === 'bn' ? 'সরাসরি PDF ফাইল ডাউনলোড' : 'Direct Download PDF (.pdf)'}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-600 text-white rounded-full uppercase tracking-wider">
                        {lang === 'bn' ? 'সেরা' : 'Instant'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {lang === 'bn' 
                        ? 'কোনো প্রিন্টার সেটআপ ছাড়াই সরাসরি আপনার ডিভাইসে HD কোয়ালিটি PDF ডাউনলোড হবে।'
                        : 'Downloads an instant 300-DPI crisp A4 PDF directly into your device.'}
                    </p>
                  </div>
                </div>
              </button>

              {/* Option 2: Open in Clean Window & Browser Print */}
              <button
                type="button"
                onClick={handlePrintPopup}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left flex items-start justify-between group cursor-pointer"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">
                      {lang === 'bn' ? 'নতুন উইন্ডোতে ওপেন ও ব্রাউজার প্রিন্ট' : 'Open in New Window & Print'}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang === 'bn' 
                        ? 'আলাদা ট্যাবে ওপেন করে ব্রাউজারের প্রিন্ট ডায়ালগ দিয়ে সেভ করুন।'
                        : 'Bypasses iframe restrictions and opens native print preview.'}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 mt-1" />
              </button>

              {/* Option 3: Download Standalone HTML */}
              <button
                type="button"
                onClick={handleDownloadHTML}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left flex items-start justify-between group cursor-pointer"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <FileCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">
                      {lang === 'bn' ? 'অফলাইন HTML ফাইল ডাউনলোড' : 'Download Standalone HTML (.html)'}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang === 'bn' 
                        ? 'ইন্টারনেট ছাড়াই যেকোনো ব্রাউজারে নিঁখুতভাবে ওপেন ও প্রিন্ট করা যায়।'
                        : 'Self-contained offline document with embedded styles.'}
                    </p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-600 mt-1" />
              </button>

              {/* Helpful Tip about Background Graphics */}
              <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start space-x-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-[11px] leading-relaxed">
                  <p className="font-bold text-amber-950">
                    {lang === 'bn' ? '💡 কালার ও ছবি সহ প্রিন্ট করার টিপস:' : '💡 Tip for Color & Photo Print:'}
                  </p>
                  <p>
                    {lang === 'bn' 
                      ? '১. "সরাসরি PDF ফাইল ডাউনলোড" চাপলে ব্যাকগ্রাউন্ড কালার ও ফটো সহ সরাসরি HD PDF সেভ হবে।' 
                      : '1. "Direct Download PDF" saves all background colors & photo into crisp PDF automatically.'}
                  </p>
                  <p>
                    {lang === 'bn'
                      ? '২. ব্রাউজার প্রিন্ট উইন্ডোতে "More settings" এ গিয়ে "Background graphics" চেকমার্ক অন রাখুন।'
                      : '2. In browser print window, make sure "Background graphics" is checked under More settings.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            A4 Standard (210mm × 297mm)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
