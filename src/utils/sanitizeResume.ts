import { ResumeData } from '../types';
import { sampleSQAEngineer } from '../data/samples';

export function sanitizeResumeData(raw: any): ResumeData {
  if (!raw || typeof raw !== 'object') {
    return JSON.parse(JSON.stringify(sampleSQAEngineer));
  }

  const fallback = sampleSQAEngineer;

  const personalInfo = {
    fullName: typeof raw.personalInfo?.fullName === 'string' ? raw.personalInfo.fullName : fallback.personalInfo.fullName,
    jobTitle: typeof raw.personalInfo?.jobTitle === 'string' ? raw.personalInfo.jobTitle : fallback.personalInfo.jobTitle,
    email: typeof raw.personalInfo?.email === 'string' ? raw.personalInfo.email : fallback.personalInfo.email,
    phone: typeof raw.personalInfo?.phone === 'string' ? raw.personalInfo.phone : fallback.personalInfo.phone,
    location: typeof raw.personalInfo?.location === 'string' ? raw.personalInfo.location : fallback.personalInfo.location,
    website: typeof raw.personalInfo?.website === 'string' ? raw.personalInfo.website : (fallback.personalInfo.website || ''),
    linkedin: typeof raw.personalInfo?.linkedin === 'string' ? raw.personalInfo.linkedin : fallback.personalInfo.linkedin,
    github: typeof raw.personalInfo?.github === 'string' ? raw.personalInfo.github : fallback.personalInfo.github,
    photoUrl: typeof raw.personalInfo?.photoUrl === 'string' ? raw.personalInfo.photoUrl : '',
    summary: typeof raw.personalInfo?.summary === 'string' ? raw.personalInfo.summary : fallback.personalInfo.summary,
  };

  const skills = Array.isArray(raw.skills)
    ? raw.skills.map((s: any) => ({
        category: typeof s?.category === 'string' ? s.category : '',
        items: Array.isArray(s?.items) ? s.items.filter((i: any) => typeof i === 'string') : [],
      }))
    : fallback.skills;

  const manualWorks = Array.isArray(raw.manualWorks)
    ? raw.manualWorks.map((item: any) => ({
        id: item?.id || String(Date.now() + Math.random()),
        title: item?.title || item?.projectName || '',
        link: item?.link || '',
      }))
    : (fallback.manualWorks || []);

  const automationWorks = Array.isArray(raw.automationWorks)
    ? raw.automationWorks.map((item: any) => ({
        id: item?.id || String(Date.now() + Math.random()),
        category: item?.category || '',
        projectName: item?.projectName || item?.title || '',
        link: item?.link || '',
      }))
    : (fallback.automationWorks || []);

  const projects = Array.isArray(raw.projects)
    ? raw.projects.map((p: any) => ({
        id: p?.id || String(Date.now() + Math.random()),
        name: p?.name || p?.title || '',
        role: p?.role || '',
        link: p?.link || '',
        technologies: Array.isArray(p?.technologies) ? p.technologies : [],
        description: p?.description || '',
      }))
    : fallback.projects;

  const education = Array.isArray(raw.education)
    ? raw.education.map((e: any) => ({
        id: e?.id || String(Date.now() + Math.random()),
        degree: e?.degree || '',
        institution: e?.institution || '',
        location: e?.location || '',
        startDate: e?.startDate || '',
        endDate: e?.endDate || '',
        grade: e?.grade || '',
        highlights: e?.highlights || '',
      }))
    : fallback.education;

  const experiences = Array.isArray(raw.experiences)
    ? raw.experiences.map((exp: any) => ({
        id: exp?.id || String(Date.now() + Math.random()),
        jobTitle: exp?.jobTitle || '',
        company: exp?.company || '',
        location: exp?.location || '',
        startDate: exp?.startDate || '',
        endDate: exp?.endDate || '',
        current: Boolean(exp?.current),
        bullets: Array.isArray(exp?.bullets)
          ? exp.bullets
          : Array.isArray(exp?.highlights)
          ? exp.highlights
          : [],
      }))
    : fallback.experiences;

  const trainings = Array.isArray(raw.trainings)
    ? raw.trainings.map((t: any) => ({
        id: t?.id || String(Date.now() + Math.random()),
        courseTitle: t?.courseTitle || t?.name || '',
        duration: t?.duration || '',
        organization: t?.organization || t?.issuer || '',
        linkText: t?.linkText || '',
        linkUrl: t?.linkUrl || t?.link || '',
      }))
    : (fallback.trainings || []);

  const certifications = Array.isArray(raw.certifications)
    ? raw.certifications.map((c: any) => ({
        id: c?.id || String(Date.now() + Math.random()),
        name: c?.name || '',
        issuer: c?.issuer || '',
        date: c?.date || '',
        link: c?.link || '',
      }))
    : (fallback.certifications || []);

  const references = Array.isArray(raw.references)
    ? raw.references.map((r: any) => ({
        id: r?.id || String(Date.now() + Math.random()),
        name: r?.name || '',
        designation: r?.designation || '',
        company: r?.company || '',
        email: r?.email || '',
        phone: r?.phone || '',
      }))
    : (fallback.references || []);

  return {
    personalInfo,
    skills,
    manualWorks,
    automationWorks,
    projects,
    education,
    experiences,
    trainings,
    certifications,
    references,
    languages: Array.isArray(raw.languages) ? raw.languages : [],
    extraActivities: Array.isArray(raw.extraActivities) ? raw.extraActivities : [],
    interests: Array.isArray(raw.interests) ? raw.interests : [],
    customSections: Array.isArray(raw.customSections) ? raw.customSections : [],
  };
}
