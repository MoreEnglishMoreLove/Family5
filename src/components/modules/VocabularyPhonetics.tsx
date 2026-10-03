import React, { useState } from "react";
import {
  Volume2,
  Sparkles,
  Layers,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Info
} from "lucide-react";
import { VOCABULARY_LIST, PHONETICS_PAIRS } from "../../data/curriculumData";
import { playEnglishAudio } from "../../utils/speech";

export const VocabularyPhonetics: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [phoneticsQuiz, setPhoneticsQuiz] = useState<Record<string, string>>({});
  const [showPhoneticsResult, setShowPhoneticsResult] = useState(false);

  const handleSpeak = (text: string) => {
    setSelectedWord(text);
    playEnglishAudio(text, 0.85);
  };

  const phoneticsQuizItems = [
    { word: "father", sound: "/ɑː/" },
    { word: "niece", sound: "/iː/" },
    { word: "aunt", sound: "/ɑː/" },
    { word: "piece", sound: "/iː/" },
    { word: "car", sound: "/ɑː/" },
    { word: "teacher", sound: "/iː/" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-2xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
          <span>Vocabulary & Phonetics · قاموس المفردات ومختبر الصوتيات</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          تصنيف القرابات العائلية ونطق الأصوات /ɑː/ و /iː/
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed mt-2">
          استمع للنطق الصوتي لكل كلمة، وتعرف على العلاقات بين المذكر والمؤنث والجمع، مع تدريب صوتي خاص بالتمييز بين الصوت الحلقي المفخم والصوت الممدود.
        </p>
      </div>

      {/* Vocabulary Classification Matrix */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white font-english">
              Family Relationship Matrix (جدول العلاقات العائلية)
            </h3>
            <p className="text-xs text-slate-400">
              انقر على أيقونة السماعة للاستماع الفوري للنطق الصوتي النقي لكل كلمة:
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3 px-4 text-right">المعنى العربي</th>
                <th className="py-3 px-4 text-center">المذكر (Male)</th>
                <th className="py-3 px-4 text-center">المؤنث (Female)</th>
                <th className="py-3 px-4 text-center">الجمع (Plural)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-english" dir="ltr">
              {VOCABULARY_LIST.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-sans text-right text-slate-300 font-medium" dir="rtl">
                    {row.arabic}
                  </td>

                  {/* Male */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleSpeak(row.male)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-all ${
                        selectedWord === row.male
                          ? "bg-blue-600 border-blue-400 text-white"
                          : "bg-slate-950 border-slate-800 text-blue-300 hover:border-blue-500"
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 opacity-70" />
                      <span>{row.male}</span>
                    </button>
                  </td>

                  {/* Female */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleSpeak(row.female)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-all ${
                        selectedWord === row.female
                          ? "bg-rose-600 border-rose-400 text-white"
                          : "bg-slate-950 border-slate-800 text-rose-300 hover:border-rose-500"
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 opacity-70" />
                      <span>{row.female}</span>
                    </button>
                  </td>

                  {/* Plural */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleSpeak(row.plural)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-all ${
                        selectedWord === row.plural
                          ? "bg-amber-600 border-amber-400 text-white"
                          : "bg-slate-950 border-slate-800 text-amber-300 hover:border-amber-500"
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 opacity-70" />
                      <span>{row.plural}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phonetics Lab (/ɑː/ vs /iː/) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider font-english">
              Pronunciation Lab · Unit 2 Page 9
            </span>
            <h3 className="text-lg font-bold text-white font-english">
              Phonetics: Sound Discrimination (/ɑː/ vs /iː/)
            </h3>
          </div>
        </div>

        {/* 2 Sound Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {PHONETICS_PAIRS.map((p) => (
            <div
              key={p.sound}
              className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xl font-extrabold text-blue-400 px-3 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 font-english">
                    {p.sound}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{p.tip}</span>
                </div>

                <div className="flex flex-wrap gap-2 my-4" dir="ltr">
                  {p.words.map((w) => (
                    <button
                      key={w}
                      onClick={() => handleSpeak(w)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-english font-bold text-sm flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <Volume2 className="w-4 h-4 text-blue-400" />
                      <span>{w}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Sound Discrimination Quiz */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-sm font-bold text-white">
                تحدي التمييز الصوتي: إلى أي صوت تنتمي كل كلمة؟
              </h4>
              <p className="text-[11px] text-slate-400">
                استمع للكلمة ثم اختر الرمز الصوتي المناسب لها:
              </p>
            </div>

            <button
              onClick={() => setShowPhoneticsResult(!showPhoneticsResult)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              {showPhoneticsResult ? "إخفاء التصحيح" : "فحص الإجابات"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {phoneticsQuizItems.map((item) => {
              const selected = phoneticsQuiz[item.word];
              const isCorrect = selected === item.sound;
              return (
                <div
                  key={item.word}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between"
                >
                  <button
                    onClick={() => handleSpeak(item.word)}
                    className="flex items-center gap-1.5 font-english font-bold text-white text-xs hover:text-blue-400"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item.word}</span>
                  </button>

                  <div className="flex items-center gap-1 font-mono text-xs">
                    {["/ɑː/", "/iː/"].map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          setPhoneticsQuiz({ ...phoneticsQuiz, [item.word]: s })
                        }
                        className={`px-2 py-0.5 rounded border text-[11px] transition-colors ${
                          selected === s
                            ? "bg-blue-600 text-white border-blue-500"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {showPhoneticsResult && (
                    <span className="text-[11px] font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-400">✓</span>
                      ) : (
                        <span className="text-rose-400">{item.sound}</span>
                      )}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
