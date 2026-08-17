import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Sparkles, 
  FileCheck, 
  Mail, 
  Languages, 
  Printer, 
  RotateCcw, 
  Download, 
  Upload, 
  Eye, 
  Sliders, 
  Check, 
  FileText,
  Copy,
  Layers,
  Edit3,
  Palette,
  CheckCircle2,
  Cpu,
  BookOpen,
  Users2
} from 'lucide-react';
import { 
  ResumeData, 
  StyleConfig, 
  ActiveTab, 
  FormSection, 
  UILanguage, 
  SkillCategory 
} from './types';
import { 
  sampleSQAEngineer,
  sampleSoftwareEngineer, 
  sampleMarketingSpecialist, 
  sampleFresherData, 
  defaultStyleConfig 
} from './data/samples';
import { sanitizeResumeData } from './utils/sanitizeResume';
import { getTranslation } from './data/translations';

// Components
import { Navbar } from './components/Navbar';
import { PersonalInfoForm } from './components/ResumeForm/PersonalInfoForm';
import { ExperienceForm } from './components/ResumeForm/ExperienceForm';
import { EducationForm } from './components/ResumeForm/EducationForm';
import { SkillsForm } from './components/ResumeForm/SkillsForm';
import { ProjectsForm } from './components/ResumeForm/ProjectsForm';
import { CertificationsAndLanguagesForm } from './components/ResumeForm/CertificationsAndLanguagesForm';
import { ManualWorksForm } from './components/ResumeForm/ManualWorksForm';
import { AutomationWorksForm } from './components/ResumeForm/AutomationWorksForm';
import { TrainingForm } from './components/ResumeForm/TrainingForm';
import { ExtraActivitiesForm } from './components/ResumeForm/ExtraActivitiesForm';
import { ReferenceForm } from './components/ResumeForm/ReferenceForm';
import { DesignSettingsPanel } from './components/DesignSettingsPanel';
import { ResumePreview } from './components/ResumePreview/ResumePreview';

// Modals
import { AIGeneratorModal } from './components/Modals/AIGeneratorModal';
import { ATSReviewModal } from './components/Modals/ATSReviewModal';
import { CoverLetterModal } from './components/Modals/CoverLetterModal';
import { AISummaryModal } from './components/Modals/AISummaryModal';
import { AIBulletModal } from './components/Modals/AIBulletModal';
import { AISkillsModal } from './components/Modals/AISkillsModal';
import { DownloadModal } from './components/Modals/DownloadModal';

const STORAGE_KEY_RESUME = 'ai_cv_maker_resume_data_v2';
const STORAGE_KEY_CONFIG = 'ai_cv_maker_style_config_v2';
const STORAGE_KEY_LANG = 'ai_cv_maker_ui_lang_v2';

export default function App() {
  // State initialization
  const [lang, setLang] = useState<UILanguage>(() => {
    return (localStorage.getItem(STORAGE_KEY_LANG) as UILanguage) || 'en';
  });

  const [resume, setResume] = useState<ResumeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_RESUME);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return sanitizeResumeData(parsed);
      } catch (e) {
        // fallback
      }
    }
    return sampleSQAEngineer;
  });

  const [styleConfig, setStyleConfig] = useState<StyleConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultStyleConfig,
          ...parsed,
          showPhoto: false, // Ensure photo is removed as requested
          template: parsed.template || 'executive-classic',
        };
      } catch (e) {
        // fallback
      }
    }
    return defaultStyleConfig;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('content');
  const [activeSection, setActiveSection] = useState<FormSection>('personal');

  // Modals state
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isAiGenOpen, setIsAiGenOpen] = useState(false);
  const [isAtsOpen, setIsAtsOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);
  const [bulletModalData, setBulletModalData] = useState<{
    isOpen: boolean;
    rawBullet: string;
    jobTitle: string;
    company: string;
    expId: string;
    bulletIndex: number;
  }>({
    isOpen: false,
    rawBullet: '',
    jobTitle: '',
    company: '',
    expId: '',
    bulletIndex: 0,
  });

  const [isTranslating, setIsTranslating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = getTranslation(lang);

  // Auto-save to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RESUME, JSON.stringify(resume));
  }, [resume]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(styleConfig));
  }, [styleConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  }, [lang]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Sample Loader
  const handleLoadSample = (type: 'software' | 'marketing' | 'fresher') => {
    if (type === 'software') setResume(sampleSoftwareEngineer);
    else if (type === 'marketing') setResume(sampleMarketingSpecialist);
    else if (type === 'fresher') setResume(sampleFresherData);
    showNotification(lang === 'bn' ? 'নমুনা প্রোফাইল লোড করা হয়েছে' : 'Sample profile loaded!');
  };

  // Reset
  const handleReset = () => {
    if (window.confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে নতুন করে শুরু করতে চান?' : 'Are you sure you want to reset all resume data?')) {
      setResume({
        personalInfo: {
          fullName: '',
          jobTitle: '',
          email: '',
          phone: '',
          location: '',
          website: '',
          linkedin: '',
          github: '',
          summary: '',
        },
        experiences: [],
        education: [],
        skills: [],
        manualWorks: [],
        automationWorks: [],
        trainings: [],
        extraActivities: [],
        references: [],
        projects: [],
        certifications: [],
        languages: [],
        interests: [],
      });
      showNotification('Clean canvas ready!');
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resume.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('JSON file exported!');
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (parsed && typeof parsed === 'object') {
          setResume(sanitizeResumeData(parsed));
          showNotification('Resume data loaded from JSON!');
        }
      } catch (err) {
        showNotification('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
  };

  // Print & PDF Download Trigger
  const handlePrint = () => {
    setIsDownloadModalOpen(true);
  };

  // AI Translate Entire Resume
  const handleTranslateFullResume = async (targetLanguage: 'bn' | 'en') => {
    setIsTranslating(true);
    try {
      const res = await fetch('/api/ai/translate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: resume,
          targetLanguage,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to translate resume');
      }

      setResume(sanitizeResumeData(data.translatedResume));
      setLang(targetLanguage);
      showNotification(
        targetLanguage === 'bn'
          ? 'সিভি সফলভাবে বাংলায় রূপান্তরিত হয়েছে!'
          : 'Resume translated to English!'
      );
    } catch (e: any) {
      showNotification(`Translation failed: ${e.message}`);
    } finally {
      setIsTranslating(false);
    }
  };

  // Bullet point enhancer trigger
  const handleOpenBulletModal = (expId: string, bulletIndex: number, bulletText: string, jobTitle: string, company: string) => {
    setBulletModalData({
      isOpen: true,
      rawBullet: bulletText,
      jobTitle,
      company,
      expId,
      bulletIndex,
    });
  };

  const handleApplyBullet = (improved: string) => {
    const { expId, bulletIndex } = bulletModalData;
    setResume((prev) => {
      const nextExp = (prev.experiences || []).map((e) => {
        if (e.id === expId) {
          const newBullets = [...(e.bullets || [])];
          newBullets[bulletIndex] = improved;
          return { ...e, bullets: newBullets };
        }
        return e;
      });
      return { ...prev, experiences: nextExp };
    });
  };

  const sectionsList: { id: FormSection; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'personal', label: t.personalInfo, icon: <User className="w-4 h-4" /> },
    { id: 'skills', label: t.skills, icon: <Wrench className="w-4 h-4" />, count: (resume.skills || []).flatMap(s => s?.items || []).length },
    { id: 'manualWorks', label: t.manualWorks, icon: <CheckCircle2 className="w-4 h-4" />, count: (resume.manualWorks || []).length },
    { id: 'automationWorks', label: t.automationWorks, icon: <Cpu className="w-4 h-4" />, count: (resume.automationWorks || []).length },
    { id: 'projects', label: t.projects, icon: <FolderGit2 className="w-4 h-4" />, count: (resume.projects || []).length },
    { id: 'education', label: t.education, icon: <GraduationCap className="w-4 h-4" />, count: (resume.education || []).length },
    { id: 'experience', label: t.experience, icon: <Briefcase className="w-4 h-4" />, count: (resume.experiences || []).length },
    { id: 'training', label: t.training, icon: <BookOpen className="w-4 h-4" />, count: (resume.trainings || []).length },
    { id: 'certifications', label: t.certifications, icon: <Award className="w-4 h-4" />, count: (resume.certifications || []).length },
    { id: 'references', label: t.references, icon: <Users2 className="w-4 h-4" />, count: (resume.references || []).length },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased text-slate-800">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportJSON}
        accept=".json"
        className="hidden"
      />

      {/* Top Navigation */}
      <Navbar
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'bn' : 'en')}
        onOpenAiGenerator={() => setIsAiGenOpen(true)}
        onOpenAtsScore={() => setIsAtsOpen(true)}
        onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
        onPrint={handlePrint}
        onReset={handleReset}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />

      {/* Notification toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium flex items-center space-x-2 animate-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
        {/* Left Column: Form Editor / Design (Visible in 'content' & 'design' tab or desktop split) */}
        <div className={`w-full lg:w-[48%] xl:w-[45%] h-full flex flex-col bg-slate-50 border-r border-slate-200 no-print overflow-hidden ${
          activeTab === 'preview' ? 'hidden lg:flex' : 'flex'
        }`}>
          {/* Quick Action Sub-bar */}
          <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
            {/* Sample Profile Switcher */}
            <div className="flex items-center space-x-1.5 shrink-0">
              <span className="text-[11px] font-semibold text-slate-500">{t.sampleProfiles}:</span>
              <button
                type="button"
                onClick={() => handleLoadSample('software')}
                className="px-2 py-1 text-[11px] font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition-colors cursor-pointer font-semibold"
              >
                SQA Engineer (Abir Hasan)
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('marketing')}
                className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-md transition-colors cursor-pointer"
              >
                Marketing
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('fresher')}
                className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-md transition-colors cursor-pointer"
              >
                Fresher (Abir)
              </button>
            </div>

            {/* Translation & File Actions */}
            <div className="flex items-center space-x-1 shrink-0">
              <button
                type="button"
                onClick={() => handleTranslateFullResume(lang === 'en' ? 'bn' : 'en')}
                disabled={isTranslating}
                className="inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer"
                title="Translate all resume content using AI"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{isTranslating ? 'Translating...' : lang === 'en' ? 'Translate to বাংলা' : 'Translate to English'}</span>
              </button>

              <button
                type="button"
                onClick={handleExportJSON}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md"
                title="Export JSON backup"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md"
                title="Import JSON backup"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mode Switcher Bar (Content vs Design) */}
          <div className="bg-slate-100/90 border-b border-slate-200 px-3 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-1.5 bg-slate-200/80 p-0.5 rounded-lg border border-slate-300/60">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'content'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'তথ্য পূরণ (Content)' : '1. Edit Content'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('design')}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'design'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ডিজাইন ও থিম (Design & Theme)' : '2. Design & Themes'}</span>
              </button>
            </div>

            {activeTab === 'design' && (
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md hidden sm:inline">
                {styleConfig.template}
              </span>
            )}
          </div>

          {/* Section Navigation Tabs (When activeTab is 'content') */}
          {activeTab === 'content' && (
            <div className="bg-white border-b border-slate-200 px-3 py-2 flex space-x-1 overflow-x-auto shrink-0 custom-scrollbar">
              {sectionsList.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSection(sec.id)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeSection === sec.id
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {sec.icon}
                  <span>{sec.label}</span>
                  {sec.count !== undefined && sec.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      activeSection === sec.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {sec.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Scrollable Form Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            {activeTab === 'design' ? (
              <DesignSettingsPanel
                config={styleConfig}
                onChange={setStyleConfig}
                lang={lang}
              />
            ) : (
              <div className="space-y-4">
                {activeSection === 'personal' && (
                  <PersonalInfoForm
                    personalInfo={resume.personalInfo}
                    onChange={(info) => setResume({ ...resume, personalInfo: info })}
                    lang={lang}
                    onOpenAiSummary={() => setIsSummaryModalOpen(true)}
                  />
                )}

                {activeSection === 'experience' && (
                  <ExperienceForm
                    experiences={resume.experiences}
                    onChange={(exp) => setResume({ ...resume, experiences: exp })}
                    lang={lang}
                    onEnhanceBullet={handleOpenBulletModal}
                  />
                )}

                {activeSection === 'manualWorks' && (
                  <ManualWorksForm
                    manualWorks={resume.manualWorks}
                    onChange={(mw) => setResume({ ...resume, manualWorks: mw })}
                    lang={lang}
                  />
                )}

                {activeSection === 'automationWorks' && (
                  <AutomationWorksForm
                    automationWorks={resume.automationWorks}
                    onChange={(aw) => setResume({ ...resume, automationWorks: aw })}
                    lang={lang}
                  />
                )}

                {activeSection === 'training' && (
                  <TrainingForm
                    trainings={resume.trainings}
                    onChange={(tr) => setResume({ ...resume, trainings: tr })}
                    lang={lang}
                  />
                )}

                {activeSection === 'extraActivities' && (
                  <ExtraActivitiesForm
                    extraActivities={resume.extraActivities}
                    onChange={(ea) => setResume({ ...resume, extraActivities: ea })}
                    lang={lang}
                  />
                )}

                {activeSection === 'references' && (
                  <ReferenceForm
                    references={resume.references}
                    onChange={(ref) => setResume({ ...resume, references: ref })}
                    lang={lang}
                  />
                )}

                {activeSection === 'education' && (
                  <EducationForm
                    education={resume.education}
                    onChange={(edu) => setResume({ ...resume, education: edu })}
                    lang={lang}
                  />
                )}

                {activeSection === 'skills' && (
                  <SkillsForm
                    skills={resume.skills}
                    onChange={(s) => setResume({ ...resume, skills: s })}
                    lang={lang}
                    onOpenAiSkills={() => setSkillsModalOpen(true)}
                  />
                )}

                {activeSection === 'projects' && (
                  <ProjectsForm
                    projects={resume.projects}
                    onChange={(p) => setResume({ ...resume, projects: p })}
                    lang={lang}
                  />
                )}

                {activeSection === 'certifications' && (
                  <CertificationsAndLanguagesForm
                    certifications={resume.certifications}
                    onChangeCertifications={(c) => setResume({ ...resume, certifications: c })}
                    languages={resume.languages}
                    onChangeLanguages={(l) => setResume({ ...resume, languages: l })}
                    interests={resume.interests}
                    onChangeInterests={(i) => setResume({ ...resume, interests: i })}
                    lang={lang}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live A4 Preview Canvas */}
        <div className={`w-full lg:w-[52%] xl:w-[55%] h-full flex flex-col bg-slate-200/80 overflow-hidden ${
          activeTab === 'content' || activeTab === 'design' ? 'hidden lg:flex' : 'flex'
        }`}>
          <ResumePreview
            resume={resume}
            config={styleConfig}
            lang={lang}
            onPrint={handlePrint}
            onUpdateConfig={setStyleConfig}
          />
        </div>
      </div>

      {/* AI Modals */}
      <AIGeneratorModal
        isOpen={isAiGenOpen}
        onClose={() => setIsAiGenOpen(false)}
        onApplyResume={(newR) => {
          setResume(newR);
          showNotification(lang === 'bn' ? 'সিভি এআই দিয়ে সফলভাবে তৈরি হয়েছে!' : 'Resume generated with Gemini AI!');
        }}
        lang={lang}
      />

      <ATSReviewModal
        isOpen={isAtsOpen}
        onClose={() => setIsAtsOpen(false)}
        resume={resume}
        lang={lang}
      />

      <CoverLetterModal
        isOpen={isCoverLetterOpen}
        onClose={() => setIsCoverLetterOpen(false)}
        resume={resume}
        lang={lang}
      />

      <AISummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        resume={resume}
        onApplySummary={(sum) => {
          setResume({
            ...resume,
            personalInfo: { ...resume.personalInfo, summary: sum },
          });
          showNotification('Summary applied to CV!');
        }}
        lang={lang}
      />

      <AIBulletModal
        isOpen={bulletModalData.isOpen}
        onClose={() => setBulletModalData({ ...bulletModalData, isOpen: false })}
        rawBullet={bulletModalData.rawBullet}
        jobTitle={bulletModalData.jobTitle}
        company={bulletModalData.company}
        onApplyBullet={handleApplyBullet}
        lang={lang}
      />

      <AISkillsModal
        isOpen={skillsModalOpen}
        onClose={() => setSkillsModalOpen(false)}
        jobTitle={resume.personalInfo.jobTitle}
        currentSkills={resume.skills}
        onAddSkills={(newCats) => {
          // Merge or append new skill categories
          setResume((prev) => ({
            ...prev,
            skills: [...prev.skills, ...newCats],
          }));
          showNotification('Skills added to CV!');
        }}
        lang={lang}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        resume={resume}
        lang={lang}
      />
    </div>
  );
}
