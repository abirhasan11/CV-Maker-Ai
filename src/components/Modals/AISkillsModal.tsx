import React, { useState, useEffect } from 'react';
import { Sparkles, X, Loader2, Plus, Check } from 'lucide-react';
import { SkillCategory, UILanguage } from '../../types';

interface AISkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  currentSkills: SkillCategory[];
  onAddSkills: (newCategories: SkillCategory[]) => void;
  lang: UILanguage;
}

export const AISkillsModal: React.FC<AISkillsModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
  currentSkills,
  onAddSkills,
  lang,
}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ name: string; skills: string[] }[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Record<string, string[]>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && categories.length === 0 && !loading) {
      handleSuggest();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSuggest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/suggest-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: jobTitle || 'Aspiring SQA Professional',
          existingSkills: currentSkills.flatMap((s) => s.items),
          language: lang,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to suggest skills');
      }

      setCategories(data.categories || []);
      // Pre-select all by default for convenience
      const initialMap: Record<string, string[]> = {};
      (data.categories || []).forEach((cat: any) => {
        initialMap[cat.name] = [...cat.skills];
      });
      setSelectedSkills(initialMap);
    } catch (err: any) {
      setError(err.message || 'Error suggesting skills');
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (catName: string, skill: string) => {
    const list = selectedSkills[catName] || [];
    if (list.includes(skill)) {
      setSelectedSkills({
        ...selectedSkills,
        [catName]: list.filter((s) => s !== skill),
      });
    } else {
      setSelectedSkills({
        ...selectedSkills,
        [catName]: [...list, skill],
      });
    }
  };

  const handleApply = () => {
    const entries = Object.entries(selectedSkills) as [string, string[]][];
    const newCategories: SkillCategory[] = entries
      .filter(([_, items]) => items.length > 0)
      .map(([name, items]) => ({
        category: name,
        items,
      }));

    onAddSkills(newCategories);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs modal-overlay animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden space-y-0 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-white" />
            <h3 className="font-bold text-sm">
              {lang === 'bn' ? 'এআই স্কিলস সাজেশন' : 'AI Industry Skill Suggestions'}
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
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="py-12 text-center space-y-2">
              <Loader2 className="w-7 h-7 text-amber-600 animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-medium">Finding top matching industry skills...</p>
            </div>
          ) : error ? (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {error}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Click on the skills you would like to append to your resume:
              </p>

              {categories.map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-bold text-xs text-slate-800">{cat.name}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => {
                      const isSelected = (selectedSkills[cat.name] || []).includes(skill);
                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => toggleSkill(cat.name, skill)}
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-600 text-white shadow-2xs font-semibold'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <span>{skill}</span>
                          {isSelected ? <Check className="w-3 h-3 ml-1" /> : <Plus className="w-3 h-3 ml-1 text-slate-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleSuggest}
            disabled={loading}
            className="text-xs font-medium text-amber-700 hover:underline"
          >
            Refresh Suggestions
          </button>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={loading}
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
            >
              Add Selected Skills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
