import React from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Sparkles, 
  ChevronUp, 
  ChevronDown,
  Building,
  MapPin,
  Calendar
} from 'lucide-react';
import { Experience, UILanguage } from '../../types';
import { getTranslation } from '../../data/translations';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
  lang: UILanguage;
  onOpenBulletAI: (bulletText: string, jobTitle: string, company: string, onSelect: (newBullet: string) => void) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  onChange,
  lang,
  onOpenBulletAI,
}) => {
  const t = getTranslation(lang);

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: 'Present',
      current: true,
      bullets: [''],
    };
    onChange([newExp, ...experiences]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(
      experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  const addBullet = (expId: string) => {
    onChange(
      experiences.map((exp) => {
        if (exp.id === expId) {
          return { ...exp, bullets: [...exp.bullets, ''] };
        }
        return exp;
      })
    );
  };

  const updateBullet = (expId: string, bulletIndex: number, text: string) => {
    onChange(
      experiences.map((exp) => {
        if (exp.id === expId) {
          const nextBullets = [...exp.bullets];
          nextBullets[bulletIndex] = text;
          return { ...exp, bullets: nextBullets };
        }
        return exp;
      })
    );
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
    onChange(
      experiences.map((exp) => {
        if (exp.id === expId) {
          return {
            ...exp,
            bullets: exp.bullets.filter((_, idx) => idx !== bulletIndex),
          };
        }
        return exp;
      })
    );
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;
    const newArr = [...experiences];
    const [moved] = newArr.splice(index, 1);
    newArr.splice(targetIndex, 0, moved);
    onChange(newArr);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">{t.experience}</h3>
            <p className="text-[11px] text-slate-500">Add work history with measurable impact</p>
          </div>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.addExperience}</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No work experiences added yet</p>
          <button
            type="button"
            onClick={addExperience}
            className="text-xs font-semibold text-emerald-600 hover:underline"
          >
            + {t.addExperience}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group"
            >
              {/* Header with Title and Controls */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {exp.jobTitle || 'New Position'} {exp.company ? `@ ${exp.company}` : ''}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveExperience(index, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                    title="Move up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === experiences.length - 1}
                    onClick={() => moveExperience(index, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                    title="Move down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors ml-1"
                    title="Delete experience"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="e.g. Google / Brain Station 23"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    placeholder="e.g. Dhaka, Bangladesh (Hybrid)"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Duration / Dates</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="Start (e.g. 2021-06)"
                      className="w-1/2 px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                    />
                    <input
                      type="text"
                      value={exp.current ? 'Present' : exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="End (e.g. 2023-12)"
                      className="w-1/2 px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500 disabled:bg-slate-100"
                    />
                  </div>
                  <label className="inline-flex items-center mt-1 text-[11px] text-slate-500">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      className="rounded text-emerald-600 mr-1.5"
                    />
                    I currently work here
                  </label>
                </div>
              </div>

              {/* Bullet Points with AI helper */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-semibold text-slate-700">
                    Key Achievements & Responsibilities
                  </label>
                  <button
                    type="button"
                    onClick={() => addBullet(exp.id)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer"
                  >
                    + Add Bullet Point
                  </button>
                </div>

                <div className="space-y-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start space-x-1.5">
                      <span className="text-slate-400 mt-2 text-xs select-none">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                        placeholder="Accomplished [X] by doing [Z], resulting in [Y% improvement]..."
                        className="flex-1 px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500 leading-relaxed"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onOpenBulletAI(bullet, exp.jobTitle, exp.company, (improved) => {
                            updateBullet(exp.id, bIdx, improved);
                          })
                        }
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-100 shrink-0 transition-colors"
                        title="AI Bullet Enhancer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBullet(exp.id, bIdx)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg shrink-0 transition-colors"
                        title="Delete bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
