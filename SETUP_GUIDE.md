# Setup Guide

Follow these steps to set up NEXUS AI WEBSITE BUILDER for local development.

## 1. Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Installed on your system
- **API Key**: A [Google Gemini API key](https://makersuite.google.com/app/apikey) (required)

## 2. Installation

### Clone the Repository

```bash
git clone https://github.com/shivamhuyrr/NEXUS-AI-WEB-BUILDER.git
cd NEXUS-AI-WEB-BUILDER
```

### Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

## 3. Environment Variables

Create a `.env` file in the `server/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key          # optional
ANTHROPIC_API_KEY=your_anthropic_api_key    # optional
```

> **Important:** Never commit your `.env` file. It is already listed in `.gitignore`.

## 4. Running Locally

You need **two terminal windows** — one for the backend, one for the frontend.

### Start the Backend (Port 3001)

```bash
node server/server.js
```

You should see:
```
--- SYSTEM STATUS ---
PORT: 3001
GEMINI_API_KEY: ✅ SET
---------------------
Server is running on port 3001
```

### Start the Frontend (Port 3000)

In a **new terminal**:

```bash
npm start
```

The application will open at **http://localhost:3000**.

## 5. Deployment

This project is designed for a split deployment:

| Component | Platform | Config |
|:----------|:---------|:-------|
| Frontend (React) | [Vercel](https://vercel.com) | `vercel.json` |
| Backend (Express) | [Render](https://render.com) | `render.yaml` |

### Deploy Backend to Render

1. Create a new **Web Service** on Render
2. Connect your GitHub repo
3. Set **Root Directory** to `server`
4. Set **Build Command** to `npm install`
5. Set **Start Command** to `node server.js`
6. Add environment variables: `GEMINI_API_KEY`, `OPENAI_API_KEY` (optional)

### Deploy Frontend to Vercel

1. Import your GitHub repo on Vercel
2. Vercel auto-detects Create React App — no config needed
3. The `vercel.json` handles CORS headers automatically

## 6. Troubleshooting

| Issue | Solution |
|:------|:---------|
| `Failed to fetch` | Ensure the backend is running and the URL in `aiService.js` is correct |
| `GEMINI_API_KEY not set` | Check your `server/.env` file |
| Render cold start (30-60s delay) | Normal on free tier — the server spins down after 15 min of inactivity |
| npm install fails | Try `npm install --legacy-peer-deps` (already configured in `.npmrc`) |
