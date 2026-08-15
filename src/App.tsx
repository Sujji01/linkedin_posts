import React from 'react';
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
import { KnowledgeGrid } from './components/KnowledgeGrid';
import { BlogSection } from './components/BlogSection';
import { StatsSection } from './components/StatsSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-bgDark text-textMain selection:bg-cyanNeon selection:text-bgDark font-body transition-colors duration-300">
        {/* Background Circuit Layer */}
        <CircuitBg />

        {/* Navigation Header */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Activities />
          <PdFlowExplorer />
          <KnowledgeGrid />
          <BlogSection />
          <StatsSection />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Custom VLSI EDA Reticle Cursor (Topmost Layer) */}
        <CustomCursor />
      </div>
    </ThemeProvider>
  );
};

export default App;
