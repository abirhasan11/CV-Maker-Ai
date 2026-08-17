import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Trash2, 
  ExternalLink,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Project, UILanguage } from '../../types';
import { getTranslation } from '../../data/translations';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
  lang: UILanguage;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({
  projects,
  onChange,
  lang,
}) => {
  const t = getTranslation(lang);
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      link: '',
      technologies: [],
      description: '',
    };
    onChange([...projects, newProj]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const addTech = (id: string) => {
    const input = (techInputs[id] || '').trim();
    if (!input) return;
    const proj = projects.find((p) => p.id === id);
    if (!proj) return;
    if (!proj.technologies.includes(input)) {
      updateProject(id, 'technologies', [...proj.technologies, input]);
    }
    setTechInputs({ ...techInputs, [id]: '' });
  };

  const removeTech = (id: string, techIndex: number) => {
    const proj = projects.find((p) => p.id === id);
    if (!proj) return;
    const updated = proj.technologies.filter((_, i) => i !== techIndex);
    updateProject(id, 'technologies', updated);
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const newArr = [...projects];
    const [moved] = newArr.splice(index, 1);
    newArr.splice(targetIndex, 0, moved);
    onChange(newArr);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">{t.projects}</h3>
            <p className="text-[11px] text-slate-500">Notable portfolios, open-source or commercial applications</p>
          </div>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.addProject}</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No projects added yet</p>
          <button
            type="button"
            onClick={addProject}
            className="text-xs font-semibold text-teal-600 hover:underline"
          >
            + {t.addProject}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {proj.name || 'Project Name'} {proj.role ? `(${proj.role})` : ''}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveProject(index, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === projects.length - 1}
                    onClick={() => moveProject(index, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                    placeholder="e.g. Cloud Monitor"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-teal-500"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Your Role</label>
                  <input
                    type="text"
                    value={proj.role}
                    onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                    placeholder="e.g. Lead Architect"
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-teal-500"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Live Demo / Repo Link</label>
                  <input
                    type="text"
                    value={proj.link}
                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Technologies tags */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Tech Stack</label>
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {proj.technologies.map((tItem, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-teal-50 text-teal-800 border border-teal-200"
                    >
                      {tItem}
                      <button
                        type="button"
                        onClick={() => removeTech(proj.id, tIdx)}
                        className="ml-1 text-teal-600 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-1.5">
                  <input
                    type="text"
                    value={techInputs[proj.id] || ''}
                    onChange={(e) => setTechInputs({ ...techInputs, [proj.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTech(proj.id);
                      }
                    }}
                    placeholder="Type technology & press Enter (e.g. React, Next.js)..."
                    className="flex-1 px-2.5 py-1 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => addTech(proj.id)}
                    className="px-2.5 py-1 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Description & Impact</label>
                <textarea
                  rows={2}
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  placeholder="Summarize the core problem solved, architecture design, and results..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-teal-500 leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
