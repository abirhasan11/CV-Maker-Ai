import React from 'react';
import { Mail, Phone, MapPin, Linkedin, ExternalLink, Sparkles, Layers } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const PortfolioShowcaseTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], automationWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-slate-50 text-slate-800 ${fontClass} min-h-[1050px] p-7 flex flex-col justify-between space-y-4`}>
      {/* Studio Header Card */}
      <div 
        className="rounded-3xl p-6 text-white shadow-sm flex justify-between items-center"
        style={{ background: theme.gradient || theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
      >
        <div className="space-y-1.5 max-w-[75%]">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            <span>{personalInfo.jobTitle || 'Lead Software Quality Assurance Engineer'}</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs pt-1">
            {personalInfo.email && <span className="bg-black/20 px-2.5 py-0.5 rounded-md">{personalInfo.email}</span>}
            {personalInfo.phone && <span className="bg-black/20 px-2.5 py-0.5 rounded-md">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="bg-black/20 px-2.5 py-0.5 rounded-md">{personalInfo.location}</span>}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-22 h-22 rounded-2xl overflow-hidden border-2 border-white shadow-lg shrink-0 bg-white">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Professional Bio</div>
          <p className="text-xs text-slate-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Featured Works Grid */}
      {((manualWorks && manualWorks.length > 0) || (automationWorks && automationWorks.length > 0)) && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
            Featured Portfolio Deliverables
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {manualWorks.map((work) => (
              <div key={work.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
                <div className="font-bold text-xs text-slate-900 flex justify-between items-center">
                  <span>{work.title}</span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-semibold">QA Deliverable</span>
                </div>
                <p className="text-[11px] text-slate-600">{work.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Work Experience</div>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid border-l-2 pl-3 space-y-1" style={{ borderColor: theme.primary }}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-xs text-slate-900">{exp.position}</h4>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-semibold" style={{ color: theme.primary }}>{exp.company}</div>
                {exp.description && <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-slate-700">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: theme.primary }} />
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
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Skillset</div>
            <div className="space-y-1.5">
              {skills.map((cat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[11px] font-bold text-slate-800">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((it, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium">
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
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Education</div>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="font-bold text-slate-900">{edu.degree} in {edu.field}</div>
                  <div className="text-slate-600">{edu.institution}</div>
                  <div className="text-[10px] text-slate-400">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
