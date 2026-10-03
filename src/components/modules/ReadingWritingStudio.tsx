import React, { useState } from "react";
import {
  BookOpen,
  Volume2,
  VolumeX,
  PenTool,
  CheckCircle2,
  XCircle,
  Sparkles,
  Printer,
  Copy,
  Check
} from "lucide-react";
import { JOHN_STORY } from "../../data/curriculumData";
import { playEnglishAudio, stopEnglishAudio } from "../../utils/speech";

export const ReadingWritingStudio: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showArabicTranslation, setShowArabicTranslation] = useState(false);

  // True/False state for John's story
  const tfQuestions = [
    { id: "q1", text: "1. Carla is Kevin's wife.", isTrue: true, note: "صحيح، هما الجدان كيفن وكارلا." },
    { id: "q2", text: "2. Laura is Olivia's sister.", isTrue: false, note: "خطأ، لورا هي ابنة أخيها (niece) وليست أختها." },
    { id: "q3", text: "3. Liza and Peter are John's parents.", isTrue: true, note: "صحيح، ليزا الأم وبيتر الأب." },
    { id: "q4", text: "4. Richard is Laura's uncle.", isTrue: true, note: "صحيح، ريتشارد أخ الأم فهو خال لورا وجون." },
    { id: "q5", text: "5. John's cat is called Puppy.", isTrue: false, note: "خطأ، القطة اسمها Lucy والكلب هو Puppy." }
  ];

  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean>>({});
  const [showTfResults, setShowTfResults] = useState(false);

  // Guided Writer State
  const [writerProfile, setWriterProfile] = useState({
    name: "Sami",
    age: "11",
    motherName: "Huda",
    motherJob: "teacher",
    fatherName: "Khaled",
    fatherJob: "doctor",
    grandmaName: "Maryam",
    grandpaName: "Ahmad",
    sisterName: "Maya",
    sisterJob: "student",
    brotherName: "Zaid",
    brotherJob: "pupil",
    petType: "cat",
    petName: "Milo"
  });

  const [copiedEssay, setCopiedEssay] = useState(false);

  const handleToggleStoryAudio = () => {
    if (isPlayingAudio) {
      stopEnglishAudio();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playEnglishAudio(JOHN_STORY.audioText, 0.82);
      const wordsCount = JOHN_STORY.audioText.split(" ").length;
      setTimeout(() => setIsPlayingAudio(false), wordsCount * 450);
    }
  };

  const generatedEssay = `My name is ${writerProfile.name || "..."}. I'm ${writerProfile.age || "..."} years old. My mother's name is ${writerProfile.motherName || "..."}. She is a ${writerProfile.motherJob || "teacher"}. My father's name is ${writerProfile.fatherName || "..."}. He is a ${writerProfile.fatherJob || "doctor"}. My grandmother's name is ${writerProfile.grandmaName || "..."} and my grandfather's name is ${writerProfile.grandpaName || "..."}. My sister's name is ${writerProfile.sisterName || "..."}. She is a ${writerProfile.sisterJob || "student"}. My brother's name is ${writerProfile.brotherName || "..."}. He is a ${writerProfile.brotherJob || "pupil"}. I have a pet. It is a ${writerProfile.petType || "cat"}. My pet's name is ${writerProfile.petName || "..."}. I love my family very much!`;

  const handleCopyEssay = () => {
    navigator.clipboard.writeText(generatedEssay);
    setCopiedEssay(true);
    setTimeout(() => setCopiedEssay(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-2xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
          <span>Reading & Writing Studio · مختبر القراءة والكتابة الإبداعية</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          قصة John من كندا واستوديو كتابة موضوع العائلة
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed mt-2">
          قراءة تفاعلية لقصة جون مع اختبار صح أم خطأ، واستوديو تفاعلي موجه لتأليف فقرة كتابية متكاملة باللغة الإنجليزية عن عائلتك وحيوانك الأليف مع النطق الصوتي الفوري.
        </p>
      </div>

      {/* Story: John from Canada */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider font-english">
              6. Read and do the tasks below (Page 10)
            </span>
            <h3 className="text-lg font-bold text-white font-english">
              {JOHN_STORY.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowArabicTranslation(!showArabicTranslation)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              {showArabicTranslation ? "إخفاء الترجمة" : "عرض الترجمة العربية"}
            </button>

            <button
              onClick={handleToggleStoryAudio}
              className={`flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-lg transition-all shadow-md ${
                isPlayingAudio
                  ? "bg-rose-600 text-white animate-pulse"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
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
                  <span>استماع لقصة John</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Story Text Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/90 leading-relaxed font-english text-sm text-slate-200" dir="ltr">
            <p>{JOHN_STORY.text}</p>
          </div>

          {showArabicTranslation ? (
            <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-800/30 text-slate-300 text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200">
              <span className="block text-xs font-bold text-blue-400 mb-2">ترجمة قصة جون:</span>
              <p>{JOHN_STORY.translation}</p>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center flex flex-col items-center justify-center text-xs text-slate-400">
              <BookOpen className="w-6 h-6 text-blue-400 mb-2 opacity-60" />
              <span>استمع للنص ثم أجب عن أسئلة صح أم خطأ أدناه.</span>
            </div>
          )}
        </div>

        {/* Task b: Write True (T) or False (F) */}
        <div className="pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider font-english">
                Task b: True or False
              </span>
              <h4 className="text-sm font-bold text-white">
                اكتب صح (True) أو خطأ (False) لكل جملة:
              </h4>
            </div>

            <button
              onClick={() => setShowTfResults(!showTfResults)}
              className="text-xs font-bold text-blue-400 hover:text-blue-300"
            >
              {showTfResults ? "إخفاء التصحيح" : "فحص الإجابات النموذجية"}
            </button>
          </div>

          <div className="space-y-3">
            {tfQuestions.map((q) => {
              const userAns = tfAnswers[q.id];
              const isCorrect = userAns === q.isTrue;
              return (
                <div
                  key={q.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className="font-english font-semibold text-xs sm:text-sm text-white" dir="ltr">
                      {q.text}
                    </span>
                    {showTfResults && (
                      <div className="text-xs mt-1">
                        <span className={isCorrect ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                          {isCorrect ? "✓ صحيح!" : `الإجابة الصحيحة: ${q.isTrue ? "True (T)" : "False (F)"}`}
                        </span>
                        <span className="text-slate-400 mr-2">({q.note})</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setTfAnswers({ ...tfAnswers, [q.id]: true })}
                      className={`px-3 py-1 rounded-lg border text-xs font-bold transition-all ${
                        userAns === true
                          ? "bg-emerald-600 border-emerald-500 text-white"
                          : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      True (T)
                    </button>
                    <button
                      onClick={() => setTfAnswers({ ...tfAnswers, [q.id]: false })}
                      className={`px-3 py-1 rounded-lg border text-xs font-bold transition-all ${
                        userAns === false
                          ? "bg-rose-600 border-rose-500 text-white"
                          : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      False (F)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Guided Family Profile & Essay Studio */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider font-english">
              Exercise 8 & 9 · Pages 10 - 11
            </span>
            <h3 className="text-lg font-bold text-white">
              استوديو كتابة تعبير العائلة (Write About Your Family & Pets)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs Section */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
            <h4 className="font-bold text-slate-200 mb-2">أدخل معلوماتك الشخصية وعائلتك:</h4>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">اسمك (Name):</label>
                <input
                  type="text"
                  value={writerProfile.name}
                  onChange={(e) => setWriterProfile({ ...writerProfile, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">عمرك (Age):</label>
                <input
                  type="text"
                  value={writerProfile.age}
                  onChange={(e) => setWriterProfile({ ...writerProfile, age: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">اسم الأم (Mother's name):</label>
                <input
                  type="text"
                  value={writerProfile.motherName}
                  onChange={(e) => setWriterProfile({ ...writerProfile, motherName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">مهنة الأم (Mother's job):</label>
                <input
                  type="text"
                  value={writerProfile.motherJob}
                  onChange={(e) => setWriterProfile({ ...writerProfile, motherJob: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">اسم الأب (Father's name):</label>
                <input
                  type="text"
                  value={writerProfile.fatherName}
                  onChange={(e) => setWriterProfile({ ...writerProfile, fatherName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">مهنة الأب (Father's job):</label>
                <input
                  type="text"
                  value={writerProfile.fatherJob}
                  onChange={(e) => setWriterProfile({ ...writerProfile, fatherJob: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">الحيوان الأليف (Pet type):</label>
                <input
                  type="text"
                  value={writerProfile.petType}
                  onChange={(e) => setWriterProfile({ ...writerProfile, petType: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">اسم الحيوان (Pet name):</label>
                <input
                  type="text"
                  value={writerProfile.petName}
                  onChange={(e) => setWriterProfile({ ...writerProfile, petName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Rendered English Composition */}
          <div className="flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-blue-500/30">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-english">
                  Generated English Composition
                </span>
                <span className="text-[11px] text-slate-500">جاهز للطباعة والقراءة</span>
              </div>

              <div className="font-english text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800" dir="ltr">
                {generatedEssay}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => playEnglishAudio(generatedEssay)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>استماع للفقرة</span>
              </button>

              <button
                onClick={handleCopyEssay}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
              >
                {copiedEssay ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ النص</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors no-print"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
