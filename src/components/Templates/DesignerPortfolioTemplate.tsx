import React from 'react';
import { 
  Mail, Phone, MapPin, Globe, Linkedin, Github, CheckCircle2, 
  ExternalLink, Award, BookOpen, Layers, Briefcase, GraduationCap, 
  Palette, Compass, Sparkles, Terminal
} from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getFontSizeClasses, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const DesignerPortfolioTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { 
    personalInfo, 
    experiences, 
    education, 
    skills, 
    manualWorks = [], 
    automationWorks = [], 
    trainings = [], 
    extraActivities = [], 
    references = [], 
    certifications = [], 
    languages = [] 
  } = resume;

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} min-h-[1050px] p-8 flex flex-col justify-between space-y-5`}>
      {/* Creative Graphical Top Header */}
      <div className="flex flex-row items-start justify-between gap-6 pb-4 border-b-2" style={{ borderColor: theme.primary }}>
        <div className="space-y-2 max-w-[75%]">
          <div 
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-2xs"
            style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
          >
            <Sparkles className="w-3 h-3" />
            <span>{personalInfo.jobTitle || 'Aspiring SQA Professional'}</span>
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-600 pt-1">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-1 hover:underline">
                <Mail className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.phone && (
              <a href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`} className="flex items-center space-x-1 hover:underline">
                <Phone className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>{personalInfo.phone}</span>
              </a>
            )}
            {personalInfo.location && (
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.linkedin && (
              <a 
                href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin.includes('linkedin.com') ? personalInfo.linkedin : `linkedin.com/in/${personalInfo.linkedin}`}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 truncate max-w-[180px] hover:underline"
              >
                <Linkedin className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>{personalInfo.linkedin}</span>
              </a>
            )}
            {personalInfo.github && (
              <a 
                href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github.includes('github.com') ? personalInfo.github : `github.com/${personalInfo.github}`}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 truncate max-w-[180px] hover:underline"
              >
                <Github className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>{personalInfo.github}</span>
              </a>
            )}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 shadow-md shrink-0 bg-white" style={{ borderColor: theme.primary }}>
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Career Objective */}
      {personalInfo.summary && (
        <div className="space-y-2">
          <span 
            className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
            style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
          >
            Career Objective
          </span>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="space-y-3">
          <span 
            className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
            style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
          >
            Work Experience
          </span>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid border-l-2 pl-4 space-y-1" style={{ borderColor: theme.primary }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{exp.position}</h4>
                    <div className="text-xs font-semibold" style={{ color: theme.primary }}>{exp.company}</div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs text-slate-700 leading-relaxed">{exp.description}</p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-slate-700">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: theme.primary }} />
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

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="space-y-2.5">
          <span 
            className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
            style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
          >
            Skills & Competencies
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {skills.map((cat, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                <div className="text-[11px] font-bold" style={{ color: theme.primary }}>{cat.category}</div>
                <div className="flex flex-wrap gap-1">
                  {cat.items.map((it, i) => (
                    <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded font-medium text-slate-700 shadow-2xs">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Works */}
      {manualWorks && manualWorks.length > 0 && (
        <div className="space-y-2.5">
          <span 
            className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
            style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
          >
            Manual Testing
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {manualWorks.map((item) => (
              <div key={item.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1 text-xs">
                <div className="font-bold text-slate-900">{item.title}</div>
                <p className="text-slate-600 text-[11px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="space-y-2">
          <span 
            className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
            style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
          >
            Education
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {education.map((edu) => (
              <div key={edu.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-0.5 text-xs">
                <div className="font-bold text-slate-900">{edu.degree} in {edu.field}</div>
                <div className="text-slate-600">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
