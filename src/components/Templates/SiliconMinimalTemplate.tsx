import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Sparkles } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const SiliconMinimalTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-[#fbfbfd] text-slate-900 ${fontClass} min-h-[1050px] p-8 flex flex-col justify-between space-y-5`}>
      {/* Silicon Valley Clean Hero Header */}
      <div className="flex justify-between items-start pb-5 border-b border-slate-200">
        <div className="space-y-1.5">
          <div className="text-xs font-semibold tracking-wide text-slate-500">
            {personalInfo.jobTitle || 'Lead Software Quality Assurance Engineer'}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs text-slate-600 pt-1">
            {personalInfo.email && <span className="bg-slate-100 px-2.5 py-1 rounded-full">{personalInfo.email}</span>}
            {personalInfo.phone && <span className="bg-slate-100 px-2.5 py-1 rounded-full">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="bg-slate-100 px-2.5 py-1 rounded-full">{personalInfo.location}</span>}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-slate-200">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overview</h3>
          <p className="text-xs text-slate-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience</h3>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-xs text-slate-900">{exp.position}</h4>
                  <span className="text-[11px] font-medium text-slate-400">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-semibold" style={{ color: theme.primary }}>{exp.company}</div>
                {exp.description && <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-slate-600">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-slate-400">•</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-200">
        {skills && skills.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills</h3>
            <div className="space-y-2">
              {skills.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-800">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((it, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full font-medium">
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
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Education</h3>
            <div className="space-y-2">
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
