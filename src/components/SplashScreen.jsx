import React, { useState, useEffect } from 'react';
import { Utensils } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show simple logo for 2 seconds (2000ms), then fade out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const finishTimer = setTimeout(() => {
        onFinish?.();
      }, 400);
      return () => clearTimeout(finishTimer);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0B0F19] flex flex-col items-center justify-center p-6 select-none transition-all duration-400 ease-out ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle Glow */}
      <div className="absolute w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Simple Brand Logo Icon */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/30 border border-emerald-300/30 mb-5 animate-bounceIn">
          <Utensils className="w-12 h-12 stroke-[2.5]" />
        </div>

        {/* Brand Name */}
        <h1 className="font-heading text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent">
          Apni Rasoi
        </h1>
        <p className="text-xs text-emerald-400/90 font-medium mt-1 tracking-widest uppercase">
          Campus Mess
        </p>
      </div>
    </div>
  );
}
