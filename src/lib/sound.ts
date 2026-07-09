/**
 * Tiny Web Audio SFX engine, no asset files, everything synthesized.
 * Muted by default (respects autoplay policies + avoids annoyance).
 */

export type SfxType = "click" | "whoosh" | "pop" | "clap" | "blip" | "launch";

let ctx: AudioContext | null = null;
let muted = true;
const listeners = new Set<(m: boolean) => void>();

const STORAGE_KEY = "nnz-sound";

if (typeof window !== "undefined") {
  muted = localStorage.getItem(STORAGE_KEY) !== "on";
}

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType,
  gain: number,
  when: number,
  slideTo?: number,
) {
  const c = ac();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  const t = c.currentTime + when;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function noiseBurst(dur: number, gain: number, when: number) {
  const c = ac();
  if (!c) return;
  const frames = Math.floor(c.sampleRate * dur);
  const buffer = c.createBuffer(1, frames, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
  }
  const src = c.createBufferSource();
  src.buffer = buffer;
  const g = c.createGain();
  g.gain.setValueAtTime(gain, c.currentTime + when);
  src.connect(g).connect(c.destination);
  src.start(c.currentTime + when);
}

export function sfx(type: SfxType) {
  if (muted) return;
  switch (type) {
    case "click":
      tone(520, 0.06, "triangle", 0.06, 0);
      break;
    case "blip":
      tone(880, 0.08, "sine", 0.07, 0, 1200);
      break;
    case "pop":
      tone(300, 0.14, "sine", 0.12, 0, 720);
      break;
    case "whoosh":
      noiseBurst(0.35, 0.09, 0);
      tone(200, 0.35, "sawtooth", 0.04, 0, 60);
      break;
    case "clap":
      noiseBurst(0.05, 0.28, 0);
      noiseBurst(0.05, 0.2, 0.07);
      tone(180, 0.12, "square", 0.06, 0);
      break;
    case "launch":
      tone(120, 0.6, "sawtooth", 0.08, 0, 900);
      noiseBurst(0.6, 0.06, 0);
      break;
  }
}

export function setMuted(next: boolean) {
  muted = next;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, next ? "off" : "on");
  }
  if (!next) ac(); // warm up the context on unmute (user gesture)
  listeners.forEach((l) => l(next));
}

export function getMuted() {
  return muted;
}

export function subscribeMuted(fn: (m: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
