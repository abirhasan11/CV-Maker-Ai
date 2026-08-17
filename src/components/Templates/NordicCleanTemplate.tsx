import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Sparkles } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const NordicCleanTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
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
    languages = []
  } = resume;

  return (
    <div className={`w-full bg-[#fbfbf9] text-stone-800 ${fontClass} min-h-[1050px] p-8 flex flex-col justify-between space-y-5`}>
      {/* Scandinavian Minimal Top Header */}
      <div className="flex justify-between items-start pb-6 border-b border-stone-200">
        <div className="space-y-2">
          <span className="text-[11px] font-semibold tracking-widest text-stone-500 uppercase">
            {personalInfo.jobTitle || 'SQA & Automation Engineer'}
          </span>
          <h1 className="text-3xl font-light tracking-tight text-stone-900">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="flex flex-wrap gap-3 text-xs text-stone-500 pt-1">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-1 hover:text-stone-800 transition-colors">
                <Mail className="w-3 h-3 text-stone-400" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.phone && (
              <a href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`} className="flex items-center space-x-1 hover:text-stone-800 transition-colors">
                <Phone className="w-3 h-3 text-stone-400" />
                <span>{personalInfo.phone}</span>
              </a>
            )}
            {personalInfo.location && (
              <span className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.linkedin && (
              <a 
                href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin.includes('linkedin.com') ? personalInfo.linkedin : `linkedin.com/in/${personalInfo.linkedin}`}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-blue-700 hover:underline transition-colors"
              >
                <Linkedin className="w-3 h-3 text-blue-600" />
                <span>{personalInfo.linkedin}</span>
              </a>
            )}
            {personalInfo.github && (
              <a 
                href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github.includes('github.com') ? personalInfo.github : `github.com/${personalInfo.github}`}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-stone-800 hover:underline transition-colors"
              >
                <Github className="w-3 h-3 text-stone-600" />
                <span>{personalInfo.github}</span>
              </a>
            )}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="w-20 h-20 rounded-full overflow-hidden border border-stone-300 shadow-2xs">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="space-y-1.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">About</h3>
          <p className="text-xs text-stone-700 leading-relaxed font-light">{personalInfo.summary}</p>
        </div>
      )}

      {/* 2 Column Body */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left main: Experience & Projects */}
        <div className="col-span-8 space-y-4">
          {experiences && experiences.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Experience</h3>
              <div className={spacing.itemGap}>
                {experiences.map((exp) => (
                  <div key={exp.id} className="page-break-avoid space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-xs text-stone-900">{exp.position}</h4>
                      <span className="text-[11px] text-stone-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="text-xs text-stone-600 font-medium" style={{ color: theme.primary }}>{exp.company}</div>
                    {exp.description && <p className="text-xs text-stone-600 leading-relaxed font-light">{exp.description}</p>}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-0.5 text-xs text-stone-600 font-light">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-stone-400">•</span>
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

          {manualWorks && manualWorks.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-stone-200">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Selected Works</h3>
              <div className="space-y-2">
                {manualWorks.map((w) => (
                  <div key={w.id} className="text-xs space-y-0.5">
                    <div className="font-medium text-stone-900">{w.title}</div>
                    <div className="text-[11px] text-stone-600 font-light">{w.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Automation Works */}
          {automationWorks && automationWorks.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-stone-200">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Automation Testing</h3>
              <div className="space-y-2">
                {automationWorks.map((w) => (
                  <div key={w.id} className="text-xs space-y-0.5 bg-stone-100/60 p-2 rounded-lg">
                    <div className="font-semibold text-stone-900">• {w.projectName}</div>
                    {w.link && (
                      <a href={w.link.startsWith('http') ? w.link : `https://${w.link}`} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono text-[10px] block pl-3">
                        {w.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Training & Extra Activities */}
          {((trainings && trainings.length > 0) || (extraActivities && extraActivities.length > 0)) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-200">
              {trainings && trainings.length > 0 && (
                <div className="space-y-1.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Training</h3>
                  {trainings.map((t) => (
                    <div key={t.id} className="text-xs space-y-0.5">
                      <div className="font-medium text-stone-900">{t.courseTitle}</div>
                      <div className="text-[10px] text-stone-500">{t.organization} ({t.duration})</div>
                    </div>
                  ))}
                </div>
              )}
              {extraActivities && extraActivities.length > 0 && (
                <div className="space-y-1.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Activities</h3>
                  {extraActivities.map((act) => (
                    <div key={act.id} className="text-xs space-y-0.5">
                      <div className="font-medium text-stone-900">{act.projectName}</div>
                      {act.link && <span className="text-[10px] text-stone-500">{act.link}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* References */}
          {references && references.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-stone-200">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">References</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {references.map((r) => (
                  <div key={r.id} className="text-xs bg-stone-100/50 p-2 rounded-lg border border-stone-200">
                    <div className="font-medium text-stone-900">{r.name}</div>
                    <div className="text-[10px] text-stone-500">{r.designation} - {r.companyLocation}</div>
                    {r.email && <div className="text-[10px] font-mono text-stone-600">{r.email}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar: Skills & Education */}
        <div className="col-span-4 space-y-4 border-l border-stone-200 pl-4">
          {skills && skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Expertise</h3>
              <div className="space-y-2">
                {skills.map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-[11px] font-medium text-stone-800">{cat.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((it, i) => (
                        <span key={i} className="text-[10px] bg-stone-200/70 text-stone-800 px-2 py-0.5 rounded-full font-light">
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
            <div className="space-y-2 pt-3 border-t border-stone-200">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Education</h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs space-y-0.5">
                    <div className="font-medium text-stone-900">{edu.degree}</div>
                    <div className="text-[11px] text-stone-600 font-light">{edu.institution}</div>
                    <div className="text-[10px] text-stone-500">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-stone-200">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Languages</h3>
              <div className="space-y-1">
                {languages.map((l, i) => (
                  <div key={i} className="flex justify-between text-xs text-stone-700">
                    <span className="font-medium">{l.name}</span>
                    <span className="text-[10px] text-stone-500">{l.proficiency}</span>
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
