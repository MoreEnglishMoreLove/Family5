import React, { useState, useEffect } from "react";
import {
  Clock,
  LogOut,
  Phone,
  Shield,
  BookOpen,
  Calendar,
  AlertTriangle
} from "lucide-react";
import {
  StudentActivation,
  clearStudentActivation,
  TEACHER_DISPLAY_PHONE,
  getStudentWhatsAppHelpUrl
} from "../utils/cryptoAuth";

interface CurriculumHeaderProps {
  session: StudentActivation;
  onLogout: () => void;
  onOpenTeacherPortal: () => void;
  activeTab: number;
  onSelectTab: (tabId: number) => void;
}

export const CurriculumHeader: React.FC<CurriculumHeaderProps> = ({
  session,
  onLogout,
  onOpenTeacherPortal,
  activeTab,
  onSelectTab
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ days: 180, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const diff = session.expiresAt - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        clearStudentActivation();
        onLogout();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [session, onLogout]);

  const navTabs = [
    { id: 1, label: "كتاب العائلة (Unit 2)", shortLabel: "كتاب العائلة" },
    { id: 2, label: "القواعد والتركيب", shortLabel: "القواعد" },
    { id: 3, label: "المفردات والصوتيات", shortLabel: "الصوتيات" },
    { id: 4, label: "المحادثة والاستماع", shortLabel: "المحادثة" },
    { id: 5, label: "مختبر القراءة والكتابة", shortLabel: "القراءة" },
    { id: 6, label: "الاختبار الذكي", shortLabel: "الاختبار" },
    { id: 7, label: "أوراق العمل (7 Worksheets)", shortLabel: "أوراق العمل ⭐", highlight: true }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 no-print">
      {/* Expiration Countdown Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-900/40 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">حساب الطالب مفعّل:</span>
            <span className="text-blue-300 font-bold">{session.studentName}</span>
            <span className="hidden sm:inline text-slate-500 font-mono text-[11px]" dir="ltr">
              [{session.code}]
            </span>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 px-3 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 text-[11px]">متبقي للاشتراك (6 أشهر):</span>
            <span className="font-mono font-bold text-amber-300 tabular-nums text-xs" dir="ltr">
              {timeLeft.days}d {String(timeLeft.hours).padStart(2, "0")}h:
              {String(timeLeft.minutes).padStart(2, "0")}m:
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={getStudentWhatsAppHelpUrl(session.studentName)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden md:inline">تواصل المعلمة:</span>
              <span>{TEACHER_DISPLAY_PHONE}</span>
            </a>
            <button
              onClick={onLogout}
              className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
              title="قفل التطبيق وتسجيل الخروج"
            >
              <LogOut className="w-3 h-3" />
              <span>قفل</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-900/40">
            ML
          </div>
          <div>
            <div className="text-sm font-bold text-white font-english tracking-tight flex items-center gap-1.5">
              <span>MORE ENGLISH MORE LOVE</span>
            </div>
            <div className="text-[11px] text-slate-400">
              إشراف وتدريس: <span className="text-blue-400 font-semibold">جيداء صقر</span>
            </div>
          </div>
        </div>

        {/* 7 Curriculum Tabs Navigation */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? tab.highlight
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : tab.highlight
                    ? "bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenTeacherPortal}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">بوابة المعلمة</span>
          </button>
        </div>
      </div>

      {/* Mobile Tabs Scrollable Sub-bar */}
      <div className="lg:hidden px-3 py-2 border-t border-slate-800/80 bg-slate-900/60 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? tab.highlight
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "bg-blue-600 text-white font-bold"
                  : "bg-slate-950 text-slate-400 hover:text-white"
              }`}
            >
              {tab.shortLabel}
            </button>
          );
        })}
      </div>
    </header>
  );
};
