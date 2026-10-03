import React, { useState } from "react";
import {
  FileText,
  Printer,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Share2
} from "lucide-react";
import { CURRICULUM_WORKSHEETS, WorksheetData } from "../../data/curriculumData";

export const CurriculumWorksheets: React.FC = () => {
  const [activeWorksheetId, setActiveWorksheetId] = useState<number>(1);
  const [showModelSolutions, setShowModelSolutions] = useState<Record<number, boolean>>({});
  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>({});

  const currentWorksheet =
    CURRICULUM_WORKSHEETS.find((w) => w.id === activeWorksheetId) ||
    CURRICULUM_WORKSHEETS[0];

  const isModelSolutionVisible = !!showModelSolutions[currentWorksheet.id];

  const toggleModelSolution = (id: number) => {
    setShowModelSolutions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-blue-950 border border-amber-500/40 rounded-2xl p-6 sm:p-8 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>القسم السابع والأخير · أوراق العمل الشاملة والحلول النموذجية</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          أوراق عمل المنهاج والحلول النموذجية (7 Curriculum Worksheets)
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed mt-2">
          سبع أوراق عمل تفاعلية تغطي كافة دروس الوحدة الثانية (صفحات 8، 9، 10، 11) مع إمكانية الحل التفاعلي، استعراض الحلول النموذجية المعتمدة من المعلمة جيداء صقر، والطباعة المباشرة.
        </p>
      </div>

      {/* 7 Worksheets Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 no-print">
        {CURRICULUM_WORKSHEETS.map((ws) => {
          const isActive = ws.id === activeWorksheetId;
          return (
            <button
              key={ws.id}
              onClick={() => setActiveWorksheetId(ws.id)}
              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between gap-2 ${
                isActive
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 font-bold"
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono uppercase tracking-wider font-english">
                  WS #{ws.id}
                </span>
                <FileText className="w-3.5 h-3.5 opacity-80" />
              </div>
              <div className="text-xs line-clamp-2 leading-tight">
                {ws.title.replace(/ورقة العمل \d: /, "")}
              </div>
              <div className="text-[10px] opacity-75">{ws.pageRef}</div>
            </button>
          );
        })}
      </div>

      {/* Active Worksheet Display */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Printable/Display Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800 print:border-black/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 print:text-black print:border-black">
                {currentWorksheet.pageRef}
              </span>
              <span className="text-xs text-slate-400 print:text-slate-600 font-english">
                MORE ENGLISH MORE LOVE · Unit 2
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white print:text-black">
              {currentWorksheet.title}
            </h3>
            <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
              {currentWorksheet.description}
            </p>
          </div>

          {/* Action buttons (hidden on print) */}
          <div className="flex items-center gap-2 shrink-0 no-print">
            <button
              onClick={() => toggleModelSolution(currentWorksheet.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isModelSolutionVisible
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30"
              }`}
            >
              {isModelSolutionVisible ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>إخفاء الحل النموذجي</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>عرض الحل النموذجي للمعلمة جيداء</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-md shadow-blue-900/30"
              title="طباعة ورقة العمل للحل الورقي"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة ورقة العمل</span>
            </button>
          </div>
        </div>

        {/* Worksheet Student Info Box (For Print) */}
        <div className="hidden print:flex items-center justify-between border-b border-black/20 pb-4 mb-6 text-xs text-black">
          <div>اسم الطالب: ....................................................</div>
          <div>التاريخ: ...... / ...... / {new Date().getFullYear()}</div>
          <div>إشراف: المعلمة جيداء صقر</div>
        </div>

        {/* Tasks Section */}
        <div className="space-y-8">
          {currentWorksheet.tasks.map((task, tIdx) => (
            <div
              key={tIdx}
              className="space-y-4 p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 print:bg-white print:border-black/20 print:p-2"
            >
              <div className="border-b border-slate-800/80 pb-3 print:border-black/20">
                <div className="font-english font-bold text-sm text-white print:text-black" dir="ltr">
                  {task.instructions}
                </div>
                <div className="text-xs text-slate-400 print:text-slate-600 mt-0.5">
                  {task.instructionsAr}
                </div>
              </div>

              {/* Task Items */}
              <div className="space-y-3">
                {task.items.map((item, iIdx) => {
                  const userVal = studentAnswers[item.id] || "";
                  const isAnswered = !!userVal;
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 print:bg-white print:border-black/20"
                    >
                      <div className="flex-1">
                        <div className="font-english font-semibold text-xs sm:text-sm text-white print:text-black" dir="ltr">
                          {item.prompt}
                        </div>
                        {item.promptAr && (
                          <div className="text-[11px] text-slate-400 print:text-slate-600 mt-0.5">
                            {item.promptAr}
                          </div>
                        )}
                      </div>

                      {/* Interactive Controls according to type */}
                      {task.type === "choice" && item.options && (
                        <div className="flex flex-wrap items-center gap-1.5 shrink-0 no-print" dir="ltr">
                          {item.options.map((opt) => {
                            const isSelected = userVal === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() =>
                                  setStudentAnswers({ ...studentAnswers, [item.id]: opt })
                                }
                                className={`px-2.5 py-1 text-xs font-bold rounded border font-english transition-all ${
                                  isSelected
                                    ? "bg-blue-600 border-blue-400 text-white"
                                    : "bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {task.type === "true_false" && (
                        <div className="flex items-center gap-1.5 shrink-0 no-print">
                          {["True", "False"].map((tf) => (
                            <button
                              key={tf}
                              onClick={() =>
                                setStudentAnswers({ ...studentAnswers, [item.id]: tf })
                              }
                              className={`px-3 py-1 text-xs font-bold rounded border transition-all ${
                                userVal === tf
                                  ? "bg-blue-600 border-blue-400 text-white"
                                  : "bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800"
                              }`}
                            >
                              {tf}
                            </button>
                          ))}
                        </div>
                      )}

                      {(task.type === "fill" || task.type === "text") && (
                        <div className="w-full md:w-56 shrink-0 no-print" dir="ltr">
                          <input
                            type="text"
                            placeholder={item.userAnswerPlaceholder || "اكتب إجابتك هنا..."}
                            value={userVal}
                            onChange={(e) =>
                              setStudentAnswers({ ...studentAnswers, [item.id]: e.target.value })
                            }
                            className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded px-2.5 py-1 text-xs text-white outline-none font-english"
                          />
                        </div>
                      )}

                      {/* Line for printout */}
                      <div className="hidden print:block w-32 border-b border-black text-center text-xs font-mono">
                        {isModelSolutionVisible ? item.correctAnswer : ""}
                      </div>

                      {/* Official Teacher Model Answer Display */}
                      {isModelSolutionVisible && (
                        <div className="w-full p-2.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-2 animate-in fade-in duration-150">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">الحل النموذجي: </span>
                            <span className="font-english font-bold text-white underline ml-1" dir="ltr">
                              {item.correctAnswer}
                            </span>
                            {item.teacherNote && (
                              <span className="text-slate-300 block text-[11px] mt-0.5">
                                · ملاحظة المعلمة: {item.teacherNote}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer of Worksheet */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 print:text-black">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>منهاج MORE ENGLISH MORE LOVE — إعداد وتدريس المعلمة جيداء صقر</span>
          </div>
          <div className="no-print">
            <span className="text-[11px] text-slate-500">
              ورقة عمل تفاعلية معتمدة لدعم الطلاب والتفوق في الامتحانات
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
