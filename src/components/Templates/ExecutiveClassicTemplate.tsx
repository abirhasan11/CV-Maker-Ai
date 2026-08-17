import React from 'react';
import { ResumeData, StyleConfig } from '../../types';
import { THEME_COLORS, getFontFamilyClass, getFontSizeClasses, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const ExecutiveClassicTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = THEME_COLORS[config.colorTheme] || THEME_COLORS.corporate;
  const fontClass = getFontFamilyClass(config.fontFamily || 'serif');
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
    <div className={`w-full bg-white text-slate-900 ${fontClass} p-8 sm:p-10 min-h-[1050px] space-y-4 shadow-sm`}>
      {/* Centered Header (Clean Rules, No Photo, Elegant Typography) */}
      <div className="text-center space-y-1 pb-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-950 font-serif">
          {personalInfo.fullName || 'Abir Hasan'}
        </h1>
        <h2 className="text-sm font-semibold tracking-wide text-slate-700">
          {personalInfo.jobTitle || 'Aspiring SQA Professional'}
        </h2>

        {/* Divider line under title */}
        <div className="w-full border-t border-slate-300 my-2"></div>

        {/* Centered Contact Info with Pipes */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-700 font-normal">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-700 hover:underline">
              {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && (
            <>
              <span className="text-slate-400">|</span>
              <a href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`} className="hover:text-blue-700 hover:underline">
                {personalInfo.phone}
              </a>
            </>
          )}
          {personalInfo.location && (
            <>
              <span className="text-slate-400">|</span>
              <span>{personalInfo.location}</span>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span className="text-slate-400">|</span>
              <a 
                href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin.includes('linkedin.com') ? personalInfo.linkedin : `linkedin.com/in/${personalInfo.linkedin}`}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn: {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            </>
          )}
          {personalInfo.github && (
            <>
              <span className="text-slate-400">|</span>
              <a 
                href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github.includes('github.com') ? personalInfo.github : `github.com/${personalInfo.github}`}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub: {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            </>
          )}
          {personalInfo.website && (
            <>
              <span className="text-slate-400">|</span>
              <a 
                href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </>
          )}
        </div>
      </div>

      {/* 1. SUMMARY / CAREER OBJECTIVE */}
      {personalInfo.summary && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-serif"
              style={{ color: theme.primary }}
            >
              1. Career Objective
            </h3>
          </div>
          <p className={`${sizeClasses.body} text-slate-800 leading-relaxed text-justify px-1`}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* 2. TECHNICAL SKILLS */}
      {skills && skills.length > 0 && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-serif"
              style={{ color: theme.primary }}
            >
              2. Technical Skills
            </h3>
          </div>
          <div className="space-y-1 px-1 text-xs text-slate-800">
            {skills.map((cat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="font-bold text-slate-950 min-w-[200px] shrink-0">• {cat.category}:</span>
                <span className="text-slate-700">{cat.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PROJECTS */}
      {((manualWorks && manualWorks.length > 0) || (automationWorks && automationWorks.length > 0) || (projects && projects.length > 0)) && (
        <div className="space-y-2.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-serif"
              style={{ color: theme.primary }}
            >
              3. Projects
            </h3>
          </div>

          {/* Manual Testing */}
          {manualWorks && manualWorks.length > 0 && (
            <div className="space-y-1.5 px-1">
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
                          <span className="text-slate-600">Link: </span>
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
            <div className="space-y-1.5 px-1">
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
                          <span className="text-slate-600">Link: </span>
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

          {/* Additional Projects */}
          {projects && projects.length > 0 && (
            <div className="space-y-2 px-1">
              {manualWorks?.length === 0 && automationWorks?.length === 0 && (
                <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-0.5">
                  Featured Projects
                </div>
              )}
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
                    <div className="text-[11px] text-slate-600 font-medium pl-3">
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

      {/* 4. EDUCATION */}
      {education && education.length > 0 && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-serif"
              style={{ color: theme.primary }}
            >
              4. Education
            </h3>
          </div>
          <div className="space-y-2 px-1">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-0.5 text-xs">
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <span className="text-slate-600 font-mono text-[11px]">{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline text-slate-700">
                  <div className="italic font-medium">{edu.institution}</div>
                  {edu.grade && <span className="font-semibold text-slate-800 font-mono">[{edu.grade}]</span>}
                </div>
                {edu.highlights && (
                  <div className="text-slate-600 pl-3 border-l-2 border-slate-200 text-[11px] mt-0.5">
                    {edu.highlights}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. WORK EXPERIENCE */}
      {experiences && experiences.length > 0 && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-serif"
              style={{ color: theme.primary }}
            >
              5. Work Experience
            </h3>
          </div>
          <div className={`${spacing.itemGap} px-1`}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid space-y-1">
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-xs text-slate-900">
                    <span>{exp.jobTitle}</span>
                    <span className="font-semibold text-slate-700 italic ml-1.5">@ {exp.company}</span>
                  </div>
                  <span className="text-[11px] text-slate-600 font-mono">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.location && (
                  <div className="text-[11px] text-slate-500 italic">{exp.location}</div>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className={`list-disc list-outside ml-4 ${spacing.bulletGap} text-slate-800 ${sizeClasses.body}`}>
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

      {/* 6. TRAININGS & CERTIFICATIONS */}
      {((trainings && trainings.length > 0) || (certifications && certifications.length > 0)) && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-serif"
              style={{ color: theme.primary }}
            >
              6. Training & Certifications
            </h3>
          </div>
          
          {/* Trainings */}
          {trainings && trainings.length > 0 && (
            <div className="space-y-2 px-1 text-xs">
              {trainings.map((item) => (
                <div key={item.id} className="space-y-0.5">
                  <div className="flex items-start space-x-2">
                    <span className="font-bold text-slate-900">•</span>
                    <div className="space-y-0.5 w-full">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900">{item.courseTitle}</span>
                        {item.duration && (
                          <span className="text-slate-600 font-mono text-[11px]">({item.duration})</span>
                        )}
                      </div>
                      {item.organization && (
                        <div className="flex items-start space-x-1.5 pl-3 text-slate-700">
                          <span className="font-bold">•</span>
                          <span>{item.organization}</span>
                        </div>
                      )}
                      {item.linkUrl && (
                        <div className="flex items-start space-x-1.5 pl-3 text-slate-700">
                          <span className="font-bold">•</span>
                          <div>
                            <span className="text-slate-600">{item.linkText || 'Verification / Link:'} </span>
                            <a 
                              href={item.linkUrl.startsWith('http') ? item.linkUrl : `https://${item.linkUrl}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-blue-600 hover:underline break-all font-mono"
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

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div className="space-y-1.5 px-1 text-xs pt-1">
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

      {/* 7. REFERENCES */}
      {references && references.length > 0 && (
        <div className="space-y-1.5 page-break-avoid">
          <div 
            className="border-b pb-0.5 mb-1.5 flex items-center justify-between"
            style={{ borderColor: theme.primary }}
          >
            <h3 
              className="text-xs sm:text-sm font-extrabold uppercase tracking-wider font-serif"
              style={{ color: theme.primary }}
            >
              7. Reference
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-1 text-xs">
            {references.map((item) => (
              <div key={item.id} className="space-y-0.5 text-slate-800 border-l-2 border-slate-300 pl-3">
                <div className="font-bold text-slate-900">{item.name}</div>
                {item.designation && item.companyLocation && (
                  <div className="text-slate-700 text-[11px]">{item.designation}, {item.companyLocation}</div>
                )}
                {item.designation && !item.companyLocation && (
                  <div className="text-slate-700 text-[11px]">{item.designation}</div>
                )}
                {!item.designation && item.companyLocation && (
                  <div className="text-slate-700 text-[11px]">{item.companyLocation}</div>
                )}
                {item.email && (
                  <div className="text-[11px]">Email: <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline font-mono">{item.email}</a></div>
                )}
                {item.phone && (
                  <div className="text-[11px]">Phone: <a href={`tel:${item.phone.replace(/[^\d+]/g, '')}`} className="text-blue-600 hover:underline font-mono">{item.phone}</a></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
