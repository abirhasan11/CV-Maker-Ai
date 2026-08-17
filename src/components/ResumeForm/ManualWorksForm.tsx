import React from 'react';
import { 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Link as LinkIcon 
} from 'lucide-react';
import { ManualWorkItem, UILanguage } from '../../types';

interface ManualWorksFormProps {
  manualWorks?: ManualWorkItem[];
  onChange: (items: ManualWorkItem[]) => void;
  lang: UILanguage;
}

export const ManualWorksForm: React.FC<ManualWorksFormProps> = ({
  manualWorks = [],
  onChange,
  lang,
}) => {
  const addWork = () => {
    const newItem: ManualWorkItem = {
      id: `man-${Date.now()}`,
      title: '',
      link: 'github link',
    };
    onChange([...manualWorks, newItem]);
  };

  const updateWork = (id: string, field: keyof ManualWorkItem, value: string) => {
    onChange(
      manualWorks.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeWork = (id: string) => {
    onChange(manualWorks.filter((item) => item.id !== id));
  };

  const moveWork = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= manualWorks.length) return;
    const newArr = [...manualWorks];
    const [moved] = newArr.splice(index, 1);
    newArr.splice(targetIndex, 0, moved);
    onChange(newArr);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">
              {lang === 'bn' ? 'ম্যানুয়াল টেস্টিং (Manual Testing)' : 'Manual Testing'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {lang === 'bn' ? 'টেস্ট কেস রাইটিং, লোড টেস্টিং, পোস্টম্যান এপিআই টেস্টিং ও লিংক' : 'Test Case Writing, JMeter Load Testing, Postman API Testing & links'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={addWork}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'কাজ যোগ করুন' : 'Add Item'}</span>
        </button>
      </div>

      {manualWorks.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No manual testing works added yet</p>
          <button
            type="button"
            onClick={addWork}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add Item
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {manualWorks.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  • {item.title || 'Work Title'}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveWork(index, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === manualWorks.length - 1}
                    onClick={() => moveWork(index, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeWork(item.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Work Title (e.g. Test Case Writing (), Load Testing Using Jmeter)
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateWork(item.id, 'title', e.target.value)}
                    placeholder="Test Case Writing ()"
                    className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  />
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
                      onChange={(e) => updateWork(item.id, 'link', e.target.value)}
                      placeholder="github link or URL"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 font-mono"
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
