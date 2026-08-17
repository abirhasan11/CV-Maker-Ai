import React from 'react';
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { Education, UILanguage } from '../../types';
import { getTranslation } from '../../data/translations';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
  lang: UILanguage;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  education,
  onChange,
  lang,
}) => {
  const t = getTranslation(lang);

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      grade: '',
      highlights: '',
    };
    onChange([...education, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  const moveEducation = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= education.length) return;
    const newArr = [...education];
    const [moved] = newArr.splice(index, 1);
    newArr.splice(targetIndex, 0, moved);
    onChange(newArr);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">{t.education}</h3>
            <p className="text-[11px] text-slate-500">Degrees, colleges, universities & honors</p>
          </div>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.addEducation}</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No education records added yet</p>
          <button
            type="button"
            onClick={addEducation}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            + {t.addEducation}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {edu.degree || 'Degree / Certificate'} {edu.institution ? `@ ${edu.institution}` : ''}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveEducation(index, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === education.length - 1}
                    onClick={() => moveEducation(index, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Degree / Program</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="e.g. B.Sc. in Computer Science"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Institution / University</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="e.g. University of Dhaka / BUET"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Grade / CGPA</label>
                  <input
                    type="text"
                    value={edu.grade}
                    onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                    placeholder="e.g. CGPA 3.85 / 4.00"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    placeholder="e.g. 2016-01"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">End Date (or Expected)</label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    placeholder="e.g. 2020-05"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Honors / Key Coursework / Activities
                </label>
                <input
                  type="text"
                  value={edu.highlights || ''}
                  onChange={(e) => updateEducation(edu.id, 'highlights', e.target.value)}
                  placeholder="e.g. Dean's List, Thesis on AI, President of IT Club"
                  className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
