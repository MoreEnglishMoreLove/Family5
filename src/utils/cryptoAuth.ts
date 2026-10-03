/**
 * MORE ENGLISH MORE LOVE - Cryptographic & Deterministic Client-Side Validation Engine
 * Under the supervision of Teacher Jaidaa Saqr (المعلمة جيداء صقر)
 * 
 * Runs 100% locally in the browser with zero external servers or paid databases.
 * Guarantees mathematical deterministic verification:
 * Name -> Unique Salted Polynomial Hash -> Format: MEML-XXXX-XXXX
 */

const SECRET_SALT = "MEML_JAIDAA_SAQR_2026_MATH_ENCRYPT_KEY_9981";
export const ADMIN_PIN = "b13a15m17";
export const TEACHER_PHONE = "963933036079";
export const TEACHER_DISPLAY_PHONE = "+963 933 036 079";
export const SUBSCRIPTION_DURATION_MS = 180 * 24 * 60 * 60 * 1000; // 6 Months (180 days)

// Unambiguous character set (no 0/O, no 1/I)
const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/**
 * Normalizes student name to prevent minor typing discrepancies (extra spaces, Arabic tashkeel, etc.)
 */
export function normalizeStudentName(name: string): string {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "") // remove Arabic tashkeel and tatweel
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/\s+/g, " ");
}

/**
 * 64-bit split polynomial rolling hash with Murmur-style bit Avalanche
 */
function hashString(input: string, seed: number): [number, number] {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;

  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return [h1 >>> 0, h2 >>> 0];
}

/**
 * Generates the deterministic exclusive activation code for a given student name.
 * Format: MEML-XXXX-XXXX
 */
export function generateStudentCode(rawName: string): string {
  const normalized = normalizeStudentName(rawName);
  if (!normalized) return "";

  const saltedString = `${SECRET_SALT}:${normalized}:${SECRET_SALT}`;
  const [h1, h2] = hashString(saltedString, 0x9e3779b9);

  // Generate 8 characters (2 blocks of 4)
  let part1 = "";
  let val1 = h1;
  for (let i = 0; i < 4; i++) {
    part1 += CHARSET[val1 % CHARSET.length];
    val1 = Math.floor(val1 / CHARSET.length);
  }

  let part2 = "";
  let val2 = h2;
  for (let i = 0; i < 4; i++) {
    part2 += CHARSET[val2 % CHARSET.length];
    val2 = Math.floor(val2 / CHARSET.length);
  }

  return `MEML-${part1}-${part2}`;
}

/**
 * Validates an entered code against the student's name
 */
export function verifyStudentCode(rawName: string, rawCode: string): {
  isValid: boolean;
  expectedCode: string;
  normalizedName: string;
} {
  const normalized = normalizeStudentName(rawName);
  const cleanCode = (rawCode || "").trim().toUpperCase();

  if (!normalized || !cleanCode) {
    return { isValid: false, expectedCode: "", normalizedName: normalized };
  }

  const expectedCode = generateStudentCode(normalized);
  const isValid = cleanCode === expectedCode;

  return {
    isValid,
    expectedCode,
    normalizedName: normalized,
  };
}

/**
 * Unique device fingerprint generator to lock code to this device
 */
export function getOrCreateDeviceFingerprint(): string {
  const KEY = "meml_device_fp";
  let fp = localStorage.getItem(KEY);
  if (!fp) {
    fp = "dev_" + Math.random().toString(36).substring(2, 12) + "_" + Date.now().toString(36);
    try {
      localStorage.setItem(KEY, fp);
    } catch {
      // safe fallback
    }
  }
  return fp;
}

export interface StudentActivation {
  studentName: string;
  code: string;
  activatedAt: number;
  expiresAt: number;
  deviceId: string;
}

const STORAGE_KEY = "meml_student_session";

/**
 * Saves activation state to localStorage
 */
export function saveStudentActivation(studentName: string, code: string): StudentActivation {
  const now = Date.now();
  const session: StudentActivation = {
    studentName,
    code,
    activatedAt: now,
    expiresAt: now + SUBSCRIPTION_DURATION_MS,
    deviceId: getOrCreateDeviceFingerprint(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    console.error("Storage error:", err);
  }

  return session;
}

/**
 * Retrieves student session and checks for expiration
 */
export function getStudentActivation(): {
  session: StudentActivation | null;
  isExpired: boolean;
  timeLeftMs: number;
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { session: null, isExpired: false, timeLeftMs: 0 };

    const session: StudentActivation = JSON.parse(raw);
    const now = Date.now();
    const timeLeftMs = session.expiresAt - now;
    const isExpired = timeLeftMs <= 0;

    return { session, isExpired, timeLeftMs: Math.max(0, timeLeftMs) };
  } catch {
    return { session: null, isExpired: false, timeLeftMs: 0 };
  }
}

/**
 * Clears student session (e.g. on logout or expiration)
 */
export function clearStudentActivation(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

// Teacher Code Registry History (stored in teacher's local storage for easy management)
export interface GeneratedCodeRecord {
  id: string;
  studentName: string;
  code: string;
  createdAt: number;
}

const ADMIN_STORAGE_KEY = "meml_teacher_generated_codes";

export function getAdminGeneratedCodes(): GeneratedCodeRecord[] {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAdminGeneratedCode(studentName: string, code: string): GeneratedCodeRecord {
  const records = getAdminGeneratedCodes();
  const newRecord: GeneratedCodeRecord = {
    id: "rec_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
    studentName,
    code,
    createdAt: Date.now(),
  };
  const updated = [newRecord, ...records.filter((r) => r.code !== code)];
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return newRecord;
}

export function deleteAdminCode(id: string): void {
  const records = getAdminGeneratedCodes();
  const updated = records.filter((r) => r.id !== id);
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

/**
 * WhatsApp Helper to generate direct message URL
 */
export function getStudentWhatsAppHelpUrl(studentName?: string): string {
  const text = studentName && studentName.trim()
    ? `مرحباً المعلمة الفاضلة جيداء صقر، أرغب في الحصول على كود تفعيل لمنهاج MORE ENGLISH MORE LOVE. اسمي الكامل: ${studentName.trim()}`
    : `مرحباً المعلمة الفاضلة جيداء صقر، أرغب في الحصول على كود تفعيل لمنهاج MORE ENGLISH MORE LOVE.`;

  return `https://wa.me/${TEACHER_PHONE}?text=${encodeURIComponent(text)}`;
}

export function getTeacherWhatsAppSendUrl(studentName: string, code: string): string {
  const text = `مرحباً ${studentName}،\nإليك كود التفعيل الحصري الخاص بك لمنهاج:\n✨ MORE ENGLISH MORE LOVE ✨\nتحت إشراف وتدريس المعلمة: جيداء صقر\n\n📌 كود التفعيل الخاص بك: ${code}\n(يرجى كتابة اسمك بنفس الطريقة وإدخال الكود)\n\nنتمنى لك كل التوفيق والتميز الدائم! 🌟`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
