import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import '../styles/AIStepVisualizer.css';

const steps = [
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

/**
 * A standalone step visualizer component that shows AI thinking process steps
 */
const AIStepVisualizer = ({ isActive = false, progress = 0 }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeInsight, setActiveInsight] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const insightTimerRef = useRef(null);
  
  // Force advancement through steps with a timer - guarantees progress
  useEffect(() => {
    if (!isActive) return;
    
    // Clear any existing timers
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Force advancement through steps every few seconds
    timerRef.current = setInterval(() => {
      const totalSteps = steps.length;
      
      // Advance to next step if not at the end
      if (currentStepIndex < totalSteps - 1) {
        setIsTransitioning(true);
        
        setTimeout(() => {
          setCompletedSteps(prev => [...prev, currentStepIndex]);
          setCurrentStepIndex(prev => prev + 1);
          setIsTransitioning(false);
        }, 500);
      }
    }, 8000); // Force advance every 8 seconds
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, currentStepIndex]);
  
  // Also advance steps based on progress
  useEffect(() => {
    if (!isActive) return;
    
    const totalSteps = steps.length;
    const stepSize = 100 / totalSteps;
    const targetStepIndex = Math.min(
      Math.floor(Math.max(1, progress) / stepSize), 
      totalSteps - 1
    );
    
    console.log(`Progress: ${progress}%, Step Size: ${stepSize}, Target: ${targetStepIndex}, Current: ${currentStepIndex}`);
    
    // Only advance forward, never go back
    if (targetStepIndex > currentStepIndex && !isTransitioning) {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStepIndex]);
        setCurrentStepIndex(targetStepIndex);
        setIsTransitioning(false);
      }, 500);
    }
    
    // When progress is complete, mark all steps as done
    if (progress >= 99) {
      const allSteps = Array.from({ length: totalSteps }, (_, i) => i);
      setCompletedSteps(allSteps);
      setCurrentStepIndex(totalSteps - 1);
    }
  }, [isActive, progress, currentStepIndex, isTransitioning]);
  
  // Cycle through insights for the current step
  useEffect(() => {
    if (!isActive || isTransitioning) return;
    
    const currentInsights = steps[currentStepIndex]?.insights || [];
    if (currentInsights.length === 0) return;
    
    // Set initial insight
    if (!activeInsight) {
      setActiveInsight(currentInsights[0]);
    }
    
    // Clear previous timer
    if (insightTimerRef.current) clearInterval(insightTimerRef.current);
    
    // Cycle through insights
    insightTimerRef.current = setInterval(() => {
      setActiveInsight(prev => {
        const currentIndex = currentInsights.indexOf(prev);
        if (currentIndex === -1 || currentIndex === currentInsights.length - 1) {
          return currentInsights[0];
        } else {
          return currentInsights[currentIndex + 1];
        }
      });
    }, 3000);
    
    return () => {
      if (insightTimerRef.current) clearInterval(insightTimerRef.current);
    };
  }, [isActive, currentStepIndex, isTransitioning, activeInsight]);
  
  // Don't render anything if not active
  if (!isActive) return null;
  
  return (
    <div className="ai-visualizer-overlay">
      <div className="ai-visualizer-container">
        {/* Progress Steps */}
        <div className="visualizer-progress">
          <div className="visualizer-steps">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`visualizer-step ${index === currentStepIndex ? 'active' : ''} 
                          ${completedSteps.includes(index) ? 'completed' : ''}`}
              >
                <div className="step-indicator">
                  {completedSteps.includes(index) ? (
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
        
        {/* Completed Steps Pills */}
        {completedSteps.length > 0 && (
          <div className="completed-pills">
            {completedSteps.map(stepIndex => {
              const step = steps[stepIndex];
              return (
                <div key={step.id} className="completed-pill">
                  <CheckCircle size={14} className="check-icon" />
                  <span>{step.title}</span>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Current Step Panel */}
        <div className={`step-panel ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          <div className="panel-content">
            <div className="step-number">
              <span>{currentStepIndex + 1}</span>
            </div>
            <div className="step-content">
              <h3>{steps[currentStepIndex]?.title}</h3>
              <p className="step-desc">{steps[currentStepIndex]?.description}</p>
              
              <div className="insight-box">
                <ArrowRight size={12} className="insight-arrow" />
                <p className="insight-text">{activeInsight}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="progress-indicator">
          <span className="progress-text">{Math.round(progress)}% complete</span>
        </div>
      </div>
    </div>
  );
};

export default AIStepVisualizer; 