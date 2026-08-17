# AI CV Maker

An AI-powered CV/Resume Builder that helps users create professional, ATS-friendly resumes with customizable templates, AI assistance, resume analysis, and PDF export.

## ✨ Features

* 📝 Create and edit professional resumes
* 🤖 AI-powered resume generation using Google Gemini
* ✨ AI-generated professional summaries
* 🎯 AI-enhanced work experience bullet points
* 🧠 AI skill suggestions based on job roles
* 📊 ATS Resume Review & Score Analysis
* 💼 AI Cover Letter Generation
* 🌐 English & Bengali language support
* 🎨 Multiple professional resume templates
* ⚙️ Customizable resume design and styling
* 📄 Download resume as PDF
* 💾 Auto-save resume data using LocalStorage
* 📥 Import & Export resume data as JSON
* 👀 Real-time resume preview
* 📱 Responsive user interface
* 🔄 Resume translation between English and Bengali

## 🛠️ Technologies Used

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Lucide React
* Motion

### Backend

* Node.js
* Express.js
* TypeScript

### AI

* Google Gemini API
* `@google/genai`

### PDF & Data

* jsPDF
* html2canvas
* Browser LocalStorage

## 📂 Project Structure

```text
CV-Maker-Ai/
├── assets/
├── src/
│   ├── components/
│   │   ├── Modals/
│   │   ├── ResumeForm/
│   │   ├── ResumePreview/
│   │   └── Templates/
│   ├── data/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── .env.example
├── index.html
├── package.json
├── server.ts
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using Bun:

```bash
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

You can use `.env.example` as a reference.

### 4. Run the Development Server

```bash
npm run dev
```

The application will start using the configured development server.

## 🏗️ Build for Production

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## 📋 Available Scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the development server              |
| `npm run build`   | Build frontend and backend for production |
| `npm start`       | Start the production server               |
| `npm run preview` | Preview the Vite production build         |
| `npm run lint`    | Run TypeScript type checking              |
| `npm run clean`   | Remove generated build files              |

## 🤖 AI Features

The application uses Google Gemini to provide several career-related AI features:

### AI Resume Generator

Generate a complete resume from basic career information.

### AI Summary Generator

Create ATS-friendly professional summaries and career objectives.

### AI Bullet Enhancer

Transform basic work descriptions into stronger, achievement-focused resume bullet points.

### AI Skill Suggestions

Suggest relevant technical, industry, and soft skills based on the target job role.

### ATS Resume Reviewer

Analyze a resume and provide:

* ATS score
* Keyword optimization analysis
* Formatting and readability feedback
* Resume strengths
* Improvement suggestions
* Missing keywords
* Resume quality checklist

### AI Cover Letter

Generate customized cover letters based on resume information and career goals.

## 🎨 Resume Templates

The application includes multiple professional resume templates designed for different career profiles, including:

* Executive Classic
* Modern Sidebar
* Creative Modern
* Developer Terminal
* Technical SQA
* QA Audit Matrix
* Silicon Minimal
* Nordic Clean
* Swiss Editorial
* Quantum Tech
* Portfolio Showcase
* And many more

## 💾 Data Storage

Resume information is automatically saved in the browser using **LocalStorage**.

Users can also:

* Export resume data as a JSON file
* Import previously saved JSON data
* Reset the resume and start from scratch

No database is required for the basic resume-building functionality.

## 🔐 Environment Variables

The application requires a Gemini API key for AI-powered features.

```env
GEMINI_API_KEY=your_gemini_api_key
```

> **Important:** Never commit your `.env` file or expose your API key publicly. The `.env` file should remain in `.gitignore`.

## 📸 Main Functionalities

The application provides a complete workflow:

```text
Enter Resume Information
        ↓
Customize Resume
        ↓
Use AI Assistance
        ↓
Review ATS Score
        ↓
Select Resume Template
        ↓
Preview Resume
        ↓
Export / Download PDF
```

## 🎯 Purpose

The main goal of this project is to make professional resume creation easier and faster by combining traditional CV-building tools with AI-powered career assistance.

It is especially useful for:

* Fresh Graduates
* Job Seekers
* Software Engineers
* QA/SQA Engineers
* Students
* Career Switchers
* Professionals looking to improve their resumes

## 🔮 Future Improvements

Possible future enhancements include:

* User authentication
* Cloud resume storage
* More resume templates
* Job description matching
* LinkedIn profile import
* Resume version management
* Online resume sharing
* Custom domain resume links
* More AI-powered career recommendations

## 📄 License

This project is intended for educational and personal use.

---

### ⭐ If you find this project useful

Give the repository a ⭐ on GitHub and feel free to contribute or suggest improvements.
