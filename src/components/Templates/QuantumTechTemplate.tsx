import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Cpu, Zap, Activity } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const QuantumTechTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-[#0d1117] text-[#c9d1d9] ${fontClass} min-h-[1050px] p-7 flex flex-col justify-between space-y-4 border border-[#30363d]`}>
      {/* Quantum Dark Banner */}
      <div 
        className="p-5 rounded-2xl border border-[#30363d] bg-[#161b22] flex justify-between items-center relative overflow-hidden"
        style={{ borderLeft: `5px solid ${theme.primary}` }}
      >
        <div className="space-y-1.5 max-w-[75%]">
          <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-bold tracking-widest text-[#58a6ff] uppercase bg-[#1f242c] px-2.5 py-0.5 rounded-full border border-[#30363d]">
            <Cpu className="w-3 h-3 text-[#58a6ff]" />
            <span>{personalInfo.jobTitle || 'Lead Software Quality Assurance Engineer'}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-mono uppercase">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-[#8b949e] pt-1">
            {personalInfo.email && <span className="bg-[#21262d] px-2 py-0.5 rounded">{personalInfo.email}</span>}
            {personalInfo.phone && <span className="bg-[#21262d] px-2 py-0.5 rounded">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="bg-[#21262d] px-2 py-0.5 rounded">{personalInfo.location}</span>}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#30363d] shrink-0">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="bg-[#161b22] p-4 rounded-xl border border-[#30363d] space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#58a6ff]">Core Directives</div>
          <p className="text-xs text-[#c9d1d9] leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="bg-[#161b22] p-4 rounded-xl border border-[#30363d] space-y-3 font-mono">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#58a6ff]">Production Track Record</div>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid border-l-2 pl-3 space-y-1" style={{ borderColor: theme.primary }}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-xs text-white">{exp.position}</h4>
                  <span className="text-[10px] text-[#8b949e] bg-[#21262d] px-2 py-0.5 rounded">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-semibold text-[#58a6ff]">{exp.company}</div>
                {exp.description && <p className="text-xs text-[#8b949e] leading-relaxed">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-[#c9d1d9]">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>▪ {h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2-Col Skills & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono">
        {skills && skills.length > 0 && (
          <div className="bg-[#161b22] p-4 rounded-xl border border-[#30363d] space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#58a6ff]">Tech Stack</div>
            <div className="space-y-1.5">
              {skills.map((cat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[11px] font-bold text-white">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((it, i) => (
                      <span key={i} className="text-[10px] bg-[#21262d] border border-[#30363d] text-[#58a6ff] px-2 py-0.5 rounded">
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
          <div className="bg-[#161b22] p-4 rounded-xl border border-[#30363d] space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#58a6ff]">Education</div>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="font-bold text-white">{edu.degree} in {edu.field}</div>
                  <div className="text-[#8b949e]">{edu.institution}</div>
                  <div className="text-[#8b949e] text-[10px]">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
