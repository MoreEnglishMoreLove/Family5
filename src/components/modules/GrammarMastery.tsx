import React, { useState } from "react";
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { POSSESSIVE_EXERCISES } from "../../data/curriculumData";
import { playEnglishAudio } from "../../utils/speech";

export const GrammarMastery: React.FC = () => {
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [checkedResults, setCheckedResults] = useState<Record<string, boolean>>({});
  const [showAllSolutions, setShowAllSolutions] = useState(false);

  const checkSingle = (id: string, expected: string) => {
    const current = (userInputs[id] || "").trim().toLowerCase();
    const exp = expected.trim().toLowerCase();
    setCheckedResults((prev) => ({ ...prev, [id]: current === exp }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-2xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
          <span>Grammar Mastery · القواعد النحوية الشاملة</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          قواعد الملكية Possessive ('s & ') وأزمنة الأفعال
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed mt-2">
          شرح تفصيلي لقاعدة صياغة الفاصلة العليا للملكية مع المفرد والجمع النظامي والجمع الشاذ وأسماء العلم، مع تدريبات تفاعلية وحلول فورية معتمدة من المعلمة جيداء صقر.
        </p>
      </div>

      {/* LET'S LEARN Box from Page 11 */}
      <div className="bg-slate-900/90 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest font-english">
                Curriculum Focus · Page 11
              </span>
              <h3 className="text-lg font-bold text-white font-english">
                LET'S LEARN: The Possessive ('s / ')
              </h3>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars from textbook */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Lara's uncle */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between">
            <div>
              <div className="text-xs text-blue-400 font-semibold mb-1">
                1. المفرد العادي (Singular noun)
              </div>
              <div className="font-english text-base font-bold text-white flex items-center gap-2" dir="ltr">
                <span>He is</span>
                <span className="text-amber-400 underline decoration-amber-400/50">Lara's uncle</span>.
              </div>
              <p className="text-xs text-slate-400 mt-1">
                نضيف ('s) بعد الاسم المفرد لبيان ملكيته أو قرابته (عم لارا).
              </p>
            </div>
            <button
              onClick={() => playEnglishAudio("He is Lara's uncle.")}
              className="p-2 text-slate-400 hover:text-white"
            >
              <Volume2 className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          {/* Card 2: Charles's mother */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between">
            <div>
              <div className="text-xs text-blue-400 font-semibold mb-1">
                2. اسم علم ينتهي بحرف s (Singular ending in s)
              </div>
              <div className="font-english text-base font-bold text-white flex items-center gap-2" dir="ltr">
                <span>She is</span>
                <span className="text-amber-400 underline decoration-amber-400/50">Charles's mother</span>.
              </div>
              <p className="text-xs text-slate-400 mt-1">
                مع الأسماء المفردة المنتهية بـ s نضيف ('s) أو الفاصلة وحدها (Charles' / Charles's).
              </p>
            </div>
            <button
              onClick={() => playEnglishAudio("She is Charles's mother.")}
              className="p-2 text-slate-400 hover:text-white"
            >
              <Volume2 className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          {/* Card 3: children's toys */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between">
            <div>
              <div className="text-xs text-blue-400 font-semibold mb-1">
                3. جمع شاذ لا ينتهي بـ s (Irregular Plural)
              </div>
              <div className="font-english text-base font-bold text-white flex items-center gap-2" dir="ltr">
                <span>Those are the</span>
                <span className="text-amber-400 underline decoration-amber-400/50">children's toys</span>.
              </div>
              <p className="text-xs text-slate-400 mt-1">
                يعامل معاملة المفرد ونضيف له ('s) لأن الكلمة لا تنتهي بحرف s أصلاً (ألعاب الأطفال).
              </p>
            </div>
            <button
              onClick={() => playEnglishAudio("Those are the children's toys.")}
              className="p-2 text-slate-400 hover:text-white"
            >
              <Volume2 className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          {/* Card 4: students' books */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between">
            <div>
              <div className="text-xs text-blue-400 font-semibold mb-1">
                4. جمع نظامي ينتهي بحرف s (Regular Plural ending in s)
              </div>
              <div className="font-english text-base font-bold text-white flex items-center gap-2" dir="ltr">
                <span>These are the</span>
                <span className="text-amber-400 underline decoration-amber-400/50">students' books</span>.
              </div>
              <p className="text-xs text-slate-400 mt-1">
                نكتفي بوضع الفاصلة العليا (') بعد الـ s مباشرة لمنع تكرار حرف الـ s (كتب الطلاب).
              </p>
            </div>
            <button
              onClick={() => playEnglishAudio("These are the students' books.")}
              className="p-2 text-slate-400 hover:text-white"
            >
              <Volume2 className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Possessive Practice Exercises from Page 11 */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white font-english">
              Interactive Possessive Practice (تطبيق تفاعلي فوري)
            </h3>
            <p className="text-xs text-slate-400">
              أعد كتابة العبارات بين القوسين بصيغة الملكية الصحيحة:
            </p>
          </div>

          <button
            onClick={() => setShowAllSolutions(!showAllSolutions)}
            className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-lg hover:bg-blue-500/20 transition-colors"
          >
            {showAllSolutions ? "إخفاء الحلول النموذجية" : "عرض الحلول النموذجية المعتمدة"}
          </button>
        </div>

        <div className="space-y-4">
          {POSSESSIVE_EXERCISES.map((ex) => {
            const isCorrect = checkedResults[ex.id];
            return (
              <div
                key={ex.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="font-english text-sm font-semibold text-slate-200" dir="ltr">
                    {ex.base}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    القاعدة: {ex.rule}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto" dir="ltr">
                  <input
                    type="text"
                    placeholder="e.g. my aunt's house"
                    value={userInputs[ex.id] || ""}
                    onChange={(e) =>
                      setUserInputs({ ...userInputs, [ex.id]: e.target.value })
                    }
                    className="flex-1 md:w-56 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-english outline-none"
                  />

                  <button
                    onClick={() => checkSingle(ex.id, ex.answer)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
                  >
                    فحص
                  </button>

                  <button
                    onClick={() => playEnglishAudio(ex.answer)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Volume2 className="w-4 h-4 text-blue-400" />
                  </button>
                </div>

                {/* Feedback */}
                {(isCorrect !== undefined || showAllSolutions) && (
                  <div className="w-full text-xs pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className={isCorrect ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                      {isCorrect ? "✓ إجابة ممتازة وصحيحة!" : `الحل الصحيح: ${ex.answer}`}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Grammar Rule: Present Simple & Have got */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-3">
          قواعد إضافية من الوحدة الثانية (Present Simple & Have Got)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-bold text-blue-400 block mb-1">1. الملكية بـ have/has got:</span>
            <p className="text-slate-300 leading-relaxed">
              - I / We / You / They + <strong className="text-white">have got</strong> (I've got one brother).
              <br />
              - He / She / It + <strong className="text-white">has got</strong> (She has got short brown hair).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-bold text-blue-400 block mb-1">2. الحاضر البسيط مع المفرد:</span>
            <p className="text-slate-300 leading-relaxed">
              نضيف s أو es للفعل مع الفاعل المفرد الغائب:
              <br />
              - She <strong className="text-white">works</strong> as a teacher.
              <br />
              - She <strong className="text-white">cooks</strong> very well.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-bold text-blue-400 block mb-1">3. الفعل مع CAN:</span>
            <p className="text-slate-300 leading-relaxed">
              بعد فعل الاستطاعة CAN يكون الفعل دائماً في المصدر المجرد:
              <br />
              - She can <strong className="text-white">cook</strong> (وليس cooks).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
