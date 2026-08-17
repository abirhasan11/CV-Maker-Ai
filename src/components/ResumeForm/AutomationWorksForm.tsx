import React from 'react';
import { 
  Cpu, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Link as LinkIcon,
  Check
} from 'lucide-react';
import { AutomationWorkItem, UILanguage } from '../../types';

interface AutomationWorksFormProps {
  automationWorks?: AutomationWorkItem[];
  onChange: (items: AutomationWorkItem[]) => void;
  lang: UILanguage;
}

export const AutomationWorksForm: React.FC<AutomationWorksFormProps> = ({
  automationWorks = [],
  onChange,
  lang,
}) => {
  const addWork = () => {
    const newItem: AutomationWorkItem = {
      id: `auto-${Date.now()}`,
      projectName: 'Project Name',
      link: 'https://github.com/username/project',
    };
    onChange([...automationWorks, newItem]);
  };

  const updateWork = (id: string, field: keyof AutomationWorkItem, value: string) => {
    onChange(
      automationWorks.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeWork = (id: string) => {
    onChange(automationWorks.filter((item) => item.id !== id));
  };

  const moveWork = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= automationWorks.length) return;
    const newArr = [...automationWorks];
    const [moved] = newArr.splice(index, 1);
    newArr.splice(targetIndex, 0, moved);
    onChange(newArr);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">
              {lang === 'bn' ? 'অটোমেশন টেস্টিং (Automation Testing)' : 'Automation Testing'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {lang === 'bn' ? 'টেস্ট অটোমেশন প্রজেক্ট ও গিটহাব লিংক' : 'Test automation projects and repository links'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={addWork}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'অটোমেশন যোগ করুন' : 'Add Item'}</span>
        </button>
      </div>

      {automationWorks.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No automation testing works added yet</p>
          <button
            type="button"
            onClick={addWork}
            className="text-xs font-semibold text-emerald-600 hover:underline"
          >
            + Add Item
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {automationWorks.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{item.projectName || 'Project Name'}</span>
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
                    disabled={index === automationWorks.length - 1}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Project Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-emerald-600 font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      value={item.projectName}
                      onChange={(e) => updateWork(item.id, 'projectName', e.target.value)}
                      placeholder="e.g. SauceDemo Automation Framework"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500 font-medium"
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
                      onChange={(e) => updateWork(item.id, 'link', e.target.value)}
                      placeholder="https://github.com/username/repo"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500 font-mono"
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
