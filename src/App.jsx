import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
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
  Smartphone,
  Utensils
} from 'lucide-react';

export default function App() {
  const { activeRole, isMobileFrameView, notification } = useApp();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navbar & Role Switcher */}
      <Navbar onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* Main Role Content View */}
      <main className="flex-1 py-4 sm:py-6">
        {activeRole === 'student' && (
          isMobileFrameView ? (
            <div className="py-4 px-2 flex flex-col items-center justify-center">
              <div className="text-xs text-slate-500 mb-2 font-medium flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulating Mobile Device Viewport (&lt;10s Flow)</span>
              </div>
              <div className="mobile-device-frame w-full">
                <div className="mobile-notch"></div>
                <div className="pt-8 pb-4 max-h-[85vh] overflow-y-auto bg-slate-50">
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

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounceIn">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-xs font-semibold border ${
            notification.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : notification.type === 'info'
              ? 'bg-slate-900 text-white border-slate-800'
              : 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/20'
          }`}>
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            ) : notification.type === 'info' ? (
              <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
              AR
            </div>
            <span><strong>Apni Rasoi</strong> — Hostel Mess Management & Anonymous Feedback Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-800 font-semibold">Hostel Dining Intelligence</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> DPDP & Privacy Protected
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
