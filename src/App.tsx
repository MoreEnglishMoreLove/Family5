/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { LockScreen } from "./components/LockScreen";
import { CurriculumHeader } from "./components/CurriculumHeader";
import { TeacherDashboardModal } from "./components/TeacherDashboardModal";

// 7 Interactive Modules
import { Unit2FamilyBook } from "./components/modules/Unit2FamilyBook";
import { GrammarMastery } from "./components/modules/GrammarMastery";
import { VocabularyPhonetics } from "./components/modules/VocabularyPhonetics";
import { ListeningDialogue } from "./components/modules/ListeningDialogue";
import { ReadingWritingStudio } from "./components/modules/ReadingWritingStudio";
import { SmartQuiz } from "./components/modules/SmartQuiz";
import { CurriculumWorksheets } from "./components/modules/CurriculumWorksheets";

import {
  getStudentActivation,
  clearStudentActivation,
  saveStudentActivation,
  StudentActivation
} from "./utils/cryptoAuth";

export default function App() {
  const [session, setSession] = useState<StudentActivation | null>(null);
  const [isTeacherPortalOpen, setIsTeacherPortalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Check saved student activation on mount
  useEffect(() => {
    const { session: storedSession, isExpired } = getStudentActivation();
    if (storedSession && !isExpired) {
      setSession(storedSession);
    } else if (isExpired) {
      clearStudentActivation();
      setSession(null);
    }
    setIsLoadingAuth(false);
  }, []);

  const handleSuccessActivation = (studentName: string, code: string) => {
    const newSession = saveStudentActivation(studentName, code);
    setSession(newSession);
    setActiveTab(1);
  };

  const handleEnterAsTeacher = (teacherName: string, code: string) => {
    const teacherSession = saveStudentActivation(teacherName, code);
    setSession(teacherSession);
    setIsTeacherPortalOpen(false);
    setActiveTab(1);
  };

  const handleLogout = () => {
    clearStudentActivation();
    setSession(null);
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs">جاري التحقق من التفعيل...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* If not activated or expired -> Show Lock Screen */}
      {!session ? (
        <LockScreen
          onSuccessActivation={handleSuccessActivation}
          onOpenTeacherPortal={() => setIsTeacherPortalOpen(true)}
        />
      ) : (
        /* Inside Curriculum */
        <div className="flex-1 flex flex-col">
          <CurriculumHeader
            session={session}
            onLogout={handleLogout}
            onOpenTeacherPortal={() => setIsTeacherPortalOpen(true)}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />

          {/* Main Curriculum Canvas */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
            {activeTab === 1 && <Unit2FamilyBook />}
            {activeTab === 2 && <GrammarMastery />}
            {activeTab === 3 && <VocabularyPhonetics />}
            {activeTab === 4 && <ListeningDialogue />}
            {activeTab === 5 && <ReadingWritingStudio />}
            {activeTab === 6 && <SmartQuiz />}
            {activeTab === 7 && <CurriculumWorksheets />}
          </main>

          {/* Footer */}
          <footer className="w-full border-t border-slate-800 bg-slate-950/80 py-6 text-center text-xs text-slate-500 no-print">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-300 font-english">MORE ENGLISH MORE LOVE</span>
                <span> — منهاج اللغة الإنجليزية التفاعلي المعتمد</span>
              </div>
              <div>
                إشراف وتدريس: <strong className="text-blue-400">المعلمة جيداء صقر</strong> (هاتف: +963 933 036 079)
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Teacher Dashboard Modal (Accessible from anywhere) */}
      <TeacherDashboardModal
        isOpen={isTeacherPortalOpen}
        onClose={() => setIsTeacherPortalOpen(false)}
        onEnterAsTeacher={handleEnterAsTeacher}
      />
    </div>
  );
}
