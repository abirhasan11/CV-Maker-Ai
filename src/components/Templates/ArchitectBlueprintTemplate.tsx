import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Ruler, Compass, Layers, CheckSquare } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const ArchitectBlueprintTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-[#0a2540] text-cyan-100 ${fontClass} min-h-[1050px] p-7 flex flex-col justify-between space-y-4 border-4 border-cyan-500/40`}>
      {/* Blueprint Grid Header */}
      <div className="border border-cyan-400/40 p-5 rounded-lg bg-[#071d33] relative flex justify-between items-center">
        <div className="space-y-1.5 max-w-[75%]">
          <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
            // BLUEPRINT_SPEC: {personalInfo.jobTitle || 'SYSTEM QUALITY ARCHITECT'}
          </div>
          <h1 className="text-3xl font-mono font-bold tracking-tight text-white uppercase">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-cyan-200 pt-1">
            {personalInfo.email && <span className="border border-cyan-500/30 px-2 py-0.5 rounded">{personalInfo.email}</span>}
            {personalInfo.phone && <span className="border border-cyan-500/30 px-2 py-0.5 rounded">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="border border-cyan-500/30 px-2 py-0.5 rounded">{personalInfo.location}</span>}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-cyan-400 shrink-0">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="border border-cyan-500/30 p-3.5 rounded-lg bg-[#071d33]/80 space-y-1 font-mono text-xs">
          <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">[01] SYSTEM_OBJECTIVE</div>
          <p className="text-cyan-100/90 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="border border-cyan-500/30 p-4 rounded-lg bg-[#071d33]/80 space-y-3 font-mono">
          <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">[02] ARCHITECTURAL_HISTORY</div>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid border-l-2 border-cyan-400/60 pl-3 space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-xs text-white uppercase">{exp.position}</h4>
                  <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs text-cyan-300 font-semibold">{exp.company}</div>
                {exp.description && <p className="text-xs text-cyan-200/90 leading-relaxed">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-cyan-200/80">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>&gt; {h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Education 2-Col */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono">
        {skills && skills.length > 0 && (
          <div className="border border-cyan-500/30 p-3.5 rounded-lg bg-[#071d33]/80 space-y-2">
            <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">[03] TECH_STACK</div>
            <div className="space-y-1.5">
              {skills.map((cat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[11px] font-bold text-cyan-300">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((it, i) => (
                      <span key={i} className="text-[10px] bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 px-1.5 py-0.5 rounded">
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
          <div className="border border-cyan-500/30 p-3.5 rounded-lg bg-[#071d33]/80 space-y-2">
            <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">[04] EDUCATION</div>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="font-bold text-white">{edu.degree} in {edu.field}</div>
                  <div className="text-cyan-300 text-[11px]">{edu.institution}</div>
                  <div className="text-cyan-400/80 text-[10px]">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
