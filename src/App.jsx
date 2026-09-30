import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import StudentPortal from './components/StudentPortal';
import ManagerDashboard from './components/ManagerDashboard';
import WardenDashboard from './components/WardenDashboard';
import AdminPortal from './components/AdminPortal';
import KioskDisplay from './components/KioskDisplay';
import DemoModal from './components/DemoModal';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Info,
  Smartphone
} from 'lucide-react';

export default function App() {
  const { activeRole, isMobileFrameView, notification } = useApp();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col md:flex-row font-sans text-stone-900 selection:bg-brand-100 selection:text-brand-900">
      {/* Left Vertical Sidebar (Desktop) & Mobile Top/Bottom App Bars */}
      <Sidebar onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
        <main className="flex-1 py-3 sm:py-6 px-2 sm:px-4 max-w-7xl w-full mx-auto">
          {activeRole === 'student' && (
            isMobileFrameView ? (
              <div className="py-4 px-2 flex flex-col items-center justify-center">
                <div className="text-xs text-stone-500 mb-2 font-medium flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-brand-600" />
                  <span>Simulating Mobile Phone App Viewport</span>
                </div>
                <div className="mobile-device-frame w-full">
                  <div className="mobile-notch"></div>
                  <div className="pt-8 pb-4 max-h-[85vh] overflow-y-auto bg-[#FFF8E7]">
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

        {/* Clean Minimalist Footer */}
        <footer className="hidden md:block bg-white/80 backdrop-blur-xs border-t border-[#E8DECA] py-4 px-6 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-[#4F8A4C] text-white flex items-center justify-center text-[10px] font-bold">
                AR
              </div>
              <span><strong>Apni Rasoi</strong> — Hostel Mess Anonymous Feedback & Menu Planning</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#41733E] font-semibold">Campus Dining Intelligence</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#4F8A4C] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> DPDP & Privacy Shielded
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-18 md:bottom-5 right-5 z-50 animate-bounceIn">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold border ${
            notification.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : notification.type === 'info'
              ? 'bg-stone-900 text-white border-stone-800'
              : 'bg-[#4F8A4C] text-white border-[#40723D] shadow-[#4F8A4C]/20'
          }`}>
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            ) : notification.type === 'info' ? (
              <Info className="w-4 h-4 text-[#F4A261] flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-200 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Demo Controls Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
