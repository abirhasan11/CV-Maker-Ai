import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Sparkles } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const MonochromeBoldTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-white text-black ${fontClass} min-h-[1050px] p-8 flex flex-col justify-between space-y-6`}>
      {/* High Contrast Black Header Bar */}
      <div className="bg-black text-white p-6 flex justify-between items-center">
        <div className="space-y-1 max-w-[75%]">
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            {personalInfo.jobTitle || 'Lead Software Quality Assurance Engineer'}
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="flex flex-wrap gap-3 text-xs text-zinc-300 pt-1 font-mono">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>/ {personalInfo.phone}</span>}
            {personalInfo.location && <span>/ {personalInfo.location}</span>}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-20 h-20 bg-white p-0.5 shrink-0 grayscale contrast-150">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Career Objective */}
      {personalInfo.summary && (
        <div className="border-b-2 border-black pb-4 space-y-1">
          <div className="text-xs font-black uppercase tracking-wider text-black">Career Objective</div>
          <p className="text-xs text-zinc-800 leading-relaxed font-medium">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="border-b-2 border-black pb-4 space-y-3">
          <div className="text-xs font-black uppercase tracking-wider text-black">Experience</div>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-black text-xs uppercase">{exp.position} — <span className="underline">{exp.company}</span></h4>
                  <span className="text-[11px] font-bold font-mono">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-xs text-zinc-700 leading-relaxed">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-zinc-800 list-disc list-inside pl-1">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills && skills.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-black">Skills</div>
            <div className="space-y-1.5">
              {skills.map((cat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-xs font-bold uppercase">{cat.category}</div>
                  <div className="text-xs text-zinc-700">{cat.items.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {education && education.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-black">Education</div>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-black uppercase">{edu.degree} in {edu.field}</div>
                  <div className="text-zinc-700">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
