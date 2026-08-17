import React from 'react';
import { 
  Users2, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Mail, 
  MapPin, 
  Briefcase 
} from 'lucide-react';
import { ReferenceItem, UILanguage } from '../../types';

interface ReferenceFormProps {
  references?: ReferenceItem[];
  onChange: (items: ReferenceItem[]) => void;
  lang: UILanguage;
}

export const ReferenceForm: React.FC<ReferenceFormProps> = ({
  references = [],
  onChange,
  lang,
}) => {
  const addReference = () => {
    const newItem: ReferenceItem = {
      id: `ref-${Date.now()}`,
      name: 'Sabiul Islam Rashed',
      designation: 'SQA Head',
      companyLocation: 'Burnsys, Dubai, UAE',
      email: '234sabiul@gmail.com',
    };
    onChange([...references, newItem]);
  };

  const updateReference = (id: string, field: keyof ReferenceItem, value: string) => {
    onChange(
      references.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeReference = (id: string) => {
    onChange(references.filter((item) => item.id !== id));
  };

  const moveReference = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= references.length) return;
    const newArr = [...references];
    const [moved] = newArr.splice(index, 1);
    newArr.splice(targetIndex, 0, moved);
    onChange(newArr);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <Users2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">
              {lang === 'bn' ? 'Reference (রেফারেন্স)' : 'Reference'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {lang === 'bn' ? 'পেশাদার রেফারেন্স প্রদানকারীর নাম, পদবী, প্রতিষ্ঠান এবং ইমেইল' : 'Professional references with designation, company and email'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={addReference}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'রেফারেন্স যোগ করুন' : 'Add Reference'}</span>
        </button>
      </div>

      {references.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No references added yet</p>
          <button
            type="button"
            onClick={addReference}
            className="text-xs font-semibold text-teal-600 hover:underline"
          >
            + Add Reference
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {references.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {item.name || 'Referee Name'} {item.designation ? `(${item.designation})` : ''}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveReference(index, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === references.length - 1}
                    onClick={() => moveReference(index, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeReference(item.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateReference(item.id, 'name', e.target.value)}
                    placeholder="Sabiul Islam Rashed"
                    className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-teal-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Designation / Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      value={item.designation}
                      onChange={(e) => updateReference(item.id, 'designation', e.target.value)}
                      placeholder="SQA Head"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-teal-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Company & Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      value={item.companyLocation}
                      onChange={(e) => updateReference(item.id, 'companyLocation', e.target.value)}
                      placeholder="Burnsys, Dubai, UAE"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-teal-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="email"
                      value={item.email}
                      onChange={(e) => updateReference(item.id, 'email', e.target.value)}
                      placeholder="234sabiul@gmail.com"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-teal-500 font-mono"
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
