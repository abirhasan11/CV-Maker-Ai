import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Crown, Award } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const CrestLuxuryTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-[#111111] text-[#e5e5e5] ${fontClass} min-h-[1050px] p-8 flex flex-col justify-between space-y-6 font-serif border-4 border-[#b8860b]/40`}>
      {/* Luxury Gold Monogram Header */}
      <div className="text-center border-b border-[#b8860b]/40 pb-5 space-y-2">
        <div className="inline-flex items-center space-x-1.5 text-xs tracking-widest text-[#d4af37] uppercase font-sans">
          <Crown className="w-3.5 h-3.5" />
          <span>{personalInfo.jobTitle || 'Lead Software Quality Assurance Engineer'}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white uppercase font-serif">
          {personalInfo.fullName || 'Abir Hasan'}
        </h1>
        <div className="flex justify-center flex-wrap gap-4 text-xs text-[#a3a3a3] font-sans pt-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>✦ {personalInfo.phone}</span>}
          {personalInfo.location && <span>✦ {personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="bg-[#1a1a1a] p-4 border border-[#b8860b]/30 space-y-1 text-center">
          <p className="text-xs text-[#d4d4d4] leading-relaxed italic">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37] border-b border-[#b8860b]/30 pb-1 font-sans">
            Distinguished Career Experience
          </div>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid space-y-1 border-l border-[#b8860b]/50 pl-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-xs text-white font-serif">{exp.position}</h4>
                  <span className="text-[11px] font-sans text-[#a3a3a3]">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-sans text-[#d4af37] font-semibold">{exp.company}</div>
                {exp.description && <p className="text-xs text-[#a3a3a3] leading-relaxed font-sans">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-[#d4d4d4] font-sans list-disc list-inside pl-1">
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

      {/* 2-Col Skills & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-[#b8860b]/30 font-sans">
        {skills && skills.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Core Competencies
            </div>
            <div className="space-y-1.5">
              {skills.map((cat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[11px] font-bold text-white">{cat.category}</div>
                  <div className="text-[11px] text-[#a3a3a3]">{cat.items.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {education && education.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Academic Honors
            </div>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-white">{edu.degree} in {edu.field}</div>
                  <div className="text-[#a3a3a3] text-[11px]">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
