import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github 
} from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { THEME_COLORS, getFontFamilyClass, getFontSizeClasses, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const MinimalTechTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = THEME_COLORS[config.colorTheme] || THEME_COLORS.corporate;
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
    <div className={`w-full bg-white text-slate-800 ${fontClass} p-8 sm:p-10 min-h-[1050px] space-y-4 shadow-sm`}>
      {/* Header */}
      <div className="border-b pb-3 text-center" style={{ borderColor: theme.primary }}>
        <div className="flex flex-col items-center justify-center gap-1.5">
          {config.showPhoto && personalInfo.photoUrl && (
            <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-200 shrink-0 mb-1 shadow-2xs">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h1 className={`${sizeClasses.name} text-slate-900 tracking-tight font-extrabold`}>
              {personalInfo.fullName || 'Abir Hasan'}
            </h1>
            <h2 className="text-sm font-semibold tracking-wide mt-0.5" style={{ color: theme.primary }}>
              {personalInfo.jobTitle || 'Aspiring SQA Professional'}
            </h2>
          </div>
        </div>

        {/* Contact info inline bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 text-xs text-slate-600 mt-2.5 font-mono">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{personalInfo.email}</span>
            </a>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`} className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <Phone className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{personalInfo.phone}</span>
            </a>
          )}
          {personalInfo.location && (
            <span className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{personalInfo.location}</span>
            </span>
          )}
          {personalInfo.linkedin && (
            <a 
              href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin.includes('linkedin.com') ? personalInfo.linkedin : `linkedin.com/in/${personalInfo.linkedin}`}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-blue-600 hover:underline transition-colors"
            >
              <Linkedin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{personalInfo.linkedin}</span>
            </a>
          )}
          {personalInfo.github && (
            <a 
              href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github.includes('github.com') ? personalInfo.github : `github.com/${personalInfo.github}`}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-blue-600 hover:underline transition-colors"
            >
              <Github className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{personalInfo.github}</span>
            </a>
          )}
          {personalInfo.website && (
            <a 
              href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-blue-600 hover:underline transition-colors"
            >
              <Globe className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{personalInfo.website}</span>
            </a>
          )}
        </div>
      </div>

      {/* 1. Career Objective */}
      {personalInfo.summary && (
        <div className="space-y-1 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              1. Career Objective
            </h3>
          </div>
          <p className={`${sizeClasses.body} text-slate-700 leading-relaxed text-justify px-0.5`}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* 2. Technical Skills */}
      {skills && skills.length > 0 && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              2. Technical Skills
            </h3>
          </div>
          <div className="space-y-1 text-xs px-0.5">
            {skills.map((cat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="font-bold text-slate-900 min-w-[200px] shrink-0">• {cat.category}:</span>
                <span className="text-slate-700">{cat.items.join(' • ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Projects */}
      {((manualWorks && manualWorks.length > 0) || (automationWorks && automationWorks.length > 0) || (projects && projects.length > 0)) && (
        <div className="space-y-2 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              3. Projects
            </h3>
          </div>

          {/* Manual Testing */}
          {manualWorks && manualWorks.length > 0 && (
            <div className="space-y-1.5 px-0.5">
              <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wide">
                Manual Testing
              </div>
              <div className="space-y-1.5 text-xs">
                {manualWorks.map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <span className="font-bold text-slate-900">•</span>
                    <div>
                      <span className="font-bold text-slate-900">{item.title}</span>
                      {item.link && (
                        <div className="text-slate-700 pl-3">
                          <span className="text-slate-500">Link: </span>
                          <a 
                            href={item.link.startsWith('http') ? item.link : `https://${item.link}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-blue-600 hover:underline font-mono"
                          >
                            {item.link}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Automation Testing */}
          {automationWorks && automationWorks.length > 0 && (
            <div className="space-y-1.5 px-0.5 pt-1">
              <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wide">
                Automation Testing
              </div>
              <div className="space-y-1.5 text-xs">
                {automationWorks.map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <span className="font-bold text-slate-900">•</span>
                    <div>
                      <span className="font-bold text-slate-900">{item.projectName}</span>
                      {item.link && (
                        <div className="text-slate-700 pl-3">
                          <span className="text-slate-500">Link: </span>
                          <a 
                            href={item.link.startsWith('http') ? item.link : `https://${item.link}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-blue-600 hover:underline font-mono"
                          >
                            {item.link}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="space-y-2 px-0.5 pt-1">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1 text-xs">
                  <div className="flex justify-between items-baseline">
                    <div className="font-bold text-slate-900">
                      <span>• {proj.name}</span>
                      {proj.role && <span className="font-normal text-slate-600 italic ml-2">({proj.role})</span>}
                    </div>
                    {proj.link && (
                      <a 
                        href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline font-mono text-[11px]"
                      >
                        {proj.link}
                      </a>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="text-[11px] text-slate-600 pl-3">
                      <span className="font-semibold text-slate-700">Technologies: </span>
                      {proj.technologies.join(', ')}
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-slate-700 leading-relaxed pl-3">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. Education */}
      {education && education.length > 0 && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              4. Education
            </h3>
          </div>
          <div className="space-y-2 px-0.5 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-600 ml-1">@ {edu.institution}</span>
                  {edu.grade && <span className="text-slate-700 font-mono font-semibold ml-2">[{edu.grade}]</span>}
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Work Experience */}
      {experiences && experiences.length > 0 && (
        <div className="space-y-2 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              5. Work Experience
            </h3>
          </div>
          <div className={`${spacing.itemGap} px-0.5`}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div>
                    <span className={`${sizeClasses.title} font-bold text-slate-900`}>{exp.jobTitle}</span>
                    <span className="text-xs font-semibold text-slate-600 ml-1.5">
                      @ {exp.company}
                    </span>
                    {exp.location && (
                      <span className="text-slate-400 text-xs ml-1">({exp.location})</span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && (
                  <ul className={`list-disc list-outside ml-4 ${spacing.bulletGap} text-slate-700 ${sizeClasses.body}`}>
                    {exp.bullets.filter(b => b.trim()).map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
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

      {/* 6. Training & Certifications */}
      {((trainings && trainings.length > 0) || (certifications && certifications.length > 0)) && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              6. Training & Certifications
            </h3>
          </div>
          {trainings && trainings.length > 0 && (
            <div className="space-y-2 px-0.5 text-xs">
              {trainings.map((item) => (
                <div key={item.id} className="space-y-0.5">
                  <div className="flex items-start space-x-2">
                    <span className="font-bold text-slate-900">•</span>
                    <div className="space-y-0.5 w-full">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900">{item.courseTitle}</span>
                        {item.duration && (
                          <span className="text-slate-500 font-mono text-[11px]">({item.duration})</span>
                        )}
                      </div>
                      {item.organization && (
                        <div className="flex items-start space-x-1.5 pl-3 text-slate-600">
                          <span className="font-bold">•</span>
                          <span>{item.organization}</span>
                        </div>
                      )}
                      {item.linkUrl && (
                        <div className="flex items-start space-x-1.5 pl-3 text-slate-600">
                          <span className="font-bold">•</span>
                          <div>
                            <span className="text-slate-500">{item.linkText || 'Fb Link:'} </span>
                            <a 
                              href={item.linkUrl.startsWith('http') ? item.linkUrl : `https://${item.linkUrl}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-blue-600 hover:underline font-mono"
                            >
                              {item.linkUrl}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {certifications && certifications.length > 0 && (
            <div className="space-y-1 px-0.5 text-xs pt-1">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">• {c.name}</span>
                    <span className="text-slate-600 italic ml-1.5">– {c.issuer}</span>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px]">{c.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 7. Reference */}
      {references && references.length > 0 && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              7. Reference
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-0.5 text-xs">
            {references.map((item) => (
              <div key={item.id} className="space-y-0.5 text-slate-800 border-l-2 border-slate-300 pl-3">
                <div className="font-bold text-slate-900">{item.name}</div>
                {item.designation && item.companyLocation && (
                  <div className="text-slate-700">{item.designation}, {item.companyLocation}</div>
                )}
                {item.designation && !item.companyLocation && (
                  <div className="text-slate-700">{item.designation}</div>
                )}
                {!item.designation && item.companyLocation && (
                  <div className="text-slate-700">{item.companyLocation}</div>
                )}
                {item.email && (
                  <div>Email: <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline font-mono">{item.email}</a></div>
                )}
                {item.phone && (
                  <div>Phone: <a href={`tel:${item.phone.replace(/[^\d+]/g, '')}`} className="text-blue-600 hover:underline font-mono">{item.phone}</a></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
