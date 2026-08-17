import React from 'react';
import { 
  Terminal, ShieldCheck, Bug, Code2, Sparkles, Mail, Phone, MapPin, 
  Linkedin, Github, CheckCircle2, Cpu, Globe, Award, Database
} from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const CyberMatrixTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
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
    certifications = [], 
    languages = [] 
  } = resume;

  return (
    <div className={`w-full bg-slate-950 text-slate-200 ${fontClass} min-h-[1050px] p-7 flex flex-col justify-between space-y-4 border-2`} style={{ borderColor: theme.primary }}>
      {/* Cyber HUD Terminal Header */}
      <div 
        className="rounded-xl p-5 border relative overflow-hidden bg-slate-900/90 shadow-md"
        style={{ borderColor: theme.primary }}
      >
        <div className="absolute top-0 right-0 px-3 py-1 bg-slate-800 text-[10px] font-mono tracking-widest text-slate-400 border-b border-l border-slate-700 rounded-bl-lg">
          SYS_VER: 2026.08 // SEC_LEVEL: ROOT
        </div>

        <div className="flex flex-row items-center justify-between gap-5">
          <div className="space-y-2 max-w-[75%]">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-black/40 border" style={{ borderColor: theme.primary, color: theme.primary }}>
              <Terminal className="w-3 h-3" />
              <span>{personalInfo.jobTitle || 'Lead SQA Automation & Security Engineer'}</span>
            </div>

            <h1 className="text-3xl font-black font-mono tracking-tight text-white uppercase">
              {personalInfo.fullName || 'Abir Hasan'}
            </h1>

            <div className="flex flex-wrap gap-2 text-xs font-mono pt-1 text-slate-300">
              {personalInfo.email && (
                <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 flex items-center space-x-1.5">
                  <Mail className="w-3 h-3" style={{ color: theme.primary }} />
                  <span>{personalInfo.email}</span>
                </span>
              )}
              {personalInfo.phone && (
                <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 flex items-center space-x-1.5">
                  <Phone className="w-3 h-3" style={{ color: theme.primary }} />
                  <span>{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 flex items-center space-x-1.5">
                  <MapPin className="w-3 h-3" style={{ color: theme.primary }} />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.github && (
                <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 flex items-center space-x-1.5 truncate max-w-[180px]">
                  <Github className="w-3 h-3" style={{ color: theme.primary }} />
                  <span>{personalInfo.github}</span>
                </span>
              )}
            </div>
          </div>

          {config.showPhoto && personalInfo.photoUrl && (
            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 shadow-lg shrink-0 bg-slate-900" style={{ borderColor: theme.primary }}>
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

      {/* Career Summary */}
      {personalInfo.summary && (
        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5" style={{ color: theme.primary }}>
            <span>&gt; MISSION_OBJECTIVE</span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5" style={{ color: theme.primary }}>
            <span>&gt; PRODUCTION_EXPERIENCE_LOG</span>
          </div>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid border-l-2 pl-3 space-y-1" style={{ borderColor: theme.primary }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold font-mono text-xs text-white">{exp.position}</h4>
                    <div className="text-xs font-semibold" style={{ color: theme.primary }}>{exp.company}</div>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-400 border border-slate-700">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs text-slate-300 font-mono leading-relaxed">{exp.description}</p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-slate-300 font-mono">
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

      {/* Skills Matrix */}
      {skills && skills.length > 0 && (
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5" style={{ color: theme.primary }}>
            <span>&gt; TECH_STACK_MATRIX</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {skills.map((cat, idx) => (
              <div key={idx} className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono font-bold text-slate-300">{cat.category}</div>
                <div className="flex flex-wrap gap-1">
                  {cat.items.map((it, i) => (
                    <span key={i} className="text-[10px] font-mono bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-slate-200" style={{ borderColor: `${theme.primary}50` }}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2-Col Sample QA / Works & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {manualWorks && manualWorks.length > 0 && (
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
              &gt; VERIFIED_QA_REPOSITORIES
            </div>
            <div className="space-y-1.5">
              {manualWorks.map((item) => (
                <div key={item.id} className="p-2 rounded bg-slate-950 border border-slate-800 text-xs font-mono space-y-0.5">
                  <div className="font-bold text-white">{item.title}</div>
                  <p className="text-slate-400 text-[11px]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education && education.length > 0 && (
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
              &gt; ACADEMIC_CREDENTIALS
            </div>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id} className="p-2 rounded bg-slate-950 border border-slate-800 text-xs font-mono space-y-0.5">
                  <div className="font-bold text-white">{edu.degree} in {edu.field}</div>
                  <div className="text-slate-400 text-[11px]">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
