import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { THEME_COLORS, getFontFamilyClass, getFontSizeClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const CompactFresherTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = THEME_COLORS[config.colorTheme] || THEME_COLORS.corporate;
  const fontClass = getFontFamilyClass(config.fontFamily);

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
    <div className={`w-full bg-white text-slate-800 ${fontClass} p-6 min-h-[1050px] space-y-3 text-xs leading-snug shadow-sm`}>
      {/* Top Compact Header */}
      <div className="border-b pb-2 text-center" style={{ borderColor: theme.primary }}>
        <div className="flex flex-col items-center justify-center gap-1.5">
          {config.showPhoto && personalInfo.photoUrl && (
            <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-300 shrink-0 mb-0.5">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="text-center">
            <h1 className="text-xl font-bold text-slate-900 leading-tight">
              {personalInfo.fullName || 'Abir Hasan'}
            </h1>
            <div className="text-xs font-semibold mt-0.5" style={{ color: theme.primary }}>
              {personalInfo.jobTitle || 'Aspiring SQA Professional'}
            </div>
            <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-0.5 text-[11px] text-slate-600 mt-1">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="hover:underline hover:text-blue-600">
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span>
                  •{' '}
                  <a href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`} className="hover:underline hover:text-blue-600">
                    {personalInfo.phone}
                  </a>
                </span>
              )}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.github && (
                <span>
                  •{' '}
                  <a 
                    href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github.includes('github.com') ? personalInfo.github : `github.com/${personalInfo.github}`}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-blue-600 underline font-mono"
                  >
                    {personalInfo.github}
                  </a>
                </span>
              )}
              {personalInfo.linkedin && (
                <span>
                  •{' '}
                  <a 
                    href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin.includes('linkedin.com') ? personalInfo.linkedin : `linkedin.com/in/${personalInfo.linkedin}`}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-blue-600 underline font-mono"
                  >
                    {personalInfo.linkedin}
                  </a>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 1. Summary / Career Objective */}
      {personalInfo.summary && (
        <div className="space-y-1 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs font-bold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              1. Career Objective
            </h3>
          </div>
          <p className="text-[11.5px] text-slate-700 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* 2. Technical Skills */}
      {skills && skills.length > 0 && (
        <div className="space-y-1 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs font-bold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              2. Technical Skills
            </h3>
          </div>
          <div className="space-y-0.5 text-[11px]">
            {skills.map((cat, idx) => (
              <div key={idx}>
                <span className="font-bold text-slate-900">• {cat.category}: </span>
                <span className="text-slate-700">{cat.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Projects */}
      {((manualWorks && manualWorks.length > 0) || (automationWorks && automationWorks.length > 0) || (projects && projects.length > 0)) && (
        <div className="space-y-2 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs font-bold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              3. Projects
            </h3>
          </div>

          {/* Manual Testing */}
          {manualWorks && manualWorks.length > 0 && (
            <div className="space-y-1 pl-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
                Manual Testing
              </div>
              <div className="space-y-1 text-[11px]">
                {manualWorks.map((item) => (
                  <div key={item.id} className="flex items-start space-x-1.5">
                    <span className="font-bold text-slate-900">•</span>
                    <div>
                      <span className="font-bold text-slate-900">{item.title}</span>
                      {item.link && (
                        <div className="text-slate-600 pl-2">
                          <span>Link: </span>
                          <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-mono">
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
            <div className="space-y-1 pl-1 pt-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
                Automation Testing
              </div>
              <div className="space-y-1 text-[11px]">
                {automationWorks.map((item) => (
                  <div key={item.id} className="flex items-start space-x-1.5">
                    <span className="font-bold text-slate-900">•</span>
                    <div>
                      <span className="font-bold text-slate-900">{item.projectName}</span>
                      {item.link && (
                        <div className="text-slate-600 pl-2 text-[10px]">
                          <span>Link: </span>
                          <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-mono">
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
            <div className="space-y-1 pl-1 pt-0.5">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5 text-[11px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-mono text-[10px]">
                        {proj.link}
                      </a>
                    )}
                  </div>
                  {proj.description && <p className="text-slate-600">{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. Education */}
      {education && education.length > 0 && (
        <div className="space-y-1 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs font-bold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              4. Education
            </h3>
          </div>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-600"> – {edu.institution}</span>
                  {edu.grade && <span className="font-semibold text-slate-700 ml-1.5">({edu.grade})</span>}
                  {edu.highlights && <div className="text-[10.5px] text-slate-500 italic">{edu.highlights}</div>}
                </div>
                <span className="text-[10.5px] text-slate-500 shrink-0">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Work Experience */}
      {experiences && experiences.length > 0 && (
        <div className="space-y-1 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs font-bold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              5. Work Experience
            </h3>
          </div>
          <div className="space-y-1.5">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{exp.jobTitle}</span>
                    <span className="text-slate-600"> @ {exp.company}</span>
                  </div>
                  <span className="text-[10.5px] text-slate-500">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-4 space-y-0.5 text-slate-700 text-[11px]">
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

      {/* 6. Training & Certifications */}
      {((trainings && trainings.length > 0) || (certifications && certifications.length > 0)) && (
        <div className="space-y-1 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs font-bold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              6. Training & Certifications
            </h3>
          </div>
          {trainings && trainings.length > 0 && (
            <div className="space-y-1 text-[11px]">
              {trainings.map((item) => (
                <div key={item.id} className="space-y-0.5">
                  <div className="font-bold text-slate-900">• {item.courseTitle} <span className="font-normal text-slate-500 font-mono">({item.duration})</span></div>
                  {item.organization && <div className="text-slate-600 pl-3">• {item.organization}</div>}
                  {item.linkUrl && (
                    <div className="text-slate-600 pl-3">
                      <span>• {item.linkText || 'Link:'} </span>
                      <a href={item.linkUrl.startsWith('http') ? item.linkUrl : `https://${item.linkUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-mono">
                        {item.linkUrl}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {certifications && certifications.length > 0 && (
            <div className="space-y-0.5 text-[11px] pt-0.5">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">• {c.name}</span>
                    <span className="text-slate-500 ml-1">({c.issuer})</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px]">{c.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 7. References */}
      {references && references.length > 0 && (
        <div className="space-y-1 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs font-bold uppercase tracking-wider font-sans"
              style={{ color: theme.primary }}
            >
              7. Reference
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            {references.map((item) => (
              <div key={item.id} className="p-1.5 bg-slate-50 border border-slate-200 rounded-sm space-y-0.5">
                <div className="font-bold text-slate-900">{item.name}</div>
                {item.designation && <div className="text-slate-700 text-[10.5px]">{item.designation}, {item.companyLocation}</div>}
                {item.email && <div className="text-slate-600 text-[10px] font-mono">Email: {item.email}</div>}
                {item.phone && <div className="text-slate-600 text-[10px] font-mono">Phone: {item.phone}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
