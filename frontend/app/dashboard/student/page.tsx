'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';
import { 
  LayoutDashboard, 
  User, 
  Compass, 
  BookOpen, 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  Share2, 
  MessageSquare, 
  Video, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Search, 
  Menu, 
  X, 
  ExternalLink, 
  Send, 
  Sparkles,
  Paperclip,
  GitBranch,
  Users,
  LogOut,
  GraduationCap,
  Save,
  RotateCcw,
  UploadCloud,
  Code2,
  Globe,
  BookMarked,
  Award,
  Building2,
  Briefcase
} from 'lucide-react';

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ================= TYPES & INTERFACES =================
type TabType = 'workspace' | 'profile' | 'matching' | 'projects' | 'courses';

interface ProfileData {
  fullName: string;
  university: string;
  department: string;
  education: string;
  bio: string;
  skills: string[];
  languages: string[];
  interests: string[];
  publications: string[];
  orcid: string;
  googleScholar: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
}

const INTEREST_DOMAINS = [
  'AI', 'Cyber Security', 'Agriculture', 'Blockchain', 
  'IoT', 'Robotics', 'Bioinformatics', 'Climate Change', 'Public Health'
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ================= STATE FOR PROFILE =================
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    fullName: 'Alex Vance',
    university: 'Stanford University',
    department: 'Computer Science & Computational Biology',
    education: 'B.Sc. in Computer Science (Senior Year)',
    bio: 'Senior undergraduate researcher dedicated to leveraging deep learning architectures for high-throughput computational biology and gene expression sequence modeling.',
    skills: ['PyTorch', 'Next.js', 'PostgreSQL', 'R', 'Linux', 'BioPython'],
    languages: ['Python', 'TypeScript', 'C++', 'Bash'],
    interests: ['AI', 'Bioinformatics', 'Climate Change'],
    publications: [
      'Vance, A. et al. (2025). Transformer Architectures in Genomic Sequencing. Journal of AI Research.'
    ],
    orcid: '0000-0002-1825-0097',
    googleScholar: 'https://scholar.google.com/citations?user=sample',
    github: 'https://github.com/alexvance',
    linkedin: 'https://linkedin.com/in/alexvance',
    resumeUrl: 'alex_vance_cv_2026.pdf',
  });

  // Edit Buffer State
  const [tempProfile, setTempProfile] = useState<ProfileData>(profile);

  // Tag Input Fields
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newLangInput, setNewLangInput] = useState('');
  const [newInterestInput, setNewInterestInput] = useState('');
  const [newPubInput, setNewPubInput] = useState('');

  // ================= STATE FOR OTHER MODULES =================
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['AI', 'Bioinformatics']);
  const [workspaceSubTab, setWorkspaceSubTab] = useState<'board' | 'docs' | 'chat' | 'meetings'>('board');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Literature Review on Gene Expression', status: 'Done', assignee: 'Alex V.', deadline: '2026-08-10' },
    { id: 2, title: 'Train PyTorch Model on Dataset B', status: 'In Progress', assignee: 'Alex V.', deadline: '2026-08-15' },
    { id: 3, title: 'Draft Section 3: Methodology', status: 'To Do', assignee: 'Sarah K.', deadline: '2026-08-20' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Dr. Elena Rostova', text: 'Great progress on the preprocessing script, Alex!', time: '10:42 AM' },
    { id: 2, sender: 'Alex Vance', text: 'Thanks Dr. Elena! I just pushed version 1.2 to the repository.', time: '10:45 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const [myApplications, setMyApplications] = useState([
    { id: 'app-1', projectTitle: 'Autonomous Climate Monitoring Sensors', supervisor: 'Dr. Marcus Vance', status: 'Under Review', appliedDate: '2026-07-28' },
    { id: 'app-2', projectTitle: 'Quantum Safe Cryptography in IoT', supervisor: 'Dr. Aris Thorne', status: 'Accepted', appliedDate: '2026-07-15' }
  ]);

  const [myGroups, setMyGroups] = useState([
    { id: 'grp-1', name: 'Genomic AI Research Circle', role: 'Student Researcher', members: 5 },
    { id: 'grp-2', name: 'NLP in Public Health Group', role: 'Collaborator', members: 3 }
  ]);

  const [isCreatingGroupModal, setIsCreatingGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  // ================= HANDLERS FOR PROFILE EDITING =================
  const handleStartEditing = () => {
    setTempProfile(profile);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setProfile(tempProfile);
    setIsEditingProfile(false);
  };

  const handleCancelEditing = () => {
    setTempProfile(profile);
    setIsEditingProfile(false);
  };

  // Add & Remove Item Helpers
  const addTagItem = (field: 'skills' | 'languages' | 'interests', value: string, setter: (val: string) => void) => {
    if (!value.trim()) return;
    if (!tempProfile[field].includes(value.trim())) {
      setTempProfile({ ...tempProfile, [field]: [...tempProfile[field], value.trim()] });
    }
    setter('');
  };

  const removeTagItem = (field: 'skills' | 'languages' | 'interests', indexToRemove: number) => {
    setTempProfile({
      ...tempProfile,
      [field]: tempProfile[field].filter((_, idx) => idx !== indexToRemove)
    });
  };

  const addPublication = () => {
    if (!newPubInput.trim()) return;
    setTempProfile({
      ...tempProfile,
      publications: [...tempProfile.publications, newPubInput.trim()]
    });
    setNewPubInput('');
  };

  const removePublication = (indexToRemove: number) => {
    setTempProfile({
      ...tempProfile,
      publications: tempProfile.publications.filter((_, idx) => idx !== indexToRemove)
    });
  };

  // Other Handlers
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([...tasks, {
      id: Date.now(),
      title: newTaskTitle,
      status: 'To Do',
      assignee: 'Alex V.',
      deadline: '2026-08-30'
    }]);
    setNewTaskTitle('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages([...chatMessages, {
      id: Date.now(),
      sender: 'Alex Vance',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-[#031114] text-[#e2f1f4] bg-grid-pattern flex flex-col font-sans">
      
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="border-b border-[#0b282e]/80 bg-[#031114]/90 backdrop-blur-md sticky top-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded text-[#94aeb5] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded overflow-hidden flex items-center justify-center">
              <Image src="/logo.png" alt="ResearchNest" width={32} height={32} className="object-contain" priority />
            </div>
            <span className="text-white font-bold tracking-tight text-lg hidden sm:inline">ResearchNest</span>
          </Link>

          <span className="ml-3 px-2.5 py-0.5 rounded-full border border-[#00e5ff]/40 bg-[#00e5ff]/10 text-[#00e5ff] text-[10px] font-mono tracking-widest uppercase">
            STUDENT DASHBOARD
          </span>
        </div>

        {/* User Info & Header Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-white">{profile.fullName}</span>
            <span className="text-[11px] text-[#00e5ff] font-mono">{profile.university}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0d343c] border border-[#00e5ff]/50 flex items-center justify-center text-white font-serif text-sm font-bold shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            {profile.fullName.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* ================= SIDEBAR NAVIGATION ================= */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-30 w-64 bg-[#020d0f] border-r border-[#0b282e] transition-transform duration-300 transform 
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          pt-20 md:pt-0 flex flex-col justify-between
        `}>
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-[#54757d]">Navigation</div>
            
            <button
              onClick={() => { setActiveTab('workspace'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'workspace' 
                  ? 'bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30' 
                  : 'text-[#7f9ca4] hover:text-white hover:bg-[#04181c]'
              }`}
            >
              <Layers className="w-4 h-4" /> Research Workspace
            </button>

            <button
              onClick={() => { setActiveTab('matching'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'matching' 
                  ? 'bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30' 
                  : 'text-[#7f9ca4] hover:text-white hover:bg-[#04181c]'
              }`}
            >
              <Compass className="w-4 h-4" /> Interest Matching
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'projects' 
                  ? 'bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30' 
                  : 'text-[#7f9ca4] hover:text-white hover:bg-[#04181c]'
              }`}
            >
              <Users className="w-4 h-4" /> Teams & Applications
            </button>

            <button
              onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'courses' 
                  ? 'bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30' 
                  : 'text-[#7f9ca4] hover:text-white hover:bg-[#04181c]'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Course Marketplace
            </button>

            <button
              onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'profile' 
                  ? 'bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30' 
                  : 'text-[#7f9ca4] hover:text-white hover:bg-[#04181c]'
              }`}
            >
              <User className="w-4 h-4" /> Student Profile
            </button>
          </div>

          <div className="p-4">
            <SignOutButton />
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
          
          {/* ================= REDESIGNED PROFILE TAB ================= */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Profile Header & Action Control Card */}
              <div className="relative overflow-hidden bg-linear-to-r from-[#04181c] via-[#06242a] to-[#04181c] p-6 sm:p-8 rounded-2xl border border-[#0d343c] shadow-xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#00e5ff]/5 rounded-full filter blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* User Profile Overview Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="relative group">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#082e36] border-2 border-[#00e5ff]/40 flex items-center justify-center text-white font-serif text-3xl font-bold shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                        {isEditingProfile 
                          ? (tempProfile.fullName.split(' ').map(n => n[0]).join('') || 'U')
                          : (profile.fullName.split(' ').map(n => n[0]).join('') || 'U')
                        }
                      </div>
                      {isEditingProfile && (
                        <label className="absolute inset-0 bg-[#031114]/80 rounded-2xl flex flex-col items-center justify-center cursor-pointer opacity-90 transition text-xs font-mono text-[#00e5ff]">
                          <UploadCloud className="w-5 h-5 mb-1 text-[#00e5ff]" />
                          <span>Photo</span>
                        </label>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-2xl sm:text-3xl font-serif text-white font-bold tracking-tight">
                          {isEditingProfile ? tempProfile.fullName || 'Your Name' : profile.fullName}
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-[10px] font-mono">
                          Verified Scholar
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-[#00e5ff] font-mono flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4" />
                        {isEditingProfile ? tempProfile.education : profile.education}
                      </p>

                      <p className="text-xs text-[#7f9ca4] flex items-center gap-2 pt-1">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-[#54757d]" />
                          {isEditingProfile ? tempProfile.university : profile.university}
                        </span>
                        <span>•</span>
                        <span>{isEditingProfile ? tempProfile.department : profile.department}</span>
                      </p>
                    </div>
                  </div>

                  {/* Top Action Toggle Bar */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    {isEditingProfile ? (
                      <>
                        <button 
                          onClick={handleCancelEditing}
                          className="px-4 py-2.5 rounded-lg border border-[#0d343c] bg-[#031114] text-[#7f9ca4] hover:text-white hover:bg-[#06242a] text-xs font-medium flex items-center gap-2 transition"
                        >
                          <RotateCcw className="w-4 h-4" /> Cancel
                        </button>
                        <button 
                          onClick={handleSaveProfile}
                          className="px-5 py-2.5 rounded-lg bg-[#00e5ff] text-[#031114] text-xs font-bold flex items-center gap-2 hover:bg-[#33ebff] shadow-[0_0_15px_rgba(0,229,255,0.3)] transition"
                        >
                          <Save className="w-4 h-4" /> Save Profile
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={handleStartEditing}
                        className="px-5 py-2.5 rounded-lg bg-[#00e5ff] text-[#031114] text-xs font-bold flex items-center gap-2 hover:bg-[#33ebff] shadow-[0_0_15px_rgba(0,229,255,0.2)] transition"
                      >
                        <Edit3 className="w-4 h-4" /> Edit Profile Information
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* Main Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column (2 Cols wide on desktop) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* General Profile & Bio */}
                  <div className="bg-[#04181c]/90 border border-[#0d343c] p-6 rounded-2xl space-y-5">
                    <div className="flex items-center justify-between border-b border-[#0d343c] pb-3">
                      <h3 className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider flex items-center gap-2 font-bold">
                        <User className="w-4 h-4" /> General Academic Information
                      </h3>
                      {isEditingProfile && <span className="text-[10px] font-mono text-[#7f9ca4]">Editing Enabled</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[#7f9ca4] block font-mono mb-1.5">Full Name</label>
                        {isEditingProfile ? (
                          <input 
                            type="text" 
                            value={tempProfile.fullName} 
                            onChange={(e) => setTempProfile({...tempProfile, fullName: e.target.value})}
                            className="w-full bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] p-2.5 text-xs rounded-lg text-white outline-none transition"
                          />
                        ) : (
                          <p className="text-sm text-white font-medium bg-[#020d0f]/50 p-2.5 rounded-lg border border-[#0d343c]/50">
                            {profile.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs text-[#7f9ca4] block font-mono mb-1.5">Education / Academic Status</label>
                        {isEditingProfile ? (
                          <input 
                            type="text" 
                            value={tempProfile.education} 
                            onChange={(e) => setTempProfile({...tempProfile, education: e.target.value})}
                            className="w-full bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] p-2.5 text-xs rounded-lg text-white outline-none transition"
                          />
                        ) : (
                          <p className="text-sm text-white font-medium bg-[#020d0f]/50 p-2.5 rounded-lg border border-[#0d343c]/50">
                            {profile.education}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs text-[#7f9ca4] block font-mono mb-1.5">University / Institution</label>
                        {isEditingProfile ? (
                          <input 
                            type="text" 
                            value={tempProfile.university} 
                            onChange={(e) => setTempProfile({...tempProfile, university: e.target.value})}
                            className="w-full bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] p-2.5 text-xs rounded-lg text-white outline-none transition"
                          />
                        ) : (
                          <p className="text-sm text-white font-medium bg-[#020d0f]/50 p-2.5 rounded-lg border border-[#0d343c]/50">
                            {profile.university}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs text-[#7f9ca4] block font-mono mb-1.5">Department / Field</label>
                        {isEditingProfile ? (
                          <input 
                            type="text" 
                            value={tempProfile.department} 
                            onChange={(e) => setTempProfile({...tempProfile, department: e.target.value})}
                            className="w-full bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] p-2.5 text-xs rounded-lg text-white outline-none transition"
                          />
                        ) : (
                          <p className="text-sm text-white font-medium bg-[#020d0f]/50 p-2.5 rounded-lg border border-[#0d343c]/50">
                            {profile.department}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-[#7f9ca4] block font-mono mb-1.5">Research Bio & Statement</label>
                      {isEditingProfile ? (
                        <textarea 
                          rows={3}
                          value={tempProfile.bio} 
                          onChange={(e) => setTempProfile({...tempProfile, bio: e.target.value})}
                          className="w-full bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] p-3 text-xs rounded-lg text-white outline-none transition resize-none"
                          placeholder="Briefly describe your research focus and aspirations..."
                        />
                      ) : (
                        <p className="text-xs text-[#c2dce2] leading-relaxed bg-[#020d0f]/50 p-3 rounded-lg border border-[#0d343c]/50 font-sans">
                          {profile.bio || 'No bio specified.'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Technical Skills & Languages Tag Management */}
                  <div className="bg-[#04181c]/90 border border-[#0d343c] p-6 rounded-2xl space-y-6">
                    <div className="flex items-center justify-between border-b border-[#0d343c] pb-3">
                      <h3 className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider flex items-center gap-2 font-bold">
                        <Code2 className="w-4 h-4" /> Skills, Tools & Programming Languages
                      </h3>
                    </div>

                    {/* Technical Skills */}
                    <div className="space-y-2">
                      <label className="text-xs text-[#7f9ca4] block font-mono">Technical & Lab Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {(isEditingProfile ? tempProfile.skills : profile.skills).map((s, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-[#020d0f] border border-[#0d343c] rounded-lg text-xs text-[#e2f1f4] flex items-center gap-2">
                            {s}
                            {isEditingProfile && (
                              <button 
                                onClick={() => removeTagItem('skills', idx)} 
                                className="text-[#7f9ca4] hover:text-red-400 transition"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </span>
                        ))}
                      </div>

                      {isEditingProfile && (
                        <div className="flex gap-2 pt-2">
                          <input 
                            type="text" 
                            value={newSkillInput}
                            onChange={(e) => setNewSkillInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTagItem('skills', newSkillInput, setNewSkillInput))}
                            placeholder="Add skill (e.g. PyTorch, Next.js)..."
                            className="flex-1 bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] px-3 py-1.5 text-xs rounded-lg text-white outline-none"
                          />
                          <button 
                            type="button" 
                            onClick={() => addTagItem('skills', newSkillInput, setNewSkillInput)}
                            className="px-3 py-1.5 bg-[#0d343c] text-[#00e5ff] text-xs font-mono rounded-lg hover:bg-[#00e5ff] hover:text-[#031114] transition flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Programming Languages */}
                    <div className="space-y-2 pt-2 border-t border-[#0d343c]/60">
                      <label className="text-xs text-[#7f9ca4] block font-mono">Programming Languages</label>
                      <div className="flex flex-wrap gap-2">
                        {(isEditingProfile ? tempProfile.languages : profile.languages).map((l, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-[#00e5ff]/10 border border-[#00e5ff]/30 rounded-lg text-xs text-[#00e5ff] font-mono flex items-center gap-2">
                            {l}
                            {isEditingProfile && (
                              <button 
                                onClick={() => removeTagItem('languages', idx)} 
                                className="text-[#00e5ff]/70 hover:text-red-400 transition"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </span>
                        ))}
                      </div>

                      {isEditingProfile && (
                        <div className="flex gap-2 pt-2">
                          <input 
                            type="text" 
                            value={newLangInput}
                            onChange={(e) => setNewLangInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTagItem('languages', newLangInput, setNewLangInput))}
                            placeholder="Add language (e.g. Python, C++)..."
                            className="flex-1 bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] px-3 py-1.5 text-xs rounded-lg text-white outline-none"
                          />
                          <button 
                            type="button" 
                            onClick={() => addTagItem('languages', newLangInput, setNewLangInput)}
                            className="px-3 py-1.5 bg-[#0d343c] text-[#00e5ff] text-xs font-mono rounded-lg hover:bg-[#00e5ff] hover:text-[#031114] transition flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Active Research Interests */}
                    <div className="space-y-2 pt-2 border-t border-[#0d343c]/60">
                      <label className="text-xs text-[#7f9ca4] block font-mono">Primary Research Interests</label>
                      <div className="flex flex-wrap gap-2">
                        {(isEditingProfile ? tempProfile.interests : profile.interests).map((interest, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-[#082e36] border border-[#00e5ff]/20 rounded-full text-xs text-white font-mono flex items-center gap-2">
                            {interest}
                            {isEditingProfile && (
                              <button 
                                onClick={() => removeTagItem('interests', idx)} 
                                className="text-[#7f9ca4] hover:text-red-400 transition"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </span>
                        ))}
                      </div>

                      {isEditingProfile && (
                        <div className="flex gap-2 pt-2">
                          <input 
                            type="text" 
                            value={newInterestInput}
                            onChange={(e) => setNewInterestInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTagItem('interests', newInterestInput, setNewInterestInput))}
                            placeholder="Add domain (e.g. Bioinformatics, AI)..."
                            className="flex-1 bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] px-3 py-1.5 text-xs rounded-lg text-white outline-none"
                          />
                          <button 
                            type="button" 
                            onClick={() => addTagItem('interests', newInterestInput, setNewInterestInput)}
                            className="px-3 py-1.5 bg-[#0d343c] text-[#00e5ff] text-xs font-mono rounded-lg hover:bg-[#00e5ff] hover:text-[#031114] transition flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Publications & Works */}
                  <div className="bg-[#04181c]/90 border border-[#0d343c] p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-[#0d343c] pb-3">
                      <h3 className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider flex items-center gap-2 font-bold">
                        <BookMarked className="w-4 h-4" /> Publications & Preprints
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {(isEditingProfile ? tempProfile.publications : profile.publications).map((pub, idx) => (
                        <div key={idx} className="p-3.5 bg-[#020d0f] border border-[#0d343c] rounded-xl flex items-start justify-between gap-3 group">
                          <p className="text-xs text-[#8faab2] leading-relaxed font-sans flex-1">
                            {pub}
                          </p>
                          {isEditingProfile && (
                            <button 
                              onClick={() => removePublication(idx)} 
                              className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/30 transition shrink-0"
                              title="Delete Publication"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}

                      {(!isEditingProfile && profile.publications.length === 0) && (
                        <p className="text-xs text-[#54757d] italic">No publications added yet.</p>
                      )}

                      {isEditingProfile && (
                        <div className="space-y-2 pt-2">
                          <textarea 
                            rows={2}
                            value={newPubInput}
                            onChange={(e) => setNewPubInput(e.target.value)}
                            placeholder="Enter citation (e.g. Vance, A. et al. (2026)...)"
                            className="w-full bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] p-2.5 text-xs rounded-lg text-white outline-none resize-none"
                          />
                          <button 
                            type="button" 
                            onClick={addPublication}
                            className="px-4 py-2 bg-[#0d343c] text-[#00e5ff] text-xs font-mono rounded-lg hover:bg-[#00e5ff] hover:text-[#031114] transition flex items-center gap-1.5"
                          >
                            <Plus className="w-4 h-4" /> Add Publication Record
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right Column (1 Col wide on desktop - Links & CV) */}
                <div className="space-y-6">
                  
                  {/* Academic Profiles & External Links */}
                  <div className="bg-[#04181c]/90 border border-[#0d343c] p-6 rounded-2xl space-y-5">
                    <div className="flex items-center justify-between border-b border-[#0d343c] pb-3">
                      <h3 className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider flex items-center gap-2 font-bold">
                        <Globe className="w-4 h-4" /> Profiles & External Links
                      </h3>
                    </div>

                    <div className="space-y-4 text-xs">
                      
                      {/* ORCID */}
                      <div>
                        <label className="text-[#698890] block font-mono mb-1">ORCID iD</label>
                        {isEditingProfile ? (
                          <input 
                            type="text" 
                            value={tempProfile.orcid}
                            onChange={(e) => setTempProfile({...tempProfile, orcid: e.target.value})}
                            className="w-full bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] p-2 text-xs rounded text-white font-mono outline-none"
                          />
                        ) : (
                          <a 
                            href={`https://orcid.org/${profile.orcid}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#00e5ff] flex items-center gap-1.5 hover:underline font-mono bg-[#020d0f]/50 p-2 rounded border border-[#0d343c]/50 truncate"
                          >
                            <Award className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{profile.orcid || 'Not provided'}</span>
                            <ExternalLink className="w-3 h-3 shrink-0 ml-auto" />
                          </a>
                        )}
                      </div>

                      {/* Google Scholar */}
                      <div>
                        <label className="text-[#698890] block font-mono mb-1">Google Scholar URL</label>
                        {isEditingProfile ? (
                          <input 
                            type="text" 
                            value={tempProfile.googleScholar}
                            onChange={(e) => setTempProfile({...tempProfile, googleScholar: e.target.value})}
                            className="w-full bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] p-2 text-xs rounded text-white font-mono outline-none"
                          />
                        ) : (
                          <a 
                            href={profile.googleScholar} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#00e5ff] flex items-center gap-1.5 hover:underline font-mono bg-[#020d0f]/50 p-2 rounded border border-[#0d343c]/50 truncate"
                          >
                            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{profile.googleScholar || 'Not provided'}</span>
                            <ExternalLink className="w-3 h-3 shrink-0 ml-auto" />
                          </a>
                        )}
                      </div>

                      {/* GitHub  */}
                      <div>
                        <label className="text-[#698890] block font-mono mb-1">GitHub Profile</label>
                        {isEditingProfile ? (
                          <input 
                            type="text" 
                            value={tempProfile.github}
                            onChange={(e) => setTempProfile({...tempProfile, github: e.target.value})}
                            className="w-full bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] p-2 text-xs rounded text-white font-mono outline-none"
                          />
                        ) : (
                          <a 
                            href={profile.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#00e5ff] flex items-center gap-1.5 hover:underline font-mono bg-[#020d0f]/50 p-2 rounded border border-[#0d343c]/50 truncate"
                          >
                            <Github className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{profile.github || 'Not provided'}</span>
                            <ExternalLink className="w-3 h-3 shrink-0 ml-auto" />
                          </a>
                        )}
                      </div> 

                      {/* LinkedIn */}
                       <div>
                        <label className="text-[#698890] block font-mono mb-1">LinkedIn Profile</label>
                        {isEditingProfile ? (
                          <input 
                            type="text" 
                            value={tempProfile.linkedin}
                            onChange={(e) => setTempProfile({...tempProfile, linkedin: e.target.value})}
                            className="w-full bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] p-2 text-xs rounded text-white font-mono outline-none"
                          />
                        ) : (
                          <a 
                            href={profile.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#00e5ff] flex items-center gap-1.5 hover:underline font-mono bg-[#020d0f]/50 p-2 rounded border border-[#0d343c]/50 truncate"
                          >
                            <Linkedin className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{profile.linkedin || 'Not provided'}</span>
                            <ExternalLink className="w-3 h-3 shrink-0 ml-auto" />
                          </a>
                        )}
                      </div> 

                    </div>
                  </div>

                  {/* Resume / Curriculum Vitae */}
                  <div className="bg-[#04181c]/90 border border-[#0d343c] p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-[#0d343c] pb-3">
                      <h3 className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider flex items-center gap-2 font-bold">
                        <FileText className="w-4 h-4" /> Curriculum Vitae (CV)
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 bg-[#020d0f] border border-[#0d343c] rounded-xl flex items-center gap-3">
                        <Paperclip className="w-5 h-5 text-[#00e5ff] shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-mono text-white truncate">
                            {isEditingProfile ? tempProfile.resumeUrl : profile.resumeUrl}
                          </p>
                          <span className="text-[10px] text-[#54757d]">PDF Document • Updated 2026</span>
                        </div>
                      </div>

                      {isEditingProfile ? (
                        <div>
                          <label className="text-[11px] text-[#698890] block mb-1 font-mono">CV Filename / Link</label>
                          <input 
                            type="text" 
                            value={tempProfile.resumeUrl}
                            onChange={(e) => setTempProfile({...tempProfile, resumeUrl: e.target.value})}
                            className="w-full bg-[#020d0f] border border-[#0d343c] focus:border-[#00e5ff] p-2 text-xs rounded text-white font-mono outline-none"
                          />
                        </div>
                      ) : (
                        <button className="w-full py-2 bg-[#0d343c] border border-[#00e5ff]/30 text-[#00e5ff] text-xs font-mono font-medium rounded-lg hover:bg-[#00e5ff] hover:text-[#031114] transition flex items-center justify-center gap-2">
                          <FileText className="w-3.5 h-3.5" /> Download Current CV
                        </button>
                      )}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 1: RESEARCH WORKSPACE */}
          {activeTab === 'workspace' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#04181c]/90 border border-[#0d343c]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00e5ff] uppercase mb-1">
                    <GitBranch className="w-4 h-4" /> Active Workspace • v2.4.0
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif text-white">
                    AI-Driven Genomic Variant Analysis
                  </h1>
                  <p className="text-xs text-[#7f9ca4] mt-1">
                    Supervisor: <span className="text-white font-medium">Dr. Elena Rostova</span> • Team: <span className="text-white font-medium">4 Researchers</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setWorkspaceSubTab('board')}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition ${
                      workspaceSubTab === 'board' ? 'bg-[#00e5ff] text-[#031114] font-bold' : 'bg-[#031114] text-[#7f9ca4] border border-[#0d343c]'
                    }`}
                  >
                    Task Board
                  </button>
                  <button 
                    onClick={() => setWorkspaceSubTab('docs')}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition ${
                      workspaceSubTab === 'docs' ? 'bg-[#00e5ff] text-[#031114] font-bold' : 'bg-[#031114] text-[#7f9ca4] border border-[#0d343c]'
                    }`}
                  >
                    Docs & Versions
                  </button>
                  <button 
                    onClick={() => setWorkspaceSubTab('chat')}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition ${
                      workspaceSubTab === 'chat' ? 'bg-[#00e5ff] text-[#031114] font-bold' : 'bg-[#031114] text-[#7f9ca4] border border-[#0d343c]'
                    }`}
                  >
                    Team Chat
                  </button>
                </div>
              </div>

              {workspaceSubTab === 'board' && (
                <div className="space-y-6">
                  <form onSubmit={handleAddTask} className="flex gap-3">
                    <input 
                      type="text" 
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Add a new milestone or research task..." 
                      className="flex-1 bg-[#04181c] border border-[#0d343c] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#395c64] focus:outline-none focus:border-[#00e5ff]"
                    />
                    <button 
                      type="submit" 
                      className="px-4 py-2.5 bg-[#00e5ff] text-[#031114] font-semibold text-sm rounded-lg flex items-center gap-2 hover:bg-[#33ebff] transition"
                    >
                      <Plus className="w-4 h-4" /> Add Task
                    </button>
                  </form>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['To Do', 'In Progress', 'Done'].map((statusColumn) => (
                      <div key={statusColumn} className="bg-[#04181c]/60 border border-[#0d343c] rounded-xl p-4 flex flex-col">
                        <div className="flex items-center justify-between mb-4 border-b border-[#0d343c] pb-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                            {statusColumn}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#0d343c] text-xs text-[#00e5ff] font-mono">
                            {tasks.filter(t => t.status === statusColumn).length}
                          </span>
                        </div>

                        <div className="space-y-3 flex-1">
                          {tasks.filter(t => t.status === statusColumn).map((task) => (
                            <div key={task.id} className="p-3.5 bg-[#031114] border border-[#0d343c] rounded-lg shadow-sm hover:border-[#00e5ff]/40 transition">
                              <p className="text-sm font-medium text-white mb-2">{task.title}</p>
                              <div className="flex items-center justify-between text-[11px] text-[#698890] font-mono">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-[#00e5ff]" /> {task.deadline}
                                </span>
                                <span className="text-[#94aeb5]">{task.assignee}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MATCHING */}
          {activeTab === 'matching' && (
            <div className="space-y-6">
              <div className="bg-[#04181c] p-6 rounded-xl border border-[#0d343c]">
                <h1 className="text-3xl font-serif text-white">Research Interest Matching</h1>
                <p className="text-xs text-[#7f9ca4] mt-1">Select your primary domains to get AI-matched supervisors & research groups</p>
              </div>

              <div className="bg-[#04181c]/90 border border-[#0d343c] p-6 rounded-xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#00e5ff] block">
                  Select Your Active Research Domains
                </span>
                
                <div className="flex flex-wrap gap-3">
                  {INTEREST_DOMAINS.map((domain) => {
                    const isSelected = selectedInterests.includes(domain);
                    return (
                      <button
                        key={domain}
                        onClick={() => toggleInterest(domain)}
                        className={`px-4 py-2 rounded-full text-xs font-mono transition flex items-center gap-2 ${
                          isSelected
                            ? 'bg-[#00e5ff] text-[#031114] font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                            : 'bg-[#031114] border border-[#0d343c] text-[#7f9ca4] hover:border-[#00e5ff]/40'
                        }`}
                      >
                        {domain}
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-[#04181c] p-6 rounded-xl border border-[#0d343c]">
                <div>
                  <h1 className="text-3xl font-serif text-white">Research Teams & Applications</h1>
                  <p className="text-xs text-[#7f9ca4] mt-1">Manage project applications and form research groups</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="bg-[#04181c] p-6 rounded-xl border border-[#0d343c]">
                <h1 className="text-3xl font-serif text-white">Course Marketplace</h1>
                <p className="text-xs text-[#7f9ca4] mt-1">Browse structured paper-writing and methodology courses taught by faculty</p>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}