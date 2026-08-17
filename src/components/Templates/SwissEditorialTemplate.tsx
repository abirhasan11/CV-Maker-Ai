import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const SwissEditorialTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
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
    <div className={`w-full bg-white text-slate-900 ${fontClass} min-h-[1050px] p-8 flex flex-col justify-between space-y-5 shadow-sm`}>
      {/* Swiss Bold Header */}
      <div className="grid grid-cols-12 gap-6 border-b-4 border-slate-900 pb-4">
        <div className="col-span-8 space-y-1.5">
          <div className="text-xs font-black tracking-widest uppercase text-slate-600">
            {personalInfo.jobTitle || 'Aspiring SQA Professional'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none text-slate-950">
            {personalInfo.fullName || 'Abir Hasan'}
          </h1>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 pt-1 font-medium">
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
            {personalInfo.linkedin && (
              <span>
                •{' '}
                <a 
                  href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin.includes('linkedin.com') ? personalInfo.linkedin : `linkedin.com/in/${personalInfo.linkedin}`}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-blue-600"
                >
                  {personalInfo.linkedin}
                </a>
              </span>
            )}
            {personalInfo.github && (
              <span>
                •{' '}
                <a 
                  href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github.includes('github.com') ? personalInfo.github : `github.com/${personalInfo.github}`}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-blue-600"
                >
                  {personalInfo.github}
                </a>
              </span>
            )}
          </div>
        </div>

        {config.showPhoto && personalInfo.photoUrl && (
          <div className="col-span-4 flex justify-end">
            <div className="w-20 h-20 rounded-none border-2 border-slate-900 overflow-hidden grayscale contrast-125">
              <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* 1. Summary (Profile / 01) */}
      {personalInfo.summary && (
        <div className="grid grid-cols-12 gap-4 page-break-avoid">
          <div className="col-span-3 text-xs font-black uppercase tracking-wider text-slate-900">
            Profile / 01
          </div>
          <div className="col-span-9 text-xs leading-relaxed text-slate-800 font-normal text-justify">
            {personalInfo.summary}
          </div>
        </div>
      )}

      {/* 2. Technical Skills (Skills / 02) */}
      {skills && skills.length > 0 && (
        <div className="grid grid-cols-12 gap-4 pt-2.5 border-t border-slate-200 page-break-avoid">
          <div className="col-span-3 text-xs font-black uppercase tracking-wider text-slate-900">
            Skills / 02
          </div>
          <div className="col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {skills.map((cat, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="font-black uppercase text-slate-950 text-[11px]">• {cat.category}</div>
                <div className="text-slate-700 leading-normal pl-2">{cat.items.join(', ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Projects & Practical Works (Projects / 03) */}
      {((manualWorks && manualWorks.length > 0) || (automationWorks && automationWorks.length > 0) || (projects && projects.length > 0)) && (
        <div className="grid grid-cols-12 gap-4 pt-2.5 border-t border-slate-200 page-break-avoid">
          <div className="col-span-3 text-xs font-black uppercase tracking-wider text-slate-900">
            Projects / 03
          </div>
          <div className="col-span-9 space-y-2 text-xs">
            {manualWorks && manualWorks.length > 0 && (
              <div className="space-y-1">
                <div className="font-black text-slate-950 uppercase text-[11px]">Manual QA Works</div>
                {manualWorks.map((item) => (
                  <div key={item.id} className="pl-2 space-y-0.5">
                    <span className="font-bold text-slate-900">• {item.title}</span>
                    {item.link && (
                      <div className="pl-3 text-[11px] text-slate-600 font-mono">
                        Link: <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">{item.link}</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {automationWorks && automationWorks.length > 0 && (
              <div className="space-y-1 pt-1">
                <div className="font-black text-slate-950 uppercase text-[11px]">Automation Testing</div>
                {automationWorks.map((item) => (
                  <div key={item.id} className="pl-2 space-y-0.5">
                    <div className="font-bold text-slate-900">• {item.projectName}</div>
                    {item.link && (
                      <div className="pl-3 text-[11px] text-slate-600 font-mono">
                        Link: <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">{item.link}</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {projects && projects.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {projects.map((p) => (
                  <div key={p.id} className="pl-2 space-y-0.5">
                    <div className="font-bold text-slate-900 flex justify-between">
                      <span>• {p.name}</span>
                      {p.link && <a href={p.link.startsWith('http') ? p.link : `https://${p.link}`} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono text-[11px]">{p.link}</a>}
                    </div>
                    {p.description && <p className="text-slate-600 pl-3">{p.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Education (Education / 04) */}
      {education && education.length > 0 && (
        <div className="grid grid-cols-12 gap-4 pt-2.5 border-t border-slate-200 page-break-avoid">
          <div className="col-span-3 text-xs font-black uppercase tracking-wider text-slate-900">
            Education / 04
          </div>
          <div className="col-span-9 space-y-1.5 text-xs">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div className="font-black text-slate-950 uppercase">{edu.degree}</div>
                  <span className="font-mono text-[11px] text-slate-600">{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="text-slate-600">{edu.institution} {edu.grade && <span className="font-bold text-slate-900">[{edu.grade}]</span>}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Work Experience (Experience / 05) */}
      {experiences && experiences.length > 0 && (
        <div className="grid grid-cols-12 gap-4 pt-2.5 border-t border-slate-200 page-break-avoid">
          <div className="col-span-3 text-xs font-black uppercase tracking-wider text-slate-900">
            Experience / 05
          </div>
          <div className={`col-span-9 ${spacing.itemGap}`}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid space-y-1 pb-2 border-b border-slate-100 last:border-0 text-xs">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-black text-xs text-slate-950 uppercase">{exp.jobTitle}</h4>
                  <span className="text-[11px] font-bold text-slate-500 font-mono">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="font-bold" style={{ color: theme.primary }}>{exp.company}</div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="space-y-0.5 text-slate-700 pt-0.5">
                    {exp.bullets.filter(b => b.trim()).map((h, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="font-bold text-slate-400">—</span>
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

      {/* 6. Trainings & Certifications (Trainings / 06) */}
      {((trainings && trainings.length > 0) || (certifications && certifications.length > 0)) && (
        <div className="grid grid-cols-12 gap-4 pt-2.5 border-t border-slate-200 page-break-avoid">
          <div className="col-span-3 text-xs font-black uppercase tracking-wider text-slate-900">
            Training / 06
          </div>
          <div className="col-span-9 space-y-1.5 text-xs">
            {trainings.map((t) => (
              <div key={t.id} className="space-y-0.5">
                <div className="font-bold text-slate-950">• {t.courseTitle} <span className="font-mono text-slate-500">({t.duration})</span></div>
                {t.organization && <div className="text-slate-600 pl-3">• {t.organization}</div>}
                {t.linkUrl && (
                  <div className="text-slate-600 pl-3 font-mono text-[11px]">
                    Link: <a href={t.linkUrl.startsWith('http') ? t.linkUrl : `https://${t.linkUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">{t.linkUrl}</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. References (References / 07) */}
      {references && references.length > 0 && (
        <div className="grid grid-cols-12 gap-4 pt-2.5 border-t border-slate-200 page-break-avoid">
          <div className="col-span-3 text-xs font-black uppercase tracking-wider text-slate-900">
            Reference / 07
          </div>
          <div className="col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {references.map((r) => (
              <div key={r.id} className="p-2 border border-slate-200 space-y-0.5">
                <div className="font-black text-slate-950">{r.name}</div>
                {r.designation && <div className="text-slate-700">{r.designation}, {r.companyLocation}</div>}
                {r.email && <div className="text-slate-600 font-mono text-[11px]">Email: {r.email}</div>}
                {r.phone && <div className="text-slate-600 font-mono text-[11px]">Phone: {r.phone}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
