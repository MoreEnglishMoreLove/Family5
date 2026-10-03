import React, { useState } from "react";
import {
  Volume2,
  VolumeX,
  CheckCircle,
  HelpCircle,
  Sparkles,
  RefreshCw,
  BookOpen,
  ArrowRight,
  Info
} from "lucide-react";
import {
  UNIT_2_READING,
  CHOOSE_CORRECT_PAGE8,
  ODD_ONE_OUT_PAGE8,
  GUESS_WHO_RIDDLES,
  IRREGULAR_PLURALS
} from "../../data/curriculumData";
import { playEnglishAudio, stopEnglishAudio } from "../../utils/speech";
import familyIllustration from "../../assets/images/family_textbook_art_1790998058480.jpg";

export const Unit2FamilyBook: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showArabicTranslation, setShowArabicTranslation] = useState(false);

  // Task a: Choose correct word state
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});
  const [showChoiceResults, setShowChoiceResults] = useState(false);

  // Task b: Odd one out state
  const [oddSelected, setOddSelected] = useState<Record<string, string>>({});
  const [showOddResults, setShowOddResults] = useState(false);

  // Task 2: Family diagram state
  const [diagramAnswers, setDiagramAnswers] = useState({
    henry: "",
    anais: "",
    robin: "",
    elsa: ""
  });
  const [diagramChecked, setDiagramChecked] = useState(false);

  // Task 3: Guess who answers
  const [riddleAnswers, setRiddleAnswers] = useState<Record<string, string>>({});
  const [showRiddleAnswers, setShowRiddleAnswers] = useState(false);

  // Audio Playback
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopEnglishAudio();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playEnglishAudio(UNIT_2_READING.audioText, 0.85);
      // reset state when speech finishes approximately
      const wordsCount = UNIT_2_READING.audioText.split(" ").length;
      setTimeout(() => setIsPlayingAudio(false), wordsCount * 450);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Unit Banner Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <span>Unit 2 · الوحدة الثانية</span>
            <span>·</span>
            <span>Family & Relationships</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-english tracking-tight">
            Family: Reading, Grammar & Activities
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            الكتاب التفاعلي الكامل للصفحة 8 و 9: استمع لنص "My Mother"، وتدرب على قواعد الأفعال، وحل فوازير العائلة وشجرة النسب بإشراف المعلمة جيداء صقر.
          </p>
        </div>

        <div className="w-full md:w-64 h-44 rounded-xl overflow-hidden border border-blue-500/30 shadow-xl shrink-0 relative">
          <img
            src={familyIllustration}
            alt="Family Illustration"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-[11px] text-white font-semibold">Family Tree & Loving Home</span>
          </div>
        </div>
      </div>

      {/* Section 1: Reading "My Mother" */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
          <div>
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider font-english">
              1. Read then do the tasks below
            </span>
            <h3 className="text-xl font-bold text-white font-english">
              {UNIT_2_READING.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowArabicTranslation(!showArabicTranslation)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              {showArabicTranslation ? "إخفاء الترجمة" : "عرض الترجمة العربية"}
            </button>

            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-lg transition-all shadow-md ${
                isPlayingAudio
                  ? "bg-rose-600 text-white shadow-rose-900/40 animate-pulse"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40"
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>إيقاف الصوت</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>استماع للنص كاملاً بصوت نقي</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Text Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/90 leading-relaxed font-english text-base text-slate-200" dir="ltr">
            <p className="space-x-1">
              {UNIT_2_READING.text}
            </p>
          </div>

          {showArabicTranslation ? (
            <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-800/30 text-slate-300 text-sm leading-relaxed animate-in fade-in duration-200">
              <span className="block text-xs font-bold text-blue-400 mb-2">ترجمة النص بإشراف المعلمة:</span>
              <p>{UNIT_2_READING.translation}</p>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center flex flex-col items-center justify-center text-xs text-slate-400 py-8">
              <BookOpen className="w-6 h-6 text-blue-400 mb-2 opacity-60" />
              <span>انقر على زر "عرض الترجمة العربية" أعلاه للمقارنة بين النصين.</span>
            </div>
          )}
        </div>

        {/* Task a: Choose the correct word */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base font-bold text-white font-english">
                a. Choose the correct word
              </h4>
              <p className="text-xs text-slate-400">
                اختر الخيار النحوي الصحيح من بين القوسين وفقاً لقواعد الدرس:
              </p>
            </div>

            <button
              onClick={() => setShowChoiceResults(!showChoiceResults)}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              {showChoiceResults ? "إخفاء التصحيح والشرح" : "فحص الإجابات والشرح"}
            </button>
          </div>

          <div className="space-y-3">
            {CHOOSE_CORRECT_PAGE8.map((item) => {
              const selected = userChoices[item.id];
              const isCorrect = selected === item.correctAnswer;
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-english text-sm font-semibold text-slate-200" dir="ltr">
                      {item.question}
                    </div>
                    {item.arabicPrompt && (
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {item.arabicPrompt}
                      </div>
                    )}
                    {showChoiceResults && (
                      <div className="text-xs mt-1.5 flex items-center gap-1.5">
                        <span className={isCorrect ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                          {isCorrect ? "✓ إجابة ممتازة!" : `الإجابة الصحيحة: (${item.correctAnswer})`}
                        </span>
                        <span className="text-slate-400">· {item.explanation}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0" dir="ltr">
                    {item.options.map((opt) => {
                      const isSelected = selected === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() =>
                            setUserChoices((prev) => ({ ...prev, [item.id]: opt }))
                          }
                          className={`px-3 py-1 text-xs font-bold rounded-lg border font-english transition-all ${
                            isSelected
                              ? "bg-blue-600 border-blue-400 text-white shadow-md shadow-blue-900/40"
                              : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task b: Cross the odd word out */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base font-bold text-white font-english">
                b. Cross the odd word out
              </h4>
              <p className="text-xs text-slate-400">
                حدد الكلمة الشاذة عن باقي كلمات المجموعة:
              </p>
            </div>

            <button
              onClick={() => setShowOddResults(!showOddResults)}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              {showOddResults ? "إخفاء أسباب الاختيار" : "فحص الكلمة الشاذة مع التفسير"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ODD_ONE_OUT_PAGE8.map((group, idx) => {
              const selected = oddSelected[group.id];
              const isCorrect = selected === group.oddWord;
              return (
                <div key={group.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold mb-2">
                    المجموعة {idx + 1}:
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2" dir="ltr">
                    {group.words.map((w) => {
                      const isWordSelected = selected === w;
                      return (
                        <button
                          key={w}
                          onClick={() =>
                            setOddSelected((prev) => ({ ...prev, [group.id]: w }))
                          }
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border font-english transition-all ${
                            isWordSelected
                              ? "bg-rose-600/80 border-rose-500 text-white line-through"
                              : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500"
                          }`}
                        >
                          {w}
                        </button>
                      );
                    })}
                  </div>
                  {showOddResults && (
                    <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="font-bold text-amber-400 block mb-0.5">
                        الكلمة الشاذة: {group.oddWord}
                      </span>
                      <span>{group.reason}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 2: Complete the Family Diagram */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="mb-4">
          <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider font-english">
            2. Complete the diagram
          </span>
          <h3 className="text-xl font-bold text-white font-english">
            Henry's Family Diagram (شجرة عائلة هنري)
          </h3>
          <p className="text-xs text-slate-400">
            أكمل مسميات أفراد العائلة في المخطط: هنري (Henry)، أنيس (Anaïs)، روبين (Robin)، إلسا (Elsa).
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-6">
          <div className="inline-block bg-blue-900/40 border border-blue-500/40 text-blue-200 px-6 py-2 rounded-xl font-bold text-sm font-english">
            My Family
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Henry */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <span className="text-xs text-slate-400 mb-1">Henry</span>
              <span className="font-bold text-white font-english mb-2">Husband / Father</span>
              <input
                type="text"
                placeholder="اكتب دوره (Husband)"
                value={diagramAnswers.henry}
                onChange={(e) => setDiagramAnswers({ ...diagramAnswers, henry: e.target.value })}
                className="w-full text-center bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
              />
            </div>

            {/* Anais */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <span className="text-xs text-slate-400 mb-1">Anaïs</span>
              <span className="font-bold text-white font-english mb-2">Mother / Wife</span>
              <input
                type="text"
                placeholder="اكتب دورها (Mother)"
                value={diagramAnswers.anais}
                onChange={(e) => setDiagramAnswers({ ...diagramAnswers, anais: e.target.value })}
                className="w-full text-center bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
              />
            </div>

            {/* Robin */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <span className="text-xs text-slate-400 mb-1">Robin</span>
              <span className="font-bold text-white font-english mb-2">Brother / Son</span>
              <input
                type="text"
                placeholder="اكتب دوره (Brother)"
                value={diagramAnswers.robin}
                onChange={(e) => setDiagramAnswers({ ...diagramAnswers, robin: e.target.value })}
                className="w-full text-center bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
              />
            </div>

            {/* Elsa */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <span className="text-xs text-slate-400 mb-1">Elsa</span>
              <span className="font-bold text-white font-english mb-2">Daughter / Sister</span>
              <input
                type="text"
                placeholder="اكتب دورها (Daughter)"
                value={diagramAnswers.elsa}
                onChange={(e) => setDiagramAnswers({ ...diagramAnswers, elsa: e.target.value })}
                className="w-full text-center bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setDiagramChecked(!diagramChecked)}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
            >
              {diagramChecked ? "إخفاء الحل المعتمد" : "فحص الحل النموذجي لمخطط العائلة"}
            </button>
          </div>

          {diagramChecked && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300">
              <p className="font-bold mb-1">الحل النموذجي المعتمد من المعلمة جيداء صقر:</p>
              <p>Henry = Husband/Father · Anaïs = Mother/Wife · Robin = Brother/Son · Elsa = Daughter/Sister · Robin & Elsa = Children</p>
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Guess who? 1-10 Riddles */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider font-english">
              3. Guess who? (10 Family Riddles)
            </span>
            <h3 className="text-xl font-bold text-white font-english">
              Family Relationship Riddles
            </h3>
            <p className="text-xs text-slate-400">
              احزر صلة القرابة باللغة الإنجليزية لكل عبارة من العبارات العشر:
            </p>
          </div>

          <button
            onClick={() => setShowRiddleAnswers(!showRiddleAnswers)}
            className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-lg hover:bg-amber-500/20 transition-colors"
          >
            {showRiddleAnswers ? "إخفاء الإجابات النموذجية" : "عرض الإجابات النموذجية للحل"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GUESS_WHO_RIDDLES.map((riddle) => {
            const userVal = riddleAnswers[riddle.id] || "";
            return (
              <div
                key={riddle.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="font-english font-semibold text-sm text-slate-200" dir="ltr">
                    {riddle.riddle}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {riddle.arabicHint}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="اكتب إجابتك بالإنجليزية..."
                      value={userVal}
                      onChange={(e) =>
                        setRiddleAnswers({ ...riddleAnswers, [riddle.id]: e.target.value })
                      }
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-english outline-none"
                      dir="ltr"
                    />
                    <button
                      onClick={() => playEnglishAudio(riddle.answer)}
                      title="استماع لنطق الإجابة"
                      className="p-1.5 rounded-lg bg-slate-800 text-blue-400 hover:text-white transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {showRiddleAnswers && (
                    <div className="mt-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 p-2 rounded-lg">
                      <span className="font-bold">الإجابة: {riddle.answer}</span>
                      <span className="text-slate-400 block text-[11px] mt-0.5">{riddle.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 4: Irregular Plurals Flashcard Grid */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="mb-4">
          <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider font-english">
            4. Write the plural of these words
          </span>
          <h3 className="text-xl font-bold text-white font-english">
            Irregular Plurals Master Table (الجموع الشاذة)
          </h3>
          <p className="text-xs text-slate-400">
            الأسماء التي لا تقبل إضافة s في الجمع ويجب حفظها عن ظهر قلب:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {IRREGULAR_PLURALS.map((p) => (
            <div
              key={p.singular}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">{p.arabic}</span>
                <button
                  onClick={() => playEnglishAudio(`${p.singular}. plural: ${p.plural}`)}
                  className="p-1 text-blue-400 hover:text-white"
                  title="استماع للنطق"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-around font-english text-sm py-2 bg-slate-900/60 rounded-lg">
                <span className="text-slate-300">{p.singular}</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-bold text-amber-400">{p.plural}</span>
              </div>

              <div className="text-[11px] text-slate-500 mt-2 text-right">
                {p.rule}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
