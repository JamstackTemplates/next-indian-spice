import { useId } from 'react';
import type { Gravy } from '../../content/menu';
import type { Accompaniment } from '../../content/thalis';
import { BUTA, Buta, cuspedArch } from './print';
import { BananaLeafArt, ChutneyBowl, Diya, Kulhad, SpiceShape, SteelTumbler } from './food';
import { ThaliPlateArt } from './thali-plate';

const svgId = (raw: string, prefix: string) => `${prefix}-${raw.replace(/[^a-zA-Z0-9_-]/g, '')}`;

function rainSheet(seed: number, count: number, width: number, height: number, minLen = 18, maxLen = 36) {
  // Deterministic scatter tiled along the (-0.32, 1) wind slant so a (-140.8, 440) fall loops seamlessly.
  let s = seed;
  const next = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const span = maxLen - minLen;
  const shiftX = +(height * .32).toFixed(1);
  return Array.from({ length: count }, () => {
    const x = Math.round(next() * (width + 150));
    const y = Math.round(next() * height);
    const len = minLen + Math.round(next() * span);
    const dx = -(len * .32).toFixed(1);
    return `M${+(x + shiftX).toFixed(1)} ${y - height}l${dx} ${len}M${x} ${y}l${dx} ${len}`;
  }).join('');
}

/** Marigold head: ring of saffron petals around a turmeric centre. */
function Marigold({ x, y, r = 9 }: { x: number; y: number; r?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2;
      return <circle key={i} cx={+(Math.cos(a) * r * .55).toFixed(2)} cy={+(Math.sin(a) * r * .55).toFixed(2)} r={r * .45} fill="var(--saffron)" stroke="var(--art-line)" strokeWidth=".8" />;
    })}
    <circle r={r * .55} fill="var(--turmeric)" />
    <circle r={r * .2} fill="var(--art-line)" />
  </g>;
}

/**
 * Hero scene, "Jharokha in the monsoon": a carved cusped arch frames monsoon rain over a teal sky
 * (a saffron sun by day, a pale moon in dark mode). In front, the table is laid: the featured thali on a banana leaf,
 * chai in clay kulhads, a steel tumbler, chutneys, whole spices and marigold petals on a madder-printed cloth.
 */
export function JharokhaScene({ katoris, accompaniments, className = '' }: {
  katoris: Gravy[]; accompaniments: readonly Accompaniment[]; className?: string;
}) {
  const id = svgId(useId(), 'jharokha');
  const opening = cuspedArch(104, 496, 278, 96, 520, 9);
  const jali = cuspedArch(84, 516, 278, 74, 500, 9);
  const garland = Array.from({ length: 14 }, (_, i) => {
    const t = i / 13;
    return { x: 86 + 428 * t, y: 176 + 52 * 4 * t * (1 - t) };
  });
  return (
    <svg viewBox="0 0 600 700" className={className} aria-hidden="true" focusable="false" data-art>
      <defs>
        <clipPath id={`${id}-opening`}><path d={opening} /></clipPath>
        <pattern id={`${id}-cloth`} width="64" height="56" patternUnits="userSpaceOnUse">
          <g transform="translate(16 16) rotate(-15) scale(.8)">
            <path d={BUTA} fill="var(--cloth-print)" opacity=".75" />
          </g>
          <g transform="translate(48 44) rotate(165) scale(.8)">
            <path d={BUTA} fill="var(--cloth-print)" opacity=".75" />
          </g>
          <circle cx="48" cy="14" r="2" fill="var(--chilli)" opacity=".7" />
          <circle cx="16" cy="44" r="2" fill="var(--chilli)" opacity=".7" />
        </pattern>
        <pattern id={`${id}-stone`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.2" fill="var(--stone-dark)" opacity=".45" />
          <circle cx="10" cy="10" r=".9" fill="#fff" opacity=".18" />
        </pattern>
      </defs>

      {/* Carved sandstone frame, printed slightly out of register. */}
      <path d="M36 700V258C36 128 168 44 300 20 432 44 564 128 564 258V700Z" fill="var(--stone-dark)" transform="translate(7 6)" />
      <path d="M36 700V258C36 128 168 44 300 20 432 44 564 128 564 258V700Z" fill="var(--stone)" />
      <path d="M36 700V258C36 128 168 44 300 20 432 44 564 128 564 258V700Z" fill={`url(#${id}-stone)`} />
      <path d="M36 700V258C36 128 168 44 300 20 432 44 564 128 564 258V700Z" fill="none" stroke="var(--art-line)" strokeWidth="2.5" />
      <path d={jali} fill="none" stroke="var(--stone-dark)" strokeWidth="5.5" strokeDasharray="0 13" strokeLinecap="round" />
      <path d={jali} fill="none" stroke="var(--art-line)" strokeWidth="1.2" opacity=".45" transform="translate(0 -9) scale(1 1.02)" style={{ transformOrigin: '300px 300px' }} />
      <Buta x={300} y={50} scale={1.4} rotate={180} fill="var(--saffron)" ink="var(--art-line)" />
      {[150, 250, 350, 450].map(y => <g key={y}>
        <Buta x={60} y={y + 30} scale={1.05} fill="var(--turmeric)" ink="var(--art-line)" />
        <Buta x={540} y={y + 30} scale={1.05} rotate={180} fill="var(--turmeric)" ink="var(--art-line)" />
      </g>)}

      {/* The monsoon sky through the window. */}
      <g clipPath={`url(#${id}-opening)`}>
        <rect x="90" y="80" width="420" height="460" fill="var(--sky)" />
        <circle cx="378" cy="214" r="104" fill="none" stroke="var(--sun)" strokeOpacity=".4" strokeWidth="2.4" strokeDasharray="2 9" strokeLinecap="round" />
        <circle cx="378" cy="214" r="66" fill="var(--sun)" />
        <circle cx="378" cy="214" r="66" fill="none" stroke="var(--art-line)" strokeOpacity=".25" strokeWidth="2" />
        <path d="M90 470C150 430 200 450 250 425S360 400 420 430 500 440 520 430V540H90Z" fill="var(--sky-light)" />
        <g fill="var(--sky-light)">
          <circle cx="170" cy="330" r="40" /><circle cx="220" cy="310" r="52" /><circle cx="282" cy="328" r="38" /><rect x="130" y="328" width="190" height="40" rx="20" />
        </g>
        <g fill="var(--cloud)" stroke="var(--art-line)" strokeOpacity=".2" strokeWidth="1.5">
          <path d="M268 286a34 34 0 0 1 52-30 46 46 0 0 1 84 8 32 32 0 0 1 44 32 26 26 0 0 1-4 52H286a32 32 0 0 1-18-62Z" />
        </g>
        <g stroke="var(--rain)" strokeLinecap="round" fill="none">
          <g className="rain-sheet rain-sheet--far" strokeWidth="1.25" opacity=".38">
            <path d={rainSheet(7, 52, 420, 440, 14, 24)} transform="translate(82 80)" />
          </g>
          <g className="rain-sheet" strokeWidth="1.85" opacity=".68">
            <path d={rainSheet(31, 38, 420, 440, 22, 36)} transform="translate(82 80)" />
          </g>
          <g className="rain-sheet rain-sheet--near" strokeWidth="2.4" opacity=".9">
            <path d={rainSheet(73, 18, 420, 440, 32, 48)} transform="translate(82 80)" />
          </g>
        </g>
        <g stroke="var(--rain)" strokeWidth="1.6" strokeLinecap="round" fill="none">
          {[138, 196, 254, 318, 376, 438].map((x, i) => (
            <g key={x} className="rain-splash" style={{ animationDelay: `${(i * .37).toFixed(2)}s` }}>
              <path d={`M${x} 495l-4 -6M${x} 495l5 -5`} />
              <ellipse cx={x} cy="496" rx="7" ry="1.8" strokeWidth="1.2" opacity=".75" />
            </g>
          ))}
        </g>
      </g>
      <path d={opening} fill="none" stroke="var(--art-line)" strokeWidth="3" />

      {/* Marigold and mango-leaf toran draped across the window. */}
      <path d={`M${garland[0].x} ${garland[0].y}Q300 ${176 + 104} ${garland.at(-1)!.x} ${garland.at(-1)!.y}`} fill="none" stroke="var(--art-line)" strokeWidth="2" />
      {garland.map((p, i) => i % 2 === 1 ? <g key={`l${i}`} transform={`translate(${p.x} ${p.y + 6})`}>
        <path d="M0 0C7 7 8 20 0 32-8 20-7 7 0 0Z" fill="var(--leaf)" stroke="var(--art-line)" strokeWidth="1.4" />
        <path d="M0 3V27" stroke="var(--art-line)" strokeWidth="1" />
      </g> : null)}
      {garland.map((p, i) => <Marigold key={`m${i}`} x={p.x} y={p.y} r={i % 2 ? 9 : 11} />)}

      {/* Sill and the block-printed (madder-red Sanganeri) tablecloth. */}
      <rect x="14" y="498" width="572" height="34" fill="var(--stone-dark)" />
      <rect x="14" y="498" width="572" height="9" fill="var(--stone)" stroke="var(--art-line)" strokeWidth="1.5" />
      <rect x="0" y="532" width="600" height="168" fill="var(--cloth)" />
      <rect x="0" y="532" width="600" height="168" fill={`url(#${id}-cloth)`} />
      <rect x="0" y="532" width="600" height="3" fill="var(--art-line)" />
      <path d="M0 546H600" stroke="var(--cloth-print)" strokeWidth="3" strokeDasharray="12 5" />
      <path d="M0 554H600" stroke="var(--saffron)" strokeWidth="1.6" strokeDasharray="2 5" strokeLinecap="round" />

      <Diya x={88} y={498} />

      {/* The meal: thali on a banana leaf, chai in kulhads, a steel tumbler, chutneys and whole spices. */}
      <g transform="translate(342 500)"><BananaLeafArt width={520} height={260} rotate={-5} /></g>
      <ThaliPlateArt katoris={katoris} accompaniments={accompaniments} transform="translate(178 330) scale(.82)" />
      <Kulhad x={62} y={600} scale={.95} />
      <Kulhad x={118} y={650} scale={.82} />
      <SteelTumbler x={556} y={620} scale={.85} />
      <ChutneyBowl x={36} y={674} colour="#4f7a2e" r={17} />
      <ChutneyBowl x={548} y={684} colour="#a8321f" r={15} />

      <g fill="none" stroke="var(--rice)" strokeWidth="3" strokeLinecap="round" opacity=".85">
        <path className="steam" d="M282 352c-9-12 9-20 0-32s9-20 0-32" />
        <path className="steam" d="M334 332c-9-12 9-20 0-32s9-20 0-32" />
        <path className="steam" d="M392 350c-9-12 9-20 0-32s9-20 0-32" />
      </g>
      {([['red-chilli', 160, 684, -20], ['star-anise', 210, 690, 0], ['petal', 186, 668, 40], ['cardamom', 486, 690, 30],
        ['petal', 506, 670, -20], ['clove', 462, 676, 50], ['petal', 22, 600, 10], ['cinnamon', 590, 560, 80], ['petal', 140, 600, 70]] as const)
        .map(([kind, x, y, a], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}><SpiceShape kind={kind} /></g>)}
    </svg>
  );
}

/** Masala dabba: a round steel spice tin from above with seven bowls. Used for "Know your heat". */
export function MasalaDabba({ className = '' }: { className?: string }) {
  const id = svgId(useId(), 'dabba');
  const spices: { name: string; colour: string; seed: 'dust' | 'seed' | 'round' | 'clove' }[] = [
    { name: 'turmeric', colour: '#e5b523', seed: 'dust' },
    { name: 'chilli', colour: '#b3261e', seed: 'dust' },
    { name: 'cumin', colour: '#8a6a3f', seed: 'seed' },
    { name: 'mustard seed', colour: '#3a2418', seed: 'round' },
    { name: 'coriander', colour: '#b9a06a', seed: 'round' },
    { name: 'fenugreek', colour: '#c88a2e', seed: 'seed' },
    { name: 'cloves', colour: '#4e2a1c', seed: 'clove' },
  ];
  const place = (i: number) => i === 0 ? { x: 130, y: 130 } : {
    x: 130 + Math.cos(((i - 1) / 6) * Math.PI * 2 - Math.PI / 2) * 70,
    y: 130 + Math.sin(((i - 1) / 6) * Math.PI * 2 - Math.PI / 2) * 70,
  };
  return (
    <svg viewBox="0 0 260 260" className={className} aria-hidden="true" focusable="false" data-art>
      <defs>
        <pattern id={`${id}-dust`} width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".9" fill="#fff" opacity=".35" /><circle cx="5" cy="5" r=".7" fill="#000" opacity=".18" /></pattern>
        <pattern id={`${id}-seed`} width="9" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><ellipse cx="4" cy="3" rx="3" ry="1.2" fill="#000" opacity=".3" /><ellipse cx="2" cy="7" rx="1.2" ry=".6" fill="#fff" opacity=".3" /></pattern>
        <pattern id={`${id}-round`} width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.8" fill="#000" opacity=".25" /><circle cx="5.5" cy="5.5" r="1.8" fill="#fff" opacity=".2" /></pattern>
        <pattern id={`${id}-clove`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(20)"><path d="M2 5h6M5 2v6" stroke="#000" strokeOpacity=".35" strokeWidth="1.6" strokeLinecap="round" /></pattern>
      </defs>
      <circle cx="137" cy="137" r="124" fill="var(--art-line)" opacity=".22" />
      <circle cx="130" cy="130" r="124" fill="var(--steel-dark)" />
      <circle cx="130" cy="130" r="119" fill="var(--steel)" />
      <circle cx="130" cy="130" r="111" fill="none" stroke="var(--steel-dark)" strokeWidth="2" />
      <path d="M48 70A100 100 0 0 1 130 28" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="5" strokeLinecap="round" />
      {spices.map((spice, i) => {
        const { x, y } = place(i);
        return <g key={spice.name} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
          <circle cx="3" cy="3" r="33" fill="var(--art-line)" opacity=".2" />
          <circle r="33" fill="var(--steel-dark)" />
          <circle r="30" fill="var(--steel)" />
          <circle r="25" fill={spice.colour} stroke="var(--art-line)" strokeOpacity=".4" strokeWidth="1.2" />
          <circle r="25" fill={`url(#${id}-${spice.seed})`} />
        </g>;
      })}
      {/* A small steel spoon resting in the turmeric. */}
      <path d="M131 132 196 62" stroke="var(--steel-dark)" strokeWidth="7" strokeLinecap="round" />
      <path d="M131 132 196 62" stroke="var(--steel)" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="128" cy="135" rx="10" ry="7" transform="rotate(-47 128 135)" fill="var(--steel)" stroke="var(--steel-dark)" strokeWidth="2" />
    </svg>
  );
}

/** Copper handi with steam, for the menu page head. */
export function CopperHandi({ className = '' }: { className?: string }) {
  const id = svgId(useId(), 'handi');
  const body = 'M48 116C38 166 68 206 110 206S182 166 172 116C167 96 152 88 140 86H80C68 88 53 96 48 116Z';
  return (
    <svg viewBox="0 0 220 230" className={className} aria-hidden="true" focusable="false" data-art>
      <defs>
        <clipPath id={`${id}-body`}><path d={body} /></clipPath>
        <pattern id={`${id}-hammer`} width="12" height="11" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2" fill="#fff" opacity=".14" /><circle cx="9" cy="8.5" r="1.4" fill="#000" opacity=".16" /></pattern>
      </defs>
      <ellipse cx="110" cy="214" rx="76" ry="9" fill="var(--art-line)" opacity=".2" />
      <path d={body} fill="var(--copper-dark)" transform="translate(6 5)" />
      <path d={body} fill="var(--copper)" />
      <g clipPath={`url(#${id}-body)`}>
        <rect x="30" y="80" width="160" height="140" fill={`url(#${id}-hammer)`} />
        <path d="M40 128C80 140 140 140 180 128" fill="none" stroke="var(--brass)" strokeWidth="11" />
        <path d="M40 128C80 140 140 140 180 128" fill="none" stroke="var(--art-line)" strokeWidth="1.2" strokeDasharray="1 7" strokeLinecap="round" transform="translate(0 -1)" />
        <path d="M66 118C60 150 72 180 92 194" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="7" strokeLinecap="round" />
      </g>
      <path d={body} fill="none" stroke="var(--art-line)" strokeWidth="2.2" />
      <ellipse cx="110" cy="86" rx="46" ry="10" fill="var(--copper-dark)" stroke="var(--art-line)" strokeWidth="2" />
      <ellipse cx="110" cy="84" rx="36" ry="6.5" fill="#3b1a0b" />
      <ellipse cx="110" cy="86" rx="31" ry="4" fill="#a8321f" opacity=".85" />
      <g fill="none" stroke="var(--muted)" strokeWidth="3.2" strokeLinecap="round" opacity=".7">
        <path className="steam" d="M90 70c-9-11 9-19 0-30s9-19 0-30" />
        <path className="steam" d="M112 66c-9-11 9-19 0-30s9-19 0-30" />
        <path className="steam" d="M134 70c-9-11 9-19 0-30s9-19 0-30" />
      </g>
    </svg>
  );
}

/** Small rain cloud for the 404 and Contact. */
export function RainCloud({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} aria-hidden="true" focusable="false" data-art>
      <path d="M44 86a30 30 0 0 1 22-44 40 40 0 0 1 74-4 28 28 0 0 1 22 48Z" fill="var(--sky-light)" transform="translate(5 5)" />
      <path d="M44 86a30 30 0 0 1 22-44 40 40 0 0 1 74-4 28 28 0 0 1 22 48Z" fill="var(--cloud)" stroke="var(--art-line)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M44 86H162" stroke="var(--art-line)" strokeWidth="2" strokeLinecap="round" />
      <g className="rain-layer" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round">
        <path d="M70 100l-5 13M98 104l-5 13M126 100l-5 13M84 124l-4 10M112 126l-4 10M140 120l-4 10" />
      </g>
    </svg>
  );
}

/** "How to eat a thali" vignettes: dal over rice, roti scooping curry, the sweet to finish. */
export function EatStep({ step, className = '' }: { step: 1 | 2 | 3; className?: string }) {
  const skin = '#b97a4b';
  return (
    <svg viewBox="0 0 160 130" className={className} aria-hidden="true" focusable="false" data-art>
      <ellipse cx="84" cy="96" rx="70" ry="22" fill="var(--brass-dark)" transform="translate(3 4)" opacity=".5" />
      <ellipse cx="80" cy="94" rx="70" ry="22" fill="var(--brass)" stroke="var(--art-line)" strokeWidth="1.6" />
      <ellipse cx="80" cy="92" rx="58" ry="15" fill="var(--brass-light)" />
      {step === 1 ? <>
        <path d="M44 92c0-14 14-20 30-20s30 6 30 20Z" fill="var(--rice)" stroke="var(--art-line)" strokeWidth="1.5" />
        <path d="M60 80c8 6 22 6 30 0" fill="none" stroke="#e2a72e" strokeWidth="6" strokeLinecap="round" />
        <path d="M112 24c-10 6-22 22-28 44" fill="none" stroke="#e2a72e" strokeWidth="5" strokeLinecap="round" />
        <g transform="rotate(-28 122 22)">
          <ellipse cx="122" cy="22" rx="16" ry="9" fill="var(--steel)" stroke="var(--art-line)" strokeWidth="1.5" />
          <ellipse cx="122" cy="20" rx="12" ry="5" fill="#e2a72e" />
          <path d="M138 22h18" stroke="var(--steel-dark)" strokeWidth="5" strokeLinecap="round" />
        </g>
      </> : null}
      {step === 2 ? <>
        <g transform="translate(58 82)">
          <ellipse rx="26" ry="11" fill="var(--brass-dark)" /><ellipse rx="22" ry="8.5" fill="#a8321f" />
          <path d="M-8-2q6-4 12 0" fill="none" stroke="#fbf2dc" strokeWidth="2.2" strokeLinecap="round" />
        </g>
        <path d="M86 50C92 40 110 36 120 44L112 66C102 70 90 64 86 50Z" fill="#d8a766" stroke="var(--art-line)" strokeWidth="1.5" />
        <circle cx="100" cy="50" r="2.2" fill="#8a5a2b" /><circle cx="110" cy="56" r="1.6" fill="#8a5a2b" />
        <path d="M108 40c6-12 18-22 30-22 6 0 10 6 6 12l-8 10c6 2 8 8 4 12-4 6-14 8-22 8" fill={skin} stroke="var(--art-line)" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M128 30l-10 12M134 38l-12 10M130 50l-10 6" stroke="var(--art-line)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M144 30c4 10 4 22-2 30" fill="none" stroke="var(--art-line)" strokeWidth="1.2" />
      </> : null}
      {step === 3 ? <>
        <g transform="translate(80 78)">
          <ellipse cy="10" rx="34" ry="12" fill="var(--brass-dark)" />
          <path d="M-34 0c2 18 66 18 68 0Z" fill="var(--brass)" stroke="var(--art-line)" strokeWidth="1.5" />
          <ellipse rx="34" ry="11" fill="#d99a3d" stroke="var(--art-line)" strokeWidth="1.5" />
          <circle cx="-10" cy="-6" r="12" fill="#5e2a12" stroke="var(--art-line)" strokeWidth="1.2" />
          <circle cx="12" cy="-8" r="12" fill="#6e3317" stroke="var(--art-line)" strokeWidth="1.2" />
          <circle cx="-14" cy="-10" r="3" fill="#fff" opacity=".35" /><circle cx="8" cy="-12" r="3" fill="#fff" opacity=".35" />
        </g>
        <path d="M104 50 136 18" stroke="var(--steel-dark)" strokeWidth="5" strokeLinecap="round" />
        <path d="M104 50 136 18" stroke="var(--steel)" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M70 40c4-8 0-14 4-22M84 36c4-8 0-14 4-22" fill="none" stroke="var(--muted)" strokeWidth="2.4" strokeLinecap="round" opacity=".7" />
      </> : null}
    </svg>
  );
}

/** Logo mark and site icon: a saffron buta-ampersand on a teal roundel with a printed rim. */
export function ButaMark({ className = 'size-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="23" fill="#f2c94c" />
      <circle cx="24" cy="24" r="20.5" fill="#0a3e42" />
      <circle cx="24" cy="24" r="17.5" fill="none" stroke="#f2c94c" strokeWidth="1" strokeDasharray="1 3" strokeLinecap="round" />
      <g transform="translate(24.5 24.5) rotate(-18) scale(1.15)">
        <path d={BUTA} fill="#b3261e" transform="translate(1.4 1.2)" />
        <path d={BUTA} fill="#e8891c" stroke="#fbf3e2" strokeWidth="1.2" strokeLinejoin="round" />
        <path d={BUTA} fill="none" stroke="#fbf3e2" strokeWidth="1" transform="translate(-.6 2.2) scale(.52)" />
        <circle cx="-.8" cy="3.6" r="1.6" fill="#fbf3e2" />
      </g>
    </svg>
  );
}
