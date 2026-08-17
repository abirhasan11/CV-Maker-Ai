import React, { useState } from 'react';
import { Sparkles, X, Loader2, Check, ArrowRight } from 'lucide-react';
import { ResumeData, UILanguage } from '../../types';

interface AISummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onApplySummary: (summaryText: string) => void;
  lang: UILanguage;
}

export const AISummaryModal: React.FC<AISummaryModalProps> = ({
  isOpen,
  onClose,
  resume,
  onApplySummary,
  lang,
}) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ type: string; text: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/enhance-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentSummary: resume.personalInfo.summary,
          jobTitle: resume.personalInfo.jobTitle,
          experience: resume.experiences.map((e) => `${e.jobTitle} at ${e.company}`),
          skills: resume.skills.flatMap((s) => s.items),
          language: lang,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate summary');
      }

      setOptions(data.options || []);
    } catch (err: any) {
      setError(err.message || 'Error generating summaries');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs modal-overlay animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden space-y-0 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-white" />
            <h3 className="font-bold text-sm">
              {lang === 'bn' ? 'এআই ক্যারিয়ার অবজেক্টিভ রাইটার' : 'AI Career Objective Generator'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {options.length === 0 && !loading && (
            <div className="text-center py-6 space-y-3">
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {lang === 'bn' 
                  ? 'আপনার বর্তমান অভিজ্ঞতা ও দক্ষতার উপর ভিত্তি করে ৩টি আকর্ষণীয় ক্যারিয়ার অবজেক্টিভ তৈরি করা হবে।'
                  : 'Generate 3 high-impact career objective variations tailored to your target role and background.'}
              </p>
              <button
                type="button"
                onClick={handleGenerate}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Generate Objectives
              </button>
            </div>
          )}

          {loading && (
            <div className="py-12 text-center space-y-2">
              <Loader2 className="w-7 h-7 text-indigo-600 animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-medium">Crafting impactful career objectives...</p>
            </div>
          )}

          {options.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Choose a variation:</span>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="text-xs text-indigo-600 hover:underline font-semibold"
                >
                  Regenerate
                </button>
              </div>

              {options.map((opt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-indigo-50/40 hover:border-indigo-200 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                      {opt.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onApplySummary(opt.text);
                        onClose();
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Use this</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed text-justify">
                    {opt.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
