import React, { useState } from "react";
import {
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  HelpCircle,
  Star,
  ChevronRight
} from "lucide-react";
import { playEnglishAudio } from "../../utils/speech";

interface QuizItem {
  id: string;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

const QUIZ_ITEMS: QuizItem[] = [
  {
    id: "q1",
    question: "My mother (work / works) as a teacher in a school.",
    options: ["work", "works"],
    correct: "works",
    explanation: "مع الفاعل المفرد الغائب (She / My mother) نضيف s الشخص الثالث للفعل في الحاضر البسيط."
  },
  {
    id: "q2",
    question: "She can (cook / cooks) very well.",
    options: ["cook", "cooks"],
    correct: "cook",
    explanation: "بعد الفعل المساعد can يأتي الفعل بالمصدر المجرد دون أي إضافة."
  },
  {
    id: "q3",
    question: "My sister's son is my ...",
    options: ["nephew", "niece", "cousin", "uncle"],
    correct: "nephew",
    explanation: "ابن الأخ أو الأخت هو nephew (بينما البنت هي niece)."
  },
  {
    id: "q4",
    question: "What is the plural of 'child'?",
    options: ["children", "childs", "childrens", "childes"],
    correct: "children",
    explanation: "child جمعها شاذ تماماً ويصبح children."
  },
  {
    id: "q5",
    question: "The (pupils / uniform) is blue. Which possessive form is correct?",
    options: ["pupils'", "pupil's", "pupilss'", "pupils's"],
    correct: "pupils'",
    explanation: "لأن كلمة pupils جمع ينتهي بحرف s، نضع فقط الفاصلة العليا بعد حرف الـ s."
  },
  {
    id: "q6",
    question: "Those are the (children / toys). Which form is correct?",
    options: ["children's toys", "childrens' toys", "children toys'"],
    correct: "children's toys",
    explanation: "children جمع شاذ لا ينتهي بحرف s، لذا نضيف له 's كالمفرد تماماً."
  },
  {
    id: "q7",
    question: "Cross the odd word out: (niece / nephew / friend / cousin)",
    options: ["friend", "niece", "nephew", "cousin"],
    correct: "friend",
    explanation: "friend تعني صديق، بينما باقي الكلمات هي صلات قرابة عائلية."
  },
  {
    id: "q8",
    question: "What is the plural of 'wife'?",
    options: ["wives", "wifes", "wive", "wifess"],
    correct: "wives",
    explanation: "الأسماء المنتهية بـ fe مثل wife تقلب إلى ves في الجمع فتصبح wives."
  },
  {
    id: "q9",
    question: "Which word contains the long /iː/ vowel sound?",
    options: ["niece", "father", "car", "aunt"],
    correct: "niece",
    explanation: "كلمة niece تحتوي على الصوت الممدود /iː/ كما في piece."
  },
  {
    id: "q10",
    question: "My mother is my father's ...",
    options: ["wife", "sister", "aunt", "daughter"],
    correct: "wife",
    explanation: "الأم هي زوجة الأب (wife)."
  }
];

export const SmartQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_ITEMS[currentIndex];

  const handleSelectOption = (opt: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: opt });
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_ITEMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
  };

  // Calculate score
  const score = QUIZ_ITEMS.filter(
    (q) => selectedAnswers[q.id] === q.correct
  ).length;

  const percentage = Math.round((score / QUIZ_ITEMS.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-2xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
          <span>Smart Star Challenge · الاختبار الذكي وتحدي النجوم</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          اختبار التقييم الشامل للوحدة الثانية (Unit 2 Mastery)
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed mt-2">
          10 أسئلة متكاملة تغطي كافة جوانب الوحدة: القواعد، معاني المفردات، الجموع الشاذة، والصوتيات مع نتيجة فورية وتقييم خاص من المعلمة جيداء صقر.
        </p>
      </div>

      {!isFinished ? (
        /* Active Question Card */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-3xl mx-auto">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-english">
              Question {currentIndex + 1} of {QUIZ_ITEMS.length}
            </span>
            <div className="flex items-center gap-1">
              {QUIZ_ITEMS.map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-blue-500 w-8"
                      : i < currentIndex
                      ? "bg-emerald-500"
                      : "bg-slate-800"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <h3
              className="text-lg sm:text-xl font-bold text-white font-english leading-relaxed"
              dir="ltr"
            >
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswers[currentQ.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-xl border text-sm font-english font-bold transition-all text-center ${
                    isSelected
                      ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/40 scale-[1.02]"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800"
                  }`}
                  dir="ltr"
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-500">
              {selectedAnswers[currentQ.id]
                ? "تم تحديد إجابة"
                : "يرجى اختيار إجابة للمتابعة"}
            </div>

            <button
              onClick={handleNext}
              disabled={!selectedAnswers[currentQ.id]}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs rounded-xl transition-all shadow-md"
            >
              <span>{currentIndex === QUIZ_ITEMS.length - 1 ? "إنهاء الاختبار" : "السؤال التالي"}</span>
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white mb-1">
              نتيجة الاختبار الذكي
            </h3>
            <p className="text-xs text-slate-400">
              تقييم أداء الطالب في منهاج MORE ENGLISH MORE LOVE
            </p>
          </div>

          {/* Score Badge */}
          <div className="inline-block p-6 rounded-2xl bg-slate-950 border border-blue-500/30">
            <div className="text-4xl font-extrabold text-blue-400 font-mono mb-1">
              {score} / {QUIZ_ITEMS.length}
            </div>
            <div className="text-sm font-semibold text-slate-300">
              النسبة المئوية: <span className="text-amber-400 font-bold">{percentage}%</span>
            </div>
            <div className="flex justify-center gap-1 mt-2 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(percentage / 20) ? "fill-amber-400" : "opacity-30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Teacher Recommendation Message */}
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-slate-200 text-right leading-relaxed">
            <strong className="text-amber-400 block mb-1">رسالة المعلمة جيداء صقر:</strong>
            {percentage >= 80 ? (
              <span>
                "مبارك تفوقك الباهر يا بطل! أظهرت فهماً استثنائياً لكافة قواعد الوحدة ومفرداتها. استمر في هذا التألق، فأنت على الطريق الصحيح للتميز في اللغة الإنجليزية!"
              </span>
            ) : percentage >= 50 ? (
              <span>
                "أحسنت جهداً طيباً! نتيجتك جيدة وتستطيع تحقيق العلامة الكاملة بمراجعة أوراق العمل السبعة وحلولها النموذجية في القسم الأخير من المنهاج."
              </span>
            ) : (
              <span>
                "بداية جيدة ومحاولة شجاعة! أنصحك بالاستماع مجدداً للقصص الصوتية وتفقد قسم القواعد وأوراق العمل لتعزيز مستواك والوصول للقمة."
              </span>
            )}
          </div>

          {/* Action */}
          <div className="flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار من جديد</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
