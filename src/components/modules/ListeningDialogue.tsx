import React, { useState } from "react";
import {
  Volume2,
  Headphones,
  CheckCircle2,
  MessageSquare,
  Users,
  Play,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { DIALOGUE_SAMPLES } from "../../data/curriculumData";
import { playEnglishAudio } from "../../utils/speech";

export const ListeningDialogue: React.FC = () => {
  // Nina listening tick state
  const ninaMembers = [
    { id: "father", label: "Father", isPresent: true },
    { id: "mother", label: "Mother", isPresent: true },
    { id: "sister", label: "Sister", isPresent: true },
    { id: "brother", label: "Brother", isPresent: true },
    { id: "grandfather", label: "Grandfather", isPresent: true },
    { id: "grandmother", label: "Grandmother", isPresent: true },
    { id: "husband", label: "Husband", isPresent: true },
    { id: "uncle", label: "Uncle", isPresent: true },
    { id: "aunt", label: "Aunt", isPresent: true },
    { id: "wife", label: "Wife", isPresent: true },
    { id: "cousin", label: "Cousin", isPresent: true },
    { id: "daughter", label: "Daughter", isPresent: false },
    { id: "niece", label: "Niece", isPresent: false },
    { id: "son", label: "Son", isPresent: false }
  ];

  const [tickedMembers, setTickedMembers] = useState<Record<string, boolean>>({});
  const [showNinaCheck, setShowNinaCheck] = useState(false);

  // Nina matching state
  const [ninaMatches, setNinaMatches] = useState<Record<string, string>>({
    sue: "",
    ben: "",
    john_lucy: "",
    clark: ""
  });
  const [showMatchSolution, setShowMatchSolution] = useState(false);

  // Classroom interview simulator state
  const [interviewees, setInterviewees] = useState([
    { name: "Tariq", size: "Big (6 members)", brothers: "2 brothers", sisters: "1 sister" },
    { name: "Lina", size: "Small (3 members)", brothers: "None (Only child)", sisters: "None" },
    { name: "Omar", size: "Medium (4 members)", brothers: "1 brother", sisters: "None" }
  ]);

  const handleNinaStoryAudio = () => {
    const audioText = `This is my family. My name is Nina. Sue is my mother and Clark is my father, he is Sue's husband. My brother is Marc, and Ben is Clark's brother, so Ben is my uncle. My grandparents are John and Lucy. We love spending time together!`;
    playEnglishAudio(audioText, 0.82);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-2xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
          <span>Listening & Speaking Lab · مختبر الاستماع والمحادثة</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          الاستماع لعائلة Nina وتدريب المحادثة الصفية
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed mt-2">
          تدريبات الاستماع المباشر من كتاب النشاط (الصفحة 9 و 10)، محاكاة صوتية لعائلة نينا، ومحاكي تفاعلي لإجراء المقابلات الصفية باللغة الإنجليزية.
        </p>
      </div>

      {/* Nina Listening Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider font-english">
              1. Listen to Nina and her family and tick
            </span>
            <h3 className="text-lg font-bold text-white font-english">
              Nina's Family Listening Activity (Page 9)
            </h3>
            <p className="text-xs text-slate-400">
              استمع للمقطع الصوتي ثم ضع إشارة (✓) أمام أفراد العائلة المذكورين:
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNinaStoryAudio}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-900/40"
            >
              <Volume2 className="w-4 h-4" />
              <span>تشغيل صوت Nina</span>
            </button>
            <button
              onClick={() => setShowNinaCheck(!showNinaCheck)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
            >
              {showNinaCheck ? "إخفاء الحل" : "فحص الإجابات"}
            </button>
          </div>
        </div>

        {/* Members Tick Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6">
          {ninaMembers.map((m) => {
            const isTicked = !!tickedMembers[m.id];
            return (
              <button
                key={m.id}
                onClick={() =>
                  setTickedMembers({ ...tickedMembers, [m.id]: !isTicked })
                }
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isTicked
                    ? "bg-blue-600/30 border-blue-500 text-white"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                    isTicked ? "bg-blue-600 border-blue-400 text-white" : "border-slate-700"
                  }`}
                >
                  {isTicked && <span className="text-xs font-bold">✓</span>}
                </div>
                <span className="font-english text-xs font-bold">{m.label}</span>
                {showNinaCheck && (
                  <span className={`text-[10px] ${m.isPresent ? "text-emerald-400" : "text-rose-400"}`}>
                    {m.isPresent ? "موجود" : "غير موجود"}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Task 2: Listen again and match */}
        <div className="pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider font-english">
                2. Listen again and match
              </span>
              <h4 className="text-sm font-bold text-white">
                طابق بين أسماء الأشخاص وصلات قرابتهم:
              </h4>
            </div>

            <button
              onClick={() => setShowMatchSolution(!showMatchSolution)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              {showMatchSolution ? "إخفاء الحل" : "عرض الحل النموذجي"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: "sue", label: "Sue is Nina's ...", answer: "mother" },
              { id: "ben", label: "Ben is Clark's ...", answer: "brother" },
              { id: "john_lucy", label: "John and Lucy are Nina's ...", answer: "grandparents" },
              { id: "clark", label: "Clark is Sue's ...", answer: "husband" }
            ].map((match) => (
              <div key={match.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-english text-xs font-bold text-white block mb-2" dir="ltr">
                  {match.label}
                </span>
                <select
                  value={ninaMatches[match.id]}
                  onChange={(e) =>
                    setNinaMatches({ ...ninaMatches, [match.id]: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none font-english"
                  dir="ltr"
                >
                  <option value="">اختر القرابة...</option>
                  <option value="mother">mother</option>
                  <option value="brother">brother</option>
                  <option value="grandparents">grandparents</option>
                  <option value="husband">husband</option>
                  <option value="son">son</option>
                </select>
                {showMatchSolution && (
                  <span className="block text-[11px] text-emerald-400 font-bold mt-2">
                    الحل: {match.answer}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Speaking: Ask and Answer Dialogue */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider font-english">
              3. Ask and Answer
            </span>
            <h3 className="text-lg font-bold text-white">
              نماذج المحادثة اليومية حول العائلة والإخوة
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DIALOGUE_SAMPLES.map((d, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-blue-400 block">
                  {d.speaker}:
                </span>
                <p className="font-english font-bold text-white text-sm" dir="ltr">
                  "{d.textEn}"
                </p>
                <p className="text-xs text-slate-400">
                  {d.textAr}
                </p>
              </div>

              <button
                onClick={() => playEnglishAudio(d.textEn)}
                className="p-2 rounded-lg bg-slate-900 text-blue-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="استماع للنطق"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Classroom Interview Simulator from Page 10 */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex items-center gap-2.5 mb-4">
          <Users className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-lg font-bold text-white">
              محاكي المقابلة الصفية (Interview Three Pupils)
            </h3>
            <p className="text-xs text-slate-400">
              قم بسؤال زملائك باللغة الإنجليزية ودون إجاباتهم في الجدول:
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold font-english" dir="ltr">
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Family Size</th>
                <th className="py-2.5 px-3">Brother / Brothers</th>
                <th className="py-2.5 px-3">Sister / Sisters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-english" dir="ltr">
              {interviewees.map((pupil, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-bold text-white">
                    <input
                      type="text"
                      value={pupil.name}
                      onChange={(e) => {
                        const copy = [...interviewees];
                        copy[idx].name = e.target.value;
                        setInterviewees(copy);
                      }}
                      className="bg-transparent border-b border-slate-700 focus:border-blue-500 outline-none w-full"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    <input
                      type="text"
                      value={pupil.size}
                      onChange={(e) => {
                        const copy = [...interviewees];
                        copy[idx].size = e.target.value;
                        setInterviewees(copy);
                      }}
                      className="bg-transparent border-b border-slate-700 focus:border-blue-500 outline-none w-full"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    <input
                      type="text"
                      value={pupil.brothers}
                      onChange={(e) => {
                        const copy = [...interviewees];
                        copy[idx].brothers = e.target.value;
                        setInterviewees(copy);
                      }}
                      className="bg-transparent border-b border-slate-700 focus:border-blue-500 outline-none w-full"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    <input
                      type="text"
                      value={pupil.sisters}
                      onChange={(e) => {
                        const copy = [...interviewees];
                        copy[idx].sisters = e.target.value;
                        setInterviewees(copy);
                      }}
                      className="bg-transparent border-b border-slate-700 focus:border-blue-500 outline-none w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
