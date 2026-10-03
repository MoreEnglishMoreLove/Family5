/**
 * Web Speech API Audio Pronunciation Helper
 * Provides native text-to-speech for English words, phrases, and passages.
 */

let synth: SpeechSynthesis | null = null;
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  synth = window.speechSynthesis;
}

export function playEnglishAudio(text: string, rate = 0.85): void {
  if (!synth) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate; // slightly slower for educational clarity
  utterance.pitch = 1.0;

  // Try to find natural English voice
  const voices = synth.getVoices();
  const englishVoice = voices.find(
    (v) => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha"))
  ) || voices.find((v) => v.lang.startsWith("en"));

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  synth.speak(utterance);
}

export function stopEnglishAudio(): void {
  if (synth) {
    synth.cancel();
  }
}
