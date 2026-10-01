import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import StudentPortal from './components/StudentPortal';
import ManagerDashboard from './components/ManagerDashboard';
import WardenDashboard from './components/WardenDashboard';
import AdminPortal from './components/AdminPortal';
import KioskDisplay from './components/KioskDisplay';
import DemoModal from './components/DemoModal';
import SplashScreen from './components/SplashScreen';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Info,
  Smartphone,
  Sparkles
} from 'lucide-react';

export default function App() {
  const { activeRole, isMobileFrameView, notification } = useApp();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col md:flex-row font-sans text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* App Splash Screen on load or manual trigger */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Left Vertical Sidebar (Desktop) & Mobile Top/Bottom App Bars */}
      <Sidebar onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
        <main className="flex-1 py-3 sm:py-6 px-2 sm:px-4 max-w-7xl w-full mx-auto">
          {activeRole === 'student' && (
            isMobileFrameView ? (
              <div className="py-4 px-2 flex flex-col items-center justify-center">
                <div className="text-xs text-slate-400 mb-2 font-medium flex items-center gap-1.5 bg-[#131B2E] px-3 py-1 rounded-full border border-slate-800">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Simulating Mobile Phone App Viewport</span>
                </div>
                <div className="mobile-device-frame w-full shadow-2xl">
                  <div className="mobile-notch"></div>
                  <div className="pt-8 pb-4 max-h-[85vh] overflow-y-auto bg-[#0B0F19]">
                    <StudentPortal />
                  </div>
                </div>
              </div>
            ) : (
              <StudentPortal />
            )
          )}

          {activeRole === 'manager' && <ManagerDashboard />}
          {activeRole === 'warden' && <WardenDashboard />}
          {activeRole === 'admin' && <AdminPortal />}
          {activeRole === 'kiosk' && <KioskDisplay />}
        </main>

        {/* Clean Sleek Footer */}
        <footer className="hidden md:block bg-[#131B2E]/90 backdrop-blur-md border-t border-slate-800/80 py-4 px-6 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center text-[10px] font-black shadow-sm shadow-emerald-500/30">
                AR
              </div>
              <span><strong className="text-slate-200">Apni Rasoi</strong> — Hostel Mess Anonymous Feedback & Menu Planning</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Campus Dining Intelligence
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1 text-teal-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> DPDP & Privacy Shielded
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-18 md:bottom-5 right-5 z-50 animate-bounceIn">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold border backdrop-blur-md ${
            notification.type === 'error'
              ? 'bg-rose-950/90 text-rose-200 border-rose-600/50 shadow-rose-900/30'
              : notification.type === 'info'
              ? 'bg-slate-900/90 text-amber-300 border-amber-500/40 shadow-amber-900/20'
              : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50 shadow-emerald-900/30'
          }`}>
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            ) : notification.type === 'info' ? (
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Demo Controls Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onReplaySplash={() => {
          setIsDemoModalOpen(false);
          setShowSplash(true);
        }}
      />
    </div>
  );
}
