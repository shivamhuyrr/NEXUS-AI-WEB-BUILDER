import React, { useState, useCallback, useEffect } from 'react';
import { Code, Sparkles, Edit3, Eye, Loader2, ChevronRight, Terminal, Code2 } from 'lucide-react';
import StreamingLivePreview from './StreamingLivePreview';
import { generateWebsite, modifyWebsite } from '../services/aiService';
import '../styles/LiveRenderer.css';
import { getParameters } from 'codesandbox/lib/api/define';

// Function to open the generated site in CodeSandbox
function openInCodeSandbox(html, css, js = '') {
  const parameters = getParameters({
    files: {
      "index.html": { content: html },
      "styles.css": { content: css },
      "index.js": { content: js || 'console.log("Ready to use!")' }
    }
  });

  const form = document.createElement('form');
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
  form.method = 'POST';
  form.target = '_blank';

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'parameters';
  input.value = parameters;

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

function prepareHtmlForSandbox(html) {
  if (!html.includes('href="styles.css"')) {
    return html.replace(
      '</head>',
      '<link rel="stylesheet" href="styles.css"></head>'
    );
  }
  return html;
}

const LiveRenderer = ({ onNavigateHome }) => {
  const [userInput, setUserInput] = useState('');
  const [modifyInput, setModifyInput] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Simulated progress calculator
  useEffect(() => {
    let progressInterval;

    if (isStreaming) {
      // Reset progress
      setGenerationProgress(0);

      // Create a simulated progress that starts fast and slows down towards completion
      progressInterval = setInterval(() => {
        setGenerationProgress(prevProgress => {
          // Ensure steps complete faster and more evenly
          if (prevProgress >= 90) {
            // Final stage - slow
            return Math.min(prevProgress + 0.2, 99.9); // Cap at 99.9% until complete
          }
          else if (prevProgress >= 75) {
            // Fourth step - moderate
            return prevProgress + 0.5;
          }
          else if (prevProgress >= 50) {
            // Third step - faster
            return prevProgress + 0.8;
          }
          else if (prevProgress >= 25) {
            // Second step - faster
            return prevProgress + 1.0;
          }
          // First step - fastest
          else {
            return prevProgress + 1.5;
          }
        });
      }, 100); // Faster interval
    } else {
      // When streaming stops, ensure we reach 100% using functional update
      setGenerationProgress(prev => (prev > 0 && prev < 100 ? 100 : prev));
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isStreaming]); // Removed generationProgress to prevent infinite resets

  const handleGenerateWebsite = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter a website description');
      return;
    }
    setIsLoading(true);
    setError(null);
    setHtmlCode('');
    setCssCode('');
    setIsStreaming(true);

    try {
      await generateWebsite(userInput, ({ html, css }) => {
        setHtmlCode(html);
        setCssCode(css);
      });
    } catch (err) {
      setError('Failed to generate website: ' + err.message);
      console.error('Error generating website:', err);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsStreaming(false);
      }, 1000); // Add a small delay to complete the animation
    }
  }, [userInput]);

  const handleModifyWebsite = useCallback(async () => {
    if (!modifyInput.trim()) {
      setError('Please enter a modification description');
      return;
    }
    if (!htmlCode || !cssCode) {
      setError('Please generate a website first');
      return;
    }
    setIsLoading(true);
    setError(null);
    setIsStreaming(true);

    try {
      await modifyWebsite(modifyInput, htmlCode, cssCode, ({ html, css }) => {
        setHtmlCode(html);
        setCssCode(css);
      });
    } catch (err) {
      setError('Failed to modify website: ' + err.message);
      console.error('Error modifying website:', err);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsStreaming(false);
      }, 1000); // Add a small delay to complete the animation
    }
  }, [modifyInput, htmlCode, cssCode]);

  return (
    <div className="builder-container">
      {/* Navigation Header */}
      <nav className="builder-nav">
        <div className="nav-content">
          <button
            onClick={onNavigateHome}
            className="logo-button group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nexus-600 to-nexus-400 flex items-center justify-center shadow-lg shadow-nexus-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Nexus AI
            </span>
          </button>
          <div className="nav-status">
            {isStreaming && (
              <div className="streaming-indicator">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Builder Interface */}
      <div className="builder-content">
        {/* Input Panel */}
        <div className="input-panel">
          {/* Website Description Section */}
          <div className="input-section generate-section">
            <div className="section-header">
              <div className="header-icon">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2>Website Description</h2>
            </div>
            <p className="section-description">
              Describe your dream website and watch AI bring it to life
            </p>
            <div className="input-group">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="A modern portfolio website with a dark theme, animated hero section, project showcase grid, and contact form..."
                className="builder-textarea"
                disabled={isStreaming}
              />
              <button
                onClick={handleGenerateWebsite}
                disabled={isLoading || isStreaming}
                className="generate-button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Terminal className="w-5 h-5" />
                    Generate Website
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Modify Website Section */}
          <div className="input-section modify-section">
            <div className="section-header">
              <div className="header-icon modify-icon">
                <Edit3 className="w-5 h-5" />
              </div>
              <h2>Modify Website</h2>
            </div>
            <p className="section-description">
              Fine-tune your website with specific changes
            </p>
            <div className="input-group">
              <textarea
                value={modifyInput}
                onChange={(e) => setModifyInput(e.target.value)}
                placeholder="Add a testimonials section with carousel, change the color scheme to blue..."
                className="builder-textarea"
                disabled={isStreaming || !htmlCode}
              />
              <button
                onClick={handleModifyWebsite}
                disabled={isLoading || isStreaming || !htmlCode}
                className="modify-button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Edit3 className="w-5 h-5" />
                    Apply Changes
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="error-message">
              <div className="error-icon">!</div>
              {error}
            </div>
          )}
        </div>

        {/* Preview Panel */}
        <div className="preview-panel">
          <div className="preview-header">
            <div className="header-icon preview-icon">
              <Eye className="w-5 h-5" />
            </div>
            <h2>Live Preview</h2>
            <div className="preview-status">
              {isStreaming ? (
                <>
                  <div className="status-dot streaming"></div>
                  <span>Generating ({Math.round(generationProgress)}%)</span>
                </>
              ) : htmlCode ? (
                <>
                  <div className="status-dot complete"></div>
                  <span>Ready</span>
                </>
              ) : (
                <>
                  <div className="status-dot waiting"></div>
                  <span>Waiting</span>
                </>
              )}
            </div>
          </div>

          <div className="preview-window">
            {(htmlCode || isStreaming) && (
              <StreamingLivePreview
                htmlCode={htmlCode}
                cssCode={cssCode}
                isGenerating={isStreaming}
                generationProgress={generationProgress}
              />
            )}
          </div>

          {htmlCode && !isStreaming && (
            <button
              onClick={() => openInCodeSandbox(
                prepareHtmlForSandbox(htmlCode),
                cssCode
              )}
              className="codesandbox-button"
            >
              <Code className="w-5 h-5" />
              Open in CodeSandbox
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveRenderer;