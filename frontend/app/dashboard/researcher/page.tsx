'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';

import {
  LayoutDashboard,
  User,
  FolderPlus,
  FileCheck2,
  BookOpen,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Edit3,
  CheckCircle,
  Plus,
  Send,
  Sparkles,
  Search,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Clock,
  Check,
  XCircle
} from 'lucide-react';

export default function ResearcherDashboard() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'projects' | 'applications' | 'courses' | 'groups' | 'chat'>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    fullName: 'Dr. Evelyn Vance',
    email: 'evelyn.vance@lab-research.org',
    role: 'Independent Researcher',
    organization: 'Vance Quantum Labs',
    bio: 'Lead Researcher specializing in Applied Quantum Optics and Neural Hardware Integration. Focused on peer-driven interdisciplinary research.',
    interests: 'Quantum Computing, Neural Architectures, Photonic Chips',
    website: 'https://vance-labs.org',
  });

  // Modals & Action States
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  // Mock Data States
  const [myProjects, setMyProjects] = useState([
    { id: '1', title: 'Photonic Neural Chip Simulation', category: 'Quantum AI', applicants: 4, status: 'Active' },
    { id: '2', title: 'Distributed Graph Processing on Edge', category: 'Computer Science', applicants: 2, status: 'Reviewing' },
  ]);

  const [availableProjects, setAvailableProjects] = useState([
    { id: '101', title: 'Bio-Informed Algorithmic Alignment', lead: 'Prof. Marcus Chen', deadline: 'Aug 28, 2026', tags: ['AI Ethics', 'Biology'] },
    { id: '102', title: 'Cryogenic Semiconductor Cooling', lead: 'Dr. Sarah Connor', deadline: 'Sep 15, 2026', tags: ['Hardware', 'Physics'] },
  ]);

  const [applications, setApplications] = useState([
    { id: 'a1', applicantName: 'Liam O\'Connor', projectTitle: 'Photonic Neural Chip Simulation', role: 'PhD Scholar', status: 'Pending' },
    { id: 'a2', applicantName: 'Elena Rostova', projectTitle: 'Photonic Neural Chip Simulation', role: 'M.Sc Researcher', status: 'Pending' },
  ]);

  const [courses, setCourses] = useState([
    { id: 'c1', title: 'Introduction to Quantum Optics', enrolled: 42, modules: 8 },
  ]);

  const [groups, setGroups] = useState([
    { id: 'g1', name: 'Applied Photonics Guild', members: 128, topic: 'Optics & Lasers' },
  ]);

  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Marcus', text: 'Hey Evelyn, did you check the benchmark results on chip #4?', time: '10:14 AM' },
    { sender: 'You', text: 'Yes! The optical latency dropped by 14%. Updating the project notes now.', time: '10:16 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');


  // Nav Items Configuration
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'projects', label: 'Projects & Grants', icon: FolderPlus },
    { id: 'applications', label: 'Review Applications', icon: FileCheck2 },
    { id: 'courses', label: 'Courses & Workshops', icon: BookOpen },
    { id: 'groups', label: 'Research Groups', icon: Users },
    { id: 'chat', label: 'Discussions & Chat', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#031114] text-[#e2f1f4] flex flex-col md:flex-row font-sans selection:bg-[#00e5ff] selection:text-[#031114]">
      
      {/* MOBILE TOP BAR */}
      <div className="md:hidden bg-[#04181c] border-b border-[#0d343c] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="ResearchNest" width={32} height={32} style={{ width: 'auto', height: 'auto' }} className="object-contain" />
          <span className="font-bold text-white tracking-tight">ResearchNest</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-[#7f9ca4] hover:text-white rounded-lg bg-[#031114] border border-[#0d343c]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#04181c] border-r border-[#0d343c] flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Logo Brand */}
          <div className="hidden md:flex items-center gap-3 px-6 py-6 border-b border-[#0d343c]">
            <Image src="/logo.png" alt="ResearchNest" width={36} height={36} style={{ width: 'auto', height: 'auto' }} className="object-contain" />
            <div>
              <span className="font-bold text-white tracking-tight text-lg block leading-none">ResearchNest</span>
              <span className="text-[10px] text-[#00e5ff] font-mono tracking-wider uppercase">Researcher Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                      : 'text-[#7f9ca4] hover:bg-[#0a272d] hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#00e5ff]' : 'text-[#7f9ca4]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Sign Out Footer */}
        <div className="p-4">
            <SignOutButton />
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        {/* HEADER BAR */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#0d343c]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-xs sm:text-sm text-[#7f9ca4] mt-1">
              Independent Research Workspace & Governance Panel
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreateProjectOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#00e5ff] text-[#031114] font-semibold text-xs sm:text-sm hover:bg-[#33ebff] transition shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>
        </header>

        {/* VIEW 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Hosted Projects', value: myProjects.length, icon: FolderPlus, color: 'text-cyan-400' },
                { title: 'Pending Applications', value: applications.length, icon: FileCheck2, color: 'text-amber-400' },
                { title: 'Active Courses', value: courses.length, icon: BookOpen, color: 'text-emerald-400' },
                { title: 'Joined Groups', value: groups.length, icon: Users, color: 'text-indigo-400' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-[#04181c] border border-[#0d343c] p-5 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#7f9ca4] font-mono uppercase">{stat.title}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-[#031114] border border-[#0d343c] ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity & Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#04181c] border border-[#0d343c] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FolderPlus className="w-5 h-5 text-[#00e5ff]" />
                    <span>My Active Research Projects</span>
                  </h3>
                  <button onClick={() => setActiveTab('projects')} className="text-xs text-[#00e5ff] hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {myProjects.map((p) => (
                    <div key={p.id} className="p-4 bg-[#031114] border border-[#0d343c] rounded-lg flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-white text-sm">{p.title}</h4>
                        <span className="text-xs text-[#7f9ca4]">{p.category} • {p.applicants} Candidates pending</span>
                      </div>
                      <span className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30">
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Board */}
              <div className="bg-[#04181c] border border-[#0d343c] rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#00e5ff]" />
                    <span>Quick Creation Hub</span>
                  </h3>
                  <p className="text-xs text-[#7f9ca4] mb-4">
                    As an Independent Researcher, you hold creation privileges across peer projects, custom courses, and open labs.
                  </p>
                  <div className="space-y-2.5">
                    <button onClick={() => setIsCreateCourseOpen(true)} className="w-full text-left p-3 rounded-lg bg-[#031114] border border-[#0d343c] text-xs font-semibold text-white hover:border-[#00e5ff] transition flex items-center justify-between">
                      <span>Create New Course</span>
                      <BookOpen className="w-4 h-4 text-[#00e5ff]" />
                    </button>
                    <button onClick={() => setIsCreateGroupOpen(true)} className="w-full text-left p-3 rounded-lg bg-[#031114] border border-[#0d343c] text-xs font-semibold text-white hover:border-[#00e5ff] transition flex items-center justify-between">
                      <span>Establish Research Group</span>
                      <Users className="w-4 h-4 text-[#00e5ff]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PROFILE (EDIT & VIEW) */}
        {activeTab === 'profile' && (
          <div className="bg-[#04181c] border border-[#0d343c] rounded-xl p-6 max-w-4xl">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#0d343c]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#00e5ff]/20 border border-[#00e5ff] flex items-center justify-center text-2xl font-bold text-[#00e5ff]">
                  {profile.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{profile.fullName}</h2>
                  <p className="text-xs text-[#00e5ff] font-mono">{profile.role}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10 text-xs font-semibold transition"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditingProfile ? 'Cancel Editing' : 'Edit Profile'}</span>
              </button>
            </div>

            {isEditingProfile ? (
              <form onSubmit={(e) => { e.preventDefault(); setIsEditingProfile(false); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#7f9ca4] mb-1">Full Name</label>
                    <input type="text" value={profile.fullName} onChange={(e) => setProfile({...profile, fullName: e.target.value})} className="w-full px-4 py-2.5 rounded-lg bg-[#031114] border border-[#0d343c] text-white text-sm focus:border-[#00e5ff] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#7f9ca4] mb-1">Organization / Lab</label>
                    <input type="text" value={profile.organization} onChange={(e) => setProfile({...profile, organization: e.target.value})} className="w-full px-4 py-2.5 rounded-lg bg-[#031114] border border-[#0d343c] text-white text-sm focus:border-[#00e5ff] outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#7f9ca4] mb-1">Research Interests</label>
                  <input type="text" value={profile.interests} onChange={(e) => setProfile({...profile, interests: e.target.value})} className="w-full px-4 py-2.5 rounded-lg bg-[#031114] border border-[#0d343c] text-white text-sm focus:border-[#00e5ff] outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-[#7f9ca4] mb-1">Bio / Overview</label>
                  <textarea rows={4} value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} className="w-full px-4 py-2.5 rounded-lg bg-[#031114] border border-[#0d343c] text-white text-sm focus:border-[#00e5ff] outline-none" />
                </div>
                <button type="submit" className="px-5 py-2.5 bg-[#00e5ff] text-[#031114] font-semibold text-xs rounded-lg hover:bg-[#33ebff] transition">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#7f9ca4] mb-1">Affiliation</h4>
                  <p className="text-white font-medium">{profile.organization}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#7f9ca4] mb-1">Specializations</h4>
                  <p className="text-[#00e5ff] font-medium">{profile.interests}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#7f9ca4] mb-1">Biography</h4>
                  <p className="text-[#e2f1f4] leading-relaxed">{profile.bio}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: PROJECTS (CREATE & APPLY) */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            {/* Open Projects Feed */}
            <div className="bg-[#04181c] border border-[#0d343c] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#00e5ff]" />
                <span>Apply for Collaborative Projects</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableProjects.map((p) => (
                  <div key={p.id} className="p-5 bg-[#031114] border border-[#0d343c] rounded-xl flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-bold text-white text-base">{p.title}</h4>
                      <p className="text-xs text-[#7f9ca4] mt-1">Lead: {p.lead} • Deadline: {p.deadline}</p>
                      <div className="flex gap-2 mt-3">
                        {p.tags.map((t, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#0d343c] text-[#00e5ff] font-mono">{t}</span>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => alert(`Applied for ${p.title}`)} className="w-full py-2 bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#031114] font-semibold text-xs rounded-lg transition">
                      Submit Proposal / Apply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: APPLICATIONS REVIEW */}
        {activeTab === 'applications' && (
          <div className="bg-[#04181c] border border-[#0d343c] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Pending Candidate Applications</h3>
            <div className="space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="p-4 bg-[#031114] border border-[#0d343c] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-white">{app.applicantName}</h4>
                    <p className="text-xs text-[#7f9ca4]">{app.role} — Applying for <span className="text-[#00e5ff]">{app.projectTitle}</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => alert('Accepted')} className="px-3 py-1.5 bg-emerald-950/50 border border-emerald-800 text-emerald-400 hover:bg-emerald-800 hover:text-white rounded text-xs font-semibold flex items-center gap-1 transition">
                      <Check className="w-3.5 h-3.5" /> Accept
                    </button>
                    <button onClick={() => alert('Rejected')} className="px-3 py-1.5 bg-red-950/50 border border-red-800 text-red-400 hover:bg-red-800 hover:text-white rounded text-xs font-semibold flex items-center gap-1 transition">
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: COURSES */}
        {activeTab === 'courses' && (
          <div className="bg-[#04181c] border border-[#0d343c] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Your Courses & Workshops</h3>
              <button onClick={() => setIsCreateCourseOpen(true)} className="px-3.5 py-2 bg-[#00e5ff] text-[#031114] text-xs font-semibold rounded-lg hover:bg-[#33ebff]">
                + Create Course
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((c) => (
                <div key={c.id} className="p-5 bg-[#031114] border border-[#0d343c] rounded-xl">
                  <h4 className="font-bold text-white text-base">{c.title}</h4>
                  <p className="text-xs text-[#7f9ca4] mt-2">{c.enrolled} Enrolled Researchers • {c.modules} Curriculum Modules</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 6: GROUPS */}
        {activeTab === 'groups' && (
          <div className="bg-[#04181c] border border-[#0d343c] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Research Groups & Labs</h3>
              <button onClick={() => setIsCreateGroupOpen(true)} className="px-3.5 py-2 bg-[#00e5ff] text-[#031114] text-xs font-semibold rounded-lg hover:bg-[#33ebff]">
                + Create Group
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map((g) => (
                <div key={g.id} className="p-5 bg-[#031114] border border-[#0d343c] rounded-xl">
                  <h4 className="font-bold text-white text-base">{g.name}</h4>
                  <p className="text-xs text-[#00e5ff] font-mono mt-1">{g.topic}</p>
                  <p className="text-xs text-[#7f9ca4] mt-2">{g.members} Active Members</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 7: CHAT */}
        {activeTab === 'chat' && (
          <div className="bg-[#04181c] border border-[#0d343c] rounded-xl h-600px flex flex-col">
            <div className="p-4 border-b border-[#0d343c] font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#00e5ff]" />
              <span>Peer Communication & Collaboration Channel</span>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-md p-3 rounded-xl text-xs sm:text-sm ${
                    msg.sender === 'You' 
                      ? 'bg-[#00e5ff]/20 border border-[#00e5ff]/40 text-white rounded-br-none' 
                      : 'bg-[#031114] border border-[#0d343c] text-[#e2f1f4] rounded-bl-none'
                  }`}>
                    <p className="font-bold text-[10px] text-[#00e5ff] mb-1">{msg.sender}</p>
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-[#7f9ca4] mt-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if(!newMessage.trim()) return;
                setChatMessages([...chatMessages, { sender: 'You', text: newMessage, time: 'Just now' }]);
                setNewMessage('');
              }}
              className="p-3 border-t border-[#0d343c] flex gap-2"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-[#031114] border border-[#0d343c] rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
              />
              <button type="submit" className="px-4 py-2 bg-[#00e5ff] text-[#031114] font-semibold text-xs rounded-lg hover:bg-[#33ebff]">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </main>

      {/* MODAL: CREATE PROJECT */}
      {isCreateProjectOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#04181c] border border-[#0d343c] w-full max-w-md rounded-xl p-6 relative">
            <button onClick={() => setIsCreateProjectOpen(false)} className="absolute top-4 right-4 text-[#7f9ca4] hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Create Research Project</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              setMyProjects([...myProjects, { id: Date.now().toString(), title: 'New Peer Project', category: 'General', applicants: 0, status: 'Active' }]);
              setIsCreateProjectOpen(false);
            }} className="space-y-4">
              <div>
                <label className="block text-xs text-[#7f9ca4] mb-1">Project Title</label>
                <input required type="text" placeholder="e.g. Sub-Zero Thermal Analysis" className="w-full px-3 py-2 bg-[#031114] border border-[#0d343c] text-white rounded text-xs focus:border-[#00e5ff] outline-none" />
              </div>
              <div>
                <label className="block text-xs text-[#7f9ca4] mb-1">Category / Domain</label>
                <input required type="text" placeholder="e.g. Physics, ML" className="w-full px-3 py-2 bg-[#031114] border border-[#0d343c] text-white rounded text-xs focus:border-[#00e5ff] outline-none" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-[#00e5ff] text-[#031114] font-semibold text-xs rounded-lg hover:bg-[#33ebff]">
                Publish Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE COURSE */}
      {isCreateCourseOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#04181c] border border-[#0d343c] w-full max-w-md rounded-xl p-6 relative">
            <button onClick={() => setIsCreateCourseOpen(false)} className="absolute top-4 right-4 text-[#7f9ca4] hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Create Academic Course</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              setCourses([...courses, { id: Date.now().toString(), title: 'Advanced Computational Methods', enrolled: 0, modules: 6 }]);
              setIsCreateCourseOpen(false);
            }} className="space-y-4">
              <div>
                <label className="block text-xs text-[#7f9ca4] mb-1">Course Title</label>
                <input required type="text" placeholder="e.g. Advanced Photonics" className="w-full px-3 py-2 bg-[#031114] border border-[#0d343c] text-white rounded text-xs focus:border-[#00e5ff] outline-none" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-[#00e5ff] text-[#031114] font-semibold text-xs rounded-lg hover:bg-[#33ebff]">
                Launch Course
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE GROUP */}
      {isCreateGroupOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#04181c] border border-[#0d343c] w-full max-w-md rounded-xl p-6 relative">
            <button onClick={() => setIsCreateGroupOpen(false)} className="absolute top-4 right-4 text-[#7f9ca4] hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Establish Research Group</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              setGroups([...groups, { id: Date.now().toString(), name: 'Quantum Optics Collective', members: 1, topic: 'Optics' }]);
              setIsCreateGroupOpen(false);
            }} className="space-y-4">
              <div>
                <label className="block text-xs text-[#7f9ca4] mb-1">Group / Lab Name</label>
                <input required type="text" placeholder="e.g. Neural Dynamics Group" className="w-full px-3 py-2 bg-[#031114] border border-[#0d343c] text-white rounded text-xs focus:border-[#00e5ff] outline-none" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-[#00e5ff] text-[#031114] font-semibold text-xs rounded-lg hover:bg-[#33ebff]">
                Form Group
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}