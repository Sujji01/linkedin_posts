import React, { useState, useRef } from 'react';
import { Mail, Phone, Download, Copy, Check, Send, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LinkedInIcon, InstagramIcon } from './Icons';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const Contact: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.contact-panel-main',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.contact-btn-item',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setToastMsg(`${label} copied to clipboard!`);
    setTimeout(() => {
      setCopiedItem(null);
      setToastMsg(null);
    }, 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Banner Panel */}
        <div className="contact-panel-main relative rounded-3xl bg-gradient-to-b from-bgPanel2 via-bgPanel to-bgDark border border-cyanDim/50 p-8 sm:p-14 overflow-hidden shadow-2xl">
          
          {/* Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyanNeon/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto relative z-10 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyanNeon/10 border border-cyanDim text-cyanNeon font-mono text-xs mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Communication</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-textMain tracking-tight">
              Let&apos;s talk <span className="text-cyanNeon">silicon.</span>
            </h2>
            <p className="mt-4 text-textDim text-sm sm:text-base leading-relaxed">
              Open to Physical Design Engineer roles, tape-out opportunities, and technical discussions across RTL-to-GDSII. Reach out directly.
            </p>
          </div>

          {/* Quick Contact Links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 relative z-10 mb-12">
            
            {/* Email Button */}
            <div className="contact-btn-item flex items-center rounded-xl bg-bgDark border border-line hover:border-cyanNeon transition-all overflow-hidden group">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 px-4 py-3 font-mono text-xs sm:text-sm text-textMain hover:text-cyanNeon"
              >
                <Mail className="w-4 h-4 text-cyanNeon" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'Email')}
                className="p-3 border-l border-line text-textFaint hover:text-cyanNeon hover:bg-bgPanel transition-colors"
                title="Copy email"
                aria-label="Copy email"
              >
                {copiedItem === 'Email' ? <Check className="w-3.5 h-3.5 text-greenNeon" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Phone Button */}
            <div className="contact-btn-item flex items-center rounded-xl bg-bgDark border border-line hover:border-cyanNeon transition-all overflow-hidden group">
              <a
                href={`tel:${PERSONAL_INFO.phoneFormatted}`}
                className="flex items-center gap-2 px-4 py-3 font-mono text-xs sm:text-sm text-textMain hover:text-cyanNeon"
              >
                <Phone className="w-4 h-4 text-greenNeon" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'Phone')}
                className="p-3 border-l border-line text-textFaint hover:text-greenNeon hover:bg-bgPanel transition-colors"
                title="Copy phone"
                aria-label="Copy phone"
              >
                {copiedItem === 'Phone' ? <Check className="w-3.5 h-3.5 text-greenNeon" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn-item flex items-center gap-2 px-5 py-3 rounded-xl bg-bgDark border border-line hover:border-cyanNeon text-textDim hover:text-cyanNeon font-mono text-xs sm:text-sm transition-all"
            >
              <LinkedInIcon className="w-4 h-4 text-cyanNeon" />
              <span>LinkedIn ↗</span>
            </a>

            {/* Instagram */}
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn-item flex items-center gap-2 px-5 py-3 rounded-xl bg-bgDark border border-line hover:border-cyanNeon text-textDim hover:text-cyanNeon font-mono text-xs sm:text-sm transition-all"
            >
              <InstagramIcon className="w-4 h-4 text-cyanNeon" />
              <span>@electronics_with_AI ↗</span>
            </a>

            {/* Download Resume */}
            <a
              href={PERSONAL_INFO.resumePath}
              download
              className="contact-btn-item flex items-center gap-2 px-5 py-3 rounded-xl bg-cyanNeon/10 border border-cyanDim hover:bg-cyanNeon/20 text-cyanNeon font-mono text-xs sm:text-sm font-semibold transition-all shadow-sm shadow-cyanNeon/10"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>

          </div>

          {/* Quick Message Form */}
          <div className="max-w-xl mx-auto relative z-10 bg-bgDark/80 border border-line rounded-2xl p-6 sm:p-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-textFaint mb-4 flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-cyanNeon" />
              Send a Quick Message
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-textDim mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-bgPanel border border-line font-mono text-xs text-textMain placeholder-textFaint focus:outline-none focus:border-cyanNeon transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-textDim mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-bgPanel border border-line font-mono text-xs text-textMain placeholder-textFaint focus:outline-none focus:border-cyanNeon transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-textDim mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Physical Design Opportunity / Consultation"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-bgPanel border border-line font-mono text-xs text-textMain placeholder-textFaint focus:outline-none focus:border-cyanNeon transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-textDim mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Hello Sujith, I came across your RTL-to-GDSII portfolio and would like to discuss..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-bgPanel border border-line font-mono text-xs text-textMain placeholder-textFaint focus:outline-none focus:border-cyanNeon transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-xs sm:text-sm font-bold bg-gradient-to-r from-cyanNeon to-[#5be3f5] text-slate-950 hover:shadow-glow-cyan transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send via Email Client</span>
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-bgPanel2 border border-greenNeon/50 text-greenNeon font-mono text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-greenNeon" />
          <span>{toastMsg}</span>
        </div>
      )}

    </section>
  );
};
