import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { THEME_COLORS, getFontFamilyClass, getFontSizeClasses, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const CreativeModernTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
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
    languages = [] 
  } = resume;

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} min-h-[1050px] overflow-hidden`}>
      {/* Top Stylish Accent Header */}
      <div 
        className="p-8 text-white relative overflow-hidden"
        style={{ 
          backgroundColor: theme.primary,
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 relative z-10">
          <div className="space-y-1.5 text-center sm:text-left">
            <h1 className={`${sizeClasses.name} font-extrabold tracking-tight text-white`}>
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-sm font-medium text-white/80 tracking-wide uppercase">
              {personalInfo.jobTitle || 'Creative Professional'}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-white/90 pt-2">
              {personalInfo.email && (
                <span className="flex items-center space-x-1">
                  <Mail className="w-3 h-3 text-white/70" />
                  <span>{personalInfo.email}</span>
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-white/70" />
                  <span>{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-white/70" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center space-x-1">
                  <Globe className="w-3 h-3 text-white/70" />
                  <span>{personalInfo.website}</span>
                </span>
              )}
            </div>
          </div>

          {config.showPhoto && personalInfo.photoUrl && (
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg shrink-0">
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

      {/* Main Body */}
      <div className="p-8 space-y-5">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
            <p className={`${sizeClasses.body} text-slate-700 leading-relaxed`}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <div className="space-y-3">
            <div>
              <span 
                className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
              >
                Work Experience
              </span>
            </div>
            <div className={spacing.itemGap}>
              {experiences.map((exp) => (
                <div key={exp.id} className="page-break-avoid border-l-2 pl-4 space-y-1" style={{ borderColor: theme.primary }}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className={`${sizeClasses.title} text-slate-900`}>{exp.jobTitle}</span>
                      <span className="text-xs font-semibold text-slate-600 ml-1.5">
                        @ {exp.company}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
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

        {/* Skills Pills */}
        {skills && skills.length > 0 && (
          <div className="space-y-2.5">
            <div>
              <span 
                className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
              >
                Skills & Competencies
              </span>
            </div>
            <div className="space-y-2">
              {skills.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-xs font-semibold text-slate-700">{cat.category}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, iIdx) => (
                      <span
                        key={iIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
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

        {/* Sample Works Grid */}
        {((manualWorks && manualWorks.length > 0) || (automationWorks && automationWorks.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            {manualWorks && manualWorks.length > 0 && (
              <div className="space-y-2">
                <div>
                  <span 
                    className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                    style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                  >
                    Manual Testing
                  </span>
                </div>
                <div className="space-y-2">
                  {manualWorks.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1">
                      <div className="font-bold text-xs text-slate-900">• {item.title}</div>
                      {item.link && (
                        <div className="text-[11px] text-slate-600 pl-2">
                          <span>Link: </span>
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

            {automationWorks && automationWorks.length > 0 && (
              <div className="space-y-2">
                <div>
                  <span 
                    className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                    style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                  >
                    Automation Testing
                  </span>
                </div>
                <div className="space-y-2">
                  {automationWorks.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1">
                      <div className="font-bold text-xs text-slate-900 flex items-center space-x-1.5">
                        <span>•</span>
                        <span>{item.projectName}</span>
                      </div>
                      {item.link && (
                        <div className="text-[11px] text-slate-600 pl-3">
                          <span>Link: </span>
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

        {/* Training, Extra Activities & Reference Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Training */}
          {trainings && trainings.length > 0 && (
            <div className="space-y-2">
              <div>
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                >
                  Training
                </span>
              </div>
              <div className="space-y-2">
                {trainings.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1">
                    <div className="font-bold text-xs text-slate-900">• {item.courseTitle} ({item.duration})</div>
                    {item.organization && (
                      <div className="text-xs text-slate-600 pl-2">• {item.organization}</div>
                    )}
                    {item.linkUrl && (
                      <div className="text-[11px] text-slate-600 pl-2">
                        <span>• {item.linkText || 'Fb Link:'} </span>
                        <a 
                          href={item.linkUrl.startsWith('http') ? item.linkUrl : `https://${item.linkUrl}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-blue-600 underline break-all font-mono"
                        >
                          {item.linkUrl}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extra Activities */}
          {extraActivities && extraActivities.length > 0 && (
            <div className="space-y-2">
              <div>
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                >
                  Extra- Activities
                </span>
              </div>
              <div className="space-y-2">
                {extraActivities.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1">
                    <div className="flex items-center space-x-1.5 font-medium text-xs text-slate-800">
                      <span className="font-bold">✓</span>
                      <span>{item.projectName}</span>
                    </div>
                    {item.link && (
                      <div className="text-[11px] text-slate-600 pl-3">
                        <span>Link: </span>
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

          {/* Reference */}
          {references && references.length > 0 && (
            <div className="space-y-2">
              <div>
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                >
                  Reference
                </span>
              </div>
              <div className="space-y-2">
                {references.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-0.5 text-xs text-slate-700">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    {item.designation && <div>{item.designation}, {item.companyLocation}</div>}
                    {item.email && <div>Email: <span className="font-mono">{item.email}</span></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div className="space-y-2">
              <div>
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-white shadow-2xs inline-block"
                  style={{ backgroundColor: theme.primary, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                >
                  Education
                </span>
              </div>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-0.5">
                    <div className="font-bold text-xs text-slate-900">{edu.degree}</div>
                    <div className="text-xs text-slate-600">{edu.institution}</div>
                    <div className="text-[11px] text-slate-500 flex justify-between">
                      <span>{edu.startDate} – {edu.endDate}</span>
                      {edu.grade && <span className="font-semibold">{edu.grade}</span>}
                    </div>
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
