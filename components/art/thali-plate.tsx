import { useId } from 'react';
import { GRAVIES, type Gravy } from '../../content/menu';
import type { Accompaniment } from '../../content/thalis';
import { BananaLeafArt } from './food';

/*
 * The signature element: a top-down brass thali drawn from its data.
 * Katoris (bowls) sit around the upper rim, one per dish, painted in that dish's gravy colour.
 * Rice, roti, papad, pickle, raita and the sweet sit in fixed places in the lower half of the plate.
 * Hovering or focusing the matching dish in the list (data-k) lifts its katori; see tailwind.input.css.
 */

const ROTI = '#d8a766';
const CHAR = '#8a5a2b';
const CORIANDER = '#3c6e3a';

export interface PlateProps {
  /** Gravy colour of each katori, in list order. 0 katoris draws an empty, finished plate. */
  katoris: Gravy[];
  accompaniments?: readonly Accompaniment[];
}

function katoriLayout(count: number) {
  const span = count <= 3 ? 140 : count === 4 ? 180 : 204;
  const radius = count === 5 ? 40 : 45;
  return Array.from({ length: count }, (_, i) => {
    const angle = (270 - span / 2 + (count === 1 ? span / 2 : (i * span) / (count - 1))) * (Math.PI / 180);
    return { x: 200 + Math.cos(angle) * 111, y: 200 + Math.sin(angle) * 111, r: radius };
  });
}

function Garnish({ gravy, r }: { gravy: Gravy; r: number }) {
  const cream = gravy === 'cream';
  return <>
    {/* Oil sheen and a swirl of cream (or a tempering of mustard seed on the coconut gravies). */}
    <path d={`M${-r * .55} ${-r * .2}A${r * .6} ${r * .6} 0 0 1 ${r * .2} ${-r * .58}`} fill="none" stroke="#fff" strokeOpacity={.35} strokeWidth={2.4} strokeLinecap="round" />
    {cream
      ? [[-6, 4], [3, -2], [7, 7], [-2, 10], [-9, -4]].map(([x, y]) => <circle key={`${x}${y}`} cx={x * r / 40} cy={y * r / 40} r={1.6} fill="#5a2c14" />)
      : <path d={`M${-r * .38} ${r * .12}c${r * .12} ${-r * .3} ${r * .5} ${-r * .3} ${r * .5} 0s${-r * .26} ${r * .3} ${-r * .06} ${r * .28}`} fill="none" stroke="#fbf2dc" strokeWidth={2.6} strokeLinecap="round" />}
    {[[r * .28, r * .28, 30], [r * .4, r * .02, -40], [-r * .12, -r * .38, 70]].map(([x, y, a]) =>
      <ellipse key={`${x}${y}`} cx={x} cy={y} rx={2.6} ry={4.4} transform={`rotate(${a} ${x} ${y})`} fill={gravy === 'green' ? '#f3e6c4' : CORIANDER} />)}
  </>;
}

/** One brass katori seen from above, centred on 0,0: rim, gravy and its garnish. */
export function Katori({ gravy, r }: { gravy: Gravy; r: number }) {
  return <>
    <circle cx={r * .09} cy={r * .11} r={r + 1} fill="var(--art-line)" opacity=".28" />
    <circle r={r} fill="var(--brass-dark)" />
    <circle r={r - 3} fill="var(--brass-light)" />
    <circle r={r - 8} fill={GRAVIES[gravy]} stroke="var(--art-line)" strokeOpacity=".5" strokeWidth="1.2" />
    <Garnish gravy={gravy} r={r - 8} />
  </>;
}

/** A `<g>` drawing of the plate in a 400 × 400 box, for embedding in larger scenes. */
export function ThaliPlateArt({ katoris, accompaniments = ['rice', 'roti'], transform }: PlateProps & { transform?: string }) {
  const id = `plate-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const has = (item: Accompaniment) => accompaniments.includes(item);
  const bowls = katoriLayout(katoris.length);
  const empty = katoris.length === 0;
  return (
    <g transform={transform}>
      <defs>
        <pattern id={`${id}-hammer`} width="13" height="11" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.5" fill="var(--brass-light)" opacity=".55" />
          <circle cx="9.5" cy="8.5" r="1.1" fill="var(--brass-dark)" opacity=".28" />
        </pattern>
        <pattern id={`${id}-grain`} width="10" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <path d="M2 3h4M6 7.5h3.5" stroke="#d9cfb6" strokeWidth="1.6" strokeLinecap="round" />
        </pattern>
      </defs>
      {/* Plate: print offset, rim rings, engraved dots and a hammered bed. */}
      <circle cx="207" cy="208" r="190" fill="var(--art-line)" opacity=".22" />
      <circle cx="200" cy="200" r="190" fill="var(--brass-dark)" />
      <circle cx="200" cy="200" r="185" fill="var(--brass)" />
      <circle cx="200" cy="200" r="176.5" fill="none" stroke="var(--brass-dark)" strokeWidth="3.2" strokeDasharray="0 9.24" strokeLinecap="round" />
      <circle cx="200" cy="200" r="167" fill="var(--brass-light)" stroke="var(--brass-dark)" strokeWidth="2" />
      <circle cx="200" cy="200" r="160" fill="var(--brass)" />
      <circle cx="200" cy="200" r="160" fill={`url(#${id}-hammer)`} />
      <circle cx="200" cy="200" r="118" fill="none" stroke="var(--brass-dark)" strokeOpacity=".22" strokeWidth="1.4" />
      <circle cx="200" cy="200" r="72" fill="none" stroke="var(--brass-dark)" strokeOpacity=".18" strokeWidth="1.4" />
      <path d="M86 112A145 145 0 0 1 200 55" fill="none" stroke="#fff" strokeOpacity=".28" strokeWidth="6" strokeLinecap="round" />

      {empty ? <g>
        {/* Finished plate: a curry-leaf sprig and three grains of rice. */}
        <path d="M150 230C178 210 214 204 250 214" fill="none" stroke={CORIANDER} strokeWidth="2.6" strokeLinecap="round" />
        {[[168, 218, -60], [186, 211, 70], [204, 208, -65], [222, 208, 60], [240, 211, -55]].map(([x, y, a]) =>
          <ellipse key={x} cx={x} cy={y} rx="5" ry="11" transform={`rotate(${a} ${x} ${y})`} fill={CORIANDER} stroke="var(--art-line)" strokeWidth="1.2" />)}
        {[[180, 268, 20], [206, 278, -30], [228, 262, 60]].map(([x, y, a]) =>
          <rect key={x} x={x - 6} y={y - 2.4} width="12" height="4.8" rx="2.4" transform={`rotate(${a} ${x} ${y})`} fill="var(--rice)" stroke="var(--art-line)" strokeWidth="1" />)}
        <path d="M150 300q50 18 100 0" fill="none" stroke="var(--brass-dark)" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" />
      </g> : null}

      {!empty && has('papad') ? <g transform="translate(286 298) scale(.86)">
        <circle r="33" fill="#efd9a0" stroke="var(--art-line)" strokeWidth="1.5" />
        <circle r="33" fill="none" stroke="#c9a65a" strokeWidth="1" strokeDasharray="1 3.4" transform="scale(.82)" />
        {[[-12, -8], [6, -16], [14, 6], [-4, 12], [-18, 9], [20, -6], [2, -2]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.3" fill="#3a2418" />)}
        <path d="M-8 -30l4 12-6 8 5 10" fill="none" stroke="#b58e45" strokeWidth="1.3" />
      </g> : null}

      {!empty && has('roti') ? <g transform="translate(116 290) rotate(-22)">
        <path d="M-6 6H58A64 64 0 0 0-6-58Z" fill={ROTI} stroke="var(--art-line)" strokeWidth="1.5" transform="translate(6 -4)" />
        <path d="M0 0H60A60 60 0 0 0 0-60Z" fill={ROTI} stroke="var(--art-line)" strokeWidth="1.6" />
        {[[14, -14, 3.4], [30, -8, 2.4], [22, -30, 2.6], [40, -22, 2], [10, -40, 2.2], [44, -6, 1.6]].map(([x, y, r]) => <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill={CHAR} />)}
        <path d="M6 -6H48" stroke="#fff" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round" />
      </g> : null}

      {!empty && has('rice') ? <g transform="translate(202 252)">
        <path d="M-50 4C-54-20-30-38-4-37 22-40 50-26 50-2 52 22 26 36 0 36-26 37-48 26-50 4Z" fill="var(--rice)" stroke="var(--art-line)" strokeWidth="1.6" />
        <path d="M-50 4C-54-20-30-38-4-37 22-40 50-26 50-2 52 22 26 36 0 36-26 37-48 26-50 4Z" fill={`url(#${id}-grain)`} />
        {[[-12, -12, 30], [8, -20, -20], [18, 6, 50], [-26, 8, -40], [2, 14, 10]].map(([x, y, a]) =>
          <rect key={`${x}${y}`} x={x - 4} y={y - 1.6} width="8" height="3.2" rx="1.6" transform={`rotate(${a} ${x} ${y})`} fill="var(--saffron)" />)}
        <ellipse cx="-6" cy="-14" rx="4.5" ry="9" transform="rotate(-40 -6 -14)" fill={CORIANDER} />
      </g> : null}

      {!empty && has('raita') ? <g transform="translate(160 333)">
        <circle r="20" fill="var(--steel-dark)" /><circle r="17" fill="var(--steel)" /><circle r="13.5" fill="#f4efe2" />
        <path d="M-6 -3l4 4M3-6l3 4M-1 6l4-2" stroke={CORIANDER} strokeWidth="1.8" strokeLinecap="round" />
      </g> : null}

      {!empty && has('pickle') ? <g transform="translate(206 340)">
        <path d="M-14 4C-12-8 4-12 13-4 10 6-2 12-14 4Z" fill="#c46a1b" stroke="var(--art-line)" strokeWidth="1.3" />
        <path d="M-8 2C-4-4 4-5 7-2" fill="none" stroke="#f0b062" strokeWidth="1.6" strokeLinecap="round" />
      </g> : null}

      {!empty && has('sweet') ? <g transform="translate(250 330)">
        <circle r="19" fill="var(--brass-dark)" /><circle r="16" fill="var(--brass-light)" /><circle r="13" fill="#d99a3d" />
        <circle cx="-4.5" cy="1" r="6.2" fill="#5e2a12" /><circle cx="5" cy="-2" r="6.2" fill="#6e3317" />
        <circle cx="-6" cy="-1" r="1.6" fill="#fff" opacity=".35" /><circle cx="3.4" cy="-4" r="1.6" fill="#fff" opacity=".35" />
      </g> : null}

      {bowls.map((bowl, k) => (
        <g key={k} transform={`translate(${bowl.x.toFixed(1)} ${bowl.y.toFixed(1)})`}>
         <g className="thali-katori" data-k={k}>
          <circle className="katori-ring" r={bowl.r + 7} fill="none" stroke="var(--saffron)" strokeWidth="3.5" strokeDasharray="7 5" />
          <Katori gravy={katoris[k]} r={bowl.r} />
         </g>
        </g>
      ))}
    </g>
  );
}

/** Standalone plate, optionally served on a banana leaf. Decorative: callers list the dishes in text beside it. */
export function ThaliPlate({ katoris, accompaniments, className = '', leaf = false }: PlateProps & { className?: string; leaf?: boolean }) {
  return (
    <svg viewBox={leaf ? '-112 -6 624 412' : '-12 -12 426 428'} className={className} aria-hidden="true" focusable="false" data-art>
      {leaf ? <g transform="translate(200 200)"><BananaLeafArt width={600} height={330} rotate={-7} /></g> : null}
      <ThaliPlateArt katoris={katoris} accompaniments={accompaniments} transform={leaf ? 'translate(24 18) scale(.88)' : undefined} />
    </svg>
  );
}
