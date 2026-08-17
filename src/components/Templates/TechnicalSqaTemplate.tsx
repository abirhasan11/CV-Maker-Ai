import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { THEME_COLORS, getFontFamilyClass, getFontSizeClasses, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const TechnicalSqaTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
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
    <div className={`w-full bg-white text-slate-800 ${fontClass} p-8 min-h-[1050px] space-y-4 shadow-sm font-sans`}>
      {/* Header with Developer/SQA accent line */}
      <div className="border-b pb-3 text-center" style={{ borderColor: theme.primary }}>
        <div className="flex flex-col items-center justify-center gap-2">
          {config.showPhoto && personalInfo.photoUrl && (
            <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-300 shrink-0 mb-1 shadow-2xs">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="space-y-1">
            <h1 className={`${sizeClasses.name} text-slate-950 font-extrabold tracking-tight`}>
              {personalInfo.fullName || 'Abir Hasan'}
            </h1>
            <div className="text-sm font-semibold tracking-wide" style={{ color: theme.primary }}>
              {personalInfo.jobTitle || 'Aspiring SQA Professional'}
            </div>

            {/* Contact Row */}
            <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 text-xs text-slate-600 pt-1.5 font-mono">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-1 hover:text-blue-600">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`} className="flex items-center space-x-1 hover:text-blue-600">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              {personalInfo.location && (
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.linkedin && (
                <a 
                  href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin.includes('linkedin.com') ? personalInfo.linkedin : `linkedin.com/in/${personalInfo.linkedin}`}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:underline"
                >
                  <Linkedin className="w-3 h-3 text-slate-400" />
                  <span>{personalInfo.linkedin}</span>
                </a>
              )}
              {personalInfo.github && (
                <a 
                  href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github.includes('github.com') ? personalInfo.github : `github.com/${personalInfo.github}`}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:underline"
                >
                  <Github className="w-3 h-3 text-slate-400" />
                  <span>{personalInfo.github}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 1. Career Objective / Summary */}
      {personalInfo.summary && (
        <div className="space-y-1 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider"
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
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider"
              style={{ color: theme.primary }}
            >
              2. Technical Competencies & Tools
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {skills.map((cat, idx) => (
              <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded-md">
                <span className="font-bold font-mono text-slate-900">{cat.category}: </span>
                <span className="text-slate-700">{cat.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Projects */}
      {((manualWorks && manualWorks.length > 0) || (automationWorks && automationWorks.length > 0) || (projects && projects.length > 0)) && (
        <div className="space-y-2.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider"
              style={{ color: theme.primary }}
            >
              3. Projects
            </h3>
          </div>

          {/* Manual Testing */}
          {manualWorks && manualWorks.length > 0 && (
            <div className="space-y-1.5 pl-1">
              <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                Manual Testing
              </div>
              <div className="space-y-1.5 text-xs">
                {manualWorks.map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <span className="font-bold text-slate-900">•</span>
                    <div>
                      <span className="font-bold text-slate-900">{item.title}</span>
                      {item.link && (
                        <div className="text-[11px] text-slate-600 pl-3 font-mono">
                          <span>Link: </span>
                          <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
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
            <div className="space-y-1.5 pl-1 pt-1">
              <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                Automation Testing
              </div>
              <div className="space-y-1.5 text-xs">
                {automationWorks.map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <span className="font-bold text-slate-900">•</span>
                    <div>
                      <span className="font-bold text-slate-900">{item.projectName}</span>
                      {item.link && (
                        <div className="text-[11px] text-slate-600 pl-3 font-mono">
                          <span>Link: </span>
                          <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
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
            <div className="space-y-1.5 pl-1 pt-1">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-mono text-[11px]">
                        {proj.link}
                      </a>
                    )}
                  </div>
                  {proj.description && <p className="text-slate-700">{proj.description}</p>}
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
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider"
              style={{ color: theme.primary }}
            >
              4. Education
            </h3>
          </div>
          <div className="space-y-1.5 text-xs px-0.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-600"> – {edu.institution}</span>
                  {edu.grade && <span className="font-semibold text-slate-800 ml-1.5 font-mono">[{edu.grade}]</span>}
                </div>
                <span className="text-slate-500 font-mono text-[11px] shrink-0">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Work Experience */}
      {experiences && experiences.length > 0 && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider"
              style={{ color: theme.primary }}
            >
              5. Work Experience
            </h3>
          </div>
          <div className="space-y-2 px-0.5">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1 text-xs">
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-slate-900">
                    <span>{exp.jobTitle}</span>
                    <span className="text-slate-600 font-normal ml-1">@ {exp.company}</span>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-4 space-y-0.5 text-slate-700">
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

      {/* 6. Training */}
      {trainings && trainings.length > 0 && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider"
              style={{ color: theme.primary }}
            >
              6. Training & Courses
            </h3>
          </div>
          <div className="space-y-1.5 text-xs px-0.5">
            {trainings.map((item) => (
              <div key={item.id} className="space-y-0.5">
                <div className="font-bold text-slate-900">• {item.courseTitle} <span className="font-normal text-slate-600 font-mono">({item.duration})</span></div>
                {item.organization && <div className="text-slate-600 pl-3">• {item.organization}</div>}
                {item.linkUrl && (
                  <div className="text-slate-600 pl-3 font-mono text-[11px]">
                    <span>• {item.linkText || 'Fb Link:'} </span>
                    <a href={item.linkUrl.startsWith('http') ? item.linkUrl : `https://${item.linkUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {item.linkUrl}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
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
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider"
              style={{ color: theme.primary }}
            >
              7. Reference
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs px-0.5">
            {references.map((item) => (
              <div key={item.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-md space-y-0.5">
                <div className="font-bold text-slate-900">{item.name}</div>
                {item.designation && <div className="text-slate-700 text-[11px]">{item.designation}, {item.companyLocation}</div>}
                {item.email && <div className="text-slate-600 text-[11px] font-mono">Email: {item.email}</div>}
                {item.phone && <div className="text-slate-600 text-[11px] font-mono">Phone: {item.phone}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
