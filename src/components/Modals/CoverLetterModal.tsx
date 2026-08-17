import React, { useState } from 'react';
import { Mail, X, Loader2, Sparkles, Copy, Check, Download, FileText } from 'lucide-react';
import { ResumeData, UILanguage } from '../../types';

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  lang: UILanguage;
}

export const CoverLetterModal: React.FC<CoverLetterModalProps> = ({
  isOpen,
  onClose,
  resume,
  lang,
}) => {
  const [companyName, setCompanyName] = useState('Acme Corporation');
  const [targetRole, setTargetRole] = useState(resume.personalInfo.jobTitle || 'Aspiring SQA Professional');
  const [recipientName, setRecipientName] = useState('Hiring Manager');
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState('confident');
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: resume,
          companyName,
          jobTitle: targetRole,
          recipientName,
          jobDescription,
          tone,
          language: lang,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate cover letter');
      }

      setCoverLetter(data.coverLetter);
    } catch (err: any) {
      setError(err.message || 'Error generating cover letter');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!coverLetter) return;
    const text = coverLetter.fullLetterText || 
      `${coverLetter.salutation}\n\n${coverLetter.openingParagraph}\n\n${coverLetter.bodyParagraphs?.join('\n\n')}\n\n${coverLetter.closingParagraph}\n\n${coverLetter.signOff}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs modal-overlay animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden space-y-0 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">
                {lang === 'bn' ? 'ম্যাচিং কভার লেটার তৈরি করুন' : 'AI Cover Letter Generator'}
              </h3>
              <p className="text-xs text-white/80">
                {lang === 'bn' ? 'আপনার সিভির তথ্যের সাথে সংগতি রেখে কভার লেটার' : 'Tailored to your CV experiences and target company'}
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
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Company</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Google / Microsoft / Pathao"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Lead Software Engineer"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Job Description / Requirements (Optional)</label>
            <textarea
              rows={2}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description keywords to align letter precisely..."
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !companyName.trim() || !targetRole.trim()}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating Cover Letter...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Cover Letter</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Result */}
          {coverLetter && (
            <div className="mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-xs text-slate-800">
                  {coverLetter.subject || 'Application Letter'}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
                </button>
              </div>

              <div className="text-xs text-slate-800 space-y-3 leading-relaxed font-serif bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
                <p className="font-bold">{coverLetter.salutation}</p>
                <p>{coverLetter.openingParagraph}</p>
                {coverLetter.bodyParagraphs?.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
                <p>{coverLetter.closingParagraph}</p>
                <p className="whitespace-pre-line font-medium pt-2">{coverLetter.signOff}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
