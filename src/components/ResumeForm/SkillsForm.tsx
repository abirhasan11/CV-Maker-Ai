import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  Trash2, 
  X, 
  Sparkles, 
  Tag 
} from 'lucide-react';
import { SkillCategory, UILanguage } from '../../types';
import { getTranslation } from '../../data/translations';

interface SkillsFormProps {
  skills: SkillCategory[];
  onChange: (skills: SkillCategory[]) => void;
  lang: UILanguage;
  onOpenSuggestSkills: () => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  onChange,
  lang,
  onOpenSuggestSkills,
}) => {
  const t = getTranslation(lang);
  const [newSkillInputs, setNewSkillInputs] = useState<Record<number, string>>({});

  const addCategory = () => {
    onChange([...skills, { category: 'New Category', items: [] }]);
  };

  const updateCategoryName = (index: number, name: string) => {
    const updated = [...skills];
    updated[index].category = name;
    onChange(updated);
  };

  const removeCategory = (index: number) => {
    onChange(skills.filter((_, idx) => idx !== index));
  };

  const addSkillItem = (categoryIndex: number) => {
    const text = (newSkillInputs[categoryIndex] || '').trim();
    if (!text) return;
    const updated = [...skills];
    if (!updated[categoryIndex].items.includes(text)) {
      updated[categoryIndex].items.push(text);
      onChange(updated);
    }
    setNewSkillInputs({ ...newSkillInputs, [categoryIndex]: '' });
  };

  const removeSkillItem = (categoryIndex: number, itemIndex: number) => {
    const updated = [...skills];
    updated[categoryIndex].items.splice(itemIndex, 1);
    onChange(updated);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">{t.skills}</h3>
            <p className="text-[11px] text-slate-500">Group skills by technical, tools, or domain</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onOpenSuggestSkills}
            className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.aiSuggestSkills}</span>
          </button>
          <button
            type="button"
            onClick={addCategory}
            className="inline-flex items-center space-x-1 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addSkillCategory}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {skills.map((cat, catIdx) => (
          <div
            key={catIdx}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
          >
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={cat.category}
                onChange={(e) => updateCategoryName(catIdx, e.target.value)}
                placeholder="Category Name (e.g. Core Languages, Frameworks, Cloud)"
                className="font-bold text-xs text-slate-800 px-2 py-1 bg-white rounded border border-slate-200 focus:outline-hidden focus:border-amber-500 w-2/3"
              />
              <button
                type="button"
                onClick={() => removeCategory(catIdx)}
                className="p-1 text-slate-400 hover:text-red-500 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Skill tags list */}
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item, itemIdx) => (
                <span
                  key={itemIdx}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs group"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeSkillItem(catIdx, itemIdx)}
                    className="ml-1.5 text-slate-400 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add skill item input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newSkillInputs[catIdx] || ''}
                onChange={(e) =>
                  setNewSkillInputs({ ...newSkillInputs, [catIdx]: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkillItem(catIdx);
                  }
                }}
                placeholder="Type skill & press Enter (e.g. React, Docker, Python)..."
                className="flex-1 px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => addSkillItem(catIdx)}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
