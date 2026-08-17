import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy/Safe Gemini AI client initialization
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
});

// 1. Generate full resume based on user prompt / role
app.post('/api/ai/generate-full-resume', async (req, res) => {
  try {
    const { prompt, targetRole, experienceLevel, language = 'en' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured. Please set the key in settings to use AI features.',
      });
    }

    const systemPrompt = `You are a world-class executive resume writer, ATS optimization expert, and career counselor.
The user wants to generate a complete, high-impact professional CV/Resume.
Target Role: ${targetRole || 'Professional'}
Experience Level: ${experienceLevel || 'Mid-Level'}
Language requirement: ${language === 'bn' ? 'Bengali (বাংলা) where appropriate or professional mixed Bangla/English' : 'English'}
User specific prompt: ${prompt || 'Create a comprehensive modern professional resume with rich experiences, realistic metrics, top tier skills, and achievements.'}

Output ONLY valid JSON matching this exact structure (no markdown wrappers, no backticks, just raw JSON):
{
  "personalInfo": {
    "fullName": "Full Name",
    "jobTitle": "Job Title",
    "email": "email@example.com",
    "phone": "+880 1700-000000",
    "location": "Dhaka, Bangladesh",
    "website": "portfolio-link.dev",
    "linkedin": "linkedin.com/in/username",
    "github": "github.com/username",
    "summary": "Impactful 3-4 sentence professional summary highlighting top skills, achievements, and career focus."
  },
  "experiences": [
    {
      "id": "exp-1",
      "jobTitle": "Senior Software Engineer",
      "company": "Tech Innovations Ltd.",
      "location": "Dhaka, Bangladesh",
      "startDate": "2022-01",
      "endDate": "Present",
      "current": true,
      "bullets": [
        "Spearheaded development of high-traffic web platforms handling 100k+ daily active users, boosting performance by 40%.",
        "Architected and deployed scalable REST and GraphQL microservices using TypeScript, Node.js, and PostgreSQL.",
        "Mentored a team of 6 junior engineers and improved code test coverage from 60% to 92%."
      ]
    },
    {
      "id": "exp-2",
      "jobTitle": "Software Engineer",
      "company": "NextGen Software",
      "location": "Dhaka, Bangladesh",
      "startDate": "2019-06",
      "endDate": "2021-12",
      "current": false,
      "bullets": [
        "Built dynamic user interfaces using React, Redux, and Tailwind CSS, reducing page load latency by 35%.",
        "Collaborated with UX designers and product managers in agile sprints to deliver 15+ feature milestones ahead of schedule."
      ]
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "degree": "Bachelor of Science in Computer Science & Engineering",
      "institution": "University of Dhaka / BUET / Reputed University",
      "location": "Dhaka, Bangladesh",
      "startDate": "2015-09",
      "endDate": "2019-05",
      "grade": "CGPA: 3.85 / 4.00",
      "highlights": "Dean's Honor List, President of University Competitive Programming Club"
    }
  ],
  "skills": [
    { "category": "Technical / Core", "items": ["TypeScript", "React", "Node.js", "Next.js", "PostgreSQL", "Tailwind CSS", "Docker", "Git"] },
    { "category": "Soft & Management", "items": ["Agile Leadership", "Problem Solving", "Cross-functional Collaboration", "Code Review"] }
  ],
  "projects": [
    {
      "id": "proj-1",
      "name": "Cloud Analytics Dashboard",
      "role": "Lead Developer",
      "link": "https://analytics-demo.io",
      "technologies": ["React", "TypeScript", "D3.js", "Node.js"],
      "description": "Engineered a real-time data visualization dashboard monitoring 50+ enterprise metrics with sub-second websocket telemetry."
    }
  ],
  "certifications": [
    {
      "id": "cert-1",
      "name": "AWS Certified Solutions Architect – Associate",
      "issuer": "Amazon Web Services",
      "date": "2023",
      "link": ""
    }
  ],
  "languages": [
    { "name": "English", "proficiency": "Fluent / Professional" },
    { "name": "Bengali", "proficiency": "Native" }
  ],
  "interests": ["Open Source Contribution", "Tech Blogging", "AI & Cloud Architecture"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, resume: parsed });
  } catch (error: any) {
    console.error('Error generating resume:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate resume' });
  }
});

// 2. Enhance or generate career objective / professional summary
app.post('/api/ai/enhance-summary', async (req, res) => {
  try {
    const { currentSummary, jobTitle, experience, skills, tone = 'impactful', language = 'en' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured.',
      });
    }

    const prompt = `You are an elite career coach. Write 3 distinct variations of a high-impact, ATS-optimized Career Objective / Professional Summary for a resume.
Target Job Title: ${jobTitle || 'Professional'}
Key Experiences: ${JSON.stringify(experience || [])}
Key Skills: ${JSON.stringify(skills || [])}
Current Draft / Notes: "${currentSummary || 'None provided'}"
Language: ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}
Desired Tone: ${tone}

Return JSON with 3 options:
{
  "options": [
    {
      "type": "Objective & Career Focus",
      "text": "..."
    },
    {
      "type": "Achievement & Metric Focused",
      "text": "..."
    },
    {
      "type": "Concise & Forward-Looking",
      "text": "..."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{"options": []}');
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error('Error enhancing summary:', error);
    return res.status(500).json({ error: error.message || 'Failed to enhance summary' });
  }
});

// 3. Polish / Enhance Work Experience Bullet Points
app.post('/api/ai/enhance-bullet', async (req, res) => {
  try {
    const { rawBullet, jobTitle, company, language = 'en' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const prompt = `You are an ATS resume bullet point expert.
Transform the following rough work experience description into 3 high-impact, professional resume bullet points using the Google X-Y-Z formula (Accomplished [X] as measured by [Y], by doing [Z]), strong active power verbs, and realistic quantifiable results.
Role: ${jobTitle || 'Professional'}
Company: ${company || 'Company'}
Raw Input: "${rawBullet}"
Language: ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}

Return ONLY JSON:
{
  "suggestions": [
    {
      "title": "Action & Results-Driven",
      "bullet": "..."
    },
    {
      "title": "Technical & Scale-Focused",
      "bullet": "..."
    },
    {
      "title": "Leadership & Process-Oriented",
      "bullet": "..."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{"suggestions": []}');
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error('Error enhancing bullet:', error);
    return res.status(500).json({ error: error.message || 'Failed to enhance bullet' });
  }
});

// 4. Suggest Skills for a role
app.post('/api/ai/suggest-skills', async (req, res) => {
  try {
    const { jobTitle, existingSkills = [], language = 'en' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const prompt = `Suggest the top relevant hard, soft, and industry-standard technical skills for:
Job Title: ${jobTitle}
Existing Skills: ${JSON.stringify(existingSkills)}
Language: ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}

Provide categorized skills in JSON:
{
  "categories": [
    {
      "name": "Core Technical Skills",
      "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"]
    },
    {
      "name": "Tools & Frameworks",
      "skills": ["Tool 1", "Tool 2", "Tool 3", "Tool 4"]
    },
    {
      "name": "Leadership & Soft Skills",
      "skills": ["Soft Skill 1", "Soft Skill 2", "Soft Skill 3"]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{"categories": []}');
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error('Error suggesting skills:', error);
    return res.status(500).json({ error: error.message || 'Failed to suggest skills' });
  }
});

// 5. ATS Resume Reviewer & Score Analyzer
app.post('/api/ai/review-resume', async (req, res) => {
  try {
    const { resumeData, targetJobDescription = '', language = 'en' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const prompt = `You are a senior hiring manager and ATS algorithm expert.
Analyze this resume data in depth:
${JSON.stringify(resumeData, null, 2)}

Target Job Description (if any): "${targetJobDescription}"
Output Language: ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}

Provide an in-depth, encouraging, yet critically constructive evaluation.
Return ONLY JSON with this format:
{
  "atsScore": 88,
  "scoreBreakdown": {
    "impactAndMetrics": 85,
    "keywordOptimization": 90,
    "formattingAndReadability": 95,
    "completeness": 80
  },
  "overallVerdict": "Summary verdict on the candidate's CV quality and market readiness",
  "strengths": [
    "Strength 1 with specific callout",
    "Strength 2",
    "Strength 3"
  ],
  "improvements": [
    {
      "section": "Work Experience",
      "issue": "Specific weakness identified",
      "recommendation": "Concrete step to fix it (e.g., add percentages or revenue metrics)"
    },
    {
      "section": "Summary",
      "issue": "...",
      "recommendation": "..."
    }
  ],
  "missingKeywords": ["Docker", "CI/CD", "Performance Optimization", "Stakeholder Management"],
  "checklist": [
    { "item": "Contact information is complete", "passed": true },
    { "item": "Work experiences have measurable outcomes", "passed": true },
    { "item": "Skills align with modern industry standards", "passed": true },
    { "item": "Summary has strong value proposition", "passed": true }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, review: parsed });
  } catch (error: any) {
    console.error('Error reviewing resume:', error);
    return res.status(500).json({ error: error.message || 'Failed to review resume' });
  }
});

// 6. Generate Matching Cover Letter
app.post('/api/ai/generate-cover-letter', async (req, res) => {
  try {
    const { resumeData, companyName, jobTitle, jobDescription = '', recipientName = 'Hiring Manager', tone = 'confident', language = 'en' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const prompt = `You are an executive career advisor. Write a tailored, persuasive cover letter matching this candidate's resume to the target job opportunity.
Candidate Details:
Name: ${resumeData?.personalInfo?.fullName || 'Candidate'}
Email: ${resumeData?.personalInfo?.email || ''}
Phone: ${resumeData?.personalInfo?.phone || ''}
Location: ${resumeData?.personalInfo?.location || ''}
Current Role: ${resumeData?.personalInfo?.jobTitle || ''}
Top Experiences: ${JSON.stringify(resumeData?.experiences || [])}
Top Skills: ${JSON.stringify(resumeData?.skills || [])}

Target Company: ${companyName || 'Target Company'}
Target Role: ${jobTitle || 'Target Role'}
Recipient: ${recipientName || 'Hiring Manager'}
Job Description / Requirements: "${jobDescription}"
Tone: ${tone}
Language: ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}

Return ONLY JSON:
{
  "subject": "Application for [Job Title] - [Full Name]",
  "salutation": "Dear [Recipient Name],",
  "openingParagraph": "Strong hook expressing enthusiasm, citing role and 1 major achievement or value proposition.",
  "bodyParagraphs": [
    "Paragraph 1 detailing relevant past project/experience success with metrics...",
    "Paragraph 2 illustrating technical synergy, culture fit, and how skills solve company challenges..."
  ],
  "closingParagraph": "Call to action requesting an interview, reiterating gratitude and enthusiasm.",
  "signOff": "Sincerely,\n[Full Name]",
  "fullLetterText": "Complete ready-to-copy letter"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, coverLetter: parsed });
  } catch (error: any) {
    console.error('Error generating cover letter:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate cover letter' });
  }
});

// 7. Translate Resume Content
app.post('/api/ai/translate-resume', async (req, res) => {
  try {
    const { resumeData, targetLanguage = 'bn' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const langName = targetLanguage === 'bn' ? 'Bengali (বাংলা)' : 'English';
    const prompt = `Translate and professionally adapt the following resume JSON into ${langName}.
Keep technical terms, company names, URLs, and emails standard and clean.
Resume data:
${JSON.stringify(resumeData, null, 2)}

Return ONLY valid JSON with identical structure translated to ${langName}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, resume: parsed });
  } catch (error: any) {
    console.error('Error translating resume:', error);
    return res.status(500).json({ error: error.message || 'Failed to translate resume' });
  }
});

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Resume Maker server running on http://localhost:${PORT}`);
  });
}

startServer();
