import React from 'react';
import { 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Image, 
  Sparkles 
} from 'lucide-react';
import { PersonalInfo, UILanguage } from '../../types';
import { getTranslation } from '../../data/translations';

interface PersonalInfoFormProps {
  personalInfo?: PersonalInfo;
  data?: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  lang: UILanguage;
  onOpenAiSummary?: () => void;
  onOpenSummaryAI?: () => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  personalInfo,
  data: dataProp,
  onChange,
  lang,
  onOpenAiSummary,
  onOpenSummaryAI,
}) => {
  const data = personalInfo || dataProp || {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  };
  const handleOpenAi = onOpenAiSummary || onOpenSummaryAI || (() => {});
  const t = getTranslation(lang);

  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        updateField('photoUrl', event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <User className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">{t.personalInfo}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">{t.fullName}</label>
          <div className="relative">
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="e.g. Md. Tanvir Hasan"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">{t.jobTitle}</label>
          <div className="relative">
            <input
              type="text"
              value={data.jobTitle}
              onChange={(e) => updateField('jobTitle', e.target.value)}
              placeholder="e.g. Aspiring SQA Professional"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">{t.email}</label>
          <div className="relative">
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="tanvir@example.com"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">{t.phone}</label>
          <div className="relative">
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+880 1700-000000"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">{t.location}</label>
          <div className="relative">
            <input
              type="text"
              value={data.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="Dhaka, Bangladesh"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">{t.website}</label>
          <div className="relative">
            <input
              type="text"
              value={data.website}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="portfolio.dev"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">{t.linkedin}</label>
          <div className="relative">
            <input
              type="text"
              value={data.linkedin}
              onChange={(e) => updateField('linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">{t.github}</label>
          <div className="relative">
            <input
              type="text"
              value={data.github}
              onChange={(e) => updateField('github', e.target.value)}
              placeholder="github.com/username"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Photo URL or Upload */}
      <div className="pt-2">
        <label className="block text-xs font-medium text-slate-700 mb-1">{t.photoUrl}</label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
          {data.photoUrl ? (
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-indigo-200 shrink-0 shadow-xs">
              <img 
                src={data.photoUrl} 
                alt="Profile" 
                referrerPolicy="no-referrer" 
                className="w-full h-full object-cover" 
              />
              <button
                type="button"
                onClick={() => updateField('photoUrl', '')}
                className="absolute inset-0 bg-black/70 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-[10px] font-semibold cursor-pointer"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-xl bg-white border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 shrink-0">
              <Image className="w-6 h-6 text-slate-400 mb-0.5" />
              <span className="text-[9px] text-slate-400 font-medium">No Photo</span>
            </div>
          )}

          <div className="flex-1 space-y-2 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer">
                <Image className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ডিভাইস থেকে ছবি আপলোড করুন' : 'Upload Photo from Device'}</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>

              {data.photoUrl && (
                <button
                  type="button"
                  onClick={() => updateField('photoUrl', '')}
                  className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'ছবি মুছুন' : 'Remove'}
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={data.photoUrl || ''}
                onChange={(e) => updateField('photoUrl', e.target.value)}
                placeholder="Or paste image URL (https://...)"
                className="w-full px-2.5 py-1 text-xs rounded-md border border-slate-200 bg-white focus:outline-hidden focus:border-indigo-500 transition-all text-slate-700"
              />
            </div>

            {/* Quick Sample Avatars */}
            {!data.photoUrl && (
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 pt-0.5">
                <span>Quick demo:</span>
                <button
                  type="button"
                  onClick={() => updateField('photoUrl', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80')}
                  className="px-2 py-0.5 bg-slate-200 hover:bg-indigo-100 hover:text-indigo-700 rounded text-[10px] font-medium transition-colors"
                >
                  Male Pro
                </button>
                <button
                  type="button"
                  onClick={() => updateField('photoUrl', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80')}
                  className="px-2 py-0.5 bg-slate-200 hover:bg-indigo-100 hover:text-indigo-700 rounded text-[10px] font-medium transition-colors"
                >
                  Female Pro
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary with AI Assistant */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-medium text-slate-700">{t.summary}</label>
          <button
            type="button"
            onClick={handleOpenAi}
            className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span>{t.aiSummaryGen}</span>
          </button>
        </div>
        <textarea
          rows={4}
          value={data.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          placeholder={t.summaryPlaceholder}
          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all leading-relaxed"
        />
      </div>
    </div>
  );
};
