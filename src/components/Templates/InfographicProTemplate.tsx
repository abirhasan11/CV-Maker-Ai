import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, CheckCircle, ExternalLink, Award, BookOpen, Layers, Briefcase, GraduationCap, Users } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { THEME_COLORS, getFontFamilyClass, getFontSizeClasses, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const InfographicProTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = THEME_COLORS[config.colorTheme];
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
    projects = [], 
    certifications = [], 
    languages = [], 
    interests = [] 
  } = resume;

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} min-h-[1050px] flex flex-col justify-between`}>
      {/* Top Banner Header */}
      <div 
        className="p-8 text-white relative overflow-hidden"
        style={{ 
          backgroundColor: theme.primary,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="flex flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight uppercase leading-none">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-semibold tracking-wider uppercase">
              {personalInfo.jobTitle || 'Aspiring SQA Professional'}
            </div>
            
            {/* Contact Pills */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/90 pt-1">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-1 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5 opacity-80" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`} className="flex items-center space-x-1 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 opacity-80" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 opacity-80" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <a 
                  href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin.includes('linkedin.com') ? personalInfo.linkedin : `linkedin.com/in/${personalInfo.linkedin}`}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 hover:underline transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 opacity-80" />
                  <span className="truncate max-w-[200px]">{personalInfo.linkedin}</span>
                </a>
              )}
              {personalInfo.github && (
                <a 
                  href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github.includes('github.com') ? personalInfo.github : `github.com/${personalInfo.github}`}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 hover:underline transition-colors"
                >
                  <Github className="w-3.5 h-3.5 opacity-80" />
                  <span className="truncate max-w-[200px]">{personalInfo.github}</span>
                </a>
              )}
            </div>
          </div>

          {/* Optional Profile Photo with Ring */}
          {config.showPhoto && personalInfo.photoUrl && (
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-3 border-white/80 shadow-md shrink-0 bg-white">
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

      {/* Main Body with 2-Column Grid */}
      <div className={`p-8 grid grid-cols-1 md:grid-cols-12 gap-8 print:!grid-cols-12 flex-1`}>
        {/* Left Column (8 cols): Summary, Testing Works, Projects, Experience */}
        <div className="md:col-span-8 print:!col-span-8 space-y-6">
          {/* Career Objective */}
          {personalInfo.summary && (
            <div className={spacing.sectionGap}>
              <div className="flex items-center mb-2">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ 
                    backgroundColor: theme.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Career Objective
                </span>
              </div>
              <p className={`${sizeClasses.body} text-slate-700 leading-relaxed text-justify`}>
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Sample Works - Manual Testing */}
          {manualWorks && manualWorks.length > 0 && (
            <div className={spacing.sectionGap}>
              <div className="flex items-center mb-2">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ 
                    backgroundColor: theme.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Manual Testing
                </span>
              </div>
              <div className="space-y-2">
                {manualWorks.map((item) => (
                  <div key={item.id} className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                      <span className="font-bold text-xs text-slate-900">{item.title}</span>
                    </div>
                    {item.link && (
                      <div className="pl-4 text-[11px] text-slate-600">
                        <span className="font-semibold">Link: </span>
                        <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">
                          {item.link}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Automation Testing */}
          {automationWorks && automationWorks.length > 0 && (
            <div className={spacing.sectionGap}>
              <div className="flex items-center mb-2">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ 
                    backgroundColor: theme.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Automation Testing
                </span>
              </div>
              <div className="space-y-2.5">
                {automationWorks.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <div className="text-xs font-semibold text-slate-800 flex items-center space-x-1.5">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{item.projectName}</span>
                    </div>
                    {item.link && (
                      <div className="text-[11px] text-slate-600 pl-3">
                        <span className="font-semibold">Link: </span>
                        <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">
                          {item.link}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experiences && experiences.length > 0 && (
            <div className={spacing.sectionGap}>
              <div className="flex items-center mb-2">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ 
                    backgroundColor: theme.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Experience
                </span>
              </div>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1 page-break-avoid">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-xs text-slate-900">
                        {exp.jobTitle} <span className="font-semibold text-slate-600">@ {exp.company}</span>
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.bullets && (
                      <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
                        {exp.bullets.filter(b => b.trim()).map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Projects (if any) */}
          {projects && projects.length > 0 && (!manualWorks || manualWorks.length === 0) && (
            <div className={spacing.sectionGap}>
              <div className="flex items-center mb-2">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ 
                    backgroundColor: theme.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Key Projects
                </span>
              </div>
              <div className="space-y-2.5">
                {projects.map((p) => (
                  <div key={p.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-xs text-slate-900">{p.name}</span>
                      {p.link && <span className="text-[11px] text-blue-600">{p.link}</span>}
                    </div>
                    {p.description && <p className="text-xs text-slate-700">{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Skills, Training, Education, Extra Activities, References */}
        <div className="md:col-span-4 print:!col-span-4 space-y-6">
          {/* Skills with Modern Chips */}
          {skills && skills.length > 0 && (
            <div className={spacing.sectionGap}>
              <div className="flex items-center mb-2">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ 
                    backgroundColor: theme.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Skills
                </span>
              </div>
              <div className="space-y-2.5">
                {skills.map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                      {cat.category}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((item, itemIdx) => (
                        <span 
                          key={itemIdx} 
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium border"
                          style={{
                            backgroundColor: theme.lightBg ? '#f8fafc' : '#ffffff',
                            borderColor: theme.border ? '#e2e8f0' : '#cbd5e1',
                            color: '#1e293b'
                          }}
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

          {/* Training */}
          {trainings && trainings.length > 0 && (
            <div className={spacing.sectionGap}>
              <div className="flex items-center mb-2">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ 
                    backgroundColor: theme.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Training
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {trainings.map((item) => (
                  <div key={item.id} className="space-y-0.5">
                    <div className="font-bold text-slate-900">• {item.courseTitle}</div>
                    {item.duration && <div className="text-[11px] text-slate-500 pl-2">({item.duration})</div>}
                    {item.organization && <div className="text-slate-600 pl-2">• {item.organization}</div>}
                    {item.linkUrl && (
                      <div className="text-slate-600 pl-2 text-[11px]">
                        <span>• {item.linkText || 'Fb Link:'} </span>
                        <a href={item.linkUrl.startsWith('http') ? item.linkUrl : `https://${item.linkUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">
                          {item.linkUrl}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div className={spacing.sectionGap}>
              <div className="flex items-center mb-2">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ 
                    backgroundColor: theme.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Education
                </span>
              </div>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5 text-xs">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.institution}</div>
                    <div className="text-[11px] text-slate-500">{edu.startDate} – {edu.endDate} {edu.grade && `| ${edu.grade}`}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extra- Activities */}
          {extraActivities && extraActivities.length > 0 && (
            <div className={spacing.sectionGap}>
              <div className="flex items-center mb-2">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ 
                    backgroundColor: theme.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Extra- Activities
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                {extraActivities.map((item) => (
                  <div key={item.id} className="space-y-0.5">
                    <div className="font-semibold text-slate-800 flex items-center space-x-1.5">
                      <span className="text-indigo-600 font-bold">✓</span>
                      <span>{item.projectName}</span>
                    </div>
                    {item.link && (
                      <div className="pl-4 text-[11px] text-slate-600">
                        <span>Link: </span>
                        <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">
                          {item.link}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reference */}
          {references && references.length > 0 && (
            <div className={spacing.sectionGap}>
              <div className="flex items-center mb-2">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ 
                    backgroundColor: theme.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Reference
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {references.map((item) => (
                  <div key={item.id} className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    {item.designation && <div className="text-slate-700 text-[11px]">{item.designation}, {item.companyLocation}</div>}
                    {item.email && <div className="text-slate-600 text-[11px]">Email: <span className="font-mono">{item.email}</span></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className={spacing.sectionGap}>
              <div className="flex items-center mb-2">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ 
                    backgroundColor: theme.primary,
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  Languages
                </span>
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                {languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="font-medium text-slate-900">{lang.name}</span>
                    <span className="text-slate-500 text-[11px]">{lang.proficiency}</span>
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
