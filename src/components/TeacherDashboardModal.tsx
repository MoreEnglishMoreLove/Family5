import React, { useState } from "react";
import {
  X,
  Shield,
  KeyRound,
  UserCheck,
  Copy,
  Check,
  Send,
  Trash2,
  Search,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Eye,
  AlertCircle
} from "lucide-react";
import {
  ADMIN_PIN,
  generateStudentCode,
  verifyStudentCode,
  saveAdminGeneratedCode,
  getAdminGeneratedCodes,
  deleteAdminCode,
  getTeacherWhatsAppSendUrl,
  TEACHER_DISPLAY_PHONE,
  GeneratedCodeRecord
} from "../utils/cryptoAuth";

interface TeacherDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterAsTeacher: (teacherName: string, code: string) => void;
}

export const TeacherDashboardModal: React.FC<TeacherDashboardModalProps> = ({
  isOpen,
  onClose,
  onEnterAsTeacher
}) => {
  const [pinInput, setPinInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Generator state
  const [newStudentName, setNewStudentName] = useState("");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [records, setRecords] = useState<GeneratedCodeRecord[]>(() => getAdminGeneratedCodes());

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Quick checker state
  const [checkName, setCheckName] = useState("");
  const [checkCode, setCheckCode] = useState("");
  const [checkResult, setCheckResult] = useState<{ isValid: boolean; expected: string } | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (pinInput.trim() === ADMIN_PIN) {
      setIsAuthenticated(true);
      setRecords(getAdminGeneratedCodes());
    } else {
      setAuthError("الرمز السري غير صحيح. يرجى إدخال الرمز الدائم الخاص بالمعلمة جيداء صقر.");
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newStudentName.trim();
    if (!clean) return;

    const code = generateStudentCode(clean);
    setGeneratedCode(code);
    const rec = saveAdminGeneratedCode(clean, code);
    setRecords(getAdminGeneratedCodes());
    setCopiedCode(false);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDeleteRecord = (id: string) => {
    deleteAdminCode(id);
    setRecords(getAdminGeneratedCodes());
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkName.trim() || !checkCode.trim()) return;
    const res = verifyStudentCode(checkName, checkCode);
    setCheckResult({
      isValid: res.isValid,
      expected: res.expectedCode
    });
  };

  const filteredRecords = records.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>بوابة المعلمة: جيداء صقر</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-english">
                  Admin Gateway
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                إدارة الأكواد الحصرية وتوليد تراخيص الاشتراك (6 أشهر)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <KeyRound className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              تسجيل الدخول إلى لوحة المعلمة
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mb-6">
              هذه البوابة مخصصة حصرياً للمعلمة جيداء صقر لتوليد أكواد التفعيل للطلاب. يرجى إدخال الرمز السري الدائم.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="أدخل الرمز السري (Admin PIN)"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-xl px-4 py-3 text-sm text-center text-white placeholder-slate-500 font-mono-code tracking-widest outline-none transition-all"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-right">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <Shield className="w-4 h-4" />
                <span>دخول لوحة التحكم</span>
              </button>

              <div className="text-[11px] text-slate-400 pt-2">
                الرمز الدائم المعتمد في المنظومة: <span className="font-mono text-slate-300">b13a15m17</span>
              </div>
            </form>
          </div>
        ) : (
          /* Teacher Dashboard View */
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-right">
            {/* Quick Generator Box */}
            <div className="bg-slate-950 border border-blue-500/30 rounded-xl p-4 sm:p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/10 blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>توليد كود تفعيل فوري باسم الطالب</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  صلاحية تلقائية: 6 أشهر (180 يوماً)
                </span>
              </div>

              <form onSubmit={handleGenerate} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="اكتب اسم الطالب الكامل هنا (مثال: ريم الشامي)"
                    className="flex-1 bg-slate-900 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 whitespace-nowrap transition-all shadow-md shadow-blue-900/30"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>توليد الكود رياضياً</span>
                  </button>
                </div>
              </form>

              {/* Generated Result */}
              {generatedCode && (
                <div className="mt-4 p-4 rounded-xl bg-blue-950/60 border border-blue-400/40 animate-in fade-in duration-200">
                  <div className="text-xs text-blue-300 font-semibold mb-1">
                    تم توليد الكود الحصري للطالب: <strong className="text-white font-bold">{newStudentName}</strong>
                  </div>
                  
                  <div className="flex items-center justify-between bg-slate-950/90 rounded-lg p-2.5 border border-blue-500/30 my-2">
                    <span className="font-mono text-base sm:text-lg font-black text-amber-300 tracking-wider font-english" dir="ltr">
                      {generatedCode}
                    </span>
                    <button
                      onClick={() => handleCopy(generatedCode)}
                      className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md transition-colors"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>تم النسخ!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ الكود</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <a
                      href={getTeacherWhatsAppSendUrl(newStudentName, generatedCode)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>إرسال الكود للطالب عبر واتساب مع رسالة ترحيبية</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Master Preview as Teacher */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 gap-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <div className="text-xs">
                  <span className="font-bold text-white block">معاينة كامل المنهاج كمعلمة</span>
                  <span className="text-slate-400">تجاوز شاشة القفل وتصفح الوحدات السبعة وأوراق العمل</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const teacherName = "المعلمة جيداء صقر";
                  const teacherCode = generateStudentCode(teacherName);
                  onEnterAsTeacher(teacherName, teacherCode);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>دخول المنهاج كمعلمة</span>
              </button>
            </div>

            {/* Code Verification Tool */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>أداة فحص مطابقة أي كود مع اسم الطالب:</span>
              </h3>
              <form onSubmit={handleCheck} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={checkName}
                  onChange={(e) => setCheckName(e.target.value)}
                  placeholder="اسم الطالب للمطابقة"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={checkCode}
                    onChange={(e) => setCheckCode(e.target.value)}
                    placeholder="الكود المراد فحصه"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono-code outline-none"
                    dir="ltr"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg transition-colors whitespace-nowrap"
                  >
                    فحص
                  </button>
                </div>
              </form>

              {checkResult && (
                <div
                  className={`mt-2 p-2.5 rounded-lg text-xs flex items-center justify-between ${
                    checkResult.isValid
                      ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                      : "bg-rose-950/60 border border-rose-500/40 text-rose-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {checkResult.isValid ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                    )}
                    <span>
                      {checkResult.isValid
                        ? "الكود متطابق 100% مع اسم الطالب وصالح للعمل."
                        : `الكود غير صحيح! الكود الحقيقي لهذا الاسم هو: ${checkResult.expected}`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Generated Codes History */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span>سجل الطلاب والأكواد المولدة</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                    {records.length}
                  </span>
                </div>
                
                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث عن طالب أو كود..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pr-8 pl-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              {filteredRecords.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400">
                  لا توجد أكواد مولدة بعد. استخدم النموذج أعلاه لتوليد كود للطالب.
                </div>
              ) : (
                <div className="divide-y divide-slate-800/60 max-h-56 overflow-y-auto">
                  {filteredRecords.map((rec) => (
                    <div
                      key={rec.id}
                      className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-900/50 px-2 rounded-lg transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white">{rec.studentName}</div>
                        <div className="font-mono text-amber-400 text-[11px] font-english" dir="ltr">
                          {rec.code}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(rec.code)}
                          title="نسخ الكود"
                          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={getTeacherWhatsAppSendUrl(rec.studentName, rec.code)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="إرسال عبر واتساب"
                          className="p-1.5 rounded-md hover:bg-emerald-950 text-emerald-400 transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDeleteRecord(rec.id)}
                          title="حذف من السجل"
                          className="p-1.5 rounded-md hover:bg-rose-950 text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
