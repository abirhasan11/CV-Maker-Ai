import React, { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  X, 
  Loader2, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { ResumeData, UILanguage } from '../../types';

interface ATSReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  lang: UILanguage;
}

export const ATSReviewModal: React.FC<ATSReviewModalProps> = ({
  isOpen,
  onClose,
  resume,
  lang,
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !review && !loading) {
      handleAnalyze();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/review-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: resume,
          targetJobDescription: jobDescription,
          language: lang,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to review resume');
      }

      setReview(data.review);
    } catch (err: any) {
      setError(err.message || 'Error running ATS analysis');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 border-emerald-500 bg-emerald-50';
    if (score >= 70) return 'text-blue-600 border-blue-500 bg-blue-50';
    return 'text-amber-600 border-amber-500 bg-amber-50';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs modal-overlay animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden space-y-0 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">
                {lang === 'bn' ? 'এটিএস স্কোর ও সিভি অডিট' : 'ATS Resume Score & Audit'}
              </h3>
              <p className="text-xs text-white/80">
                {lang === 'bn' ? 'স্বয়ংক্রিয় নিয়োগ যাচাই ও রিভিউর পরামর্শ' : 'Instant hiring manager feedback and keyword analysis'}
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
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Optional Job Description Input */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              {lang === 'bn' 
                ? 'টার্গেট জবের বিবরণ (Job Description) পেস্ট করুন (ঐচ্ছিক)'
                : 'Target Job Description / Requirements (Optional)'}
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="e.g. Senior React Engineer at Stripe, requires 4+ yrs React, TypeScript, Kafka..."
                className="flex-1 px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-teal-500"
              />
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Re-Analyze
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
              <p className="text-xs font-medium text-slate-600">
                {lang === 'bn' ? 'সিভি ও স্কিলস গভীরভাবে বিশ্লেষণ করা হচ্ছে...' : 'Analyzing keywords, quantifiable metrics, and ATS compatibility...'}
              </p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {error}
            </div>
          ) : review ? (
            <div className="space-y-5">
              {/* ATS Score Meter */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-extrabold ${getScoreColor(review.atsScore || 85)}`}>
                    <span className="text-xl leading-none">{review.atsScore || 85}</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold">/ 100</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {review.atsScore >= 80 ? 'Excellent Match!' : 'Good with Opportunities'}
                    </h4>
                    <p className="text-xs text-slate-600 max-w-sm mt-0.5 leading-relaxed">
                      {review.overallVerdict}
                    </p>
                  </div>
                </div>

                {review.scoreBreakdown && (
                  <div className="grid grid-cols-2 gap-2 text-[11px] w-full sm:w-auto">
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block">Impact & Metrics</span>
                      <span className="font-bold text-slate-800">{review.scoreBreakdown.impactAndMetrics}%</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block">Keywords</span>
                      <span className="font-bold text-slate-800">{review.scoreBreakdown.keywordOptimization}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Strengths */}
              {review.strengths && review.strengths.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'bn' ? 'প্রধান শক্তিমত্তা (Strengths)' : 'Key Strengths'}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {review.strengths.map((str: string, sIdx: number) => (
                      <li key={sIdx} className="flex items-start space-x-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing Keywords */}
              {review.missingKeywords && review.missingKeywords.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                    <Tag className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{lang === 'bn' ? 'প্রস্তাবিত এটিএস কি-ওয়ার্ড (Recommended Keywords)' : 'Recommended ATS Keywords'}</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {review.missingKeywords.map((kw: string, kIdx: number) => (
                      <span
                        key={kIdx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actionable Improvements */}
              {review.improvements && review.improvements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'bn' ? 'উন্নতির পরামর্শ (Action Items)' : 'Actionable Recommendations'}</span>
                  </h4>
                  <div className="space-y-2">
                    {review.improvements.map((imp: any, iIdx: number) => (
                      <div key={iIdx} className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs space-y-1">
                        <div className="font-bold text-amber-900">{imp.section}: {imp.issue}</div>
                        <div className="text-amber-800 leading-relaxed">{imp.recommendation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
