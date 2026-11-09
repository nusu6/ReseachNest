'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  GraduationCap, 
  BookOpen, 
  Microscope, 
  School, 
  Globe, 
  Factory, 
  HelpCircle,
  Asterisk
} from 'lucide-react';

export default function ExactLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const domains = [
    'BIOINFORMATICS', 'CLIMATE CHANGE', 'ROBOTICS', 'BLOCKCHAIN', 
    'PUBLIC HEALTH', 'AGRICULTURE', 'IOT', 'NLP', 'COMPUTER VISION', 'QUANTUM COMPUTING'
  ];

  const roles = [
    {
      title: 'Undergraduate',
      subtitle: 'Publish first paper',
      icon: <GraduationCap className="w-5 h-5 text-[#00e5ff]" />,
    },
    {
      title: "Master's Student",
      subtitle: 'Find thesis supervisor & collaborators',
      icon: <BookOpen className="w-5 h-5 text-[#00e5ff]" />,
    },
    {
      title: 'PhD Researcher',
      subtitle: 'Recruit assistants, expand team',
      icon: <Microscope className="w-5 h-5 text-[#00e5ff]" />,
    },
    {
      title: 'University Teacher',
      subtitle: 'Host paid courses, find research assistants',
      icon: <School className="w-5 h-5 text-[#00e5ff]" />,
    },
    {
      title: 'Independent Researcher',
      subtitle: 'Participate without university affiliation',
      icon: <Globe className="w-5 h-5 text-[#00e5ff]" />,
    },
    {
      title: 'Industry Researcher',
      subtitle: 'Publish projects, recruit students',
      icon: <Factory className="w-5 h-5 text-[#00e5ff]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#061d21] bg-grid-pattern relative overflow-hidden font-sans">
      
      {/* ================= NAVBAR ================= */}
      <nav className="border-b border-[#e2ecea]/80 bg-[#f4f8f7]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded overflow-hidden flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="ResearchNest Logo" 
                width={36} 
                height={36} 
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#061d21] font-bold tracking-tight text-base">ResearchNest</span>
              
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-[#0c1a1d]">
            <a href="#features" className="hover:text-[#176674] transition">Features</a>
            <a href="#how-it-works" className="hover:text-[#176674] transition">How It Works</a>
            <a href="#comparison" className="hover:text-[#176674] transition">Comparison</a>
            <a href="#courses" className="hover:text-[#176674] transition">Courses</a>
            <a href="#about" className="hover:text-[#176674] transition">About</a>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/login" className="text-sm font-medium text-[#061d21] hover:text-[#00e5ff] transition">
              Sign In
            </a>
            <a 
              href="/register" 
              className="px-5 py-2.5 bg-[#00e5ff] hover:bg-[#33ebff] text-[#031114] font-semibold text-sm rounded-md transition duration-200 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded text-[#0c1a1d] hover:text-[#115864]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#e2ecea] bg-[#f4f8f7] px-6 py-6 space-y-4">
            <a href="#features" className="block text-[#061d21] text-base py-1">Features</a>
            <a href="#how-it-works" className="block text-[#061d21] text-base py-1">How It Works</a>
            <a href="#comparison" className="block text-[#061d21] text-base py-1">Comparison</a>
            <a href="#courses" className="block text-[#061d21] text-base py-1">Courses</a>
            <a href="#about" className="block text-[#061d21] text-base py-1">About</a>
            <div className="pt-4 border-t border-[#e2ecea] flex flex-col gap-3">
              <a href="/login" className="text-center py-2.5 rounded border border-[#e2ecea] text-[#061d21]">Sign In</a>
              <a href="/register" className="text-center py-2.5 bg-[#00e5ff] text-[#031114] font-semibold rounded">Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#00707c] bg-[#07262d] text-[#00e1ff] text-xs font-mono tracking-widest uppercase mb-10">
          CONNECT • COLLABORATE • PUBLISH
        </div>

        {/* Large Typography */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.05] text-[#061d21] max-w-5xl">
          Where Research <br />
          <span className="text-[#00e5ff] italic font-serif font-normal">Careers Begin</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg sm:text-xl text-[#133f46] max-w-2xl font-sans leading-relaxed">
          ResearchNest connects students, supervisors, and researchers in one complete ecosystem — from finding a mentor to publishing your first paper.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-md">
          <a 
            href="/register" 
            className="px-8 py-3.5 border border-[#0b2d33] bg-[#00e5ff] hover:bg-[#138895] text-[#031114] font-semibold text-base rounded-md text-center transition"
          >
            Start for free
          </a>
          <a 
            href="#supervisors" 
            className="px-8 py-3.5 border border-[#239bb3] hover:bg-[#138895] bg-[#07262d] text-[#00d9ff] font-medium text-base rounded-md text-center transition"
          >
            Browse supervisors →
          </a>
        </div>
      </section>

      {/* ================= METRICS STATS BAR ================= */}
      <section className="border-y border-[#e2ecea] bg-[#f4f8f7]/80">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#0b282e]">
          
          <div className="p-8 sm:p-10">
            <div className="text-4xl sm:text-5xl font-serif text-[#00e5ff]">6+</div>
            <div className="text-xs font-mono uppercase text-[#061d21] tracking-wider mt-2">COLLABORATION MODULES</div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="text-4xl sm:text-5xl font-serif text-[#00e5ff]">12</div>
            <div className="text-xs font-mono uppercase text-[#061d21] tracking-wider mt-2">RESEARCH DOMAINS</div>
          </div>

            <div className="p-8 sm:p-10">
            <div className="text-4xl sm:text-5xl font-serif text-[#00e5ff]">100+</div>
            <div className="text-xs font-mono uppercase text-[#061d21] tracking-wider mt-2">PAPER WRITING COURSES</div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="text-4xl sm:text-5xl font-serif text-[#00e5ff]">AI</div>
            <div className="text-xs font-mono uppercase text-[#061d21] tracking-wider mt-2">ASSISTANCE BUILT-IN</div>
          </div>

        </div>
      </section>

      {/* ================= DYNAMIC SLIDING DOMAIN TICKER ================= */}
      <div className="border-b border-[#e2ecea] py-4 bg-[#eff6f5] overflow-hidden whitespace-nowrap relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-[#0a869c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-[#0a869c] to-transparent z-10 pointer-events-none" />

        {/* Sliding Container */}
        <div className="animate-marquee">
          {/* Duplicate list twice to create seamless loop */}
          {[...domains, ...domains].map((domain, i) => (
            <div key={i} className="inline-flex items-center text-xs font-mono text-[#00313d] uppercase tracking-widest px-4">
              <span className="hover:text-[#00e5ff] cursor-pointer transition">{domain}</span>
              <span className="text-[#0e353d] ml-8">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PLATFORM MODULES CARDS ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="mb-12">
          <span className="text-[#00e5ff] font-mono text-xs tracking-widest uppercase block mb-3">
            PLATFORM MODULES
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-[#061d21]">
            Everything the research lifecycle needs
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 01 */}
          <div className="p-8 rounded-lg bg-white/90 border border-[#d5e5e3] hover:border-[#00e5ff]/40 transition relative group">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 rounded-full border border-[#00e5ff]/30 text-[#00e5ff] text-[11px] font-mono">Discovery</span>
            </div>
            <Asterisk className="w-6 h-6 text-[#00e5ff] mb-4" />
            <h3 className="text-2xl font-serif text-[#061d21] mb-3">Supervisor Marketplace</h3>
            <p className="text-sm text-[#4a6b72] leading-relaxed">
             Browse verified supervisors accepting students. Filter by topic, department, and research domain. Apply directly-- no cold emails.
            </p>
          </div>
          {/* Card 02 */}
          <div className="p-8 rounded-lg bg-white/90 border border-[#d5e5e3] hover:border-[#00e5ff]/40 transition relative group">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 rounded-full border border-[#00e5ff]/30 text-[#00e5ff] text-[11px] font-mono">Collaboration</span>
            </div>
            <Asterisk className="w-6 h-6 text-[#00e5ff] mb-4" />
            <h3 className="text-2xl font-serif text-[#061d21] mb-3">Research Workspace</h3>
            <p className="text-sm text-[#4a6b72] leading-relaxed">
              Task boards, milestones, shared documents, version history, and real-time chat - everything your team needs to move from idea to submission.
            </p>
          </div>
          {/* Card 03 */}
          <div className="p-8 rounded-lg bg-white/90 border border-[#d5e5e3] hover:border-[#00e5ff]/40 transition relative group">
            <div className="flex justify-between items-start mb-6">
              
              <span className="px-3 py-1 rounded-full border border-[#00e5ff]/30 text-[#00e5ff] text-[11px] font-mono">Intelligence</span>
            </div>
            <Asterisk className="w-6 h-6 text-[#00e5ff] mb-4" />
            <h3 className="text-2xl font-serif text-[#061d21] mb-3">Interest Matching</h3>
            <p className="text-sm text-[#4a6b72] leading-relaxed">
             Select your research domains and the algorithm surfaces compatible supervisors, collaborators and open projects.
            </p>
          </div>
          {/* Card 04 */}
          <div className="p-8 rounded-lg bg-white/90 border border-[#d5e5e3] hover:border-[#00e5ff]/40 transition relative group">
            <div className="flex justify-between items-start mb-6">
             
              <span className="px-3 py-1 rounded-full border border-[#00e5ff]/30 text-[#00e5ff] text-[11px] font-mono">Learning</span>
            </div>
            <Asterisk className="w-6 h-6 text-[#00e5ff] mb-4" />
            <h3 className="text-2xl font-serif text-[#061d21] mb-3">Course Marketplace</h3>
            <p className="text-sm text-[#4a6b72] leading-relaxed">
              Structured paper-writing courses from experienced researchers. 80% revenue goes to instructors. Free previews, paid deep dives.
            </p>
          </div>

          {/* Card 05 */}
          <div className="p-8 rounded-lg bg-white/90 border border-[#d5e5e3] hover:border-[#00e5ff]/40 transition relative group">
            <div className="flex justify-between items-start mb-6">
              
              <span className="px-3 py-1 rounded-full border border-[#00e5ff]/30 text-[#00e5ff] text-[11px] font-mono">Management</span>
            </div>
            <Asterisk className="w-6 h-6 text-[#00e5ff] mb-4" />
            <h3 className="text-2xl font-serif text-[#061d21] mb-3">Progress Tracker</h3>
            <p className="text-sm text-[#4a6b72] leading-relaxed">
              Visual pipeline from Idea → Literature Review → Submission → Publication. Every stage logged, every deadline visible.
            </p>
          </div>

          {/* Card 06 */}
          <div className="p-8 rounded-lg bg-white/90 border border-[#d5e5e3] hover:border-[#00e5ff]/40 transition relative group">
            <div className="flex justify-between items-start mb-6">
             
              <span className="px-3 py-1 rounded-full border border-[#00e5ff]/30 text-[#00e5ff] text-[11px] font-mono">AI · Soon</span>
            </div>
            <Asterisk className="w-6 h-6 text-[#00e5ff] mb-4" />
            <h3 className="text-2xl font-serif text-[#061d21] mb-3">AI Research Assistant</h3>
            <p className="text-sm text-[#4a6b72] leading-relaxed">
              Summarize papers, generate literature reviews, suggest journals, identify research gaps. Powered by LLM + FAISS retrieval.
            </p>
          </div>

        </div>
      </section>

      {/* ================= WHO IT'S FOR SECTION ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e2ecea]">
        
        <div className="mb-14">
          <span className="text-[#00e5ff] font-mono text-xs tracking-widest uppercase block mb-3">
            WHO IT'S FOR
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-[#061d21] max-w-3xl leading-tight">
            Built for every stage of the research career
          </h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-lg bg-white/70 border border-[#d5e5e3] hover:border-[#00e5ff]/40 transition group"
            >
              <div className="w-10 h-10 rounded bg-[#06242b] border border-[#0d3b45] flex items-center justify-center mb-6 group-hover:border-[#00e5ff]/50 transition">
                {role.icon}
              </div>
              <h3 className="text-2xl font-serif text-[#061d21] mb-2">{role.title}</h3>
              <p className="text-sm text-[#4a6b72]">{role.subtitle}</p>
            </div>
          ))}
        </div>

      </section>

      {/* ================= FLOATING HELP BUTTON ================= */}
      <button 
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white text-[#031114] flex items-center justify-center shadow-lg hover:bg-[#00e5ff] transition z-50 font-bold"
        aria-label="Help"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#e2ecea] bg-[#eff6f5] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
            
            {/* Brand Column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded overflow-hidden flex items-center justify-center">
                  <Image 
                    src="/logo.png" 
                    alt="ResearchNest Logo" 
                    width={32} 
                    height={32} 
                    className="object-contain"
                  />
                </div>
                <span className="text-[#061d21] font-bold tracking-tight text-lg">ResearchNest</span>
              </div>
              <p className="text-[#061d21] text-sm max-w-sm leading-relaxed">
                The unified research infrastructure connecting students, faculty, and industry pioneers from initial concept to publication.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
                <span className="text-xs font-mono text-[#00e5ff]">Systems Operational</span>
              </div>
            </div>

            {/* Column 1: Platform */}
            <div className="space-y-3">
              <p className="text-xs font-mono text-[#061d21] uppercase tracking-wider">Platform</p>
              <ul className="space-y-2 text-[#4a6b72]">
                <li><a href="#features" className="hover:text-[#00e5ff] transition">Collaboration Modules</a></li>
                <li><a href="#courses" className="hover:text-[#00e5ff] transition">Course Marketplace</a></li>
                <li><a href="#tracker" className="hover:text-[#00e5ff] transition">Progress Tracker</a></li>
                <li><a href="#ai" className="hover:text-[#00e5ff] transition">AI Research Assistant</a></li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div className="space-y-3">
              <p className="text-xs font-mono text-[#061d21] uppercase tracking-wider">Resources</p>
              <ul className="space-y-2 text-[#4a6b72]">
                <li><a href="#" className="hover:text-[#00e5ff] transition">Supervisors Directory</a></li>
                <li><a href="#" className="hover:text-[#00e5ff] transition">Grant Database</a></li>
                <li><a href="#" className="hover:text-[#00e5ff] transition">Documentation</a></li>
                <li><a href="#" className="hover:text-[#00e5ff] transition">API Reference</a></li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="space-y-3">
              <p className="text-xs font-mono text-[#061d21] uppercase tracking-wider">Company</p>
              <ul className="space-y-2 text-[#4a6b72]">
                <li><a href="#about" className="hover:text-[#00e5ff] transition">About Us</a></li>
                <li><a href="#" className="hover:text-[#00e5ff] transition">Careers</a></li>
                <li><a href="#" className="hover:text-[#00e5ff] transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#00e5ff] transition">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 border-t border-[#e2ecea]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#54757d]">
            <p>© 2026 ResearchNest Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#061d21] transition">GitHub</a>
              <a href="#" className="hover:text-[#061d21] transition">Twitter / X</a>
              <a href="#" className="hover:text-[#061d21] transition">LinkedIn</a>
              <a href="#" className="hover:text-[#061d21] transition">Discord</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}