'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';
import {
  LayoutDashboard,
  Microscope,
  BookOpen,
  UserCheck,
  User,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  Clock,
  Video,
  DollarSign,
  Calendar,
  Users,
  Award,
  Check,
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Search
} from 'lucide-react';

// --- TYPES ---
interface ProjectListing {
  id: string;
  topic: string;
  neededStudents: number;
  duration: string;
  requirements: string[];
  description: string;
  status: 'Published' | 'Draft';
  createdAt: string;
}

interface Application {
  id: string;
  studentName: string;
  studentEmail: string;
  studentCgpa: string;
  projectTopic: string;
  skills: string[];
  appliedDate: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

interface SupervisedStudent {
  id: string;
  name: string;
  projectTitle: string;
  tasksCompleted: number;
  totalTasks: number;
  progressPercent: number;
  nextMeeting: string;
  deadline: string;
  publicationStatus: 'Submitted' | 'In Progress' | 'Published' | 'Under Review';
  compensation: string;
  evaluation: string;
}

interface Course {
  id: string;
  title: string;
  code: string;
  demoVideoUrl: string;
  studentsCount: number;
  status: 'Published' | 'Draft';
  materialsCount: number;
}

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'marketplace' | 'applications' | 'courses' | 'profile'>('overview');

  // --- STATE MANAGEMENT (FULL CRUD) ---
  
  // 1. Faculty Profile
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Jenkins',
    title: 'Associate Professor & Lab Director',
    department: 'Department of Computer Science & Engineering',
    institution: 'National Research Institute',
    bio: 'Focusing on Computer Vision, Deep Learning applications in Agriculture and Medical Imaging. Supervised over 25+ Master & PhD thesis papers.',
    researchInterests: ['Deep Learning', 'Computer Vision', 'Medical AI', 'Precision Farming'],
    acceptingStudents: true,
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // 2. Supervisor Marketplace (Research Listings)
  const [projects, setProjects] = useState<ProjectListing[]>([
    {
      id: 'proj-1',
      topic: 'Deep Learning for Rice Disease Detection',
      neededStudents: 2,
      duration: '6 Months',
      requirements: ['Python', 'CNN', 'Image Processing', 'PyTorch'],
      description: 'Developing high-precision lightweight CNN models for early detection of leaf blast and blight in rice crops.',
      status: 'Published',
      createdAt: '2026-07-28',
    },
    {
      id: 'proj-2',
      topic: 'Autonomous Drone Navigation using Reinforcement Learning',
      neededStudents: 1,
      duration: '12 Months',
      requirements: ['ROS', 'Python', 'RL', 'Gazebo'],
      description: 'Investigating Q-learning algorithms for obstacle avoidance in unknown indoor environments.',
      status: 'Draft',
      createdAt: '2026-08-01',
    },
  ]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    topic: '',
    neededStudents: 2,
    duration: '6 Months',
    requirements: '',
    description: '',
    status: 'Published' as 'Published' | 'Draft',
  });

  // 3. Student Applications
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'app-1',
      studentName: 'Aria Rahman',
      studentEmail: 'aria.r@university.edu',
      studentCgpa: '3.92',
      projectTopic: 'Deep Learning for Rice Disease Detection',
      skills: ['Python', 'PyTorch', 'OpenCV', 'CNN'],
      appliedDate: '2026-08-02',
      status: 'Pending',
    },
    {
      id: 'app-2',
      studentName: 'Tanvir Hossain',
      studentEmail: 'tanvir.h@university.edu',
      studentCgpa: '3.78',
      projectTopic: 'Deep Learning for Rice Disease Detection',
      skills: ['Python', 'TensorFlow', 'Image Processing'],
      appliedDate: '2026-08-03',
      status: 'Pending',
    },
  ]);

  // 4. Supervisor Dashboard Data (Active Supervised Students)
  const [supervisedStudents, setSupervisedStudents] = useState<SupervisedStudent[]>([
    {
      id: 'sup-1',
      name: 'Aria Rahman',
      projectTitle: 'Deep Learning for Rice Disease Detection',
      tasksCompleted: 8,
      totalTasks: 10,
      progressPercent: 80,
      nextMeeting: '2026-08-08 at 10:00 AM',
      deadline: '2026-11-15',
      publicationStatus: 'Under Review',
      compensation: '$500 / Month (RA Grant)',
      evaluation: 'Excellent work on dataset augmentation.',
    },
    {
      id: 'sup-2',
      name: 'Michael Chang',
      projectTitle: 'Retinal Scan Biomarker Segmentation',
      tasksCompleted: 4,
      totalTasks: 12,
      progressPercent: 33,
      nextMeeting: '2026-08-07 at 02:30 PM',
      deadline: '2026-12-30',
      publicationStatus: 'In Progress',
      compensation: 'Academic Credit (Thesis)',
      evaluation: 'Needs to optimize U-Net model convergence speed.',
    },
  ]);

  // 5. Courses with Demo Class
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'course-1',
      title: 'Advanced Computer Vision & Pattern Recognition',
      code: 'CSE-804',
      demoVideoUrl: 'https://youtube.com/watch?v=demo123',
      studentsCount: 42,
      status: 'Published',
      materialsCount: 14,
    },
    {
      id: 'course-2',
      title: 'Neural Networks & Deep Learning Foundations',
      code: 'CSE-501',
      demoVideoUrl: 'https://youtube.com/watch?v=demo456',
      studentsCount: 0,
      status: 'Draft',
      materialsCount: 4,
    },
  ]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    code: '',
    demoVideoUrl: '',
    status: 'Published' as 'Published' | 'Draft',
  });

  // --- HANDLERS ---
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ProjectListing = {
      id: `proj-${Date.now()}`,
      topic: newProject.topic,
      neededStudents: Number(newProject.neededStudents),
      duration: newProject.duration,
      requirements: newProject.requirements.split(',').map((req) => req.trim()),
      description: newProject.description,
      status: newProject.status,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProjects([created, ...projects]);
    setShowProjectModal(false);
    setNewProject({ topic: '', neededStudents: 2, duration: '6 Months', requirements: '', description: '', status: 'Published' });
  };

  const handleDeleteProject = (id: string, status: string) => {
    if (status === 'Published') {
      if (!confirm('This project is currently published. Are you sure you want to unlist it?')) return;
    }
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleApplicationAction = (appId: string, action: 'Accepted' | 'Rejected') => {
    setApplications(
      applications.map((app) => (app.id === appId ? { ...app, status: action } : app))
    );

    if (action === 'Accepted') {
      const app = applications.find((a) => a.id === appId);
      if (app) {
        // Add to active supervised students list
        const newStudent: SupervisedStudent = {
          id: `sup-${Date.now()}`,
          name: app.studentName,
          projectTitle: app.projectTopic,
          tasksCompleted: 1,
          totalTasks: 10,
          progressPercent: 10,
          nextMeeting: 'To be scheduled',
          deadline: 'TBD',
          publicationStatus: 'In Progress',
          compensation: '$400 / Month (RA)',
          evaluation: 'Newly Onboarded',
        };
        setSupervisedStudents([...supervisedStudents, newStudent]);
      }
    }
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Course = {
      id: `course-${Date.now()}`,
      title: newCourse.title,
      code: newCourse.code,
      demoVideoUrl: newCourse.demoVideoUrl,
      studentsCount: 0,
      status: newCourse.status,
      materialsCount: 1,
    };
    setCourses([...courses, created]);
    setShowCourseModal(false);
    setNewCourse({ title: '', code: '', demoVideoUrl: '', status: 'Published' });
  };

  const handleDeleteCourse = (id: string, status: string) => {
    if (status === 'Published') {
      alert('Only unpublished (Draft) courses or materials can be deleted.');
      return;
    }
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleEvaluationUpdate = (id: string, newEvaluation: string) => {
    setSupervisedStudents(
      supervisedStudents.map((s) => (s.id === id ? { ...s, evaluation: newEvaluation } : s))
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#061d21] font-sans flex flex-col">
      {/* --- TOP NAVBAR --- */}
      <header className="border-b border-[#d5e5e3] bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded overflow-hidden bg-[#00e5ff]/10 flex items-center justify-center border border-[#00e5ff]/30">
            <Image src="/logo.png" alt="ResearchNest" width={36} height={36} className="object-contain" priority />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-[#061d21] font-sans flex items-center gap-2">
              ResearchNest <span className="text-[10px] border border-[#00e5ff] bg-[#caffff] text-[#00e5ff] px-2 py-0.5 rounded font-mono uppercase">Faculty</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-[#061d21]">{profile.name}</p>
            <p className="text-xs text-[#4a6b72] font-mono">{profile.title}</p>
          </div>
          <button 
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 rounded-full border border-[#00e5ff]/50 bg-[#00e5ff]/10 flex items-center justify-center text-[#00e5ff] font-bold hover:bg-[#00e5ff]/20 transition"
          >
            SJ
          </button>
        </div>
      </header>

      {/* --- DASHBOARD WRAPPER --- */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 md:p-8 gap-6">
        
        {/* --- SIDEBAR NAVIGATION --- */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <div className="bg-white border border-[#d5e5e3] rounded-xl p-3 flex flex-col gap-1 shadow-lg">
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'overview'
                  ? 'bg-[#00e5ff] text-[#031114] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                  : 'text-[#4a6b72] hover:bg-[#0d343c]/50 hover:text-[#061d21]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Supervisor Dashboard
            </button>

            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'marketplace'
                  ? 'bg-[#00e5ff] text-[#031114] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                  : 'text-[#4a6b72] hover:bg-[#0d343c]/50 hover:text-[#061d21]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Microscope className="w-4 h-4" />
                Research Offers
              </div>
              <span className="text-xs font-mono bg-[#f4f8f7] px-2 py-0.5 rounded text-[#00e5ff]">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'applications'
                  ? 'bg-[#00e5ff] text-[#031114] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                  : 'text-[#4a6b72] hover:bg-[#0d343c]/50 hover:text-[#061d21]'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4" />
                Review Applications
              </div>
              {applications.filter((a) => a.status === 'Pending').length > 0 && (
                <span className="text-xs font-mono bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 rounded-full">
                  {applications.filter((a) => a.status === 'Pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'courses'
                  ? 'bg-[#00e5ff] text-[#031114] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                  : 'text-[#4a6b72] hover:bg-[#0d343c]/50 hover:text-[#061d21]'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                Courses & Demo Class
              </div>
              <span className="text-xs font-mono bg-[#f4f8f7] px-2 py-0.5 rounded text-[#4a6b72]">
                {courses.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === 'profile'
                  ? 'bg-[#00e5ff] text-[#031114] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                  : 'text-[#4a6b72] hover:bg-[#0d343c]/50 hover:text-[#061d21]'
              }`}
            >
              <User className="w-4 h-4" />
              Faculty Profile
            </button>

          </div>

          {/* Quick Supervisor Status Card */}
          <div className="bg-white border border-[#d5e5e3] rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#3b5960] uppercase">Supervision Status</span>
              <span className={`w-2.5 h-2.5 rounded-full ${profile.acceptingStudents ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            </div>
            <p className="text-xs text-[#4a6b72]">
              {profile.acceptingStudents ? 'Currently accepting new thesis & RA students.' : 'Not accepting students currently.'}
            </p>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 space-y-6">

          {/* ================= TAB 1: OVERVIEW & SUPERVISOR DASHBOARD ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#d5e5e3] rounded-xl p-4 flex items-center gap-4">
                  <div className="p-3 bg-[#00e5ff]/10 text-[#00e5ff] rounded-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#061d21]">{supervisedStudents.length}</p>
                    <p className="text-xs text-[#4a6b72]">Active Students</p>
                  </div>
                </div>

                <div className="bg-white border border-[#d5e5e3] rounded-xl p-4 flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#061d21]">
                      {applications.filter((a) => a.status === 'Pending').length}
                    </p>
                    <p className="text-xs text-[#4a6b72]">Pending Apps</p>
                  </div>
                </div>

                <div className="bg-white border border-[#d5e5e3] rounded-xl p-4 flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#061d21]">
                      {supervisedStudents.filter((s) => s.publicationStatus === 'Submitted' || s.publicationStatus === 'Published').length}
                    </p>
                    <p className="text-xs text-[#4a6b72]">Publications</p>
                  </div>
                </div>

                <div className="bg-white border border-[#d5e5e3] rounded-xl p-4 flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#061d21]">{courses.length}</p>
                    <p className="text-xs text-[#4a6b72]">Active Courses</p>
                  </div>
                </div>
              </div>

              {/* Supervised Students Detailed Table */}
              <div className="bg-white border border-[#d5e5e3] rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-serif text-[#061d21]">Supervised Students & Progress</h2>
                    <p className="text-xs text-[#4a6b72] mt-1">Track tasks, publication status, meetings, and evaluations.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('applications')}
                    className="text-xs font-mono text-[#00e5ff] hover:underline flex items-center gap-1"
                  >
                    Review New Applicants <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {supervisedStudents.map((student) => (
                    <div 
                      key={student.id} 
                      className="bg-[#f4f8f7] border border-[#d5e5e3] rounded-xl p-5 space-y-4 hover:border-[#00e5ff]/30 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d5e5e3]/60 pb-3">
                        <div>
                          <h3 className="text-base font-semibold text-[#061d21] flex items-center gap-2">
                            {student.name}
                            <span className="text-xs px-2 py-0.5 rounded font-mono bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20">
                              {student.publicationStatus}
                            </span>
                          </h3>
                          <p className="text-xs text-[#4a6b72] mt-0.5">{student.projectTitle}</p>
                        </div>

                        <div className="text-left sm:text-right text-xs text-[#3b5960] font-mono">
                          <p className="flex items-center sm:justify-end gap-1 text-emerald-400">
                            <DollarSign className="w-3.5 h-3.5" /> {student.compensation}
                          </p>
                          <p className="mt-1 flex items-center sm:justify-end gap-1">
                            <Calendar className="w-3.5 h-3.5" /> Next: {student.nextMeeting}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar & Milestone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-[#4a6b72]">Milestone Progress</span>
                            <span className="font-mono text-[#00e5ff]">{student.tasksCompleted}/{student.totalTasks} Tasks ({student.progressPercent}%)</span>
                          </div>
                          <div className="w-full bg-[#00b2d6] h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#00e5ff] h-full transition-all duration-500" 
                              style={{ width: `${student.progressPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Supervisor Evaluation Input */}
                        <div className="flex items-center gap-2">
                          <input 
                            type="text"
                            value={student.evaluation}
                            onChange={(e) => handleEvaluationUpdate(student.id, e.target.value)}
                            placeholder="Add evaluation note..."
                            className="flex-1 bg-white border border-[#d5e5e3] rounded px-3 py-1.5 text-xs text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                          />
                          <span className="text-[10px] text-[#4a6b72] font-mono shrink-0">Evaluation</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 2: RESEARCH OFFERS & MARKETPLACE ================= */}
          {activeTab === 'marketplace' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[#061d21]">Supervisor Marketplace Offers</h2>
                  <p className="text-sm text-[#4a6b72]">Publish calls for research students with specific topic requirements & duration.</p>
                </div>
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="px-4 py-2.5 bg-[#00e5ff] hover:bg-[#33ebff] text-[#031114] font-semibold text-sm rounded-lg transition flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                >
                  <Plus className="w-4 h-4" /> Create Research Call
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="bg-white border border-[#d5e5e3] rounded-xl p-6 relative hover:border-[#00e5ff]/40 transition space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            project.status === 'Published' 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {project.status}
                          </span>
                          <span className="text-xs text-[#4a6b72] font-mono">Posted: {project.createdAt}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#061d21]">{project.topic}</h3>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.status === 'Draft' && (
                          <button
                            onClick={() => handleDeleteProject(project.id, project.status)}
                            className="p-2 bg-red-950/40 text-red-400 border border-red-800/40 rounded-lg hover:bg-red-900/60 transition"
                            title="Delete Draft"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        {project.status === 'Published' && (
                          <button
                            onClick={() => handleDeleteProject(project.id, project.status)}
                            className="px-3 py-1.5 bg-[#f4f8f7] border border-[#d5e5e3] text-xs text-[#4a6b72] hover:text-[#061d21] rounded-lg transition"
                          >
                            Unlist Offer
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-[#3b5960]">{project.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                      <div className="bg-[#f4f8f7] p-3 rounded-lg border border-[#d5e5e3] flex items-center justify-between">
                        <span className="text-[#4a6b72]">Needed Students:</span>
                        <span className="text-[#00e5ff] font-bold">{project.neededStudents} Student(s)</span>
                      </div>
                      <div className="bg-[#f4f8f7] p-3 rounded-lg border border-[#d5e5e3] flex items-center justify-between">
                        <span className="text-[#4a6b72]">Duration:</span>
                        <span className="text-[#061d21]">{project.duration}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-mono text-[#4a6b72] uppercase mb-2">Required Skills / Prerequisites:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.requirements.map((req, idx) => (
                          <span key={idx} className="bg-[#0d343c]/60 text-[#061d21] text-xs px-2.5 py-1 rounded border border-[#d5e5e3]">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= TAB 3: REVIEW APPLICATIONS ================= */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-[#061d21]">Student Applications</h2>
                <p className="text-sm text-[#4a6b72]">Review student profiles, skills, and accept or reject applications for research calls.</p>
              </div>

              <div className="space-y-4">
                {applications.map((app) => (
                  <div 
                    key={app.id} 
                    className="bg-white border border-[#d5e5e3] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] flex items-center justify-center font-bold">
                          {app.studentName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#061d21] flex items-center gap-2">
                            {app.studentName}
                            <span className="text-xs font-mono text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5 rounded">
                              CGPA: {app.studentCgpa}
                            </span>
                          </h3>
                          <p className="text-xs text-[#4a6b72] font-mono">{app.studentEmail}</p>
                        </div>
                      </div>

                      <div className="bg-[#f4f8f7] p-3 rounded-lg border border-[#d5e5e3]">
                        <p className="text-xs text-[#4a6b72] font-mono">Applied for Topic:</p>
                        <p className="text-sm text-[#061d21] font-medium mt-0.5">{app.projectTopic}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {app.skills.map((skill, i) => (
                          <span key={i} className="text-[11px] bg-[#0d343c] text-[#4a6b72] px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                      {app.status === 'Pending' ? (
                        <>
                          <button
                            onClick={() => handleApplicationAction(app.id, 'Rejected')}
                            className="px-4 py-2 bg-red-950/40 text-red-400 border border-red-800/40 rounded-lg hover:bg-red-900/60 transition text-sm font-medium flex items-center gap-1.5"
                          >
                            <X className="w-4 h-4" /> Reject
                          </button>
                          <button
                            onClick={() => handleApplicationAction(app.id, 'Accepted')}
                            className="px-4 py-2 bg-[#00e5ff] text-[#031114] font-semibold rounded-lg hover:bg-[#33ebff] transition text-sm flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                          >
                            <Check className="w-4 h-4" /> Accept Student
                          </button>
                        </>
                      ) : (
                        <span className={`text-xs font-mono px-3 py-1 rounded border ${
                          app.status === 'Accepted' 
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {app.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: COURSES & DEMO CLASS ================= */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[#061d21]">Course Management & Demo Classes</h2>
                  <p className="text-sm text-[#4a6b72]">Create courses, upload demo classes, and manage unpublished draft materials.</p>
                </div>
                <button
                  onClick={() => setShowCourseModal(true)}
                  className="px-4 py-2.5 bg-[#00e5ff] hover:bg-[#33ebff] text-[#031114] font-semibold text-sm rounded-lg transition flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                >
                  <Plus className="w-4 h-4" /> Create Course
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white border border-[#d5e5e3] rounded-xl p-5 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5 rounded">
                          {course.code}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          course.status === 'Published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {course.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#061d21]">{course.title}</h3>

                      <div className="bg-[#f4f8f7] p-3 rounded-lg border border-[#d5e5e3] flex items-center justify-between text-xs font-mono text-[#4a6b72]">
                        <span className="flex items-center gap-1.5 text-[#00e5ff]">
                          <Video className="w-4 h-4" /> Demo Class Video:
                        </span>
                        <a href={course.demoVideoUrl} target="_blank" rel="noreferrer" className="underline hover:text-[#061d21] flex items-center gap-1">
                          Watch Link <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#d5e5e3]/60 text-xs text-[#4a6b72] font-mono">
                      <span>{course.studentsCount} Students Enrolled</span>
                      
                      {course.status === 'Draft' && (
                        <button
                          onClick={() => handleDeleteCourse(course.id, course.status)}
                          className="text-red-400 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete Material
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: FACULTY PROFILE ================= */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-[#d5e5e3] rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[#d5e5e3] pb-4">
                <div>
                  <h2 className="text-2xl font-serif text-[#061d21]">Faculty Profile</h2>
                  <p className="text-xs text-[#4a6b72]">Manage your research identity, academic bio, and supervisor status.</p>
                </div>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-4 py-2 border border-[#00e5ff]/50 text-[#00e5ff] text-xs font-semibold rounded-lg hover:bg-[#00e5ff]/10 transition flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" /> {isEditingProfile ? 'Cancel Editing' : 'Edit Profile'}
                </button>
              </div>

              {!isEditingProfile ? (
                /* Profile View */
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#00e5ff]/10 border-2 border-[#00e5ff] flex items-center justify-center text-2xl font-bold text-[#00e5ff]">
                      SJ
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#061d21]">{profile.name}</h3>
                      <p className="text-sm text-[#00e5ff] font-mono">{profile.title}</p>
                      <p className="text-xs text-[#4a6b72] mt-1">{profile.department} — {profile.institution}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase text-[#3b5960] mb-2">Biography & Research Focus</h4>
                    <p className="text-sm text-[#061d21] leading-relaxed bg-[#f4f8f7] p-4 rounded-lg border border-[#d5e5e3]">
                      {profile.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase text-[#3b5960] mb-2">Research Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.researchInterests.map((interest, i) => (
                        <span key={i} className="bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-xs px-3 py-1 rounded-full font-mono">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Profile Edit Form */
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsEditingProfile(false);
                  }} 
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-mono text-[#4a6b72] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#4a6b72] mb-1">Academic Title</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#4a6b72] mb-1">Biography</label>
                    <textarea
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="accepting"
                      checked={profile.acceptingStudents}
                      onChange={(e) => setProfile({ ...profile, acceptingStudents: e.target.checked })}
                      className="rounded border-[#d5e5e3] bg-[#f4f8f7] text-[#00e5ff] focus:ring-[#00e5ff]"
                    />
                    <label htmlFor="accepting" className="text-xs text-[#061d21]">
                      Open to accepting new thesis & research assistant students
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#00e5ff] text-[#031114] font-semibold text-sm rounded-lg hover:bg-[#33ebff] transition shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                  >
                    Save Profile Changes
                  </button>
                </form>
              )}
            </div>
          )}
          <div className="p-4">
            <SignOutButton />
          </div>

        </main>
      </div>

      {/* ================= MODAL 1: CREATE RESEARCH OFFER ================= */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#d5e5e3] rounded-xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#d5e5e3] pb-3">
              <h3 className="text-lg font-bold text-[#061d21]">Create Research Offer (Marketplace)</h3>
              <button onClick={() => setShowProjectModal(false)} className="text-[#4a6b72] hover:text-[#061d21]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#4a6b72] mb-1">Research Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deep Learning for Rice Disease Detection"
                  value={newProject.topic}
                  onChange={(e) => setNewProject({ ...newProject, topic: e.target.value })}
                  className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#4a6b72] mb-1">Needed Students</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newProject.neededStudents}
                    onChange={(e) => setNewProject({ ...newProject, neededStudents: Number(e.target.value) })}
                    className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#4a6b72] mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6 Months"
                    value={newProject.duration}
                    onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                    className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#4a6b72] mb-1">Requirements (comma-separated)</label>
                <input
                  type="text"
                  required
                  placeholder="Python, CNN, Image Processing, PyTorch"
                  value={newProject.requirements}
                  onChange={(e) => setNewProject({ ...newProject, requirements: e.target.value })}
                  className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#4a6b72] mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the research objectives..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#4a6b72] mb-1">Publish Status</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value as 'Published' | 'Draft' })}
                  className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                >
                  <option value="Published">Publish Immediately</option>
                  <option value="Draft">Save as Draft</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#00e5ff] text-[#031114] font-semibold text-sm rounded-lg hover:bg-[#33ebff] transition shadow-[0_0_15px_rgba(0,229,255,0.2)]"
              >
                Publish Research Offer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: CREATE COURSE ================= */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#d5e5e3] rounded-xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#d5e5e3] pb-3">
              <h3 className="text-lg font-bold text-[#061d21]">Create Course with Demo Class</h3>
              <button onClick={() => setShowCourseModal(false)} className="text-[#4a6b72] hover:text-[#061d21]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#4a6b72] mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Computer Vision"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#4a6b72] mb-1">Course Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSE-804"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#4a6b72] mb-1">Demo Class URL (Video Link)</label>
                <input
                  type="url"
                  required
                  placeholder="https://youtube.com/watch?v=..."
                  value={newCourse.demoVideoUrl}
                  onChange={(e) => setNewCourse({ ...newCourse, demoVideoUrl: e.target.value })}
                  className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#4a6b72] mb-1">Status</label>
                <select
                  value={newCourse.status}
                  onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value as 'Published' | 'Draft' })}
                  className="w-full bg-[#f4f8f7] border border-[#d5e5e3] rounded-lg p-3 text-sm text-[#061d21] focus:outline-none focus:border-[#00e5ff]"
                >
                  <option value="Published">Publish Course</option>
                  <option value="Draft">Save Draft</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#00e5ff] text-[#031114] font-semibold text-sm rounded-lg hover:bg-[#33ebff] transition shadow-[0_0_15px_rgba(0,229,255,0.2)]"
              >
                Create Course
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}