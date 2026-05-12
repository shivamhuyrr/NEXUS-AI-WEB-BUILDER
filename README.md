# NEXUS AI WEBSITE BUILDER

<div align="center">
  <img src="https://raw.githubusercontent.com/shivamhuyrr/NEXUS-AI-Web-Builder/main/public/nexus-favicon.svg" width="100" height="100" alt="NEXUS AI Logo">
  
  <h3>🚀 Premium AI-Powered Real-Time Website Builder</h3>

  [![Live Demo](https://img.shields.io/badge/Live_Demo-nexus--ai-blue?logo=vercel)](https://nexus-ai-web-builder.vercel.app/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-4285F4?logo=google)](https://deepmind.google/technologies/gemini/)

  **Build stunning, fully functional websites in seconds using the power of generative AI.**

  🌐 **[Live App](https://nexus-ai-web-builder.vercel.app/)** · 📖 **[Docs](docs/)** · 🐛 **[Report Bug](https://github.com/shivamhuyrr/NEXUS-AI-WEB-BUILDER/issues)**
</div>

---

## ✨ Overview

**NEXUS AI WEBSITE BUILDER** is a state-of-the-art platform that transforms natural language descriptions into premium, production-ready websites. Leveraging advanced models like **Google Gemini Flash**, it provides a seamless, iterative building experience with live previews and instant code modifications.

## 🌟 Key Features

- 🛠️ **Instant AI Generation** — Create full-page layouts from a single prompt
- 🎨 **Glassmorphism UI** — Sleek, modern aesthetic designed for a premium user experience
- ⚡ **Real-Time Streaming** — Watch your site render live via Server-Sent Events (SSE)
- 📱 **Mobile-Optimized** — Every generated site is fully responsive by default
- 🔒 **Safe Sandboxing** — Code runs in an isolated iframe environment
- 🌍 **Multi-Language** — i18n support for English, Spanish, and Hindi
- 🔄 **Model Fallback Chain** — Automatic retries across multiple Gemini Flash models
- 📤 **CodeSandbox Export** — One-click export to CodeSandbox for further editing

## 🚀 How It Works

```
📝 Describe your site → 🤖 AI generates HTML/CSS → ⚡ Live streaming preview → ✏️ Iterate with modifications
```

1. **Describe** — Enter a natural language description of your website
2. **Generate** — The AI engine streams HTML & CSS in real-time via SSE
3. **Preview** — Watch your website render live in a secure sandboxed iframe
4. **Modify** — Refine with follow-up instructions ("make the buttons larger", "change color to gold")

## 📁 Project Structure

```text
NEXUS-AI-Web-Builder/
├── public/             # Static assets (favicons, logos, index.html)
├── server/             # Express backend & AI service integrations
│   ├── server.js       # API routes & SSE streaming handler
│   ├── geminiService.js# Google Gemini API integration & model fallback
│   ├── claudeService.js# Anthropic Claude integration
│   └── openaiService.js# OpenAI integration
├── src/                # React frontend
│   ├── App.js          # Main app with landing page & routing
│   ├── components/     # UI components
│   │   ├── LiveRenderer.js       # Main builder interface
│   │   ├── StreamingLivePreview.js# Sandboxed iframe renderer
│   │   ├── AIStepVisualizer.js   # AI thinking step visualizer
│   │   └── AIThinkingProcess.js  # Generation progress indicator
│   ├── services/       # Backend communication layer
│   │   └── aiService.js          # API client with SSE stream handling
│   └── styles/         # Component-specific CSS
├── docs/               # Technical documentation
│   ├── architecture.md # System design & model fallback chain
│   ├── about.md        # Project background & research references
│   └── CLAUDE.md       # Development manual & skill categories
├── vercel.json         # Vercel deployment config (frontend)
├── render.yaml         # Render deployment config (backend)
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json        # Dependencies & scripts
```

## ⚙️ Tech Stack

| Layer | Technology |
|:------|:-----------|
| **Frontend** | [React.js](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| **Backend** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/) |
| **AI Engine** | [Google Gemini Flash](https://ai.google.dev/) (primary), [Anthropic Claude](https://www.anthropic.com/), [OpenAI](https://openai.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **i18n** | [i18next](https://www.i18next.com/) |
| **Deployment** | [Vercel](https://vercel.com/) (frontend), [Render](https://render.com/) (backend) |

## 🛠️ Quick Start

### Prerequisites

- **Node.js** v18+ and **npm** v9+
- A [Google Gemini API key](https://makersuite.google.com/app/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/shivamhuyrr/NEXUS-AI-WEB-BUILDER.git
cd NEXUS-AI-WEB-BUILDER

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### Environment Setup

Create a `.env` file inside the `server/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key        # optional
ANTHROPIC_API_KEY=your_anthropic_api_key  # optional
```

### Run Locally

```bash
# Terminal 1 — Start the backend (port 3001)
node server/server.js

# Terminal 2 — Start the frontend (port 3000)
npm start
```

Open **http://localhost:3000** in your browser.

## 🌐 Deployment

| Service | Platform | Config File |
|:--------|:---------|:------------|
| Frontend | Vercel | `vercel.json` |
| Backend | Render | `render.yaml` |

**Live URLs:**
- Frontend: https://nexus-ai-web-builder.vercel.app/
- Backend API: https://nexus-ai-backend-jzit.onrender.com

> **Note:** The Render free tier spins down after 15 minutes of inactivity. The first request may take 30–60s while the server wakes up.

## 🗺️ Roadmap

- [ ] Custom Templates — Pre-defined starting points for various industries
- [ ] Export to ZIP — One-click download of generated source code
- [ ] Database Integration — Built-in support for Postgres/Supabase
- [ ] Voice Commands — Build websites using voice input
- [ ] Multi-page Sites — Generate complete multi-page applications

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<div align="center">
  Built with ❤️ by <b>Shivam Chauhan</b>
</div>
