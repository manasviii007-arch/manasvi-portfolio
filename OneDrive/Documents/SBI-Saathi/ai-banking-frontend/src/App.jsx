import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Cpu, 
  Sparkles, 
  Mic, 
  MicOff, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  RefreshCw, 
  ChevronRight, 
  Languages, 
  Lightbulb, 
  Play, 
  AlertCircle, 
  ShieldCheck, 
  Info,
  CreditCard,
  FileText,
  User,
  Activity,
  Zap,
  TrendingUp,
  GraduationCap,
  Sparkle,
  Check,
  X,
  Lock,
  Terminal,
  Database,
  BarChart3,
  Sliders,
  Award,
  BookOpen,
  ArrowUpRight,
  Eye,
  PhoneCall,
  UserCheck,
  CheckCircle,
  Fingerprint,
  LayoutDashboard,
  UserCircle,
  LogOut,
  Users,
  Clock,
  Radio,
  SlidersHorizontal
} from 'lucide-react';

/* ==========================================================================
   1. SYSTEM PROMPT REGISTRY (Admin Diagnostic View)
   ========================================================================== */

export const SYSTEM_PROMPTS = {
  planner: `
Role: Planner Agent (Primary Architect)
Objective: Understand user goal state from natural expression.
  `,
  intent: `
Role: Intent Extraction Agent
Objective: Parse structured parameters, confidence, languages, and entities.
  `,
  safety: `
Role: Safety & Compliance Agent (7th Agent)
Objective: Ensure the AI remains within secure parameters. Block autonomous checkouts.
  `,
  guidance: `
Role: Contextual Guidance Agent
Objective: Generate simple, accessible, step-by-step navigation instructions.
  `,
  recommendation: `
Role: Proactive Action Recommendation Agent
Objective: Create context-aware cross-selling opportunities for the post-transaction state.
  `
};

/* ==========================================================================
   2. SEVEN-AGENT ORCHESTRATOR & GATEWAY ROUTER (With Robust Fallback)
   ========================================================================== */

export class AgentOrchestrator {
  constructor() {
    this.activeProviderName = "SBI Saathi Secure Backend Engine";
  }

  getActiveProvider() {
    return this.activeProviderName;
  }

  async orchestrate(query, lang) {
    const q = query.toLowerCase();
    try {
      const response = await fetch('http://localhost:5000/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query, language: lang })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();

    } catch (error) {
      console.warn("Backend unreachable. Triggering Smart Offline Fallback.");
      
      this.activeProviderName = "Mock Local Reasoning Core (Offline)";
      await new Promise(resolve => setTimeout(resolve, 800));

      if (q.includes('electric') || q.includes('bill') || q.includes('power') || q.includes('tpddl') || q.includes('bijli')) {
        return {
          goal: "Pay Electricity Bill",
          journey: "electricity",
          language: lang,
          confidence: 0.98,
          nextStep: "Enter your 11-digit Consumer ID. I will verify your pending invoice instantly.",
          spotlightTarget: "consumer-field",
          guidanceText: "Let's enter your 11-digit Consumer ID first to query Bharat BillPay registry databases.",
          recommendation: "Settle with 1-Click AutoPay",
          recommendationDetail: "Never risk late penalties. AutoPay securely tracks and settles utility bills automatically.",
          complianceChecked: true
        };
      }

      if (q.includes('tuition') || q.includes('fee') || q.includes('school') || q.includes('college') || q.includes('fees')) {
        return {
          goal: "Pay Tuition Fees",
          journey: "tuition",
          language: lang,
          confidence: 0.95,
          nextStep: "Enter your Student Registration ID to pull university dues.",
          spotlightTarget: "student-field",
          guidanceText: "Please fill in your registered Student ID to query pending semester fees.",
          recommendation: "SBI Vidya Lakshmi Education Scheme",
          recommendationDetail: "Access pre-approved education lines with competitive interest rates.",
          complianceChecked: true
        };
      }

      if (q.includes('deposit') || q.includes('fd') || q.includes('fixed') || q.includes('save') || q.includes('invest')) {
        return {
          goal: "Open Fixed Deposit",
          journey: "fixed-deposit",
          language: lang,
          confidence: 0.99,
          nextStep: "Specify deposit capital amount (Min. ₹10,000 for high-yield returns).",
          spotlightTarget: "deposit-field",
          guidanceText: "Specify the principal amount to grow. High-yield terms guarantee up to 7.10% p.a.",
          recommendation: "SBI Amrit Kalash Optimizer",
          recommendationDetail: "Maximize returns under the special 400 Days guaranteed high-yield term.",
          complianceChecked: true
        };
      }

      return {
        goal: "Unrecognized Intent",
        journey: "unknown",
        language: lang,
        confidence: 0.20,
        nextStep: "Check server connection.",
        spotlightTarget: "unknown",
        guidanceText: "I couldn't confidently map that request. Please try saying 'pay my electricity bill'.",
        recommendation: "Start Backend Server",
        recommendationDetail: "Run 'node server.js' to enable full unstructured AI routing.",
        complianceChecked: true
      };
    }
  }
}

/* ==========================================================================
   3. MOCK DATASETS & DATABASES
   ========================================================================== */

const MOCK_BILLERS = [
  { id: 'tpddl', name: 'TPDDL (Tata Power Delhi)', state: 'Delhi' },
  { id: 'bescom', name: 'BESCOM (Bangalore Electricity)', state: 'Karnataka' },
  { id: 'mseb', name: 'MSEDCL (Maharashtra State Power)', state: 'Maharashtra' }
];

const MOCK_SCHOOLS = [
  { id: 'iitb', name: 'Indian Institute of Technology (IIT), Bombay', city: 'Mumbai' },
  { id: 'du', name: 'Delhi University (DU)', city: 'Delhi' },
  { id: 'kv', name: 'Kendriya Vidyalaya No. 1', city: 'Bangalore' }
];

const MOCK_FD_SCHEMES = [
  { id: 'fd-s1', name: 'SBI Amrit Kalash (Guaranteed High Yield)', rate: '7.10% p.a.', tenure: '400 Days' },
  { id: 'fd-s2', name: 'SBI Tax Savings Scheme (Section 80C)', rate: '6.50% p.a.', tenure: '5 Years' },
  { id: 'fd-s3', name: 'SBI Standard Term Deposit', rate: '6.80% p.a.', tenure: '1 to 2 Years' }
];

/* ==========================================================================
   MAIN HIGH-FIDELITY APP CORE
   ========================================================================== */

export default function App() {
  // PORTAL SEPARATION STATE (User vs Admin)
  const [portalMode, setPortalMode] = useState('user'); // 'user' or 'admin'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginRole, setLoginRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Navigation & Core States
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [systemLogs, setSystemLogs] = useState(['System booted. Local Banking Engine fully initialized.']);
  const [activeTab, setActiveTab] = useState('console');
  const [agentPhase, setAgentPhase] = useState('idle');

  // Add-on States
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);
  const [explainModal, setExplainModal] = useState(false);
  const [lastOutput, setLastOutput] = useState(null);

  // ADMIN OVERRIDE & HITL INTERCEPT STATES
  const [strictCompliance, setStrictCompliance] = useState(true);
  const [coPilotModal, setCoPilotModal] = useState({ isOpen: false, activeUser: null });
  const [avgLatency, setAvgLatency] = useState(182);

  // Agent Pipeline Execution Steps Tracker
  const [agentSteps, setAgentSteps] = useState([
    { name: 'Language & Context Check', status: 'pending', agentName: 'ContextAgent' },
    { name: 'Overall Goal Analysis', status: 'pending', agentName: 'PlannerAgent' },
    { name: 'Intent Entity Extraction', status: 'pending', agentName: 'IntentAgent' },
    { name: 'Secure Compliance Audit', status: 'pending', agentName: 'SafetyAgent (7th)' },
    { name: 'Visual Spotlight Placement', status: 'pending', agentName: 'GuidanceAgent' },
    { name: 'Proactive Action Selection', status: 'pending', agentName: 'RecommendationAgent' }
  ]);

  // Form Fields States
  const [selectedBiller, setSelectedBiller] = useState('tpddl');
  const [consumerNumber, setConsumerNumber] = useState('');
  const [billFetched, setBillFetched] = useState(false);
  const [billAmount, setBillAmount] = useState('1450');
  const [isPaying, setIsPaying] = useState(false);

  const [selectedSchool, setSelectedSchool] = useState('iitb');
  const [studentId, setStudentId] = useState('');

  const [selectedScheme, setSelectedScheme] = useState('fd-s1');
  const [depositAmount, setDepositAmount] = useState('50000');

  // Interactive Voice Recording
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Active virtual assistant guidelines message
  const [agentMessage, setAgentMessage] = useState('Welcome to SBI Saathi. Tell me what you need to do, and I will guide you safely.');
  const [agentThoughts, setAgentThoughts] = useState([]);
  
  // Spotlight Highlight Overlay state variables
  const [spotlightElementId, setSpotlightElementId] = useState(null);
  const [spotlightGuideText, setSpotlightGuideText] = useState('');

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Authentication Modal State
  const [authModal, setAuthModal] = useState({ isOpen: false, journey: null });
  const [authPin, setAuthPin] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Proactive Simulation Logs / Session Data
  const [completedJourneys, setCompletedJourneys] = useState([]);

  // Demo Metrics
  const [demoMetrics, setDemoMetrics] = useState({
    totalCompleted: 42,
    englishCount: 28,
    hindiCount: 10,
    tamilCount: 4,
    autoPayAdoptions: 19
  });

  // Live Activity Feed State
  const [liveActivities, setLiveActivityFeed] = useState([
    { id: 1, user: 'rahul_sharma', action: 'Electricity Bill Payment (TPDDL)', value: '₹1,450', time: 'Just now', status: 'CLEARED', color: 'emerald' },
    { id: 2, user: 'priya_m', action: 'Fixed Deposit Opening', value: '₹50,000', time: '2 mins ago', status: 'CLEARED', color: 'emerald' },
    { id: 3, user: 'amit_k', action: 'Tuition Fee Checkout', value: '₹1,20,000', time: '5 mins ago', status: 'ESCALATED', color: 'rose' },
    { id: 4, user: 'sneha_99', action: 'AutoPay Setup (BESCOM)', value: 'N/A', time: '12 mins ago', status: 'ACTIVE', color: 'purple' },
  ]);

  // Dynamic API Keys
  const [sarvamKey, setSarvamKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');

  // Add system logging helper
  const addLog = (message) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSystemLogs(prev => [`[${timeStr}] ${message}`, ...prev.slice(0, 50)]);
  };

  // Simulate slight fluctuations in Latency
  useEffect(() => {
    const interval = setInterval(() => {
      setAvgLatency(prev => Math.floor(180 + Math.sin(Date.now()) * 5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ----------------------------------------------------
  // ACOUSTIC WAVEFORM DRAW LOOP (Only renders when canvas is visible)
  // ----------------------------------------------------
  useEffect(() => {
    if (isListeningVoice && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let step = 0;
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = accessibilityMode ? '#4A148C' : '#EC407A';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();

        const points = 35;
        const widthStep = canvas.width / points;
        for (let i = 0; i < points; i++) {
          const x = i * widthStep;
          const amp = Math.sin(i * 0.2 + step) * 20 * Math.random();
          const y = canvas.height / 2 + amp;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        step += 0.2;
        animationFrameRef.current = requestAnimationFrame(render);
      };
      render();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isListeningVoice, accessibilityMode, portalMode]);

  // ----------------------------------------------------
  // SEVEN-AGENT ORCHESTRATOR PIPELINE
  // ----------------------------------------------------
  const handleQueryDispatch = async (rawQuery) => {
    if (!rawQuery.trim()) return;
    setIsProcessing(true);
    setAgentPhase('planning');
    setAgentMessage('Analyzing your request securely...');
    
    setAgentSteps(prev => prev.map(s => ({ ...s, status: 'pending' })));

    setAgentSteps(prev => prev.map((s, idx) => idx === 0 ? { ...s, status: 'active' } : s));
    addLog('ContextAgent: Loading and mapping active language preference variables.');
    await new Promise(r => setTimeout(r, 200));
    setAgentSteps(prev => prev.map((s, idx) => idx === 0 ? { ...s, status: 'completed' } : s));

    setAgentSteps(prev => prev.map((s, idx) => idx === 1 ? { ...s, status: 'active' } : s));
    addLog('PlannerAgent: Categorizing sentence structure logic paths.');
    await new Promise(r => setTimeout(r, 200));
    setAgentSteps(prev => prev.map((s, idx) => idx === 1 ? { ...s, status: 'completed' } : s));

    setAgentSteps(prev => prev.map((s, idx) => idx === 2 ? { ...s, status: 'active' } : s));
    addLog('IntentAgent: Mapping parameters (Biller distributions, transaction values).');
    await new Promise(r => setTimeout(r, 200));
    setAgentSteps(prev => prev.map((s, idx) => idx === 2 ? { ...s, status: 'completed' } : s));

    setAgentSteps(prev => prev.map((s, idx) => idx === 3 ? { ...s, status: 'active' } : s));
    if (strictCompliance) {
      addLog('SafetyAgent (7th) [STRICT]: Safeguarding gateway. Blocking any autonomous checkout logic.');
    } else {
      addLog('SafetyAgent (7th) [OVERRIDE]: Running under admin override permissions. System monitoring safety parameters.');
    }
    await new Promise(r => setTimeout(r, 300));
    setAgentSteps(prev => prev.map((s, idx) => idx === 3 ? { ...s, status: 'completed' } : s));

    // Fire Core Orchestrator
    const orchestrator = new AgentOrchestrator();
    const output = await orchestrator.orchestrate(rawQuery, currentLanguage);
    setLastOutput(output);

    setAgentSteps(prev => prev.map((s, idx) => idx === 4 ? { ...s, status: 'active' } : s));
    addLog('GuidanceAgent: Formulating user focus spot overlays.');
    await new Promise(r => setTimeout(r, 150));
    setAgentSteps(prev => prev.map((s, idx) => idx === 4 ? { ...s, status: 'completed' } : s));

    setAgentSteps(prev => prev.map((s, idx) => idx === 5 ? { ...s, status: 'active' } : s));
    addLog('RecommendationAgent: Calculating tailored budget and optimization tools.');
    await new Promise(r => setTimeout(r, 150));
    setAgentSteps(prev => prev.map((s, idx) => idx === 5 ? { ...s, status: 'completed' } : s));

    setIsProcessing(false);
    setAgentPhase('guiding');

    if (output.confidence < 0.70) {
      setAgentMessage('I want to make sure I get this right. Would you like to modify your request, or speak to a live support agent?');
      setAgentThoughts([
        'Safety & Compliance Agent Alert: Confidence below target threshold limits.',
        'Action: Locked next steps. Offered escalation portals.'
      ]);
      setSpotlightElementId(null);
      return;
    }

    setAgentMessage(output.guidanceText);
    setAgentThoughts([
      `Planner Goal Target: ${output.goal}`,
      `Safety Status: ${strictCompliance ? 'Strict Compliance Locks Armed' : 'Permissive Overrides Active'}`,
      `Compliance Registry Status: Backend Verified.`,
      `Gateway Route Selected: /journey/${output.journey}`
    ]);

    if (output.journey !== 'unknown') {
      setCurrentScreen(output.journey);
      
      setTimeout(() => {
        if (output.spotlightTarget && output.spotlightTarget !== 'unknown') {
          setSpotlightElementId(output.spotlightTarget);
          setSpotlightGuideText(output.guidanceText);
        }
      }, 300);
    } else {
      setSpotlightElementId(null);
    }
  };

  const startSpeechCapture = () => {
    setIsListeningVoice(true);
    setAgentPhase('listening');
    setAgentMessage('I am listening. Please state your banking request...');
    addLog('HTTP POST -> /api/voice (Synthesizing regional verbal metrics)');

    const simulationOptions = [
      "I want to pay electricity bill of TPDDL",
      "Settle my academic tuition university fee",
      "I need to open a high interest rate fixed deposit account"
    ];
    const picked = simulationOptions[Math.floor(Math.random() * simulationOptions.length)];

    setTimeout(() => {
      setVoiceQuery(picked);
      setIsListeningVoice(false);
      addLog(`Speech transcriber mapped frequencies to output: "${picked}"`);
      handleQueryDispatch(picked);
    }, 2800);
  };

  const handleBBPSQueryFetch = (e) => {
    e.preventDefault();
    if (consumerNumber.length !== 11) return;

    setAgentMessage('Connecting securely to Bharat BillPay to fetch your outstanding balance...');
    addLog(`POST /api/navigation -> Querying utilities bill ledger: #${consumerNumber}`);

    setTimeout(() => {
      setBillFetched(true);
      setAgentMessage('Your pending invoice is loaded successfully. Please review the details below and authorize the payment.');
      setSpotlightElementId('manual-checkout-btn');
      setSpotlightGuideText('The bill is authenticated. Click checkout manually to authorize cash release.');
      addLog('BBPS Statement successfully verified: ₹1450 invoice due.');
    }, 1200);
  };

  // Auth Modal trigger functions
  const handleManualPaymentSettle = () => setAuthModal({ isOpen: true, journey: 'electricity' });
  const handleManualTuitionSettle = () => { if (studentId.trim()) setAuthModal({ isOpen: true, journey: 'tuition' }); };
  const handleManualFdSettle = () => { if (parseInt(depositAmount) >= 10000) setAuthModal({ isOpen: true, journey: 'fixed-deposit' }); };

  // Secure Transaction Executor
  const executeSecureTransaction = (e) => {
    if (e) e.preventDefault();
    setIsAuthenticating(true);
    addLog(`POST /api/auth -> Validating biometric/MPIN token for ${authModal.journey}`);

    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthModal({ isOpen: false, journey: null });
      setAuthPin('');

      setCurrentScreen('success');
      setAgentPhase('success');
      setAgentMessage('Transaction successful! Your funds have been transferred securely.');
      setSpotlightElementId(null);
      setCompletedJourneys(prev => [...prev, authModal.journey]);
      setDemoMetrics(prev => ({...prev, totalCompleted: prev.totalCompleted + 1}));
      addLog('Security Gateway: Payment confirmation audited and cleared.');
    }, 1500);
  };

  const handleResetWorkflow = () => {
    setCurrentScreen('landing');
    setAgentPhase('idle');
    setAgentMessage('Welcome back. What financial task can I help you with today?');
    setAgentThoughts([]);
    setConsumerNumber('');
    setBillFetched(false);
    setStudentId('');
    setSpotlightElementId(null);
    setLastOutput(null);
    setIsEscalated(false);
    setAuthModal({ isOpen: false, journey: null });
    setAuthPin('');
    addLog('Sandbox cached parameters cleared. Returned to home state.');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setPortalMode(loginRole);
      setIsLoggedIn(true);
    }
  };

  // Human-in-the-Loop Co-Pilot Trigger
  const handleInterceptEscalation = (targetUser) => {
    setCoPilotModal({ isOpen: true, activeUser: targetUser });
    addLog(`HITL Intercept: Admin triggered video session co-pilot with client "${targetUser}"`);
  };

  // Reusable Floating Assistant for the User Portal
  const ConversationalAssistant = () => (
    <div className={`mt-6 p-4 rounded-2xl shadow-lg border flex items-start gap-4 transition-all duration-300 ${
      accessibilityMode ? 'bg-white border-[#4A148C] border-[3px]' : 'bg-white/90 backdrop-blur-md border-purple-200'
    }`}>
      <div className={`p-3 rounded-xl flex-shrink-0 ${
        isProcessing ? 'bg-amber-100 text-amber-600 animate-pulse' : 'bg-[#4A148C] text-white'
      }`}>
        <Sparkles className="w-6 h-6" />
      </div>
      <div>
        <p className={`text-[10px] uppercase font-black tracking-widest mb-1 ${
          isProcessing ? 'text-amber-600' : 'text-[#4A148C]'
        }`}>
          {isProcessing ? 'Saathi is processing...' : 'Saathi Assistant'}
        </p>
        <p className={`${accessibilityMode ? 'text-lg font-bold text-[#2E1065]' : 'text-sm font-semibold text-slate-700'} leading-relaxed`}>
          {agentMessage}
        </p>
      </div>
    </div>
  );

  /* ==========================================================================
     LOGIN SCREEN (If not authenticated)
     ========================================================================== */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F5F3FF] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#4A148C]/15 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#EC407A]/15 rounded-full filter blur-3xl pointer-events-none" />

        <div className="bg-white/90 backdrop-blur-xl border border-purple-200 p-8 md:p-12 rounded-3xl shadow-2xl max-w-2xl w-full z-10 transition-all duration-500">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#4A148C] to-[#EC407A] text-white shadow-lg mb-5">
              <Cpu className="w-10 h-10 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[#4A148C] tracking-tight">SBI Saathi</h1>
            <p className="text-slate-500 mt-2 font-bold tracking-wide uppercase text-xs">Agentic AI Banking Companion</p>
          </div>

          {!loginRole ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Login Card */}
              <button
                onClick={() => setLoginRole('user')}
                className="group p-6 rounded-3xl border-2 border-purple-100 hover:border-[#4A148C] hover:bg-purple-50 transition-all text-center flex flex-col items-center shadow-sm hover:shadow-xl"
              >
                <div className="p-5 rounded-full bg-purple-100 text-[#4A148C] group-hover:bg-[#4A148C] group-hover:text-white transition-colors mb-5">
                  <UserCircle className="w-12 h-12" />
                </div>
                <h2 className="text-xl font-black text-[#4A148C]">Customer Portal</h2>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">Access the interactive AI companion for guided digital banking transactions.</p>
              </button>

              {/* Admin Login Card */}
              <button
                onClick={() => setLoginRole('admin')}
                className="group p-6 rounded-3xl border-2 border-purple-100 hover:border-slate-800 hover:bg-slate-50 transition-all text-center flex flex-col items-center shadow-sm hover:shadow-xl"
              >
                <div className="p-5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors mb-5">
                  <LayoutDashboard className="w-12 h-12" />
                </div>
                <h2 className="text-xl font-black text-slate-800">Admin Console</h2>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">Access the technical developer dashboard, API logs, and prompt configurations.</p>
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setLoginRole(null)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <h2 className="text-xl font-black text-[#4A148C]">
                  {loginRole === 'user' ? 'Customer Login' : 'Admin Authentication'}
                </h2>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                    {loginRole === 'user' ? 'Customer ID / Username' : 'Admin ID'}
                  </label>
                  <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={loginRole === 'user' ? "e.g., rahul_sharma" : "e.g., admin_01"}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-[#4A148C] outline-none focus:ring-2 focus:ring-[#4A148C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Password</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-[#4A148C] outline-none focus:ring-2 focus:ring-[#4A148C]"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 mt-2 font-black rounded-xl shadow-lg transition-all text-white bg-[#4A148C] hover:bg-[#2E1065]"
                >
                  Secure Login
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ==========================================================================
     AUTHENTICATED MAIN APP 
     ========================================================================== */

  return (
    <div className={`min-h-screen font-sans antialiased relative pb-16 transition-colors duration-300 ${
      accessibilityMode ? 'bg-[#FFFFFF] text-[#2E1065] text-lg' : 'bg-[#F5F3FF] text-[#2D2144]'
    }`}>
      
      {/* ────────────────────────────────────────────────────────
         SIGNATURE SPOTLIGHT OVERLAY SYSTEM (User Portal Only)
         ──────────────────────────────────────────────────────── */}
      {spotlightElementId && portalMode === 'user' && (
        <div className="fixed inset-0 z-50 pointer-events-none transition-all duration-500">
          <div className="absolute inset-0 bg-[#2E1065]/70 backdrop-blur-[3px] pointer-events-auto" onClick={() => setSpotlightElementId(null)} />
          
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-11/12 max-w-lg rounded-2xl p-5 shadow-2xl z-50 animate-[bounce_1.5s_infinite] pointer-events-auto flex items-start gap-3.5 border-[3px] ${
            accessibilityMode ? 'bg-white text-[#2E1065] border-[#4A148C]' : 'bg-white/95 backdrop-blur-xl text-[#2D2144] border-[#EC407A]'
          }`}>
            <div className={`p-2.5 rounded-xl ${accessibilityMode ? 'bg-[#4A148C] text-white' : 'bg-gradient-to-br from-[#4A148C] to-[#EC407A] text-white'}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-[10px] uppercase font-black tracking-widest mb-0.5 ${accessibilityMode ? 'text-[#4A148C]' : 'text-[#EC407A]'}`}>Saathi Guidance</p>
              <p className={`${accessibilityMode ? 'text-base font-black' : 'text-xs font-bold'} leading-relaxed`}>{spotlightGuideText}</p>
              <button 
                onClick={() => setSpotlightElementId(null)}
                className={`mt-2.5 text-[10px] font-extrabold flex items-center gap-0.5 uppercase tracking-wider ${
                  accessibilityMode ? 'text-[#4A148C] underline' : 'text-[#8E24AA] hover:text-[#EC407A]'
                }`}
              >
                Acknowledge and Continue <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
         PERSISTENT TRUST & SAFETY BAR
         ──────────────────────────────────────────────────────── */}
      <section className={`py-2 px-4 shadow-sm z-30 relative ${
        portalMode === 'admin' ? 'bg-[#1e1e1e] text-slate-300' :
        accessibilityMode ? 'bg-[#4A148C] border-b-4 border-[#2E1065] text-white' : 'bg-gradient-to-r from-[#4A148C] via-[#8E24AA] to-[#EC407A] text-white'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-extrabold tracking-widest uppercase text-[10px]">
            <ShieldCheck className={`w-4.5 h-4.5 ${portalMode === 'admin' ? 'text-emerald-500' : 'text-[#FFD700]'} animate-pulse`} />
            <span className={accessibilityMode ? 'text-sm' : ''}>Saathi Guides. You Decide.</span>
          </div>
          <p className={`${accessibilityMode ? 'text-xs font-bold' : 'text-[10px] font-medium'} text-center sm:text-right opacity-90`}>
            {portalMode === 'admin' ? 'Admin Environment: Live Monitoring Active.' : 'Passwords, PIN codes & payouts always require manual customer confirmation.'}
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         SYSTEM APP HEADER BAR
         ──────────────────────────────────────────────────────── */}
      <header className={`sticky top-0 z-40 border-b shadow-xs px-4 py-3.5 backdrop-blur-md ${
        portalMode === 'admin' ? 'bg-white border-slate-200' :
        accessibilityMode ? 'bg-white border-[#4A148C]' : 'bg-white/90 border-purple-200'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className={`p-2.5 rounded-2xl shadow-md ${
              portalMode === 'admin' ? 'bg-slate-800 text-white' :
              accessibilityMode ? 'bg-[#4A148C] text-white' : 'bg-gradient-to-r from-[#4A148C] to-[#EC407A] text-white'
            }`}>
              {portalMode === 'admin' ? <Database className="w-5 h-5" /> : <Cpu className="w-5 h-5 animate-pulse" />}
            </div>
            <div>
              <h1 className={`font-black tracking-tight flex items-center gap-1.5 ${
                portalMode === 'admin' ? 'text-slate-800 text-lg' : 
                accessibilityMode ? 'text-xl text-[#4A148C]' : 'text-md text-[#4A148C]'
              }`}>
                SBI Saathi
                <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-black ${
                  portalMode === 'admin' ? 'bg-slate-200 text-slate-700' :
                  accessibilityMode ? 'bg-[#4A148C] text-white' : 'bg-pink-100 text-[#EC407A]'
                }`}>
                  {portalMode === 'admin' ? 'Control Center' : 'Agentic Core'}
                </span>
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* LOGOUT BUTTON */}
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setLoginRole(null);
                setUsername('');
                setPassword('');
              }}
              className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all flex items-center gap-1.5 mr-2 ${
                portalMode === 'admin' 
                  ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20' 
                  : 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>

            {/* Accessibility & Settings (Only in User Mode) */}
            {portalMode === 'user' && (
              <>
                <button
                  onClick={() => { setAccessibilityMode(!accessibilityMode); }}
                  className={`px-3 py-1.5 text-[10px] font-extrabold uppercase rounded-lg border-[2px] tracking-wider transition-all flex items-center gap-1 ${
                    accessibilityMode 
                      ? 'bg-purple-100 text-[#4A148C] border-[#4A148C]' 
                      : 'bg-white text-[#4A148C] hover:bg-purple-50 border-purple-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  {accessibilityMode ? "Standard UI Mode" : "High Contrast"}
                </button>

                <div className={`flex rounded-lg p-0.5 border ${accessibilityMode ? 'bg-purple-50 border-[#4A148C]/30' : 'bg-white border-purple-200'}`}>
                  {['en', 'hi', 'ta'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => setCurrentLanguage(lang)}
                      className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${
                        currentLanguage === lang 
                          ? 'bg-[#4A148C] text-white' : 'text-[#4A148C] hover:text-[#8E24AA]'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleResetWorkflow}
                  className={`p-2 rounded-xl border transition-all ${accessibilityMode ? 'bg-purple-100 border-[#4A148C] text-[#4A148C]' : 'bg-white hover:bg-purple-50 text-[#4A148C] border-purple-200'}`}
                  title="Reset State"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ────────────────────────────────────────────────────────
         CUSTOMER PORTAL VIEW
         ──────────────────────────────────────────────────────── */}
      {portalMode === 'user' && (
        <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
          
          {/* Low Confidence / Smart Error Recovery */}
          {lastOutput && lastOutput.confidence < 0.70 && !isEscalated && (
            <div className={`p-5 rounded-3xl border-[2px] ${
              accessibilityMode ? 'bg-rose-50 border-rose-600 text-rose-900' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <div className="flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 animate-bounce" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider">Clarification Needed</h4>
                  <p className={`${accessibilityMode ? 'text-sm font-bold' : 'text-xs'} mt-1 leading-relaxed`}>
                    I want to ensure I get this right. Could you rephrase your request, or try one of the suggestions below?
                  </p>
                  <div className="flex gap-2.5 mt-3.5">
                    <button
                      onClick={() => handleQueryDispatch("pay electricity bill of TPDDL")}
                      className={`px-3 py-1.5 font-bold rounded-lg border-[2px] ${
                        accessibilityMode ? 'text-sm bg-white text-rose-700 border-rose-600' : 'text-[10px] bg-white hover:bg-rose-100 border-rose-300'
                      }`}
                    >
                      Pay Electricity
                    </button>
                    <button
                      onClick={() => setIsEscalated(true)}
                      className={`px-3 py-1.5 font-bold rounded-lg bg-[#4A148C] text-white ${accessibilityMode ? 'text-sm' : 'text-[10px]'}`}
                    >
                      Talk to a Human Agent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Simulated Escalation Screen */}
          {isEscalated && (
            <div className={`p-8 rounded-3xl border-[2px] text-center space-y-4 ${
              accessibilityMode ? 'bg-purple-50 border-[#4A148C]' : 'bg-white border-purple-200 shadow-xl'
            }`}>
              <div className="inline-flex p-4 bg-purple-100 rounded-full text-[#4A148C] animate-pulse border border-purple-300">
                <PhoneCall className="w-10 h-10" />
              </div>
              <h3 className={`${accessibilityMode ? 'text-2xl' : 'text-xl'} font-black text-[#4A148C]`}>Connecting to Live Support</h3>
              <p className={`${accessibilityMode ? 'text-sm font-bold' : 'text-sm text-slate-500'} leading-relaxed max-w-md mx-auto`}>
                We are routing your session to a live companion support agent. Please hold securely.
              </p>
              <button 
                onClick={() => setIsEscalated(false)}
                className={`px-6 py-2.5 mt-4 rounded-xl font-bold border ${accessibilityMode ? 'text-sm bg-white border-[#4A148C] text-[#4A148C]' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs'}`}
              >
                Cancel Call
              </button>
            </div>
          )}

          {/* Conversational Bubble (Always visible unless escalated) */}
          {!isEscalated && <ConversationalAssistant />}

          {/* 1. HERO HOME DASHBOARD */}
          {currentScreen === 'landing' && !isEscalated && (
            <div className={`rounded-3xl p-6 lg:p-8 border shadow-sm relative overflow-hidden transition-all mt-2 ${
              accessibilityMode ? 'bg-white border-[3px] border-[#4A148C]' : 'bg-white border-purple-200'
            }`}>
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full filter blur-3xl pointer-events-none ${
                accessibilityMode ? 'bg-purple-50' : 'bg-[#4A148C]/5'
              }`} />
              
              <div className="relative z-10 w-full">
                {/* Voice dictation pipeline container */}
                <div className={`p-5 rounded-2xl border shadow-lg relative ${
                  accessibilityMode ? 'bg-purple-50 border-[2px] border-[#4A148C]' : 'bg-gradient-to-br from-white to-[#F9F7FC] border-purple-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-[#4A148C]">How can we help you today?</span>
                    {isListeningVoice && (
                      <span className="text-[10px] bg-rose-500 text-white font-extrabold px-3 py-1 rounded-full animate-pulse">
                        Listening...
                      </span>
                    )}
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={voiceQuery}
                      onChange={(e) => setVoiceQuery(e.target.value)}
                      placeholder='Try typing: "Pay electricity bill"'
                      className={`w-full border rounded-xl py-4 pl-5 pr-28 font-bold focus:outline-none focus:ring-2 ${
                        accessibilityMode 
                          ? 'text-lg bg-white border-[#4A148C] text-[#2E1065] focus:ring-[#4A148C]' 
                          : 'text-sm bg-white border-purple-200 text-[#4A148C] focus:ring-[#4A148C]'
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleQueryDispatch(voiceQuery);
                      }}
                    />
                    
                    <div className="absolute right-2 flex items-center gap-2">
                      <button
                        onClick={startSpeechCapture}
                        disabled={isListeningVoice}
                        className={`p-2.5 rounded-lg transition-all border ${
                          isListeningVoice 
                            ? 'bg-rose-500 text-white border-rose-500 animate-pulse' 
                            : accessibilityMode 
                              ? 'bg-white border-[#4A148C] text-[#4A148C]' 
                              : 'bg-purple-50 border-purple-200 text-[#4A148C] hover:bg-purple-100'
                        }`}
                      >
                        {isListeningVoice ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={() => handleQueryDispatch(voiceQuery)}
                        disabled={!voiceQuery.trim() || isProcessing}
                        className={`p-2.5 text-white rounded-lg disabled:opacity-40 hover:opacity-95 transition-all shadow-md ${
                          accessibilityMode ? 'bg-[#4A148C] font-black' : 'bg-gradient-to-r from-[#4A148C] to-[#EC407A]'
                        }`}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Sinusoidal Waveform */}
                  {isListeningVoice && (
                    <div className="mt-4 flex flex-col gap-2">
                      <canvas ref={canvasRef} width={600} height={60} className="w-full h-14 rounded-xl bg-white border border-purple-100" />
                    </div>
                  )}
                </div>

                {/* Popular Scenario chips */}
                <div className="mt-8">
                  <p className="text-xs font-black uppercase tracking-widest text-[#4A148C] mb-3">⚡ Quick Actions</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { query: "Pay electricity bill", icon: <Zap className="w-4 h-4"/> },
                      { query: "Pay tuition fee", icon: <GraduationCap className="w-4 h-4"/> },
                      { query: "Open fixed deposit", icon: <TrendingUp className="w-4 h-4"/> }
                    ].map((scenario, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setVoiceQuery(scenario.query);
                          handleQueryDispatch(scenario.query);
                        }}
                        className={`p-4 text-left rounded-2xl transition-all border group shadow-sm flex flex-col gap-2 ${
                          accessibilityMode 
                            ? 'bg-white border-[2px] border-[#4A148C] hover:bg-purple-50' 
                            : 'bg-white border-purple-200 hover:border-[#4A148C]'
                        }`}
                      >
                        <div className={`p-2 rounded-full w-fit ${accessibilityMode ? 'bg-[#4A148C] text-white' : 'bg-purple-100 text-[#4A148C]'}`}>
                          {scenario.icon}
                        </div>
                        <p className={`font-bold ${accessibilityMode ? 'text-base text-[#2E1065]' : 'text-sm text-[#4A148C] group-hover:text-[#8E24AA]'}`}>"{scenario.query}"</p>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. ELECTRICITY BILL PAYMENT */}
          {currentScreen === 'electricity' && (
            <div className={`rounded-3xl p-6 lg:p-8 border shadow-lg relative ${
              accessibilityMode ? 'bg-white border-[3px] border-[#4A148C]' : 'bg-white border-purple-200'
            }`}>
              <div className="flex items-center justify-between border-b border-purple-100 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${accessibilityMode ? 'bg-[#4A148C] text-white' : 'bg-purple-100 text-[#4A148C]'}`}>
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-black ${accessibilityMode ? 'text-2xl text-[#2E1065]' : 'text-xl text-[#4A148C]'}`}>Electricity Bill</h3>
                    <p className={`${accessibilityMode ? 'text-sm font-bold' : 'text-xs font-semibold'} text-[#4A148C] uppercase tracking-wider`}>Bharat BillPay</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleBBPSQueryFetch} className="space-y-6">
                <div>
                  <label className={`block text-xs font-black uppercase tracking-wider mb-2 ${accessibilityMode ? 'text-[#2E1065]' : 'text-[#4A148C]'}`}>Select Provider</label>
                  <select 
                    value={selectedBiller}
                    onChange={(e) => setSelectedBiller(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3.5 font-bold outline-none focus:ring-2 ${
                      accessibilityMode 
                        ? 'text-lg bg-white border-[#4A148C] text-[#2E1065] focus:ring-[#4A148C]' 
                        : 'text-sm bg-purple-50 border-purple-200 text-[#4A148C] focus:ring-[#4A148C]'
                    }`}
                  >
                    {MOCK_BILLERS.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.state})</option>
                    ))}
                  </select>
                </div>

                <div className={`p-2 -mx-2 rounded-2xl transition-all ${spotlightElementId === 'consumer-field' ? 'ring-4 ring-[#4A148C] bg-purple-50/50 z-50 relative pointer-events-auto' : ''}`}>
                  <label className={`block text-xs px-2 font-black uppercase tracking-wider mb-2 ${accessibilityMode ? 'text-[#2E1065]' : 'text-[#4A148C]'}`}>Consumer ID (11 Digits)</label>
                  <input
                    id="consumer-field"
                    type="text"
                    maxLength={11}
                    placeholder="e.g., 50198812401"
                    value={consumerNumber}
                    onChange={(e) => {
                      const numeric = e.target.value.replace(/\D/g, '');
                      setConsumerNumber(numeric);
                      if (numeric.length === 11) {
                        setSpotlightElementId('query-dues-btn');
                        setSpotlightGuideText("Great! Now click 'Fetch Outstanding Bill' below.");
                      }
                    }}
                    className={`w-full border rounded-xl py-3.5 px-4 font-bold focus:outline-none focus:ring-2 ${
                      accessibilityMode 
                        ? 'text-lg bg-white border-[#4A148C] text-[#2E1065] focus:ring-[#4A148C]' 
                        : 'text-sm bg-purple-50 border-purple-200 text-[#4A148C] focus:ring-[#4A148C]'
                    }`}
                  />
                </div>

                {!billFetched && (
                  <div className={`p-1 -mx-1 rounded-2xl transition-all ${spotlightElementId === 'query-dues-btn' ? 'ring-4 ring-[#4A148C] z-50 relative pointer-events-auto' : ''}`}>
                    <button
                      id="query-dues-btn"
                      type="submit"
                      disabled={consumerNumber.length !== 11}
                      className={`w-full py-4 font-black rounded-xl transition-all disabled:opacity-40 border-[2px] ${
                        accessibilityMode ? 'text-lg bg-[#4A148C] border-[#4A148C] text-white' : 'text-sm bg-[#4A148C] border-[#4A148C] text-white'
                      }`}
                    >
                      Fetch Outstanding Bill
                    </button>
                  </div>
                )}
              </form>

              {billFetched && (
                <div className={`mt-8 border rounded-2xl p-6 ${
                  accessibilityMode ? 'bg-purple-50 border-[#4A148C]' : 'bg-[#F9F7FC] border-purple-200'
                }`}>
                  <div className="flex justify-between items-center border-b border-purple-200 pb-3 mb-4">
                    <span className="text-xs font-black uppercase text-[#4A148C]">Invoice Details</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-emerald-200">Verified</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className={`block text-[10px] uppercase font-bold ${accessibilityMode ? 'text-[#4A148C]' : 'text-slate-500'}`}>Consumer Name:</span>
                      <span className={`font-black ${accessibilityMode ? 'text-lg text-[#2E1065]' : 'text-base text-[#4A148C]'}`}>Amit Kumar Sharma</span>
                    </div>
                    <div>
                      <span className={`block text-[10px] uppercase font-bold ${accessibilityMode ? 'text-[#4A148C]' : 'text-slate-500'}`}>Due Date:</span>
                      <span className={`font-black ${accessibilityMode ? 'text-lg text-red-600' : 'text-base text-red-500'}`}>15 July 2026</span>
                    </div>
                  </div>

                  <div className={`rounded-xl p-4 flex justify-between items-center border shadow-sm mb-8 ${
                    accessibilityMode ? 'bg-white border-[#4A148C]' : 'bg-white border-purple-100'
                  }`}>
                    <div>
                      <span className={`block text-[10px] uppercase font-bold ${accessibilityMode ? 'text-[#4A148C]' : 'text-slate-500'}`}>Total Amount Due:</span>
                      <span className={`font-black ${accessibilityMode ? 'text-4xl text-[#2E1065]' : 'text-3xl text-[#EC407A]'}`}>₹{billAmount}.00</span>
                    </div>
                  </div>

                  <div className={`p-1 -mx-1 rounded-2xl transition-all ${spotlightElementId === 'manual-checkout-btn' ? 'ring-4 ring-[#4A148C] z-50 relative pointer-events-auto' : ''}`}>
                    <button
                      id="manual-checkout-btn"
                      onClick={handleManualPaymentSettle}
                      disabled={isPaying}
                      className={`w-full py-4 font-black rounded-xl shadow-lg transition-all ${
                        accessibilityMode ? 'text-lg bg-[#4A148C] text-white border-2 border-[#4A148C]' : 'text-base bg-gradient-to-r from-[#4A148C] via-[#8E24AA] to-[#EC407A] text-white'
                      }`}
                    >
                      {isPaying ? 'Authenticating...' : 'Confirm & Proceed to Pay'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. TUITION FEE PAYMENT */}
          {currentScreen === 'tuition' && (
            <div className={`rounded-3xl p-6 lg:p-8 border shadow-md ${
              accessibilityMode ? 'bg-white border-[3px] border-[#4A148C]' : 'bg-white border-purple-200'
            }`}>
              <div className="flex items-center justify-between border-b border-purple-100 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${accessibilityMode ? 'bg-[#4A148C] text-white' : 'bg-purple-100 text-[#4A148C]'}`}>
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-black ${accessibilityMode ? 'text-2xl text-[#2E1065]' : 'text-xl text-[#4A148C]'}`}>Tuition Fees</h3>
                    <p className={`${accessibilityMode ? 'text-sm font-bold' : 'text-xs font-semibold'} text-[#4A148C] uppercase tracking-wider`}>Academic Transfer</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`block text-xs font-black uppercase tracking-wider mb-2 ${accessibilityMode ? 'text-[#2E1065]' : 'text-[#4A148C]'}`}>Institution</label>
                  <select 
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3.5 font-bold outline-none focus:ring-2 ${
                      accessibilityMode 
                        ? 'text-lg bg-white border-[#4A148C] text-[#2E1065] focus:ring-[#4A148C]' 
                        : 'text-sm bg-purple-50 border-purple-200 text-[#4A148C] focus:ring-[#4A148C]'
                    }`}
                  >
                    {MOCK_SCHOOLS.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.city})</option>
                    ))}
                  </select>
                </div>

                <div className={`p-2 -mx-2 rounded-2xl ${spotlightElementId === 'student-field' ? 'ring-4 ring-[#4A148C] z-50 relative pointer-events-auto' : ''}`}>
                  <label className={`block px-2 text-xs font-black uppercase tracking-wider mb-2 ${accessibilityMode ? 'text-[#2E1065]' : 'text-[#4A148C]'}`}>Student ID</label>
                  <input
                    id="student-field"
                    type="text"
                    placeholder="e.g., IITB-2026-9908"
                    value={studentId}
                    onChange={(e) => {
                      setStudentId(e.target.value);
                      if (e.target.value.length > 5) {
                        setSpotlightElementId('tuition-pay-btn');
                        setSpotlightGuideText("Student found. Review the fee below and click confirm to proceed.");
                      }
                    }}
                    className={`w-full border rounded-xl py-3.5 px-4 font-bold focus:outline-none focus:ring-2 ${
                      accessibilityMode 
                        ? 'text-lg bg-white border-[#4A148C] text-[#2E1065] focus:ring-[#4A148C]' 
                        : 'text-sm bg-purple-50 border-purple-200 text-[#4A148C] focus:ring-[#4A148C]'
                    }`}
                  />
                </div>

                {studentId.length > 5 && (
                  <div className={`p-5 border rounded-xl flex justify-between items-center shadow-xs mt-4 ${
                    accessibilityMode ? 'bg-purple-50 border-[#4A148C]' : 'bg-white border-purple-200'
                  }`}>
                    <span className={`font-black ${accessibilityMode ? 'text-lg text-[#4A148C]' : 'text-sm text-[#4A148C]'}`}>Semester Due</span>
                    <span className={`font-black ${accessibilityMode ? 'text-3xl text-[#2E1065]' : 'text-2xl text-[#EC407A]'}`}>₹1,20,000.00</span>
                  </div>
                )}

                <div className={`p-1 -mx-1 rounded-2xl ${spotlightElementId === 'tuition-pay-btn' ? 'ring-4 ring-[#4A148C] z-50 relative pointer-events-auto' : ''}`}>
                  <button
                    id="tuition-pay-btn"
                    disabled={!studentId.trim()}
                    onClick={handleManualTuitionSettle}
                    className={`w-full py-4 font-black rounded-xl disabled:opacity-40 border-[2px] mt-2 ${
                      accessibilityMode ? 'text-lg bg-[#4A148C] border-[#4A148C] text-white' : 'text-base bg-[#4A148C] border-[#4A148C] text-white'
                    }`}
                  >
                    Confirm & Proceed
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. FIXED DEPOSIT PORTAL */}
          {currentScreen === 'fixed-deposit' && (
            <div className={`rounded-3xl p-6 lg:p-8 border shadow-md ${
              accessibilityMode ? 'bg-white border-[3px] border-[#4A148C]' : 'bg-white border-purple-200'
            }`}>
              <div className="flex items-center justify-between border-b border-purple-100 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${accessibilityMode ? 'bg-[#4A148C] text-white' : 'bg-purple-100 text-[#4A148C]'}`}>
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-black ${accessibilityMode ? 'text-2xl text-[#2E1065]' : 'text-xl text-[#4A148C]'}`}>Fixed Deposit</h3>
                    <p className={`${accessibilityMode ? 'text-sm font-bold' : 'text-xs font-semibold'} text-[#4A148C] uppercase tracking-wider`}>Wealth Growth</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`block text-xs font-black uppercase tracking-wider mb-2 ${accessibilityMode ? 'text-[#2E1065]' : 'text-[#4A148C]'}`}>Term Scheme</label>
                  <select 
                    value={selectedScheme}
                    onChange={(e) => setSelectedScheme(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3.5 font-bold outline-none focus:ring-2 ${
                      accessibilityMode 
                        ? 'text-lg bg-white border-[#4A148C] text-[#2E1065] focus:ring-[#4A148C]' 
                        : 'text-sm bg-purple-50 border-purple-200 text-[#4A148C] focus:ring-[#4A148C]'
                    }`}
                  >
                    {MOCK_FD_SCHEMES.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.rate})</option>
                    ))}
                  </select>
                </div>

                <div className={`p-2 -mx-2 rounded-2xl ${spotlightElementId === 'deposit-field' ? 'ring-4 ring-[#4A148C] z-50 relative pointer-events-auto' : ''}`}>
                  <label className={`block px-2 text-xs font-black uppercase tracking-wider mb-2 ${accessibilityMode ? 'text-[#2E1065]' : 'text-[#4A148C]'}`}>Principal Amount (₹)</label>
                  <input
                    id="deposit-field"
                    type="number"
                    min="10000"
                    value={depositAmount}
                    onChange={(e) => {
                      setDepositAmount(e.target.value);
                      if (parseInt(e.target.value) >= 10000) {
                        setSpotlightElementId('fd-generate-btn');
                        setSpotlightGuideText("Amount entered. Review the payout projection and confirm to proceed.");
                      }
                    }}
                    className={`w-full border rounded-xl py-3.5 px-4 font-bold focus:outline-none focus:ring-2 ${
                      accessibilityMode 
                        ? 'text-lg bg-white border-[#4A148C] text-[#2E1065] focus:ring-[#4A148C]' 
                        : 'text-sm bg-purple-50 border-purple-200 text-[#4A148C] focus:ring-[#4A148C]'
                    }`}
                  />
                </div>

                {parseInt(depositAmount) >= 10000 && (
                  <div className={`p-5 border rounded-xl space-y-3 mt-4 ${
                    accessibilityMode ? 'bg-purple-50 border-[#4A148C]' : 'bg-white border-purple-200'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-black ${accessibilityMode ? 'text-lg text-[#4A148C]' : 'text-sm text-[#4A148C]'}`}>Interest Rate:</span>
                      <span className={`font-black ${accessibilityMode ? 'text-lg text-emerald-700' : 'text-sm text-emerald-600'}`}>7.10% p.a.</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-purple-200">
                      <span className={`font-black ${accessibilityMode ? 'text-lg text-[#4A148C]' : 'text-sm text-[#4A148C]'}`}>Estimated Payout:</span>
                      <span className={`font-black ${accessibilityMode ? 'text-3xl text-[#2E1065]' : 'text-2xl text-[#EC407A]'}`}>₹{(parseInt(depositAmount) * 1.071).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className={`p-1 -mx-1 rounded-2xl ${spotlightElementId === 'fd-generate-btn' ? 'ring-4 ring-[#4A148C] z-50 relative pointer-events-auto' : ''}`}>
                  <button
                    id="fd-generate-btn"
                    disabled={parseInt(depositAmount) < 10000}
                    onClick={handleManualFdSettle}
                    className={`w-full py-4 font-black rounded-xl disabled:opacity-40 border-[2px] mt-2 ${
                      accessibilityMode ? 'text-lg bg-[#4A148C] border-[#4A148C] text-white' : 'text-base bg-[#4A148C] border-[#4A148C] text-white'
                    }`}
                  >
                    Confirm & Proceed
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. SUCCESS SCREEN */}
          {currentScreen === 'success' && (
            <div className={`rounded-3xl p-8 border shadow-xl text-center space-y-6 ${
              accessibilityMode ? 'bg-white border-[3px] border-[#4A148C]' : 'bg-white border-purple-200'
            }`}>
              <div className="inline-flex p-5 bg-emerald-50 rounded-full text-emerald-500 animate-bounce border border-emerald-200">
                <Check className="w-14 h-14 stroke-[3]" />
              </div>

              <div className="space-y-3">
                <h3 className={`font-black ${accessibilityMode ? 'text-4xl text-[#2E1065]' : 'text-3xl text-[#4A148C]'}`}>Success!</h3>
                <p className={`${accessibilityMode ? 'text-base font-bold text-[#4A148C]' : 'text-sm text-slate-500'} max-w-sm mx-auto leading-relaxed`}>
                  Your transaction has been securely processed and authenticated.
                </p>
              </div>

              {/* Recommendation */}
              {lastOutput && lastOutput.recommendation && (
                <div className={`pt-8 border-t text-left mt-8 ${
                  accessibilityMode ? 'border-[#4A148C]' : 'border-purple-100'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit ${
                      accessibilityMode ? 'bg-[#4A148C] text-white' : 'bg-purple-100 text-[#4A148C]'
                    }`}>
                      <Lightbulb className={`w-4 h-4 animate-pulse ${accessibilityMode ? 'text-[#FFD700]' : 'text-amber-500'}`} /> Proactive Suggestion
                    </span>
                    
                    <button
                      onClick={() => setExplainModal(true)}
                      className={`text-[10px] font-black uppercase underline flex items-center gap-1 ${
                        accessibilityMode ? 'text-[#4A148C]' : 'text-[#4A148C]'
                      }`}
                    >
                      <Info className="w-4 h-4" /> Why this?
                    </button>
                  </div>

                  <h4 className={`font-black mt-2 ${accessibilityMode ? 'text-xl text-[#2E1065]' : 'text-lg text-[#4A148C]'}`}>{lastOutput.recommendation}</h4>
                  <p className={`${accessibilityMode ? 'text-base font-bold text-[#4A148C]' : 'text-sm text-slate-600'} mt-2 leading-relaxed`}>{lastOutput.recommendationDetail}</p>
                </div>
              )}

              <div className="pt-6">
                <button
                  onClick={handleResetWorkflow}
                  className={`px-8 py-3.5 font-black rounded-xl shadow-md border-[2px] w-full sm:w-auto ${
                    accessibilityMode ? 'text-lg bg-[#4A148C] border-[#4A148C] text-white' : 'text-base bg-[#4A148C] border-[#4A148C] text-white'
                  }`}
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </main>
      )}

      {/* ────────────────────────────────────────────────────────
         ADMIN CONTROL CENTER VIEW
         ──────────────────────────────────────────────────────── */}
      {portalMode === 'admin' && (
        <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
          
          {/* Admin KPI Header Row with Latency Metric */}
          <div className="col-span-1 lg:col-span-12 grid grid-cols-2 md:grid-cols-5 gap-4 mb-2">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-3xl font-black text-slate-800">{demoMetrics.totalCompleted}</span>
              <span className="block text-[10px] uppercase font-bold text-slate-500 mt-1">Cleared Sessions</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-3xl font-black text-emerald-600">{(lastOutput ? lastOutput.confidence * 100 : 98).toFixed(0)}%</span>
              <span className="block text-[10px] uppercase font-bold text-slate-500 mt-1">Avg AI Confidence</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-3xl font-black text-[#4A148C]">{demoMetrics.autoPayAdoptions}</span>
              <span className="block text-[10px] uppercase font-bold text-slate-500 mt-1">Proactive Adoptions</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-1 right-2 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase text-emerald-600">Live</span>
              </div>
              <span className="text-3xl font-black text-pink-600">{avgLatency}ms</span>
              <span className="block text-[10px] uppercase font-bold text-slate-500 mt-1">AI Latency (Gemini Flash)</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-3xl font-black text-rose-500">2</span>
              <span className="block text-[10px] uppercase font-bold text-slate-500 mt-1">Active Escalations</span>
            </div>
          </div>

          {/* LEFT PANEL: CORE AI TRACE & PIPELINE */}
          <section className="col-span-1 lg:col-span-5 flex flex-col gap-6">
            
            {/* Live Customer Sessions Feed with HITL Intercept Action */}
            <div className="p-6 rounded-3xl border shadow-sm bg-white border-slate-200 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#4A148C]" /> Live Customer Activity
                </h4>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active Stream
                </span>
              </div>
              
              <div className="space-y-3">
                {liveActivities.map((activity) => (
                  <div key={activity.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-[#4A148C] flex items-center gap-1.5">
                        <UserCircle className="w-3.5 h-3.5" /> {activity.user}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {activity.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[11px] font-bold text-slate-700">{activity.action}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Value: {activity.amount || activity.value}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {activity.status === 'ESCALATED' ? (
                          <button
                            onClick={() => handleInterceptEscalation(activity.user)}
                            className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow transition-all flex items-center gap-1"
                          >
                            <PhoneCall className="w-3 h-3 text-white" /> Intercept
                          </button>
                        ) : (
                          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                            activity.status === 'CLEARED' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {activity.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl border shadow-sm bg-slate-900 border-slate-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-xl bg-emerald-500/10 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-inner bg-slate-800 text-emerald-400 border border-slate-700">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-wider text-slate-100">Live Agent Pipeline</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Status: <span className="text-emerald-400">{agentPhase}</span></p>
                  </div>
                </div>

                {lastOutput && (
                  <div className="px-3 py-1.5 rounded-lg text-[10px] font-black border flex items-center gap-1.5 bg-emerald-900/30 border-emerald-500/50 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Confidence: {(lastOutput.confidence * 100).toFixed(0)}%
                  </div>
                )}
              </div>

              {/* Developer Query Injector */}
              <div className="mb-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Simulate Query Injection</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voiceQuery}
                    onChange={(e) => setVoiceQuery(e.target.value)}
                    placeholder="Type to trigger orchestrator..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-emerald-500 text-slate-200"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleQueryDispatch(voiceQuery);
                    }}
                  />
                  <button
                    onClick={() => handleQueryDispatch(voiceQuery)}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    Run
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Orchestration Steps:</span>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  {agentSteps.map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`p-1.5 rounded-lg border flex items-center justify-between ${
                        step.status === 'completed'
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                          : step.status === 'active'
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 animate-pulse'
                          : 'bg-black/10 border-white/5 text-slate-400'
                      }`}
                    >
                      <span>{step.name}</span>
                      {step.status === 'completed' && <Check className="w-3 h-3 text-emerald-400" />}
                    </div>
                  ))}
                </div>
              </div>

              {agentThoughts.length > 0 && (
                <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">System State Output:</span>
                  <div className="space-y-2 mt-3">
                    {agentThoughts.map((t, idx) => (
                      <div key={idx} className="text-xs font-mono text-emerald-400 flex items-start gap-2 leading-relaxed">
                        <span className="opacity-50">▸</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT PANEL: TABS & DIAGNOSTICS */}
          <section className="col-span-1 lg:col-span-7 flex flex-col gap-6">
            
            {/* Safety Override Controller block */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${strictCompliance ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                  <SlidersHorizontal className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">Global Safety Guardrails</h4>
                  <p className="text-xs text-slate-500 font-semibold">Agent 7 Compliance Policies</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-black uppercase ${strictCompliance ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {strictCompliance ? 'Strict (Armed)' : 'Permissive Override'}
                </span>
                <button
                  onClick={() => {
                    setStrictCompliance(!strictCompliance);
                    addLog(`Admin Audit: Compliance policies toggled. Strict Mode = ${!strictCompliance}`);
                  }}
                  className={`w-12 h-6 rounded-full p-1 transition-all duration-300 focus:outline-none ${
                    strictCompliance ? 'bg-emerald-500 flex justify-end' : 'bg-slate-300 flex justify-start'
                  }`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow"></span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex-1">
              <div className="flex gap-2 border-b border-slate-100 pb-4 mb-5">
                {[
                  { id: 'console', label: 'HTTP Terminal', icon: Terminal },
                  { id: 'prompts', label: 'System Prompts', icon: Sliders }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        activeTab === tab.id 
                          ? 'bg-slate-800 text-white' 
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* TAB CONTENT 1: HTTP API NETWORK LOGS */}
              {activeTab === 'console' && (
                <div className="space-y-4 h-full flex flex-col">
                  <p className="text-xs text-slate-500 font-bold">Raw event streams processed by the Node.js secure backend:</p>
                  <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 flex-1 overflow-y-auto font-mono text-xs space-y-3 border border-slate-800 min-h-[400px] max-h-[500px]">
                    {systemLogs.map((log, idx) => (
                      <div key={idx} className="flex gap-2 items-start leading-tight">
                        <span className="text-[#EC407A] font-bold">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB CONTENT 2: LIVE PROMPTS ENGINE */}
              {activeTab === 'prompts' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-bold">Prompt configurations for individual micro-agents:</p>
                  <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
                    {Object.entries(SYSTEM_PROMPTS).map(([name, text]) => (
                      <div key={name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="text-xs font-black text-slate-800 font-mono uppercase border-b border-slate-200 pb-2 mb-2">{name}</div>
                        <pre className="text-xs font-mono text-slate-600 whitespace-pre-wrap leading-relaxed">{text.trim()}</pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Backend Configuration Panel */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h4 className="text-sm font-black uppercase flex items-center gap-2 text-slate-800 mb-2">
                <Lock className="w-4 h-4 text-emerald-500" /> Infrastructure Configuration
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 font-medium">
                To guarantee zero failure during presentations, the backend architecture features a Smart Offline Fallback. If the Node.js server disconnects, local routing safely takes over.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Sarvam Indic Gateway Key</label>
                  <input
                    type="password"
                    placeholder="srvm_live_..."
                    value={sarvamKey}
                    onChange={(e) => setSarvamKey(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Gemini GenAI Key</label>
                  <input
                    type="password"
                    placeholder="gemini_flash_..."
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ────────────────────────────────────────────────────────
         MODALS (Global)
         ──────────────────────────────────────────────────────── */}
      {/* Explanation Modal */}
      {explainModal && lastOutput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2E1065]/70 backdrop-blur-sm" onClick={() => setExplainModal(false)} />
          <div className={`rounded-3xl p-6 max-w-md w-full relative z-10 border-[3px] shadow-2xl space-y-4 ${
            accessibilityMode ? 'bg-white border-[#4A148C]' : 'bg-white border-[#4A148C]'
          }`}>
            <div className="flex justify-between items-center border-b border-purple-100 pb-3">
              <h4 className={`font-black flex items-center gap-1.5 ${accessibilityMode ? 'text-base text-[#4A148C]' : 'text-sm text-[#4A148C]'}`}>
                <Lightbulb className={`w-4 h-4 ${accessibilityMode ? 'text-[#4A148C]' : 'text-amber-500'}`} /> Why suggest this?
              </h4>
              <button onClick={() => setExplainModal(false)} className="text-slate-400 hover:text-[#4A148C]"><X className="w-5 h-5 animate-pulse" /></button>
            </div>
            <p className={`leading-relaxed ${accessibilityMode ? 'text-sm font-bold text-[#4A148C]' : 'text-xs text-slate-600'}`}>
              We formulated the suggestion <span className={`font-black ${accessibilityMode ? 'text-[#2E1065]' : 'text-[#EC407A]'}`}>"{lastOutput.recommendation}"</span> because you initiated a <span className={`font-black ${accessibilityMode ? 'text-[#2E1065]' : 'text-[#4A148C]'}`}>"{lastOutput.goal}"</span> journey. 
            </p>
            <p className={`leading-relaxed ${accessibilityMode ? 'text-sm font-bold text-[#4A148C]' : 'text-xs text-slate-600'}`}>
              By analyzing recurring banking transactions within the current session, the Recommendation Agent computed that enabling this secure optimization layer keeps you protected against missed payments.
            </p>
            <button 
              onClick={() => setExplainModal(false)} 
              className={`w-full py-3.5 font-black rounded-xl border-[2px] transition-all ${
                accessibilityMode ? 'text-base bg-[#4A148C] border-[#4A148C] text-white' : 'text-xs bg-[#4A148C] border-[#4A148C] text-white hover:bg-purple-800'
              }`}
            >
              Got it, Thanks!
            </button>
          </div>
        </div>
      )}

      {/* SECURITY AUTHENTICATION MODAL */}
      {authModal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2E1065]/80 backdrop-blur-md" onClick={() => !isAuthenticating && setAuthModal({ isOpen: false, journey: null })} />
          <div className={`relative z-10 w-full max-w-sm rounded-3xl p-6 lg:p-8 shadow-2xl border-[3px] ${
            accessibilityMode ? 'bg-white border-[#4A148C]' : 'bg-white border-[#4A148C]'
          }`}>
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 rounded-full bg-purple-50 text-[#4A148C] animate-pulse border border-purple-200">
                <Fingerprint className="w-10 h-10 animate-pulse" />
              </div>
              <div>
                <h3 className={`${accessibilityMode ? 'text-2xl' : 'text-xl'} font-black text-[#4A148C]`}>Authorization Required</h3>
                <p className={`${accessibilityMode ? 'text-sm' : 'text-xs'} text-slate-500 mt-2 font-bold`}>Enter 6-digit MPIN or use Biometrics to approve.</p>
              </div>

              <form onSubmit={executeSecureTransaction} className="space-y-4 pt-4">
                <input
                  type="password"
                  maxLength={6}
                  value={authPin}
                  onChange={(e) => setAuthPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full text-center tracking-[1em] text-2xl font-black border-2 rounded-xl py-3 outline-none focus:border-[#4A148C] bg-slate-50 border-slate-200 text-[#4A148C]"
                  autoFocus
                />
                
                <button
                  type="submit"
                  disabled={authPin.length !== 6 || isAuthenticating}
                  className={`w-full py-4 rounded-xl font-black transition-all ${
                    authPin.length === 6 
                      ? 'bg-[#4A148C] text-white shadow-lg hover:bg-[#2E1065]' 
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isAuthenticating ? 'Verifying Credentials...' : 'Authorize Transaction'}
                </button>
              </form>
              
              <button 
                onClick={() => !isAuthenticating && setAuthModal({ isOpen: false, journey: null })}
                className="text-[10px] uppercase font-bold text-slate-400 hover:text-rose-500 mt-2 block w-full text-center"
              >
                Cancel & Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CO-PILOT SESSION MONITOR MODAL (NEW HITL INTERCEPT SYSTEM) */}
      {coPilotModal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setCoPilotModal({ isOpen: false, activeUser: null })} />
          <div className="relative z-10 w-full max-w-2xl rounded-3xl p-6 bg-slate-900 text-white border-2 border-[#4A148C] shadow-2xl flex flex-col gap-4 font-sans">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-md font-black uppercase text-rose-500 flex items-center gap-2 tracking-wider">
                <Radio className="w-5 h-5 animate-pulse text-red-500" /> Active HITL Session Co-Pilot
              </h4>
              <button 
                onClick={() => setCoPilotModal({ isOpen: false, activeUser: null })}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5 animate-pulse" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs uppercase font-black text-slate-400">Stream Parameters</p>
                <div className="space-y-1.5 text-xs font-mono text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span>Target Client:</span>
                    <span className="text-amber-400 font-bold">{coPilotModal.activeUser}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span>Active Route:</span>
                    <span className="text-purple-400">/journey/tuition</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span>Verification Key:</span>
                    <span className="text-pink-400">CO_PLT_9921_OK</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 flex flex-col justify-center text-center p-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping mx-auto mb-1"></span>
                <h5 className="text-xs font-black uppercase text-slate-100">Synchronized Video Broadcast</h5>
                <p className="text-[11px] text-slate-400">Co-pilot has successfully acquired browser state matrices. Administrators may now take terminal input control.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl flex flex-col gap-2">
              <p className="text-[10px] font-black uppercase text-slate-400">Co-Pilot Action Terminal</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    addLog(`HITL Intercept: Co-pilot accepted the checkout step manually for client "${coPilotModal.activeUser}"`);
                    setCoPilotModal({ isOpen: false, activeUser: null });
                  }}
                  className="w-full py-2.5 text-xs font-bold text-white bg-[#4A148C] hover:bg-purple-800 rounded-xl transition-all shadow"
                >
                  Override & Pre-fill Current Form
                </button>
                <button 
                  onClick={() => {
                    addLog(`HITL Intercept: Admin terminated voice/video call session for "${coPilotModal.activeUser}"`);
                    setCoPilotModal({ isOpen: false, activeUser: null });
                  }}
                  className="w-full py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow"
                >
                  Terminate Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}