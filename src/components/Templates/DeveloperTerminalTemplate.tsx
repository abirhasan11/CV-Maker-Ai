import React from 'react';
import { Terminal, Code2, FolderGit2, CheckCircle2, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { ResumeData, StyleConfig } from '../../types';
import { getThemeColors, getFontFamilyClass, getSpacingClasses } from '../../utils/themeHelpers';

interface TemplateProps {
  resume: ResumeData;
  config: StyleConfig;
}

export const DeveloperTerminalTemplate: React.FC<TemplateProps> = ({ resume, config }) => {
  const theme = getThemeColors(config.colorTheme);
  const fontClass = getFontFamilyClass(config.fontFamily);
  const spacing = getSpacingClasses(config.density);

  const { personalInfo, experiences, education, skills, manualWorks = [], automationWorks = [] } = resume;

  return (
    <div className={`w-full bg-[#1e1e1e] text-[#d4d4d4] ${fontClass} min-h-[1050px] p-6 flex flex-col justify-between space-y-4 font-mono`}>
      {/* VSCode-style Window Title Bar */}
      <div className="rounded-xl bg-[#252526] border border-[#3c3c3c] overflow-hidden shadow-lg">
        <div className="bg-[#323233] px-3 py-1.5 flex items-center justify-between border-b border-[#2d2d2d] text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
            <span className="text-[11px] text-slate-400 pl-2 font-mono">resume.config.ts — QA_ENVIRONMENT</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">TypeScript / Node.js</div>
        </div>

        {/* Header content inside editor */}
        <div className="p-4 flex justify-between items-center gap-4">
          <div className="space-y-1.5 max-w-[75%]">
            <div className="text-[#6a9955] text-xs font-mono">// Candidate Overview & System Role</div>
            <h1 className="text-2xl font-bold text-[#4ec9b0] font-mono">
              const <span className="text-[#dcdcaa]">{personalInfo.fullName ? personalInfo.fullName.replace(/\s+/g, '') : 'AbirHasan'}</span> = new <span className="text-[#4ec9b0]">QAEngineer</span>();
            </h1>
            <div className="text-xs text-[#9cdcfe]">
              role: <span className="text-[#ce9178]">"{personalInfo.jobTitle || 'SQA & Automation Lead'}"</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-[#9cdcfe] pt-1">
              {personalInfo.email && <span className="bg-[#2d2d2d] px-2 py-0.5 rounded text-slate-300">✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span className="bg-[#2d2d2d] px-2 py-0.5 rounded text-slate-300">☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span className="bg-[#2d2d2d] px-2 py-0.5 rounded text-slate-300">⚲ {personalInfo.location}</span>}
            </div>
          </div>

          {config.showPhoto && personalInfo.photoUrl && (
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#4ec9b0] shrink-0">
              <img src={personalInfo.photoUrl} alt={personalInfo.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Career Objective */}
      {personalInfo.summary && (
        <div className="bg-[#252526] p-3.5 rounded-xl border border-[#3c3c3c] text-xs space-y-1">
          <div className="text-[#6a9955] text-[11px] font-mono">/** @description Career Objective */</div>
          <p className="text-[#cccccc] leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {experiences && experiences.length > 0 && (
        <div className="bg-[#252526] p-4 rounded-xl border border-[#3c3c3c] space-y-2.5">
          <div className="text-[#569cd6] text-xs font-bold font-mono">
            function <span className="text-[#dcdcaa]">getExperienceLog</span>(): <span className="text-[#4ec9b0]">WorkHistory</span>[]
          </div>
          <div className={spacing.itemGap}>
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid border-l-2 pl-3 space-y-1" style={{ borderColor: theme.primary }}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs text-[#9cdcfe]">{exp.position} @ <span className="text-[#ce9178]">{exp.company}</span></span>
                  <span className="text-[10px] text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-xs text-[#d4d4d4] leading-relaxed">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-0.5 text-xs text-[#b5cea8]">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>=&gt; {h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Grid */}
      {skills && skills.length > 0 && (
        <div className="bg-[#252526] p-4 rounded-xl border border-[#3c3c3c] space-y-2">
          <div className="text-[#569cd6] text-xs font-bold font-mono">
            const <span className="text-[#9cdcfe]">technicalSkills</span>: <span className="text-[#4ec9b0]">Record&lt;string, string[]&gt;</span> =
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {skills.map((cat, idx) => (
              <div key={idx} className="bg-[#1e1e1e] p-2 rounded border border-[#333] text-xs">
                <span className="text-[#4ec9b0] font-bold">{cat.category}</span>: [
                <span className="text-[#ce9178]">{cat.items.map(it => `"${it}"`).join(', ')}</span>]
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="bg-[#252526] p-3 rounded-xl border border-[#3c3c3c] text-xs space-y-1.5">
          <div className="text-[#569cd6] text-xs font-bold font-mono">
            class <span className="text-[#4ec9b0]">Education</span> &#123;
          </div>
          <div className="pl-3 space-y-1">
            {education.map((edu) => (
              <div key={edu.id} className="text-slate-300">
                degree = <span className="text-[#ce9178]">"{edu.degree} in {edu.field}"</span>; // {edu.institution} ({edu.startDate} – {edu.endDate})
              </div>
            ))}
          </div>
          <div className="text-[#569cd6]">&#125;</div>
        </div>
      )}
    </div>
  );
};
