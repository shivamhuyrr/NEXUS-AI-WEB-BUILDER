import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const thinkingSteps = [
  {
    id: 'analyze',
    title: 'Analyzing your request',
    description: 'Extracting key requirements and design goals',
    insights: [
      'Identifying page structure based on content needs',
      'Determining appropriate color scheme from request',
      'Considering target audience and purpose',
      'Extracting brand personality elements'
    ]
  },
  {
    id: 'plan',
    title: 'Planning layout structure',
    description: 'Organizing content for optimal user experience',
    insights: [
      'Arranging sections based on information hierarchy',
      'Creating logical navigation flow',
      'Planning responsive layout strategy',
      'Positioning content for balanced visual weight'
    ]
  },
  {
    id: 'design',
    title: 'Designing visual elements',
    description: 'Creating cohesive aesthetic and interactions',
    insights: [
      'Selecting typography for readability and style',
      'Creating visual hierarchy through spacing and size',
      'Designing UI components with consistent styling',
      'Adding subtle animations and transitions'
    ]
  },
  {
    id: 'code',
    title: 'Writing clean code',
    description: 'Implementing designs with semantic HTML and CSS',
    insights: [
      'Using semantic HTML elements for accessibility',
      'Writing efficient CSS with modern techniques',
      'Implementing responsive design patterns',
      'Organizing code for maintainability'
    ]
  }
];

const AIThinkingProcess = ({ isActive, progress = 0 }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [stepsCompleted, setStepsCompleted] = useState([]);
  const [activeInsight, setActiveInsight] = useState('');
  
  // Calculate which step should be active based on progress
  useEffect(() => {
    if (!isActive) return;
    
    const totalSteps = thinkingSteps.length;
    const stepSize = 100 / totalSteps;
    
    // Force progress to be at least 1% to avoid calculation issues
    const currentProgress = Math.max(1, progress);
    
    // Calculate the current step index based on progress
    const currentStepIndex = Math.min(Math.floor(currentProgress / stepSize), totalSteps - 1);
    
    console.log(`Progress: ${progress}%, Step Size: ${stepSize}, Current Step Index: ${currentStepIndex}, Active Step: ${activeStep}`);
    
    if (currentStepIndex !== activeStep) {
      if (currentStepIndex > activeStep) {
        // We're moving to a new step, animate current step out
        setIsAnimatingOut(true);
        
        // After animation completes, update to new step
        setTimeout(() => {
          setStepsCompleted(prev => [...prev, activeStep]);
          setActiveStep(currentStepIndex);
          setIsAnimatingOut(false);
          // Reset insight for new step
          if (thinkingSteps[currentStepIndex]?.insights?.length > 0) {
            setActiveInsight(thinkingSteps[currentStepIndex].insights[0]);
          }
        }, 500); // Match this with the CSS animation duration
      } else {
        // Going backward (shouldn't normally happen but handling it)
        setActiveStep(currentStepIndex);
        // Remove completed step
        setStepsCompleted(prev => prev.filter(step => step < currentStepIndex));
      }
    }
    
    // Special case: When progress reaches 100%, ensure all steps are marked as completed
    if (currentProgress >= 99) {
      const allStepsCompleted = Array.from({ length: totalSteps }, (_, i) => i);
      setStepsCompleted(allStepsCompleted);
      setActiveStep(totalSteps - 1);
    }
  }, [isActive, progress, activeStep]);
  
  // Cycle through insights for the current step
  useEffect(() => {
    if (!isActive || isAnimatingOut) return;
    
    const currentInsights = thinkingSteps[activeStep]?.insights || [];
    if (currentInsights.length === 0) return;
    
    // Initial insight
    if (!activeInsight && currentInsights.length > 0) {
      setActiveInsight(currentInsights[0]);
    }
    
    const interval = setInterval(() => {
      setActiveInsight(prev => {
        const currentIndex = currentInsights.indexOf(prev);
        if (currentIndex === -1 || currentIndex === currentInsights.length - 1) {
          return currentInsights[0];
        } else {
          return currentInsights[currentIndex + 1];
        }
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isActive, activeStep, activeInsight, isAnimatingOut]);

  if (!isActive) return null;

  // Render progress indicator at the top
  const renderProgressBar = () => (
    <div className="ai-thinking-progress">
      <div className="progress-steps">
        {thinkingSteps.map((step, index) => (
          <div 
            key={step.id}
            className={`progress-step ${index === activeStep ? 'active' : ''} 
                        ${stepsCompleted.includes(index) ? 'completed' : ''}`}
          >
            <div className="step-indicator">
              {stepsCompleted.includes(index) ? (
                <CheckCircle className="check-icon" size={16} />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="step-label">{step.title}</div>
            <div className="progress-line"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render the current glass panel
  const renderCurrentStep = () => {
    const step = thinkingSteps[activeStep];
    if (!step) return null;
    
    return (
      <div className={`glass-panel ${isAnimatingOut ? 'fade-out' : 'fade-in'}`}>
        <div className="panel-content">
          <div className="step-number-indicator">
            <span>{activeStep + 1}</span>
          </div>
          <div className="step-details">
            <h3>{step.title}</h3>
            <p className="step-description">{step.description}</p>
            
            <div className="insight-container">
              <ArrowRight size={12} className="insight-arrow" />
              <p className="insight-text">{activeInsight}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render the completed steps as mini indicators
  const renderCompletedSteps = () => (
    <div className="completed-steps">
      {stepsCompleted.map(stepIndex => {
        const step = thinkingSteps[stepIndex];
        return (
          <div key={step.id} className="completed-step">
            <CheckCircle size={14} className="check-icon" />
            <span>{step.title}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="ai-thinking-overlay">
      <div className="ai-thinking-container">
        {renderProgressBar()}
        {renderCompletedSteps()}
        {renderCurrentStep()}
        
        <div className="overall-progress">
          <span className="progress-percentage">{Math.round(progress)}% complete</span>
        </div>
      </div>
    </div>
  );
};

export default AIThinkingProcess; 