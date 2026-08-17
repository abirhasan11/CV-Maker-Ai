import React, { useState } from 'react';
import { 
  Sparkles, 
  FileCheck2, 
  Mail, 
  Printer, 
  Languages, 
  Palette, 
  FileText,
  HelpCircle,
  RotateCcw,
  Check,
  LayoutTemplate,
  Edit3,
  Eye
} from 'lucide-react';
import { ActiveTab, UILanguage } from '../types';
import { getTranslation } from '../data/translations';

export interface NavbarProps {
  lang: UILanguage;
  onToggleLang: () => void;
  onOpenAiGenerator: () => void;
  onOpenAtsScore: () => void;
  onOpenCoverLetter: () => void;
  onPrint: () => void;
  onReset: () => void;
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenAiGenerator,
  onOpenAtsScore,
  onOpenCoverLetter,
  onPrint,
  onReset,
  activeTab,
  onChangeTab,
}) => {
  const t = getTranslation(lang);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & App Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">{t.appTitle}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  AI CV Studio
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {lang === 'bn' ? 'প্রফেশনাল এসকিউএ ও সফটওয়্যার সিভি মেকার' : 'Professional SQA & Tech Resume Builder'}
              </p>
            </div>
          </div>

          {/* Primary View Switcher: Content / Design & Theme / Preview */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs">
            <button
              id="nav-tab-content-btn"
              onClick={() => onChangeTab('content')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'content'
                  ? 'bg-white text-blue-700 shadow-xs font-bold ring-1 ring-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'তথ্য পূরণ' : 'Edit Content'}</span>
            </button>

            <button
              id="nav-tab-design-btn"
              onClick={() => onChangeTab('design')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'design'
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 font-semibold'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ডিজাইন ও থিম (Design)' : 'Design & Themes'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'design' ? 'bg-white/25 text-white' : 'bg-indigo-100 text-indigo-700'
              }`}>
                5
              </span>
            </button>

            <button
              id="nav-tab-preview-btn"
              onClick={() => onChangeTab('preview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer lg:hidden ${
                activeTab === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'প্রিভিউ' : 'Preview'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* AI Generator */}
            <button
              id="ai-generate-modal-btn"
              onClick={onOpenAiGenerator}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
              title="Generate a custom complete CV using Gemini AI"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.aiGenerate}</span>
            </button>

            {/* ATS Score */}
            <button
              id="ats-score-modal-btn"
              onClick={onOpenAtsScore}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              title="Analyze ATS Score and get improvement suggestions"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden lg:inline">{t.atsReview}</span>
            </button>

            {/* Cover Letter */}
            <button
              id="cover-letter-modal-btn"
              onClick={onOpenCoverLetter}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              title="Generate a matching cover letter"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden xl:inline">{t.coverLetter}</span>
            </button>

            {/* Language Switch */}
            <button
              id="switch-lang-btn"
              onClick={onToggleLang}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              title="Toggle Language"
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="font-semibold">{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            {/* Reset */}
            <button
              id="reset-cv-btn"
              onClick={onReset}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Reset to default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Download PDF / Print */}
            <button
              id="download-pdf-btn"
              onClick={onPrint}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
              title="Download high-resolution PDF or Print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.downloadPdf}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </header>
  );
};
