import React, { useState, useEffect } from 'react';
import { Sparkles, X, Loader2, ArrowRight } from 'lucide-react';
import { UILanguage } from '../../types';

interface AIBulletModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawBullet: string;
  jobTitle: string;
  company: string;
  onApplyBullet: (improvedBullet: string) => void;
  lang: UILanguage;
}

export const AIBulletModal: React.FC<AIBulletModalProps> = ({
  isOpen,
  onClose,
  rawBullet,
  jobTitle,
  company,
  onApplyBullet,
  lang,
}) => {
  const [inputBullet, setInputBullet] = useState(rawBullet);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{ title: string; bullet: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInputBullet(rawBullet);
    setSuggestions([]);
  }, [rawBullet, isOpen]);

  if (!isOpen) return null;

  const handleEnhance = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawBullet: inputBullet,
          jobTitle,
          company,
          language: lang,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to enhance bullet point');
      }

      setSuggestions(data.suggestions || []);
    } catch (err: any) {
      setError(err.message || 'Error enhancing bullet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs modal-overlay animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden space-y-0 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-white" />
            <h3 className="font-bold text-sm">
              {lang === 'bn' ? 'এআই বুলেট পয়েন্ট অপ্টিমাইজার' : 'AI Resume Bullet Enhancer'}
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

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Rough note / Draft experience line:
            </label>
            <textarea
              rows={2}
              value={inputBullet}
              onChange={(e) => setInputBullet(e.target.value)}
              placeholder="e.g. Worked on frontend development with React and fixed bugs"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleEnhance}
              disabled={loading || !inputBullet.trim()}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Enhancing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rewrite with Action Verbs & Metrics</span>
                </>
              )}
            </button>
          </div>

          {/* Suggestions list */}
          {suggestions.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-700">Choose improved version:</span>
              {suggestions.map((sug, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-teal-50/40 hover:border-teal-200 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                      {sug.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onApplyBullet(sug.bullet);
                        onClose();
                      }}
                      className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">• {sug.bullet}</p>
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
