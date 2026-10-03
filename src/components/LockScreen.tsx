import React, { useState } from "react";
import {
  Lock,
  KeyRound,
  User,
  Sparkles,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  Copy,
  Check
} from "lucide-react";
import {
  verifyStudentCode,
  saveStudentActivation,
  getStudentWhatsAppHelpUrl,
  TEACHER_DISPLAY_PHONE,
  generateStudentCode
} from "../utils/cryptoAuth";

// Import generated hero banner
import heroBanner from "../assets/images/hero_english_love_1790998043463.jpg";

interface LockScreenProps {
  onSuccessActivation: (studentName: string, code: string) => void;
  onOpenTeacherPortal: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  onSuccessActivation,
  onOpenTeacherPortal
}) => {
  const [studentName, setStudentName] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [copiedDemo, setCopiedDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanName = studentName.trim();
    const cleanCode = activationCode.trim();

    if (!cleanName) {
      setErrorMsg("يرجى كتابة اسم الطالب الكامل أولاً.");
      return;
    }

    if (!cleanCode) {
      setErrorMsg("يرجى إدخال كود التفعيل المخصص لك.");
      return;
    }

    setIsVerifying(true);

    // Verify deterministically via client-side mathematical encryption
    setTimeout(() => {
      const verification = verifyStudentCode(cleanName, cleanCode);

      if (verification.isValid) {
        setSuccessAnimation(true);
        setTimeout(() => {
          saveStudentActivation(cleanName, cleanCode);
          onSuccessActivation(cleanName, cleanCode);
        }, 900);
      } else {
        setErrorMsg(
          `كود التفعيل غير متطابق مع الاسم "${cleanName}". تأكد من كتابة اسمك بنفس الطريقة التي ولد بها الكود، أو تواصل مع المعلمة جيداء صقر عبر واتساب.`
        );
        setIsVerifying(false);
      }
    }, 400);
  };

  // Demo auto-fill helper for teacher / student testing
  const handleQuickDemoFill = () => {
    const demoName = "أحمد المحمد";
    const demoCode = generateStudentCode(demoName);
    setStudentName(demoName);
    setActivationCode(demoCode);
    setErrorMsg(null);
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Top Bar */}
      <header className="w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg">
            ML
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold tracking-tight text-white font-english">
              MORE ENGLISH MORE LOVE
            </h1>
            <p className="text-xs text-slate-400">
              بإشراف وتدريس المعلمة <span className="text-blue-400 font-semibold">جيداء صقر</span>
            </p>
          </div>
        </div>

        <button
          onClick={onOpenTeacherPortal}
          className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl transition-all shadow-sm"
        >
          <KeyRound className="w-3.5 h-3.5 text-amber-400" />
          <span>بوابة المعلمة</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-md mx-auto px-4 py-6 z-10 flex-1 flex flex-col justify-center">
        {/* Hero Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden relative">
          {/* Top Banner Image */}
          <div className="relative h-32 w-full overflow-hidden border-b border-slate-800/70">
            <img
              src={heroBanner}
              alt="More English More Love Banner"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-3 right-4 left-4 flex items-end justify-between">
              <div>
                <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-widest font-english">
                  Official Educational Platform
                </span>
                <h2 className="text-lg font-bold text-white font-english">
                  MORE ENGLISH MORE LOVE
                </h2>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <Lock className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-1">
                تفعيل حساب الطالب والدخول للمنهاج
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                المنهاج محمي ومقفل بالكامل. يرجى إدخال اسمك الكامل وكود التفعيل المولد حصرياً لك من قِبل المعلمة جيداء صقر.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>اسم الطالب الكامل (كما سُجّل عند المعلمة):</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="مثال: أحمد المحمد أو Sarah Smith"
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
                    dir="auto"
                  />
                </div>
              </div>

              {/* Activation Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>كود التفعيل السري المولد لك:</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={activationCode}
                    onChange={(e) => {
                      setActivationCode(e.target.value.toUpperCase());
                      setErrorMsg(null);
                    }}
                    placeholder="MEML-XXXX-XXXX"
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 font-mono-code uppercase tracking-wider transition-all outline-none text-left"
                    dir="ltr"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>التحقق يتم بمعادلة رياضية مشفرة محلياً تفتح على جهازك لمدة 6 أشهر.</span>
                </p>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{errorMsg}</div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isVerifying || successAnimation}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
                  successAnimation
                    ? "bg-emerald-600 shadow-emerald-600/30"
                    : "bg-blue-600 hover:bg-blue-500 active:scale-[0.99] shadow-blue-600/30"
                }`}
              >
                {successAnimation ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                    <span>تم التحقق بنجاح! جاري الدخول...</span>
                  </>
                ) : isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>جاري مطابقة الاسم والكود رياضياً...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>تفعيل الحساب والدخول للمنهاج</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Test Box for Convenience */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px]">هل أنت زائر للتجربة؟</span>
              <button
                onClick={handleQuickDemoFill}
                type="button"
                className="text-[11px] text-blue-400 hover:text-blue-300 underline underline-offset-2 flex items-center gap-1 font-medium"
              >
                {copiedDemo ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>تم التعبئة التلقائية!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>تعبئة كود تجريبي تلقائياً</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp Request Box */}
        <div className="mt-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center">
          <p className="text-xs text-slate-300 font-medium mb-1">
            كيف أحصل على كود تفعيل؟
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            تواصل مباشرة مع المعلمة <strong className="text-white">جيداء صقر</strong> عبر واتساب للحصول على كودك الحصري المولد باسمك.
          </p>
          <a
            href={getStudentWhatsAppHelpUrl(studentName)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-emerald-950/40 w-full"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>طلب كود التفعيل عبر واتساب ({TEACHER_DISPLAY_PHONE})</span>
            <ExternalLink className="w-3 h-3 opacity-75" />
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 py-4 text-center text-xs text-slate-400 z-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-400" />
          <span>منهاج اللغة الإنجليزية التفاعلي — جميع الحقوق محفوظة للمعلمة جيداء صقر © {new Date().getFullYear()}</span>
        </div>
        <div className="text-[11px] text-slate-400">
          صلاحية التفعيل: <span className="text-slate-300 font-semibold">6 أشهر كاملة (180 يوماً)</span> على جهازك
        </div>
      </footer>
    </div>
  );
};
