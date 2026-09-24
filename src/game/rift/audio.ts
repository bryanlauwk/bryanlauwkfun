/**
 * Tiny WebAudio synth for Rift Runner. Everything is generated at runtime,
 * so the game ships without any audio assets.
 */
export class RiftAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private noiseBuffer: AudioBuffer | null = null;
  private muted = false;

  /** Must be called from a user gesture (browsers block autoplay). */
  unlock() {
    if (this.ctx) {
      void this.ctx.resume();
      return;
    }
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.55;
    this.master.connect(ctx.destination);

    const len = ctx.sampleRate * 1.5;
    this.noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    // Low detuned drone that opens up with speed.
    this.droneFilter = ctx.createBiquadFilter();
    this.droneFilter.type = "lowpass";
    this.droneFilter.frequency.value = 220;
    this.droneFilter.Q.value = 6;
    this.droneGain = ctx.createGain();
    this.droneGain.gain.value = 0;
    this.droneFilter.connect(this.droneGain).connect(this.master);
    for (const [freq, type] of [[55, "sawtooth"], [55.4, "sawtooth"], [82.5, "triangle"]] as const) {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      osc.connect(this.droneFilter);
      osc.start();
      this.droneOscs.push(osc);
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : 0.55, this.ctx.currentTime, 0.05);
    }
  }

  /** speed01: 0..1 normalized game speed. active: whether a run is in progress. */
  setDrone(speed01: number, active: boolean) {
    if (!this.ctx || !this.droneGain || !this.droneFilter) return;
    const t = this.ctx.currentTime;
    this.droneGain.gain.setTargetAtTime(active ? 0.14 : 0.04, t, 0.3);
    this.droneFilter.frequency.setTargetAtTime(180 + speed01 * 1400, t, 0.2);
    this.droneOscs.forEach((osc, i) => {
      osc.frequency.setTargetAtTime([55, 55.4, 82.5][i] * (1 + speed01 * 0.5), t, 0.3);
    });
  }

  pickup(combo: number) {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    // Pentatonic arpeggio that climbs with the combo.
    const steps = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24];
    const base = 440 * Math.pow(2, steps[Math.min(combo, steps.length - 1)] / 12);
    for (let i = 0; i < 2; i++) {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(base * (i + 1), t);
      osc.frequency.exponentialRampToValueAtTime(base * (i + 1) * 1.5, t + 0.12);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18 / (i + 1), t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      osc.connect(g).connect(this.master);
      osc.start(t);
      osc.stop(t + 0.4);
    }
  }

  hit() {
    if (!this.ctx || !this.master || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(3000, t);
    filter.frequency.exponentialRampToValueAtTime(80, t + 0.6);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.7, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    src.connect(filter).connect(g).connect(this.master);
    src.start(t);
    src.stop(t + 0.8);

    const osc = this.ctx.createOscillator();
    const og = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.5);
    og.gain.setValueAtTime(0.25, t);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    osc.connect(og).connect(this.master);
    osc.start(t);
    osc.stop(t + 0.55);
  }

  whoosh() {
    if (!this.ctx || !this.master || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 2;
    filter.frequency.setValueAtTime(400, t);
    filter.frequency.exponentialRampToValueAtTime(2500, t + 0.25);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    src.connect(filter).connect(g).connect(this.master);
    src.start(t);
    src.stop(t + 0.4);
  }

  dispose() {
    this.droneOscs.forEach((o) => {
      try {
        o.stop();
      } catch {
        /* already stopped */
      }
    });
    void this.ctx?.close();
    this.ctx = null;
  }
}
