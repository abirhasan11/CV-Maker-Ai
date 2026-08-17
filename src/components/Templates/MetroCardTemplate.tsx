import React from 'react';
import { Mail, Phone, MapPin, Linkedin, LayoutGrid, CheckSquare, Layers } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const MetroCardTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} min-h-[1050px] p-7 flex flex-col justify-between space-y-4`}>
      {/* Metro Flat Hero Tile */}
      <div 
        className="p-6 text-white rounded-none shadow-xs flex justify-between items-center"
        style={{ background: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
      >
        <div className="space-y-1.5 max-w-[75%]">
          <div className="text-[10px] font-black uppercase tracking-widest bg-black/20 px-2 py-0.5 inline-block">
            {personalInfo.jobTitle || 'Lead Software Quality Assurance Engineer'}
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs pt-1">
            {personalInfo.email && <span className="bg-white/20 px-2 py-0.5">{personalInfo.email}</span>}
            {personalInfo.phone && <span className="bg-white/20 px-2 py-0.5">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="bg-white/20 px-2 py-0.5">{personalInfo.location}</span>}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-20 h-20 bg-white p-1 shrink-0">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Summary Metro Tile */}
      {personalInfo.summary && (
        <div className="bg-slate-100 p-4 border-l-4 space-y-1" style={{ borderColor: theme.primary }}>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Overview Tile</div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="space-y-2.5">
          <div className="text-xs font-black uppercase tracking-widest bg-slate-900 text-white px-2.5 py-1 inline-block">
            Work History
          </div>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid border-l-2 pl-3 space-y-1" style={{ borderColor: theme.primary }}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-xs text-slate-950 uppercase">{exp.position}</h4>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-bold" style={{ color: theme.primary }}>{exp.company}</div>
                {exp.description && <p className="text-xs text-slate-700 leading-relaxed">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-slate-700">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {skills && skills.length > 0 && (
          <div className="bg-slate-50 p-3.5 border border-slate-200 space-y-2">
            <div className="text-xs font-black uppercase tracking-widest" style={{ color: theme.primary }}>
              Skills Grid
            </div>
            <div className="space-y-1.5">
              {skills.map((cat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[11px] font-bold text-slate-800">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((it, i) => (
                      <span key={i} className="text-[10px] bg-white border border-slate-300 text-slate-800 px-1.5 py-0.5 font-bold">
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
          <div className="bg-slate-50 p-3.5 border border-slate-200 space-y-2">
            <div className="text-xs font-black uppercase tracking-widest" style={{ color: theme.primary }}>
              Education
            </div>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="font-bold text-slate-900 uppercase">{edu.degree} in {edu.field}</div>
                  <div className="text-slate-600 text-[11px]">{edu.institution}</div>
                  <div className="text-slate-400 text-[10px]">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
