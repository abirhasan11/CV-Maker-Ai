import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Briefcase, GraduationCap, Award, BookOpen } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const ExecutiveCorporateSplitTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} min-h-[1050px] flex flex-col justify-between`}>
      {/* Executive Top Banner */}
      <div 
        className="px-8 py-7 text-white flex items-center justify-between"
        style={{ background: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
      >
        <div className="space-y-1.5 max-w-[75%]">
          <h1 className="text-3xl font-serif font-bold tracking-tight">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="text-sm font-light tracking-wide opacity-90">
            {personalInfo.jobTitle || 'Aspiring SQA Professional'}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-80 pt-1">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="hover:underline transition-all">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <a href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`} className="hover:underline transition-all">
                • {personalInfo.phone}
              </a>
            )}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.linkedin && (
              <a 
                href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin.includes('linkedin.com') ? personalInfo.linkedin : `linkedin.com/in/${personalInfo.linkedin}`}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline transition-all"
              >
                • {personalInfo.linkedin}
              </a>
            )}
            {personalInfo.github && (
              <a 
                href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github.includes('github.com') ? personalInfo.github : `github.com/${personalInfo.github}`}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline transition-all"
              >
                • {personalInfo.github}
              </a>
            )}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-22 h-22 rounded-lg border-2 border-white overflow-hidden shrink-0 shadow-md">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Main Split Body */}
      <div className="p-7 grid grid-cols-12 gap-6 flex-1">
        {/* Left Column (4/12) */}
        <div className="col-span-4 space-y-4 pr-3 border-r border-slate-200">
          {personalInfo.summary && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Executive Profile
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-serif">{personalInfo.summary}</p>
            </div>
          )}

          {skills && skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Core Competencies
              </h3>
              <div className="space-y-2">
                {skills.map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-800">{cat.category}</div>
                    <ul className="text-xs text-slate-600 space-y-0.5 pl-2 list-disc list-inside">
                      {cat.items.map((it, i) => (
                        <li key={i} className="truncate">{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Education
              </h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.institution}</div>
                    <div className="text-[11px] text-slate-500">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (8/12) */}
        <div className="col-span-8 space-y-4">
          {experiences && experiences.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Professional Experience
              </h3>
              <div className={spacing.itemGap}>
                {experiences.map((exp) => (
                  <div key={exp.id} className="page-break-avoid space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-xs text-slate-900 font-serif">{exp.position}</h4>
                      <span className="text-[11px] font-semibold text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="text-xs font-bold" style={{ color: theme.primary }}>{exp.company}</div>
                    {exp.description && <p className="text-xs text-slate-700 leading-relaxed">{exp.description}</p>}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside pl-1">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {manualWorks && manualWorks.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Key Deliverables & Projects
              </h3>
              <div className="space-y-2">
                {manualWorks.map((w) => (
                  <div key={w.id} className="text-xs">
                    <div className="font-bold text-slate-900">{w.title}</div>
                    <div className="text-slate-600 text-[11px]">{w.description}</div>
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
