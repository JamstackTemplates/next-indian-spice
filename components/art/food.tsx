import { useId } from 'react';
import type { MenuItem, SideArt } from '../../content/menu';
import { Katori } from './thali-plate';

/*
 * Food and tableware, drawn in the same block-print manner as the rest of the site: flat colour,
 * a clove key line and a colour layer nudged out of register. Food colours are fixed (a dal is
 * golden in any light); tableware and cloth come from theme tokens.
 */

const svgId = (raw: string, prefix: string) => `${prefix}-${raw.replace(/[^a-zA-Z0-9_-]/g, '')}`;
const BREAD = '#e2b56c';
const BREAD_DARK = '#c98d43';
const CHAR = '#7a4a22';
const CORIANDER = '#3c6e3a';

/* ---------- Banana leaf ---------- */

/** A cut banana leaf, as thalis are served in the south: midrib, parallel veins and a split edge. Centred on 0,0. */
export function BananaLeafArt({ width = 560, height = 330, rotate = -6 }: { width?: number; height?: number; rotate?: number }) {
  const id = svgId(useId(), 'leaf');
  const w = width / 2;
  const h = height / 2;
  const outline = `M${-w} ${-h * .1}C${-w * .82} ${-h * .95} ${-w * .2} ${-h} ${w * .98} ${-h * .82}L${w} ${h * .86}C${-w * .2} ${h} ${-w * .85} ${h * .9} ${-w} ${-h * .1}Z`;
  const veins = Array.from({ length: Math.floor(width / 15) }, (_, i) => {
    const x = -w + 18 + i * 15;
    return `M${x} ${-h * .06}l${h * .32} ${-h * .98}M${x} ${-h * .02}l${h * .32} ${h * .98}`;
  }).join('');
  return (
    <g transform={`rotate(${rotate})`}>
      <defs><clipPath id={id}><path d={outline} /></clipPath></defs>
      <path d={outline} fill="var(--art-line)" opacity=".25" transform="translate(8 10)" />
      <path d={outline} fill="var(--leaf-dark)" transform="translate(3 3)" />
      <path d={outline} fill="var(--leaf)" />
      <g clipPath={`url(#${id})`}>
        <path d={veins} stroke="var(--leaf-light)" strokeWidth="2" opacity=".55" />
        <path d={`M${-w} ${-h * .4}C${-w * .4} ${-h * .5} ${w * .2} ${-h * .62} ${w} ${-h * .5}`} fill="none" stroke="var(--leaf-light)" strokeWidth="14" opacity=".2" />
        <path d={`M${w * .35} ${h}l${h * .25} ${-h * .55}M${w * .55} ${h}l${h * .2} ${-h * .4}`} stroke="var(--leaf-dark)" strokeWidth="3" />
      </g>
      <path d={`M${-w} ${-h * .08}C${-w * .3} ${-h * .1} ${w * .4} ${-h * .05} ${w} ${-h * .02}`} fill="none" stroke="#c9d98e" strokeWidth="6" strokeLinecap="round" />
      <path d={`M${-w} ${-h * .08}C${-w * .3} ${-h * .1} ${w * .4} ${-h * .05} ${w} ${-h * .02}`} fill="none" stroke="var(--leaf-dark)" strokeWidth="1.2" opacity=".5" transform="translate(0 4)" />
      <path d={outline} fill="none" stroke="var(--art-line)" strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
}

/* ---------- Breads, rice and sides ---------- */

function SideShape({ art }: { art: SideArt }) {
  switch (art) {
    case 'naan':
      return <g>
        <path d="M-25 6C-26-12-6-24 18-21 30-17 30 4 22 14 8 26-22 24-25 6Z" fill={BREAD_DARK} transform="translate(2 2)" />
        <path d="M-25 6C-26-12-6-24 18-21 30-17 30 4 22 14 8 26-22 24-25 6Z" fill={BREAD} stroke="var(--art-line)" strokeWidth="1.6" />
        {[[-12, -6, 3.6], [4, -12, 2.6], [14, 2, 3.2], [-4, 10, 2.4], [-16, 8, 1.8], [8, 14, 1.6]].map(([x, y, r]) =>
          <ellipse key={`${x}${y}`} cx={x} cy={y} rx={r * 1.3} ry={r} fill={CHAR} />)}
        <path d="M-14-12q10-6 22-5" fill="none" stroke="#fff6dd" strokeWidth="2.4" strokeLinecap="round" opacity=".8" />
        <path d="M-4 0l2 1M10-6l1 2M-10 14l2 0" stroke={CORIANDER} strokeWidth="2.2" strokeLinecap="round" />
      </g>;
    case 'roti':
      return <g>
        <circle r="24" fill={BREAD_DARK} transform="translate(2 2)" />
        <circle r="24" fill="#d9a865" stroke="var(--art-line)" strokeWidth="1.6" />
        {[[-9, -8, 3.4], [7, -12, 2.4], [12, 6, 3.6], [-6, 11, 2.6], [-15, 3, 1.8], [2, 0, 1.6], [16, -4, 1.4]].map(([x, y, r]) =>
          <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill={CHAR} />)}
      </g>;
    case 'paratha':
      return <g>
        <circle r="24" fill={BREAD_DARK} transform="translate(2 2)" />
        <circle r="24" fill="#e9c27e" stroke="var(--art-line)" strokeWidth="1.6" />
        <path d="M0 0a3 3 0 0 1 6 0 7 7 0 0 1-13 1 11 11 0 0 1 20-4 15 15 0 0 1-26 9" fill="none" stroke={BREAD_DARK} strokeWidth="2" strokeLinecap="round" />
        {[[10, 12], [-14, -8], [14, -10]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2" fill={CHAR} />)}
      </g>;
    case 'rice':
    case 'pulao':
      return <g>
        <circle r="26" fill="var(--steel-dark)" /><circle r="23" fill="var(--steel)" />
        <path d="M-18 4C-20-10-6-18 4-17 16-16 20-6 18 4 14 14-14 15-18 4Z" fill={art === 'pulao' ? '#f6e3b0' : 'var(--rice)'} stroke="var(--art-line)" strokeWidth="1.3" />
        {(art === 'pulao'
          ? [[-8, -6, 30, '#e8891c'], [6, -10, -20, '#e8891c'], [10, 2, 60, '#e9b420'], [-2, 6, 0, '#e8891c']]
          : [[-8, -6, 30, '#ddd3bb'], [6, -10, -20, '#ddd3bb'], [10, 2, 60, '#ddd3bb'], [-2, 6, 0, '#ddd3bb']]
        ).map(([x, y, a, c]) => <rect key={`${x}${y}`} x={+x - 3.5} y={+y - 1.3} width="7" height="2.6" rx="1.3" transform={`rotate(${a} ${x} ${y})`} fill={c as string} />)}
        {art === 'pulao' ? <path d="M-12 0c-2-4 2-7 5-5M8 8c-1-4 3-6 5-4" fill="none" stroke="#c9934c" strokeWidth="3" strokeLinecap="round" /> : null}
        <ellipse cx="-4" cy="-12" rx="3" ry="6" transform="rotate(-40 -4 -12)" fill={CORIANDER} />
      </g>;
    case 'raita':
      return <g>
        <circle r="26" fill="var(--steel-dark)" /><circle r="23" fill="var(--steel)" /><circle r="19" fill="#f6f1e4" />
        <path d="M-8-6l5 4M4-10l4 5M-10 6l6-2M6 6l5 3M0 0l2 4" stroke={CORIANDER} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M-12 -2q12-8 22 2" fill="none" stroke="#b38957" strokeWidth="1.6" strokeDasharray="1 3" strokeLinecap="round" />
      </g>;
    case 'pickle':
      return <g>
        <path d="M-17-10C-22 4-18 22 0 23 18 22 22 4 17-10Z" fill="#8c4a26" transform="translate(2 2)" />
        <path d="M-17-10C-22 4-18 22 0 23 18 22 22 4 17-10Z" fill="#f2e2bd" stroke="var(--art-line)" strokeWidth="1.6" />
        <path d="M-19 6C-14 12 14 12 19 6 18 18 10 23 0 23-10 23-18 18-19 6Z" fill="#8c4a26" />
        <rect x="-15" y="-19" width="30" height="10" rx="3" fill="var(--clay)" stroke="var(--art-line)" strokeWidth="1.4" />
        <path d="M-8-4c6 4 12 4 16 0" fill="none" stroke="#c46a1b" strokeWidth="5" strokeLinecap="round" />
      </g>;
  }
}

/** A dish drawn for its menu line: curries in their katori, breads, rice and sides by kind. Decorative. */
export function DishArt({ item, className = 'size-16' }: { item: Pick<MenuItem, 'gravy' | 'art'>; className?: string }) {
  return (
    <svg viewBox="-32 -32 66 66" className={className} aria-hidden="true" focusable="false" data-art>
      {item.art ? <SideShape art={item.art} /> : item.gravy ? <Katori gravy={item.gravy} r={28} /> : null}
    </svg>
  );
}

/* ---------- Table things ---------- */

/** Clay kulhad of chai, seen from the front, with a little steam. */
export function Kulhad({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cy="25" rx="20" ry="5" fill="var(--art-line)" opacity=".22" />
      <path d="M-20-20 20-20 15 22Q0 27-15 22Z" fill="var(--clay-dark)" transform="translate(3 2)" />
      <path d="M-20-20 20-20 15 22Q0 27-15 22Z" fill="var(--clay)" stroke="var(--art-line)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M-17-8h34M-16 4h31" stroke="var(--clay-dark)" strokeWidth="1.5" opacity=".7" />
      <ellipse cy="-20" rx="20" ry="5.5" fill="var(--clay-dark)" stroke="var(--art-line)" strokeWidth="1.6" />
      <ellipse cy="-19.4" rx="16.5" ry="4" fill="#c58a54" />
      <path d="M-8-20q4-1.6 8 0" stroke="#efd5ae" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <g fill="none" stroke="var(--rice)" strokeWidth="2.4" strokeLinecap="round" opacity=".8">
        <path className="steam" d="M-4-30c-6-7 6-12 0-19" /><path className="steam" d="M6-28c-6-7 6-12 0-19" />
      </g>
    </g>
  );
}

/** South Indian steel tumbler standing in its davara. */
export function SteelTumbler({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cy="30" rx="30" ry="7" fill="var(--art-line)" opacity=".2" />
      <path d="M-28 16Q0 34 28 16L24 26Q0 38-24 26Z" fill="var(--steel-dark)" stroke="var(--art-line)" strokeWidth="1.4" />
      <ellipse cy="16" rx="28" ry="7" fill="var(--steel)" stroke="var(--art-line)" strokeWidth="1.4" />
      <path d="M-14-30 14-30 11 18Q0 21-11 18Z" fill="var(--steel)" stroke="var(--art-line)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M-7-26-5 14" stroke="#fff" strokeWidth="3" opacity=".55" strokeLinecap="round" />
      <ellipse cy="-30" rx="14" ry="3.6" fill="#8a5a30" stroke="var(--art-line)" strokeWidth="1.4" />
      <path d="M-6-30.5q6-2 11 0" stroke="#e7c9a0" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** Small steel bowl of chutney from above. */
export function ChutneyBowl({ x, y, colour, r = 18 }: { x: number; y: number; colour: string; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="2.5" cy="3" r={r + 1} fill="var(--art-line)" opacity=".22" />
      <circle r={r} fill="var(--steel-dark)" /><circle r={r - 2.5} fill="var(--steel)" /><circle r={r - 6} fill={colour} />
      <path d={`M${-r * .3} ${-r * .15}q${r * .3}-${r * .25} ${r * .55} 0`} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/** Oil lamp with a flickering flame and a soft glow. */
export function Diya({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cy="-30" r="34" fill="var(--turmeric)" opacity=".2" />
      <circle cy="-30" r="20" fill="var(--turmeric)" opacity=".22" />
      <g className="flame">
        <path d="M0-12C-8-21-3-35 0-44 3-35 8-21 0-12Z" fill="var(--saffron)" stroke="var(--art-line)" strokeWidth="1.2" />
        <path d="M0-16C-3-21-1-28 0-33 1-28 3-21 0-16Z" fill="#fff1b8" />
      </g>
      <path d="M-30-8C-24 8 24 8 32-8Z" fill="var(--clay)" stroke="var(--art-line)" strokeWidth="1.5" />
      <path d="M-30-8H36L30-13" fill="none" stroke="var(--art-line)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M-18-2h4M-6 0h4M6 0h4M18-2h4" stroke="var(--turmeric)" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
}

/* ---------- Whole spices ---------- */

type Spice = 'star-anise' | 'cardamom' | 'cinnamon' | 'clove' | 'red-chilli' | 'green-chilli' | 'bay-leaf' | 'pepper' | 'petal' | 'curry-leaf';

export function SpiceShape({ kind }: { kind: Spice }) {
  switch (kind) {
    case 'star-anise':
      return <g>
        {Array.from({ length: 8 }, (_, i) => <path key={i} d="M0 0C-3.4-4-3-10 0-14 3-10 3.4-4 0 0Z" fill="#6b3518" stroke="var(--art-line)" strokeWidth="1" transform={`rotate(${i * 45})`} />)}
        {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="0" cy="-7" rx="1.5" ry="2.4" fill="#c58a4e" transform={`rotate(${i * 45})`} />)}
        <circle r="2.2" fill="#3d1c0c" />
      </g>;
    case 'cardamom':
      return <g><path d="M-11 0C-8-6 6-7 12 0 6 7-8 6-11 0Z" fill="#8ea25c" stroke="var(--art-line)" strokeWidth="1.1" />
        <path d="M-7-1q8-3 16 0M-7 2q8 2 16-1" fill="none" stroke="#5f7234" strokeWidth="1" /><path d="M12 0l3 0" stroke="#5f7234" strokeWidth="1.6" strokeLinecap="round" /></g>;
    case 'cinnamon':
      return <g><rect x="-22" y="-5" width="44" height="10" rx="3" fill="#9b5a2c" stroke="var(--art-line)" strokeWidth="1.1" />
        <path d="M-22 0h44M-14-5v10M6-5v10" stroke="#6e3a17" strokeWidth="1" /><ellipse cx="22" cy="0" rx="2.6" ry="5" fill="#c08350" stroke="var(--art-line)" strokeWidth="1" /></g>;
    case 'clove':
      return <g><path d="M0 0v13" stroke="#4e2a1c" strokeWidth="2.6" strokeLinecap="round" /><circle cy="-2" r="3.4" fill="#4e2a1c" />
        <path d="M-3-1-5-4M3-1l2-3M0-5v-3" stroke="#4e2a1c" strokeWidth="1.6" strokeLinecap="round" /></g>;
    case 'red-chilli':
      return <g><path d="M-18 2C-10-8 8-8 18-4 10 4-6 8-18 2Z" fill="#a3261a" stroke="var(--art-line)" strokeWidth="1.1" />
        <path d="M-12-1q10-5 22-2" fill="none" stroke="#e05a3f" strokeWidth="1.6" strokeLinecap="round" /><path d="M18-4c3-1 5 1 7-1" stroke="#4f6b2a" strokeWidth="2.4" strokeLinecap="round" fill="none" /></g>;
    case 'green-chilli':
      return <g><path d="M-20 3C-10-6 8-7 19-3 10 5-6 8-20 3Z" fill="#4f8a2a" stroke="var(--art-line)" strokeWidth="1.1" />
        <path d="M-13 0q10-4 22-2" fill="none" stroke="#8fc45a" strokeWidth="1.6" strokeLinecap="round" /><path d="M19-3c3-1 4 2 7 0" stroke="#3a5a1e" strokeWidth="2.4" strokeLinecap="round" fill="none" /></g>;
    case 'bay-leaf':
      return <g><path d="M-18 0C-10-8 10-8 18 0 10 8-10 8-18 0Z" fill="#7d8a4a" stroke="var(--art-line)" strokeWidth="1.1" /><path d="M-16 0h32" stroke="#5a6534" strokeWidth="1" /></g>;
    case 'curry-leaf':
      return <g><path d="M-10 0C-5-5 5-5 10 0 5 5-5 5-10 0Z" fill="#3c6e3a" stroke="var(--art-line)" strokeWidth="1" /><path d="M-9 0h18" stroke="#6fa34a" strokeWidth=".9" /></g>;
    case 'pepper':
      return <g>{[[0, 0], [5, 2], [2, 6], [-4, 4], [8, -3]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.2" fill="#2b1a12" />)}</g>;
    case 'petal':
      return <ellipse rx="5" ry="2.6" fill="var(--saffron)" stroke="var(--art-line)" strokeWidth=".7" />;
  }
}

const ROW: [Spice, number, number, number][] = [
  ['red-chilli', 34, 46, -18], ['petal', 70, 70, 30], ['star-anise', 96, 40, 10], ['clove', 132, 62, 40], ['cardamom', 160, 34, 20],
  ['pepper', 186, 66, 0], ['cinnamon', 232, 48, -12], ['petal', 270, 26, -40], ['curry-leaf', 290, 68, 30], ['bay-leaf', 330, 38, 22],
  ['green-chilli', 376, 62, 12], ['petal', 404, 30, 70], ['clove', 424, 48, -30], ['cardamom', 456, 70, -20], ['star-anise', 486, 38, -8],
  ['petal', 512, 66, 10], ['red-chilli', 548, 46, 160], ['pepper', 578, 26, 0],
];

/** Whole spices spilled along a strip of cloth. Decorative. */
export function SpiceScatter({ className = '', count = ROW.length }: { className?: string; count?: number }) {
  const items = ROW.slice(0, count);
  const width = items.at(-1)![1] + 34;
  return (
    <svg viewBox={`0 0 ${width} 96`} className={className} aria-hidden="true" focusable="false" data-art>
      {items.map(([kind, x, y, a], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}><SpiceShape kind={kind} /></g>)}
    </svg>
  );
}

/* ---------- Rangoli ---------- */

/** Rangoli drawn at the door to welcome guests: rings of coloured powder with a rice-flour outline and a diya at the centre. */
export function Rangoli({ className = '' }: { className?: string }) {
  const ring = (count: number, radius: number, d: string, fill: string, offset = 0) =>
    Array.from({ length: count }, (_, i) => (
      <path key={i} d={d} fill={fill} stroke="#fffaf0" strokeWidth="1.6" strokeLinejoin="round"
        transform={`rotate(${(i * 360) / count + offset}) translate(0 ${-radius})`} />
    ));
  const petal = (len: number, wide: number) => `M0 0C${-wide} ${-len * .35} ${-wide * .6} ${-len * .85} 0 ${-len}C${wide * .6} ${-len * .85} ${wide} ${-len * .35} 0 0Z`;
  return (
    <svg viewBox="-160 -160 320 320" className={className} aria-hidden="true" focusable="false" data-art>
      <circle r="156" fill="var(--art-line)" opacity=".12" transform="translate(5 6)" />
      {ring(24, 128, 'M-17 0A17 17 0 0 1 17 0Z', 'var(--turmeric)')}
      <circle r="128" fill="var(--rani)" stroke="#fffaf0" strokeWidth="2" />
      <circle r="120" fill="none" stroke="#fffaf0" strokeWidth="3.4" strokeDasharray="0 11" strokeLinecap="round" />
      {ring(16, 72, petal(44, 15), 'var(--leaf)')}
      <circle r="78" fill="var(--saffron)" stroke="#fffaf0" strokeWidth="2" />
      {ring(12, 26, petal(48, 16), 'var(--rani)', 15)}
      {ring(12, 28, petal(40, 12), 'var(--turmeric)')}
      <circle r="30" fill="var(--teal)" stroke="#fffaf0" strokeWidth="2" />
      <circle r="24" fill="none" stroke="#fffaf0" strokeWidth="2.6" strokeDasharray="0 7.5" strokeLinecap="round" />
      <Diya x={0} y={14} scale={.55} />
    </svg>
  );
}
