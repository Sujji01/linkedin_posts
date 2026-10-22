import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CircuitBg } from './components/CircuitBg';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Activities } from './components/Activities';
import { PdFlowExplorer } from './components/PdFlowExplorer';
import { TrainingLearnings } from './components/TrainingLearnings';
import { KnowledgeGrid } from './components/KnowledgeGrid';
import { BlogSection } from './components/BlogSection';
import { StatsSection } from './components/StatsSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ResumeModal } from './components/ResumeModal';
import { RecruiterModal } from './components/RecruiterModal';

export const App: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-bgDark text-textMain selection:bg-cyanNeon selection:text-bgDark font-body transition-colors duration-300">
        {/* Background Circuit Layer (auto-pauses when modals are open) */}
        <CircuitBg isPaused={isResumeModalOpen || isRecruiterModalOpen} />

        {/* Navigation Header */}
        <Navbar 
          onOpenResume={() => setIsResumeModalOpen(true)}
          onOpenRecruiter={() => setIsRecruiterModalOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero 
            onOpenResume={() => setIsResumeModalOpen(true)}
            onOpenRecruiter={() => setIsRecruiterModalOpen(true)}
          />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Activities />
          <PdFlowExplorer />
          <TrainingLearnings />
          <KnowledgeGrid />
          <BlogSection />
          <StatsSection />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals */}
        <ResumeModal 
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />

        <RecruiterModal 
          isOpen={isRecruiterModalOpen}
          onClose={() => setIsRecruiterModalOpen(false)}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* Custom VLSI EDA Reticle Cursor (Topmost Layer) */}
        <CustomCursor />
      </div>
    </ThemeProvider>
  );
};

export default App;
