import React from 'react';
import { 
  Mail, Phone, MapPin, Globe, Linkedin, Github, CheckCircle2, 
  ExternalLink, Award, BookOpen, Layers, Briefcase, GraduationCap, 
  Sparkles, Code2, Bug, ShieldCheck, Terminal, Star
} from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getFontSizeClasses, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const GraphicalBannerTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const sizeClasses = getFontSizeClasses(config.fontSize);
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
    <div className={`w-full bg-slate-50/50 text-slate-800 ${fontClass} min-h-[1050px] flex flex-col justify-between`}>
      {/* High-Impact Graphical Header */}
      <div 
        className="relative px-8 pt-8 pb-7 text-white overflow-hidden shadow-sm"
        style={{ 
          background: theme.gradient || theme.primary,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        {/* Background Graphic Patterns */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute left-1/3 -top-12 w-64 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-row items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-[75%]">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-white" />
              <span>{personalInfo.jobTitle || 'SQA & Test Automation Engineer'}</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight leading-none uppercase">
              {personalInfo.fullName || 'Abir Hasan'}
            </h1>

            {/* Contact Pills */}
            <div className="flex flex-wrap gap-2 text-xs pt-1">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-1.5 bg-black/20 hover:bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-md transition-colors">
                  <Mail className="w-3.5 h-3.5 opacity-90" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`} className="flex items-center space-x-1.5 bg-black/20 hover:bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-md transition-colors">
                  <Phone className="w-3.5 h-3.5 opacity-90" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-1.5 bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-md">
                  <MapPin className="w-3.5 h-3.5 opacity-90" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <a 
                  href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin.includes('linkedin.com') ? personalInfo.linkedin : `linkedin.com/in/${personalInfo.linkedin}`}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 bg-black/20 hover:bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-md transition-colors hover:underline"
                >
                  <Linkedin className="w-3.5 h-3.5 opacity-90" />
                  <span className="truncate max-w-[180px]">{personalInfo.linkedin}</span>
                </a>
              )}
              {personalInfo.github && (
                <a 
                  href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github.includes('github.com') ? personalInfo.github : `github.com/${personalInfo.github}`}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 bg-black/20 hover:bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-md transition-colors hover:underline"
                >
                  <Github className="w-3.5 h-3.5 opacity-90" />
                  <span className="truncate max-w-[180px]">{personalInfo.github}</span>
                </a>
              )}
            </div>
          </div>

          {/* Photo */}
          {config.showPhoto && personalInfo.photoUrl && (
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-3 border-white shadow-xl shrink-0 bg-white">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-7 space-y-5 flex-1">
        {/* Career Objective */}
        {personalInfo.summary && (
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2">
              <span 
                className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
                style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
              >
                Career Objective
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && (
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span 
                className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
                style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
              >
                Work Experience
              </span>
            </div>
            <div className={spacing.itemGap}>
              {experiences.map((exp) => (
                <div key={exp.id} className="page-break-avoid border-l-3 pl-3.5 space-y-1.5" style={{ borderColor: theme.primary }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{exp.position}</h4>
                      <div className="text-xs font-semibold" style={{ color: theme.primary }}>{exp.company}</div>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
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

        {/* Technical Skills & Competencies */}
        {skills && skills.length > 0 && (
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span 
                className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
                style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
              >
                Skills & Competencies
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skills.map((skillCat, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 space-y-1.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wide flex items-center space-x-1.5" style={{ color: theme.primary }}>
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{skillCat.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skillCat.items.map((item, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-white border border-slate-200 text-slate-800 shadow-2xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2-Column QA Sample Works Grid */}
        {((manualWorks && manualWorks.length > 0) || (automationWorks && automationWorks.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {manualWorks && manualWorks.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                >
                  Manual Testing
                </span>
                <div className="space-y-2">
                  {manualWorks.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1 text-xs">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <p className="text-slate-600 text-[11px]">{item.description}</p>
                      {item.link && (
                        <span className="text-[10px] font-semibold text-blue-600 block truncate">{item.link}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {automationWorks && automationWorks.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                >
                  Automation Testing
                </span>
                <div className="space-y-2">
                  {automationWorks.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1 text-xs">
                      <div className="font-bold text-slate-900">• {item.projectName || (item as any).title}</div>
                      {item.link && (
                        <div className="text-[11px] text-slate-600 pl-2">
                          <a 
                            href={item.link.startsWith('http') ? item.link : `https://${item.link}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-blue-600 underline font-mono"
                          >
                            {item.link}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Education, Trainings & References */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Education */}
          {education && education.length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
              <span 
                className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
                style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
              >
                Education
              </span>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5 text-xs">
                    <div className="font-bold text-slate-900">{edu.degree} in {edu.field}</div>
                    <div className="font-semibold text-slate-700">{edu.institution}</div>
                    <div className="text-[11px] text-slate-500">{edu.startDate} – {edu.endDate} {edu.grade && `| CGPA: ${edu.grade}`}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Training / Certifications */}
          {((trainings && trainings.length > 0) || (certifications && certifications.length > 0)) && (
            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
              <span 
                className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest text-white shadow-2xs inline-block"
                style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
              >
                Training & Certifications
              </span>
              <div className="space-y-2">
                {trainings.map((t) => (
                  <div key={t.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5 text-xs">
                    <div className="font-bold text-slate-900">{t.title}</div>
                    <div className="text-[11px] text-slate-600">{t.institution} ({t.year})</div>
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
