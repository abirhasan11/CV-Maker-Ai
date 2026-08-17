import React from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Link as LinkIcon,
  Check
} from 'lucide-react';
import { ExtraActivityItem, UILanguage } from '../../types';

interface ExtraActivitiesFormProps {
  extraActivities?: ExtraActivityItem[];
  onChange: (items: ExtraActivityItem[]) => void;
  lang: UILanguage;
}

export const ExtraActivitiesForm: React.FC<ExtraActivitiesFormProps> = ({
  extraActivities = [],
  onChange,
  lang,
}) => {
  const addActivity = () => {
    const newItem: ExtraActivityItem = {
      id: `act-${Date.now()}`,
      projectName: 'Project Name',
      link: 'github link',
    };
    onChange([...extraActivities, newItem]);
  };

  const updateActivity = (id: string, field: keyof ExtraActivityItem, value: string) => {
    onChange(
      extraActivities.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeActivity = (id: string) => {
    onChange(extraActivities.filter((item) => item.id !== id));
  };

  const moveActivity = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= extraActivities.length) return;
    const newArr = [...extraActivities];
    const [moved] = newArr.splice(index, 1);
    newArr.splice(targetIndex, 0, moved);
    onChange(newArr);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">
              {lang === 'bn' ? 'Extra- Activities (অতিরিক্ত কার্যক্রম)' : 'Extra- Activities'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {lang === 'bn' ? 'অতিরিক্ত প্রজেক্ট বা সহ-শিক্ষা কার্যক্রম ও গিটহাব লিংক' : 'Extra projects, volunteer work or side activities'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={addActivity}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-purple-700 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'কার্যক্রম যোগ করুন' : 'Add Item'}</span>
        </button>
      </div>

      {extraActivities.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No extra activities added yet</p>
          <button
            type="button"
            onClick={addActivity}
            className="text-xs font-semibold text-purple-600 hover:underline"
          >
            + Add Item
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {extraActivities.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-purple-600 font-bold" />
                  <span>{item.projectName || 'Project Name'}</span>
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveActivity(index, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === extraActivities.length - 1}
                    onClick={() => moveActivity(index, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeActivity(item.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Project / Activity Name (shown with ✓ checkmark)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-purple-600 font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      value={item.projectName}
                      onChange={(e) => updateActivity(item.id, 'projectName', e.target.value)}
                      placeholder="Project Name"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-purple-500 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Link / GitHub URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <LinkIcon className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      value={item.link}
                      onChange={(e) => updateActivity(item.id, 'link', e.target.value)}
                      placeholder="github link or URL"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-purple-500 font-mono text-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
