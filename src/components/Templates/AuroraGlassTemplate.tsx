import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Sparkles, Award } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const AuroraGlassTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-slate-900 text-slate-100 ${fontClass} min-h-[1050px] p-7 flex flex-col justify-between space-y-4`}>
      {/* Aurora Ambient Header */}
      <div 
        className="rounded-3xl p-6 relative overflow-hidden shadow-xl border border-white/10 backdrop-blur-md flex justify-between items-center"
        style={{ background: theme.gradient || 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
      >
        <div className="space-y-2 max-w-[75%]">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-black/25 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-white">
            <Sparkles className="w-3 h-3" />
            <span>{personalInfo.jobTitle || 'Lead Software Quality Assurance Engineer'}</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs text-white/90 pt-1">
            {personalInfo.email && <span className="bg-black/20 px-2.5 py-0.5 rounded-lg">{personalInfo.email}</span>}
            {personalInfo.phone && <span className="bg-black/20 px-2.5 py-0.5 rounded-lg">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="bg-black/20 px-2.5 py-0.5 rounded-lg">{personalInfo.location}</span>}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-22 h-22 rounded-2xl overflow-hidden border-2 border-white/40 shadow-xl shrink-0">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 shadow-md space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">Profile Statement</div>
          <p className="text-xs text-slate-300 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 shadow-md space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">Experience History</div>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid border-l-2 pl-3 space-y-1" style={{ borderColor: theme.primary }}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-xs text-white">{exp.position}</h4>
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-semibold text-cyan-300">{exp.company}</div>
                {exp.description && <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-slate-300">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-cyan-400" />
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
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 shadow-md space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">Technical Skills</div>
            <div className="space-y-2">
              {skills.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-200">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((it, i) => (
                      <span key={i} className="text-[10px] bg-slate-900/80 text-cyan-200 border border-cyan-500/20 px-2 py-0.5 rounded-md font-medium">
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
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 shadow-md space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">Education</div>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="font-bold text-white">{edu.degree} in {edu.field}</div>
                  <div className="text-slate-300">{edu.institution}</div>
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
