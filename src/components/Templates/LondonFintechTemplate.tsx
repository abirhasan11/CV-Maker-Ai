import React from 'react';
import { Mail, Phone, MapPin, Linkedin, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const LondonFintechTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-[#f8f9fa] text-slate-900 ${fontClass} min-h-[1050px] p-7 flex flex-col justify-between space-y-4`}>
      {/* Fintech Trust Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex justify-between items-center">
        <div className="space-y-1.5 max-w-[75%]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              {personalInfo.jobTitle || 'Senior SQA & Fintech Systems Engineer'}
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="flex flex-wrap gap-3 text-xs text-slate-600 pt-1">
            {personalInfo.email && <span className="flex items-center space-x-1"><Mail className="w-3.5 h-3.5 text-slate-400" /><span>{personalInfo.email}</span></span>}
            {personalInfo.phone && <span className="flex items-center space-x-1"><Phone className="w-3.5 h-3.5 text-slate-400" /><span>{personalInfo.phone}</span></span>}
            {personalInfo.location && <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span>{personalInfo.location}</span></span>}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-300 shadow-xs shrink-0">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Career Objective */}
      {personalInfo.summary && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Career Objective</div>
          <p className="text-xs text-slate-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
            Work History & Milestones
          </div>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid border-l-2 pl-3 space-y-1" style={{ borderColor: theme.primary }}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-xs text-slate-900">{exp.position}</h4>
                  <span className="text-[11px] font-semibold text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-semibold" style={{ color: theme.primary }}>{exp.company}</div>
                {exp.description && <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-slate-700">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
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
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
              Technical Competencies
            </div>
            <div className="space-y-2">
              {skills.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-800">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((it, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium border border-slate-200/60">
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
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
              Education & Certifications
            </div>
            <div className="space-y-2">
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
  );
};
