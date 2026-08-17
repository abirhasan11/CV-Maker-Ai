import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Wrench, 
  ExternalLink,
  BookOpen,
  UserCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Terminal,
  ShieldCheck,
  Star
} from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { THEME_COLORS, getFontFamilyClass, getFontSizeClasses, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const ModernSidebarTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = THEME_COLORS[config.colorTheme];
  const fontClass = getFontFamilyClass(config.fontFamily);
  const sizeClasses = getFontSizeClasses(config.fontSize);
  const spacing = getSpacingClasses(config.density);

  const { 
    personalInfo, 
    experiences = [], 
    education = [], 
    skills = [], 
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
    <div className={`w-full bg-white text-slate-800 ${fontClass} flex flex-col md:flex-row print:!flex-row min-h-[1050px] shadow-sm`}>
      {/* Left Sidebar (Darker Accent / High Contrast) */}
      <div 
        className="w-full md:w-[33%] print:!w-[33%] print:!block p-5 sm:p-6 text-white flex flex-col justify-between shrink-0"
        style={{ 
          backgroundColor: theme.primary,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="space-y-4 sm:space-y-5">
          {/* Profile Photo */}
          {config.showPhoto && personalInfo.photoUrl && (
            <div className="flex justify-center mb-1">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg p-0.5 bg-white/10 backdrop-blur-xs">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 border-b border-white/20 pb-1">
              <UserCheck className="w-3.5 h-3.5 text-white/80" />
              <h4 className="text-[11px] font-bold tracking-wider uppercase text-white/90">
                Contact Info
              </h4>
            </div>
            <div className="space-y-1.5 text-xs text-white/90">
              {personalInfo.email && (
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center space-x-2 break-all bg-white/10 hover:bg-white/15 px-2 py-1 rounded-lg border border-white/10 transition-colors text-white group"
                >
                  <Mail className="w-3.5 h-3.5 text-white/80 shrink-0 group-hover:text-white" />
                  <span className="text-[11px] leading-tight truncate group-hover:underline">{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <a 
                  href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/15 px-2 py-1 rounded-lg border border-white/10 transition-colors text-white group"
                >
                  <Phone className="w-3.5 h-3.5 text-white/80 shrink-0 group-hover:text-white" />
                  <span className="text-[11px] leading-tight group-hover:underline">{personalInfo.phone}</span>
                </a>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-2 bg-white/10 px-2 py-1 rounded-lg border border-white/10 text-white">
                  <MapPin className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  <span className="text-[11px] leading-tight">{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <a 
                  href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin.includes('linkedin.com') ? personalInfo.linkedin : `linkedin.com/in/${personalInfo.linkedin}`}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 break-all bg-white/10 hover:bg-white/15 px-2 py-1 rounded-lg border border-white/10 transition-colors text-white group"
                >
                  <Linkedin className="w-3.5 h-3.5 text-white/80 shrink-0 group-hover:text-white" />
                  <span className="text-[11px] leading-tight truncate group-hover:underline">{personalInfo.linkedin}</span>
                </a>
              )}
              {personalInfo.github && (
                <a 
                  href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github.includes('github.com') ? personalInfo.github : `github.com/${personalInfo.github}`}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 break-all bg-white/10 hover:bg-white/15 px-2 py-1 rounded-lg border border-white/10 transition-colors text-white group"
                >
                  <Github className="w-3.5 h-3.5 text-white/80 shrink-0 group-hover:text-white" />
                  <span className="text-[11px] leading-tight truncate group-hover:underline">{personalInfo.github}</span>
                </a>
              )}
              {personalInfo.website && (
                <a 
                  href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 break-all bg-white/10 hover:bg-white/15 px-2 py-1 rounded-lg border border-white/10 transition-colors text-white group"
                >
                  <Globe className="w-3.5 h-3.5 text-white/80 shrink-0 group-hover:text-white" />
                  <span className="text-[11px] leading-tight truncate group-hover:underline">{personalInfo.website}</span>
                </a>
              )}
            </div>
          </div>

          {/* Skills List in Sidebar */}
          {skills && skills.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 border-b border-white/20 pb-1">
                <Wrench className="w-3.5 h-3.5 text-white/80" />
                <h4 className="text-[11px] font-bold tracking-wider uppercase text-white/90">
                  2. Technical Skills
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                {skills.map((cat, idx) => (
                  <div key={idx} className="bg-white/10 rounded-xl p-2 border border-white/10 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                      {cat.category}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-white/20 text-white shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education in Sidebar */}
          {education && education.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 border-b border-white/20 pb-1">
                <GraduationCap className="w-3.5 h-3.5 text-white/80" />
                <h4 className="text-[11px] font-bold tracking-wider uppercase text-white/90">
                  4. Education
                </h4>
              </div>
              <div className="space-y-1.5 text-xs">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white/10 rounded-xl p-2 border border-white/10 space-y-0.5">
                    <div className="font-bold text-white leading-tight text-[11px]">{edu.degree}</div>
                    <div className="text-white/80 text-[10px] leading-tight">{edu.institution}</div>
                    <div className="text-white/60 text-[9px] flex justify-between pt-0.5 font-medium">
                      <span>{edu.startDate} – {edu.endDate}</span>
                      {edu.grade && <span className="font-bold text-white bg-white/20 px-1 py-0.2 rounded-xs">{edu.grade}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Content Area (Ordered: 1. Summary -> 2. Technical Skills -> 3. Projects -> 4. Education -> 5. Experience -> 6. Trainings -> 7. Extra -> 8. References) */}
      <div className="w-full md:w-[67%] print:!w-[67%] print:!block p-6 sm:p-7 flex flex-col justify-start space-y-4">
        <div className="space-y-4">
          {/* Name & Title Header */}
          <div className="pb-3 border-b-2 flex flex-col sm:flex-row sm:items-end justify-between gap-2" style={{ borderColor: theme.primary }}>
            <div>
              <h1 className={`${sizeClasses.name} text-slate-900 font-extrabold tracking-tight leading-none mb-1`}>
                {personalInfo.fullName || 'Abir Hasan'}
              </h1>
              <h2 className="text-sm font-bold tracking-wide flex items-center space-x-1.5" style={{ color: theme.primary }}>
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>{personalInfo.jobTitle || 'Aspiring SQA Professional'}</span>
              </h2>
            </div>
            
            {/* Verified Badge */}
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold self-start sm:self-auto bg-slate-100 text-slate-700 border border-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>ATS Ready Profile</span>
            </div>
          </div>

          {/* 1. Career Objective */}
          {personalInfo.summary && (
            <div className="space-y-1.5 page-break-avoid">
              <div 
                className="border-b-2 pb-0.5 mb-1 flex items-center justify-between"
                style={{ borderColor: theme.primary }}
              >
                <h3 
                  className="text-xs font-extrabold uppercase tracking-wider"
                  style={{ color: theme.primary }}
                >
                  1. Career Objective
                </h3>
              </div>
              <p className={`${sizeClasses.body} text-slate-700 leading-relaxed text-justify bg-slate-50/60 p-2.5 rounded-xl border border-slate-100`}>
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* 3. Projects */}
          {((manualWorks && manualWorks.length > 0) || (automationWorks && automationWorks.length > 0) || (projects && projects.length > 0)) && (
            <div className="space-y-3 page-break-avoid">
              <div 
                className="border-b-2 pb-0.5 mb-1 flex items-center justify-between"
                style={{ borderColor: theme.primary }}
              >
                <h3 
                  className="text-xs font-extrabold uppercase tracking-wider"
                  style={{ color: theme.primary }}
                >
                  3. Projects
                </h3>
              </div>

              {/* Manual Testing */}
              {manualWorks && manualWorks.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    Manual Testing
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {manualWorks.map((item) => (
                      <div key={item.id} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <div className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{item.title}</span>
                            </div>
                          </div>
                          {item.link && (
                            <a 
                              href={item.link.startsWith('http') ? item.link : `https://${item.link}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-white px-2 py-1 rounded-lg border border-blue-200 shadow-2xs hover:bg-blue-50 transition-all shrink-0"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>View Project</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Automation Testing */}
              {automationWorks && automationWorks.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    Automation Testing
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {automationWorks.map((item) => (
                      <div key={item.id} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <div className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span>{item.projectName}</span>
                          </div>
                          {item.link && (
                            <a 
                              href={item.link.startsWith('http') ? item.link : `https://${item.link}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs hover:bg-blue-50 transition-all self-start sm:self-auto shrink-0"
                            >
                              <Github className="w-3 h-3" />
                              <span>GitHub Repository</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Projects */}
              {projects && projects.length > 0 && (
                <div className="space-y-2 pt-1">
                  {projects.map((proj) => (
                    <div key={proj.id} className="page-break-avoid space-y-1 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className={`${sizeClasses.title} text-slate-900 font-bold`}>{proj.name}</span>
                          {proj.role && <span className="text-xs text-slate-600 font-medium">({proj.role})</span>}
                        </div>
                        {proj.link && (
                          <a 
                            href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-blue-600 font-bold hover:underline inline-flex items-center space-x-1"
                          >
                            <span>{proj.link}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {proj.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-1.5 py-0.2 rounded text-[10px] bg-white text-slate-700 border border-slate-200 font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {proj.description && (
                        <p className={`${sizeClasses.body} text-slate-700 leading-relaxed`}>
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. Work Experience Section */}
          {experiences && experiences.length > 0 && (
            <div className="space-y-2 page-break-avoid">
              <div 
                className="border-b-2 pb-0.5 mb-1 flex items-center justify-between"
                style={{ borderColor: theme.primary }}
              >
                <h3 
                  className="text-xs font-extrabold uppercase tracking-wider"
                  style={{ color: theme.primary }}
                >
                  5. Work Experience
                </h3>
              </div>
              <div className={spacing.itemGap}>
                {experiences.map((exp) => (
                  <div key={exp.id} className="page-break-avoid space-y-1.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <span className={`${sizeClasses.title} font-bold text-slate-900`}>{exp.jobTitle}</span>
                        <span className="text-xs font-bold text-slate-700 ml-1.5">
                          @ {exp.company}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 shrink-0">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.location && (
                      <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className={`list-disc list-outside ml-4 ${spacing.bulletGap} text-slate-700 ${sizeClasses.body}`}>
                        {exp.bullets.filter(b => b.trim()).map((b, bIdx) => (
                          <li key={bIdx} className="pl-0.5 leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Training */}
          {trainings && trainings.length > 0 && (
            <div className="pt-1 page-break-avoid space-y-1.5 p-3 rounded-xl border border-slate-200 bg-slate-50/60">
              <div className="flex items-center space-x-1.5 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                  6. Professional Training
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {trainings.map((item) => (
                  <div key={item.id} className="space-y-1 text-xs bg-white p-2 rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-900 text-[11px] leading-snug">
                      {item.courseTitle}
                    </div>
                    {item.duration && (
                      <div className="text-[10px] text-slate-500 font-medium flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                    {item.organization && (
                      <div className="text-[10px] text-slate-700 font-medium">
                        🏢 {item.organization}
                      </div>
                    )}
                    {item.linkUrl && (
                      <a 
                        href={item.linkUrl.startsWith('http') ? item.linkUrl : `https://${item.linkUrl}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-[10px] text-blue-600 hover:underline font-bold pt-0.5"
                      >
                        <span>{item.linkText || 'Course Link'}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Professional Reference Section Card */}
          {references && references.length > 0 && (
            <div className="space-y-2 pt-1 page-break-avoid">
              <div 
                className="border-b-2 pb-0.5 mb-1 flex items-center justify-between"
                style={{ borderColor: theme.primary }}
              >
                <h3 
                  className="text-xs font-extrabold uppercase tracking-wider"
                  style={{ color: theme.primary }}
                >
                  7. Professional References
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {references.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white shadow-2xs flex flex-col justify-between space-y-1.5">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                          {item.name ? item.name.charAt(0) : 'R'}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs">{item.name}</div>
                          {item.designation && (
                            <div className="text-[11px] font-semibold text-indigo-700 leading-tight">
                              {item.designation}
                            </div>
                          )}
                        </div>
                      </div>
                      {item.companyLocation && (
                        <div className="text-[10px] text-slate-600 flex items-center space-x-1 pl-9">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{item.companyLocation}</span>
                        </div>
                      )}
                    </div>

                    {item.email && (
                      <div className="pt-1.5 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 font-medium">Email:</span>
                        <a 
                          href={`mailto:${item.email}`}
                          className="font-mono text-blue-600 font-bold hover:underline"
                        >
                          {item.email}
                        </a>
                      </div>
                    )}
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
