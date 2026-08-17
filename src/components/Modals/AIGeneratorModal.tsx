import React, { useState } from 'react';
import { Sparkles, X, Loader2, Wand2, CheckCircle2, ArrowRight } from 'lucide-react';
import { ResumeData, UILanguage } from '../../types';
import { getTranslation } from '../../data/translations';

interface AIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyResume: (newResume: ResumeData) => void;
  lang: UILanguage;
}

export const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({
  isOpen,
  onClose,
  onApplyResume,
  lang,
}) => {
  const t = getTranslation(lang);
  const [targetRole, setTargetRole] = useState('Full Stack Software Engineer');
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level (2-5 Years)');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickRoles = [
    'Full Stack Software Engineer',
    'Frontend Developer (React)',
    'Digital Marketing Specialist',
    'Data Analyst / Scientist',
    'UI/UX Designer',
    'Fresh Graduate / Entry Level',
    'Customer Success & Sales Executive',
    'DevOps / Cloud Engineer',
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-full-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole,
          experienceLevel,
          prompt: customPrompt,
          language: lang,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate resume');
      }

      onApplyResume(data.resume);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong while generating with AI.');
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
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">
                {lang === 'bn' ? 'এআই দিয়ে সম্পূর্ণ সিভি তৈরি করুন' : 'AI Resume Generator'}
              </h3>
              <p className="text-xs text-white/80">
                {lang === 'bn' ? 'আপনার রোল ও অভিজ্ঞতার ভিত্তিতে স্বয়ংক্রিয় প্রফেশনাল সিভি' : 'Powered by Gemini 3.7 Flash'}
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

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Target Role */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {lang === 'bn' ? 'টার্গেট পদবী / পেশা (Target Role)' : 'Target Role / Job Title'}
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Software Engineer / Growth Marketer"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            {/* Quick role suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {quickRoles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setTargetRole(role)}
                  className={`text-[11px] px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                    targetRole === role
                      ? 'bg-blue-600 text-white font-medium'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {lang === 'bn' ? 'অভিজ্ঞতার পর্যায়' : 'Experience Level'}
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Entry-Level / Fresher (0-1 Years)">Fresh Graduate / Entry-Level (০-১ বছর)</option>
              <option value="Junior (1-3 Years)">Junior (১-৩ বছর)</option>
              <option value="Mid-Level (3-5 Years)">Mid-Level (৩-৫ বছর)</option>
              <option value="Senior (5-8+ Years)">Senior (৫-৮+ বছর)</option>
              <option value="Lead / Executive (8+ Years)">Lead / Executive (৮+ বছর)</option>
            </select>
          </div>

          {/* Custom Prompt or Special Details */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {lang === 'bn' ? 'বিশেষ দক্ষতা বা বিস্তারিত তথ্য (ঐচ্ছিক)' : 'Additional details, skills or achievements (Optional)'}
            </label>
            <textarea
              rows={3}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={lang === 'bn' ? 'যেমন: React, Next.js, Node.js নিয়ে কাজ করার অভিজ্ঞতা এবং ২০+ সফল প্রজেক্ট...' : 'e.g., Specialized in TypeScript, PostgreSQL, microservices, reduced API latency by 40%...'}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 leading-relaxed"
            />
          </div>

          <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 flex items-start space-x-2 text-[11px] text-blue-900">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              {lang === 'bn' 
                ? 'এআই আপনার জন্য একটি সম্পূর্ণ সাজানো সিভি তৈরি করবে যা আপনি পরবর্তীতে যেকোনো সময় পরিবর্তন বা এডিট করতে পারবেন।'
                : 'AI will generate a tailored, ATS-compliant CV structure including summary, quantified experience bullets, skills, and project highlights.'}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !targetRole.trim()}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{lang === 'bn' ? 'তৈরি করা হচ্ছে...' : 'Generating Resume...'}</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'সিভি তৈরি করুন' : 'Generate Full CV'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
