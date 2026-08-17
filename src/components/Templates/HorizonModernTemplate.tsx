import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Sparkles, CheckCircle2 } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const HorizonModernTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} min-h-[1050px] flex flex-col justify-between`}>
      {/* Dual Horizon Header */}
      <div 
        className="px-8 pt-8 pb-6 text-white"
        style={{ background: theme.gradient || theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
      >
        <div className="flex justify-between items-center">
          <div className="space-y-1.5 max-w-[75%]">
            <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              <span>{personalInfo.jobTitle || 'Lead Software Quality Assurance Engineer'}</span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight">
              {personalInfo.fullName || 'Abir Hasan'}
            </h1>
            <div className="flex flex-wrap gap-2 text-xs pt-1">
              {personalInfo.email && <span className="bg-black/20 px-2 py-0.5 rounded">{personalInfo.email}</span>}
              {personalInfo.phone && <span className="bg-black/20 px-2 py-0.5 rounded">{personalInfo.phone}</span>}
              {personalInfo.location && <span className="bg-black/20 px-2 py-0.5 rounded">{personalInfo.location}</span>}
            </div>
          </div>

          {config.showPhoto && personalInfo.photoUrl && (
            <div className="w-22 h-22 rounded-2xl overflow-hidden border-2 border-white shadow-lg shrink-0 bg-white">
              <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div className="p-7 space-y-4 flex-1">
        {/* Career Objective */}
        {personalInfo.summary && (
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Career Objective</div>
            <p className="text-xs text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
              Experience & Achievements
            </div>
            <div className={spacing.itemGap}>
              {experiences.map((exp) => (
                <div key={exp.id} className="page-break-avoid border-l-2 pl-3 space-y-1" style={{ borderColor: theme.primary }}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-xs text-slate-900">{exp.position}</h4>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-xs font-semibold" style={{ color: theme.primary }}>{exp.company}</div>
                  {exp.description && <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-0.5 text-xs text-slate-700">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2-Col Skills & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {skills && skills.length > 0 && (
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
                Technical Matrix
              </div>
              <div className="space-y-1.5">
                {skills.map((cat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-[11px] font-bold text-slate-800">{cat.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((it, i) => (
                        <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-800 px-2 py-0.5 rounded font-medium">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
                Education
              </div>
              <div className="space-y-1.5">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs space-y-0.5">
                    <div className="font-bold text-slate-900">{edu.degree} in {edu.field}</div>
                    <div className="text-slate-600">{edu.institution}</div>
                    <div className="text-[10px] text-slate-500">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
