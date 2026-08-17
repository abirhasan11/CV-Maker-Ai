import React from 'react';
import { Mail, Phone, MapPin, Linkedin, BookOpen } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const MagazineProTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-[#fdfbf7] text-slate-900 ${fontClass} min-h-[1050px] p-8 flex flex-col justify-between space-y-5 font-serif`}>
      {/* Magazine Editorial Masthead */}
      <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
        <div className="text-[10px] font-sans font-bold tracking-widest uppercase text-slate-500">
          CURRICULUM VITAE & PROFESSIONAL DOSSIER
        </div>
        <h1 className="text-4xl font-serif font-black tracking-tight text-slate-950 uppercase">
          {personalInfo.fullName || 'Abir Hasan'}
        </h1>
        <div className="text-xs font-sans font-semibold tracking-wider text-slate-700 uppercase">
          {personalInfo.jobTitle || 'Lead Software Quality Assurance Engineer'}
        </div>
        <div className="flex justify-center flex-wrap gap-4 text-xs font-sans text-slate-600 pt-2 border-t border-slate-300 mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary with Drop Cap */}
      {personalInfo.summary && (
        <div className="space-y-1">
          <p className="text-xs text-slate-800 leading-relaxed first-letter:text-3xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:leading-none">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* 3-Column Magazine Layout */}
      <div className="grid grid-cols-12 gap-5 pt-2 border-t border-slate-200">
        {/* Experience (8/12) */}
        <div className="col-span-8 space-y-3 pr-2 border-r border-slate-200">
          <h3 className="text-xs font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1">
            Career Chronicle
          </h3>
          <div className={spacing.itemGap}>
            {experiences && experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-xs text-slate-950 font-serif">{exp.position}</h4>
                  <span className="text-[10px] font-sans font-medium text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-sans font-bold" style={{ color: theme.primary }}>{exp.company}</div>
                {exp.description && <p className="text-xs text-slate-700 leading-relaxed font-serif">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-slate-700 list-disc list-inside font-sans pl-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar (4/12): Skills & Education */}
        <div className="col-span-4 space-y-4">
          {skills && skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1">
                Skills Catalog
              </h3>
              <div className="space-y-2 font-sans">
                {skills.map((cat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-[11px] font-bold text-slate-900">{cat.category}</div>
                    <div className="text-[11px] text-slate-600 leading-relaxed">{cat.items.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <h3 className="text-xs font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1">
                Academic Background
              </h3>
              <div className="space-y-2 font-sans">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600 text-[11px]">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
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
