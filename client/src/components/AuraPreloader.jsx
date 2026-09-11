import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const MESSAGES = [
  'Kindling the chain of giving',
  'Warming hearts on Ethereum',
  'Bringing hope on-chain',
];

export default function AuraPreloader() {
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => setDone(true), 120);
      return () => clearTimeout(t);
    }

    let raf;
    const start = performance.now();
    const duration = 1500;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setMsg(Math.min(Math.floor(eased * MESSAGES.length), MESSAGES.length - 1));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        const t2 = setTimeout(() => setDone(true), 200);
        raf = t2;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0A0D14]" aria-hidden="true">
      <div className="flex flex-col items-center gap-7 text-center select-none">
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-rose-500/15 blur-3xl" />
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div data-aura-anim className="absolute inset-0 rounded-full border border-rose-500/20 [animation:aura_ring_2s_ease-out_infinite]" />
            <div data-aura-anim className="absolute inset-0 rounded-full border border-rose-500/15 [animation:aura_ring_2s_ease-out_infinite_0.5s]" />
            <Heart
              data-aura-anim
              className="h-9 w-9 text-rose-500 fill-rose-500/90 [animation:aura_beat_1s_ease-in-out_infinite]"
              style={{ filter: 'drop-shadow(0 0 14px rgba(244,63,94,0.5))' }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Aura<span className="text-rose-400">Giving</span>
          </span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-[#94A3B8]">
            {MESSAGES[msg]}
          </span>
        </div>

        <div className="h-px w-44 overflow-hidden rounded-full bg-white/[0.08]">
          <div className="h-full w-1/3 bg-gradient-to-r from-rose-400 to-orange-400 [animation:aura_progress_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes aura_beat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.18); }
          28% { transform: scale(1); }
          42% { transform: scale(1.12); }
          56% { transform: scale(1); }
        }
        @keyframes aura_ring {
          0% { transform: scale(0.7); opacity: 0.9; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes aura_progress {
          0% { transform: translateX(-110%); }
          50% { transform: translateX(80%); }
          100% { transform: translateX(240%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-aura-anim] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}