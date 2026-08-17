import { ResumeData } from '../types';

export const SAMPLE_SQA_ENGINEER: ResumeData = {
  personalInfo: {
    fullName: "ABIR HASAN",
    jobTitle: "Aspiring SQA Professional",
    email: "abir11hasan09@gmail.com",
    phone: "+880 1712-345678",
    location: "Dhaka, Bangladesh",
    website: "abirhasan-qa.dev",
    linkedin: "linkedin.com/in/abirhasan-sqa",
    github: "github.com/abirhasan",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    summary: "Detail-oriented Software Quality Assurance (SQA) Engineer with 4+ years of hands-on experience in automated and manual testing for web, mobile, and API architectures. Proven expertise in building robust test automation frameworks using Selenium, Playwright, and Cypress, cutting regression testing cycles by 65%. Adept in API testing, performance analysis with JMeter, CI/CD integration, and collaborating closely with engineering teams to ensure zero critical defects in production."
  },
  experiences: [
    {
      id: "exp-1",
      jobTitle: "Senior SQA Engineer",
      company: "Apex Cloud Solutions",
      location: "Dhaka, Bangladesh",
      startDate: "2022-04",
      endDate: "Present",
      current: true,
      bullets: [
        "Designed and maintained a scalable End-to-End test automation framework using TypeScript, Playwright, and Cucumber BDD, increasing test automation coverage from 35% to 88%.",
        "Constructed automated RESTful API validation suites with Postman and Newman integrated into GitHub Actions CI/CD pipelines, detecting 90% of regressions before staging deployments.",
        "Conducted performance and stress testing using Apache JMeter and k6, identifying database bottleneck queries and optimizing concurrent user throughput by 40%.",
        "Authored 500+ comprehensive test scenarios, edge cases, and test plans in Jira/TestRail for cross-functional sprint releases."
      ]
    },
    {
      id: "exp-2",
      jobTitle: "Quality Assurance (QA) Engineer",
      company: "InnovateTech Software Ltd.",
      location: "Dhaka, Bangladesh",
      startDate: "2020-01",
      endDate: "2022-03",
      current: false,
      bullets: [
        "Executed manual functional, usability, smoke, and exploratory testing across responsive web applications and Android/iOS mobile apps.",
        "Created Selenium WebDriver (Java) automated regression test suites, reducing manual release verification time from 16 hours to 45 minutes.",
        "Logged, prioritized, and tracked 350+ defects through full lifecycle in Jira, facilitating daily bug triage meetings with developers."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Sc. in Computer Science and Engineering",
      institution: "Bangladesh University of Engineering and Technology (BUET)",
      location: "Dhaka, Bangladesh",
      startDate: "2015-02",
      endDate: "2019-05",
      grade: "CGPA: 3.80 / 4.00",
      highlights: "Specialized in Software Engineering, Algorithms & Quality Verification"
    }
  ],
  skills: [
    {
      category: "Test Automation & Frameworks",
      items: ["Selenium WebDriver", "Playwright", "Cypress", "Appium", "Cucumber BDD", "TestNG", "JUnit", "Page Object Model (POM)"]
    },
    {
      category: "API & Performance Testing",
      items: ["Postman / Newman", "RestAssured", "Apache JMeter", "k6", "Swagger / OpenAPI", "GraphQL Testing", "Charles Proxy"]
    },
    {
      category: "Tools, CI/CD & Methodologies",
      items: ["Jira / Xray", "TestRail", "Git / GitHub", "GitHub Actions", "Jenkins", "Docker", "SQL / Database Testing", "Agile / Scrum / STLC"]
    },
    {
      category: "Core SQA Competencies",
      items: ["Functional Testing", "Regression Testing", "API Automation", "Performance & Load Testing", "Security Testing Basics", "Root Cause Analysis"]
    }
  ],
  manualWorks: [
    {
      id: "man-1",
      title: "Test Case Writing ()",
      link: "github link"
    },
    {
      id: "man-2",
      title: "Load Testing Using Jmeter",
      link: "github link"
    },
    {
      id: "man-3",
      title: "API Testing Using Postman",
      link: "github link"
    }
  ],
  automationWorks: [
    {
      id: "auto-1",
      projectName: "SauceDemo Web Automation Framework (Selenium + TestNG)",
      link: "https://github.com/abirhasan11/saucedemo-automation"
    },
    {
      id: "auto-2",
      projectName: "Appium Mobile Automation Suite (Android & iOS)",
      link: "https://github.com/abirhasan11/mobile-automation-framework"
    }
  ],
  trainings: [
    {
      id: "train-1",
      courseTitle: "Full Stack SQA",
      duration: "Starting Month,2021 to Ending Month,2021",
      organization: "IT Training BD, a United States based training organization.",
      linkText: "Fb Link:",
      linkUrl: "https://www.facebook.com/It-Training-Bd-211709726924087"
    }
  ],
  extraActivities: [],
  references: [
    {
      id: "ref-1",
      name: "Sabiul Islam Rashed",
      designation: "SQA Head",
      companyLocation: "Burnsys, Dubai, UAE",
      email: "234sabiul@gmail.com"
    }
  ],
  languages: [],
  interests: []
};

export const SAMPLE_SOFTWARE_ENGINEER: ResumeData = SAMPLE_SQA_ENGINEER;

export const SAMPLE_MARKETING_SPECIALIST: ResumeData = {
  personalInfo: {
    fullName: "Nusrat Jahan",
    jobTitle: "Digital Marketing & Growth Specialist",
    email: "nusrat.jahan@example.com",
    phone: "+880 1819-876543",
    location: "Dhaka, Bangladesh",
    website: "nusratgrowth.com",
    linkedin: "linkedin.com/in/nusratjahan",
    github: "",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    summary: "Results-oriented Digital Growth Strategist with 4+ years driving customer acquisition, multichannel performance marketing, and brand ROI. Generated over $1.4M in attributable pipeline revenue while scaling paid search and social campaigns at an average 4.2x ROAS."
  },
  experiences: [
    {
      id: "exp-1",
      jobTitle: "Senior Growth Marketing Manager",
      company: "Velocity Media Group",
      location: "Dhaka, Bangladesh",
      startDate: "2022-01",
      endDate: "Present",
      current: true,
      bullets: [
        "Managed a monthly ad spend of $45K+ across Google Ads, Meta, and LinkedIn, generating 22,000+ qualified leads at 35% lower CAC.",
        "Formulated data-driven A/B testing on landing pages and checkout flows, boosting overall website conversion rate from 1.8% to 3.4%.",
        "Spearheaded omnichannel email marketing drip automation via HubSpot, retaining 34% more repeat customers over 12 months."
      ]
    },
    {
      id: "exp-2",
      jobTitle: "Digital Marketing Executive",
      company: "BrandCraft Agency",
      location: "Dhaka, Bangladesh",
      startDate: "2020-03",
      endDate: "2021-12",
      current: false,
      bullets: [
        "Planned and executed SEO optimization and content campaigns that grew organic blog impressions by 240% in 9 months.",
        "Managed influencer partnerships and brand collaborations across Facebook, Instagram, and YouTube."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "BBA in Marketing & International Business",
      institution: "North South University (NSU)",
      location: "Dhaka, Bangladesh",
      startDate: "2016-01",
      endDate: "2020-01",
      grade: "CGPA: 3.75 / 4.00",
      highlights: "Champion in National Marketing Case Competition 2019"
    }
  ],
  skills: [
    {
      category: "Marketing & Strategy",
      items: ["Growth Marketing", "Google Ads (Search & Display)", "Meta Ads Manager", "SEO & SEM", "Email Drip Campaigns", "Content Strategy"]
    },
    {
      category: "Analytics & Tools",
      items: ["Google Analytics 4 (GA4)", "Google Tag Manager", "HubSpot CRM", "Semrush", "Tableau", "Canva Pro", "A/B Testing"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "SaaS Launch Campaign – FinFlow",
      role: "Lead Strategist",
      link: "https://finflow-case-study.com",
      technologies: ["GA4", "Google Ads", "HubSpot", "Webflow"],
      description: "Acquired 5,000 beta signups in 30 days with viral referral loops and hyper-targeted LinkedIn PPC ads."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Google Ads Search & Measurement Certified",
      issuer: "Google Skillshop",
      date: "2023"
    },
    {
      id: "cert-2",
      name: "HubSpot Inbound Marketing & SEO Certification",
      issuer: "HubSpot Academy",
      date: "2022"
    }
  ],
  languages: [
    { name: "English", proficiency: "Fluent" },
    { name: "Bengali", proficiency: "Native" }
  ],
  interests: ["Data Storytelling", "Brand Psychology", "Podcasting"]
};

export const SAMPLE_FRESH_GRADUATE: ResumeData = {
  personalInfo: {
    fullName: "ABIR HASAN",
    jobTitle: "Aspiring SQA Professional",
    email: "abir11hasan09@gmail.com",
    phone: "+880 1712-345678",
    location: "Dhaka, Bangladesh",
    website: "abir-portfolio.vercel.app",
    linkedin: "linkedin.com/in/abirhasan-sqa",
    github: "github.com/abirhasan",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    summary: "Enthusiastic and detail-oriented Computer Science graduate specializing in Software Quality Assurance (SQA), manual test case design, and automated testing with Selenium & Postman. Solid foundation in software testing life cycle (STLC), bug tracking with Jira, and web technologies. Eager to contribute to dynamic software QA teams."
  },
  experiences: [
    {
      id: "exp-1",
      jobTitle: "SQA Intern",
      company: "DataCraft Technologies",
      location: "Dhaka, Bangladesh",
      startDate: "2023-08",
      endDate: "2023-12",
      current: false,
      bullets: [
        "Assisted in executing 200+ manual functional and regression test cases for client web application portals.",
        "Authored automated API test scripts with Postman and validated status codes, headers, and JSON schema responses.",
        "Documented and verified 45+ bug tickets in Jira following standard bug lifecycle protocols."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science and Engineering",
      institution: "BRAC University",
      location: "Dhaka, Bangladesh",
      startDate: "2019-09",
      endDate: "2023-08",
      grade: "CGPA: 3.78 / 4.00",
      highlights: "Thesis on Automated Testing Frameworks & Vulnerability Analysis"
    }
  ],
  skills: [
    {
      category: "Testing & Methodologies",
      items: ["Manual Testing", "Test Automation", "Selenium WebDriver", "Postman", "STLC & SDLC", "Bug Life Cycle", "Jira"]
    },
    {
      category: "Programming & Databases",
      items: ["Java", "JavaScript", "Python", "SQL", "HTML5", "CSS3", "Git/GitHub"]
    }
  ],
  manualWorks: [
    {
      id: "man-f-1",
      title: "Test Case Writing ()",
      link: "github link"
    },
    {
      id: "man-f-2",
      title: "Load Testing Using Jmeter",
      link: "github link"
    },
    {
      id: "man-f-3",
      title: "API Testing Using Postman",
      link: "github link"
    }
  ],
  automationWorks: [
    {
      id: "auto-f-1",
      projectName: "SauceDemo Web Automation Framework (Selenium + TestNG)",
      link: "https://github.com/abirhasan11/saucedemo-automation"
    },
    {
      id: "auto-f-2",
      projectName: "Appium Mobile Automation Suite (Android & iOS)",
      link: "https://github.com/abirhasan11/mobile-automation-framework"
    }
  ],
  trainings: [
    {
      id: "train-f-1",
      courseTitle: "Full Stack SQA",
      duration: "Starting Month,2021 to Ending Month,2021",
      organization: "IT Training BD, a United States based training organization.",
      linkText: "Fb Link:",
      linkUrl: "https://www.facebook.com/It-Training-Bd-211709726924087"
    }
  ],
  extraActivities: [],
  references: [
    {
      id: "ref-f-1",
      name: "Sabiul Islam Rashed",
      designation: "SQA Head",
      companyLocation: "Burnsys, Dubai, UAE",
      email: "234sabiul@gmail.com"
    }
  ],
  languages: [],
  interests: []
};

export const sampleSoftwareEngineer = SAMPLE_SQA_ENGINEER;
export const sampleSQAEngineer = SAMPLE_SQA_ENGINEER;
export const sampleMarketingSpecialist = SAMPLE_MARKETING_SPECIALIST;
export const sampleFresherData = SAMPLE_FRESH_GRADUATE;
export { defaultStyleConfig } from '../types';

export const SAMPLE_PROFILES = [
  { id: 'sqa', name: 'SQA Engineer (এসকিউএ ইঞ্জিনিয়ার - ABIR HASAN)', data: SAMPLE_SQA_ENGINEER },
  { id: 'mkt', name: 'Marketing Specialist (মার্কেটিং স্পেশালিস্ট)', data: SAMPLE_MARKETING_SPECIALIST },
  { id: 'fresher', name: 'Fresh Graduate / Student (শিক্ষার্থী / ফ্রেশার)', data: SAMPLE_FRESH_GRADUATE }
];
