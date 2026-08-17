import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Clock, Calendar, CheckCircle } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const HybridTimelineTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], trainings = [] } = resume;

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} min-h-[1050px] p-7 flex flex-col justify-between space-y-4`}>
      {/* Top Header */}
      <div className="flex justify-between items-center pb-4 border-b-2 border-slate-200">
        <div className="space-y-1.5 max-w-[75%]">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {personalInfo.jobTitle || 'Lead Software Quality Assurance Engineer'}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="flex flex-wrap gap-3 text-xs text-slate-600 pt-1">
            {personalInfo.email && <span className="flex items-center space-x-1"><Mail className="w-3.5 h-3.5 text-slate-400" /><span>{personalInfo.email}</span></span>}
            {personalInfo.phone && <span className="flex items-center space-x-1"><Phone className="w-3.5 h-3.5 text-slate-400" /><span>{personalInfo.phone}</span></span>}
            {personalInfo.location && <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span>{personalInfo.location}</span></span>}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-300 shadow-xs shrink-0">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Career Trajectory</div>
          <p className="text-xs text-slate-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Connected Timeline for Experiences */}
      {experiences && experiences.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
            Career Milestones & Chronology
          </div>
          <div className="relative pl-6 border-l-2 space-y-4" style={{ borderColor: theme.primary }}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid relative space-y-1">
                {/* Timeline node */}
                <div 
                  className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs"
                  style={{ backgroundColor: theme.primary }}
                />
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-xs text-slate-900">{exp.position}</h4>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-bold" style={{ color: theme.primary }}>{exp.company}</div>
                {exp.description && <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-slate-700">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-slate-400">▹</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t border-slate-200">
        {skills && skills.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
              Technical Proficiencies
            </div>
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
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
              Education & Background
            </div>
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
