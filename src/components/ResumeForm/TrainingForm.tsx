import React from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Link as LinkIcon 
} from 'lucide-react';
import { TrainingItem, UILanguage } from '../../types';

interface TrainingFormProps {
  trainings?: TrainingItem[];
  onChange: (items: TrainingItem[]) => void;
  lang: UILanguage;
}

export const TrainingForm: React.FC<TrainingFormProps> = ({
  trainings = [],
  onChange,
  lang,
}) => {
  const addTraining = () => {
    const newItem: TrainingItem = {
      id: `train-${Date.now()}`,
      courseTitle: 'Full Stack SQA',
      duration: 'Starting Month,2021 to Ending Month,2021',
      organization: 'IT Training BD, a United States based training organization.',
      linkText: 'Fb Link:',
      linkUrl: 'https://www.facebook.com/It-Training-Bd-211709726924087',
    };
    onChange([...trainings, newItem]);
  };

  const updateTraining = (id: string, field: keyof TrainingItem, value: string) => {
    onChange(
      trainings.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeTraining = (id: string) => {
    onChange(trainings.filter((item) => item.id !== id));
  };

  const moveTraining = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= trainings.length) return;
    const newArr = [...trainings];
    const [moved] = newArr.splice(index, 1);
    newArr.splice(targetIndex, 0, moved);
    onChange(newArr);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">
              {lang === 'bn' ? 'Training (প্রশিক্ষণ ও কোর্স)' : 'Training'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {lang === 'bn' ? 'প্রফেশনাল ট্রেনিং, ইন্সটিটিউট এবং সোশ্যাল/ওয়েব লিংক' : 'SQA courses, training institutes, duration, and link'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={addTraining}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'ট্রেনিং যোগ করুন' : 'Add Training'}</span>
        </button>
      </div>

      {trainings.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No training records added yet</p>
          <button
            type="button"
            onClick={addTraining}
            className="text-xs font-semibold text-amber-600 hover:underline"
          >
            + Add Training
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {trainings.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  • {item.courseTitle || 'Training Course'} ({item.duration})
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveTraining(index, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === trainings.length - 1}
                    onClick={() => moveTraining(index, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTraining(item.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Course / Training Title (e.g. Full Stack SQA)
                  </label>
                  <input
                    type="text"
                    value={item.courseTitle}
                    onChange={(e) => updateTraining(item.id, 'courseTitle', e.target.value)}
                    placeholder="Full Stack SQA"
                    className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-amber-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Duration / Period
                  </label>
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => updateTraining(item.id, 'duration', e.target.value)}
                    placeholder="Starting Month,2021 to Ending Month,2021"
                    className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-amber-500 font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Organization / Institute Description
                  </label>
                  <input
                    type="text"
                    value={item.organization}
                    onChange={(e) => updateTraining(item.id, 'organization', e.target.value)}
                    placeholder="IT Training BD, a United States based training organization."
                    className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Link Label (e.g. Fb Link: or Web:)
                  </label>
                  <input
                    type="text"
                    value={item.linkText || 'Fb Link:'}
                    onChange={(e) => updateTraining(item.id, 'linkText', e.target.value)}
                    placeholder="Fb Link:"
                    className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Link URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <LinkIcon className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      value={item.linkUrl || ''}
                      onChange={(e) => updateTraining(item.id, 'linkUrl', e.target.value)}
                      placeholder="https://www.facebook.com/..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-amber-500 font-mono text-blue-600"
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
