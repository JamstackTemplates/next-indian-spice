import { useId, type ReactNode } from 'react';
import type { Stamp } from '../../content/menu';

/*
 * Block-print vocabulary shared by every page. Each motif is printed twice, like a hand-carved wooden block:
 * a colour layer nudged 1–2px out of register, then the key line on top. No gradients anywhere.
 */

/** Paisley (buta) centred on 0,0, about 16 × 21. */
export const BUTA = 'M0 10C-6.5 10-9 4.5-7-.5-5-5.5.5-6 3.5-10.5 5.5-6.5 5.5-2.5 4 .5 7.5 3 6 10 0 10Z';

function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
}

/** One buta with its offset colour layer, inner outline and seed. */
export function Buta({ x = 0, y = 0, scale = 1, rotate = 0, fill = 'var(--saffron)', ink = 'currentColor' }: {
  x?: number; y?: number; scale?: number; rotate?: number; fill?: string; ink?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d={BUTA} fill={fill} transform="translate(1.3 1)" />
      <path d={BUTA} fill="none" stroke={ink} strokeWidth={1.4} strokeLinejoin="round" />
      <path d={BUTA} fill="none" stroke={ink} strokeWidth={1.1} transform="translate(-.6 2.2) scale(.52)" />
      <circle cx={-.8} cy={3.6} r={1.5} fill={ink} />
    </g>
  );
}

type BorderKind = 'buta' | 'toran' | 'lotus' | 'rain';
const HEIGHT: Record<BorderKind, number> = { buta: 30, toran: 46, lotus: 30, rain: 22 };

/**
 * A full-width printed border that repeats horizontally.
 * `fill` is the colour layer and `ink` the key line; both default to theme tokens and currentColor.
 */
export function PrintBorder({ kind, fill, ink = 'currentColor', className = '', flip = false }: {
  kind: BorderKind; fill?: string; ink?: string; className?: string; flip?: boolean;
}) {
  const id = useSvgId(kind);
  const h = HEIGHT[kind];
  let tile: ReactNode;
  let w: number;
  switch (kind) {
    case 'buta':
      w = 46;
      tile = <>
        <Buta x={23} y={15} scale={.95} rotate={-8} fill={fill ?? 'var(--saffron)'} ink={ink} />
        <circle cx={0} cy={15} r={2} fill={ink} />
        <circle cx={46} cy={15} r={2} fill={ink} />
        <circle cx={0} cy={15} r={4.2} fill="none" stroke={fill ?? 'var(--saffron)'} strokeWidth={1.2} />
        <circle cx={46} cy={15} r={4.2} fill="none" stroke={fill ?? 'var(--saffron)'} strokeWidth={1.2} />
      </>;
      break;
    case 'toran': {
      w = 64;
      const leaf = 'M0 0C6 6 6.5 17 0 26-6.5 17-6 6 0 0Z';
      const marigold = (cx: number, cy: number) => <g transform={`translate(${cx} ${cy})`}>
        {Array.from({ length: 9 }, (_, i) => {
          const a = (i / 9) * Math.PI * 2;
          return <circle key={i} cx={+(Math.cos(a) * 4.6).toFixed(2)} cy={+(Math.sin(a) * 4.6).toFixed(2)} r={3.3} fill="var(--saffron)" />;
        })}
        <circle r={4.4} fill="var(--turmeric)" />
        <circle r={1.6} fill={ink} />
      </g>;
      tile = <>
        <path d="M0 5C21 13 43 13 64 5" fill="none" stroke={ink} strokeWidth={1.6} />
        {[16, 48].map(x => <g key={x} transform={`translate(${x} 10)`}>
          <path d={leaf} fill={fill ?? 'var(--leaf)'} transform="translate(1.4 1.2)" />
          <path d={leaf} fill="none" stroke={ink} strokeWidth={1.3} />
          <path d="M0 2V22" stroke={ink} strokeWidth={1} />
        </g>)}
        {marigold(32, 12)}
        {marigold(0, 6)}
        {marigold(64, 6)}
      </>;
      break;
    }
    case 'lotus': {
      w = 52;
      const petal = 'M0 0C-5-6-4.4-14 0-18 4.4-14 5-6 0 0Z';
      tile = <>
        <g transform="translate(26 23)">
          {[-48, 48, 0].map(r => <g key={r} transform={`rotate(${r})`}>
            <path d={petal} fill={fill ?? 'var(--saffron)'} transform="translate(1.2 1)" />
            <path d={petal} fill="none" stroke={ink} strokeWidth={1.3} strokeLinejoin="round" />
          </g>)}
          <path d="M-12 1.5Q0 6 12 1.5" fill="none" stroke={ink} strokeWidth={1.4} strokeLinecap="round" />
        </g>
        <circle cx={0} cy={22} r={2.2} fill={ink} />
        <circle cx={52} cy={22} r={2.2} fill={ink} />
        <circle cx={0} cy={13} r={1.2} fill={fill ?? 'var(--saffron)'} />
        <circle cx={52} cy={13} r={1.2} fill={fill ?? 'var(--saffron)'} />
      </>;
      break;
    }
    case 'rain':
      w = 22;
      tile = <g stroke={ink} strokeWidth={1.7} strokeLinecap="round" fill="none">
        <path d="M15 2l-3.6 8.5M6 11l-3 7" />
        <path d="M18 15.5s2.2 2.6 2.2 4a2.2 2.2 0 0 1-4.4 0c0-1.4 2.2-4 2.2-4z" fill={fill ?? 'currentColor'} stroke="none" />
      </g>;
      break;
  }
  return (
    <svg className={`block w-full ${className}`} height={h} aria-hidden="true" focusable="false" data-art
      style={flip ? { transform: 'scaleY(-1)' } : undefined}>
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse" x="50%">{tile}</pattern>
      </defs>
      {kind === 'buta' ? <>
        <rect x="0" y="1" width="100%" height="1.5" fill={ink} />
        <rect x="0" y={h - 2.5} width="100%" height="1.5" fill={ink} />
      </> : null}
      <rect width="100%" height={h} fill={`url(#${id})`} />
    </svg>
  );
}

/** Mughal cusped (multifoil) arch opening from (x0, spring) to (x1, spring), peaking at apex. */
export function cuspedArch(x0: number, x1: number, spring: number, apex: number, bottom: number, lobes = 9): string {
  const points: [number, number][] = [];
  for (let i = 0; i <= lobes; i++) {
    const t = i / lobes;
    const rise = 1 - Math.pow(Math.abs(2 * t - 1), 1.45);
    points.push([x0 + (x1 - x0) * t, spring - (spring - apex) * rise]);
  }
  let d = `M${x0} ${bottom}V${spring}`;
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i];
    const [px, py] = points[i - 1];
    const r = (Math.hypot(x - px, y - py) / 2) * 1.08;
    d += `A${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d}V${bottom}Z`;
}

const ROTATE = (d: string, angle: number, cx = 32, cy = 32) => ({ d, transform: `rotate(${angle} ${cx} ${cy})` });

function Motif({ stamp, tone, ink }: { stamp: Stamp; tone: string; ink: string }) {
  const off = 'translate(1.6 1.4)';
  switch (stamp) {
    case 'wheat': {
      const grains: [number, number, number][] = [[28, 19, -32], [36.5, 21, 32], [27.5, 28, -32], [36.5, 30, 32], [27.8, 37, -32], [36.3, 39, 32], [32.6, 12.5, 0]];
      return <>
        <path d="M32.5 55C32 42 32 28 32.8 14" fill="none" stroke={ink} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M32.3 50C25 47 21 42 19.5 35M32.6 48C39 46 43 41 44.5 35" fill="none" stroke={ink} strokeWidth={1.6} strokeLinecap="round" />
        {grains.map(([x, y, r]) => <g key={`${x}${y}`} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx={3.4} ry={6} fill={tone} transform={off} />
          <ellipse cx={x} cy={y} rx={3.4} ry={6} fill="none" stroke={ink} strokeWidth={1.5} />
        </g>)}
        <path d="M32.6 7V3M29.5 8l-2-3.4M35.8 8l2-3.4" stroke={ink} strokeWidth={1.3} strokeLinecap="round" />
      </>;
    }
    case 'chinar': {
      const lobe = (len: number, wide: number) => `M32 40C${32 + wide} ${40 - len * .35} ${32 + wide * .7} ${40 - len * .8} 32 ${40 - len}C${32 - wide * .7} ${40 - len * .8} ${32 - wide} ${40 - len * .35} 32 40Z`;
      const lobes = [ROTATE(lobe(30, 9), 0, 32, 40), ROTATE(lobe(24, 8), -52, 32, 40), ROTATE(lobe(24, 8), 52, 32, 40), ROTATE(lobe(15, 6), -105, 32, 40), ROTATE(lobe(15, 6), 105, 32, 40)];
      return <>
        <g transform={off}>{lobes.map((l, i) => <path key={i} {...l} fill={tone} />)}</g>
        <g fill="none" stroke={ink} strokeWidth={2.4} strokeLinejoin="round">{lobes.map((l, i) => <path key={i} {...l} />)}</g>
        <g fill={tone}>{lobes.map((l, i) => <path key={i} {...l} />)}</g>
        <g stroke={ink} strokeWidth={1.2} strokeLinecap="round" fill="none">
          <path d="M32 56V40M32 40V14M32 40l-17-13M32 40l17-13M32 40l-14 4M32 40l14 4" />
        </g>
      </>;
    }
    case 'fish': {
      const body = 'M11 32C19 20 37 20 46 32 37 44 19 44 11 32Z';
      const tail = 'M45 32 56 22.5 53.5 32 56 41.5Z';
      return <>
        <g transform={off} fill={tone}><path d={body} /><path d={tail} /></g>
        <g fill="none" stroke={ink} strokeWidth={1.8} strokeLinejoin="round"><path d={body} /><path d={tail} /></g>
        <circle cx={18.5} cy={30.5} r={1.9} fill={ink} />
        <g fill="none" stroke={ink} strokeWidth={1.2} strokeLinecap="round">
          <path d="M23.5 25.5Q20.5 32 23.5 38.5" />
          <path d="M28 29q2.5 3 5 0M33 29q2.5 3 5 0M30.5 34q2.5 3 5 0M35.5 34q2.5 3 5 0M26 34q2 2.5 4.4.3" />
          <path d="M29 23.5q5-4 10 0" />
        </g>
      </>;
    }
    case 'palm': {
      const fronds = [
        'M32 24C25 17 16 17 9.5 24.5 17.5 22 25 22.5 32 24Z',
        'M32 24C28 15 22 10 14 10.5 21 13.5 27 17.5 32 24Z',
        'M32 24C33 15 38 9 46 7.5 41 12.5 36 17 32 24Z',
        'M32 24C39 17 48 17 55 24 47 22 40 22.5 32 24Z',
        'M32 24C37 27 42 32 43 39 39 33.5 35.5 29.5 32 24Z',
        'M32 24C27 27 22 32 21 39 25 33.5 28.5 29.5 32 24Z',
      ];
      return <>
        <path d="M33 57C33.5 47 34 36 32 25" fill="none" stroke={tone} strokeWidth={5} strokeLinecap="round" transform={off} />
        <path d="M33 57C33.5 47 34 36 32 25" fill="none" stroke={ink} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M31 33h4.5M31.5 41h4.5M32 49h4.4" stroke={ink} strokeWidth={1.2} />
        <g transform={off} fill={tone}>{fronds.map(d => <path key={d} d={d} />)}</g>
        <g fill="none" stroke={ink} strokeWidth={1.5} strokeLinejoin="round">{fronds.map(d => <path key={d} d={d} />)}</g>
        <circle cx={29.5} cy={27.5} r={2.6} fill={ink} /><circle cx={34.5} cy={28} r={2.6} fill={ink} />
      </>;
    }
    case 'boat': {
      const hull = 'M7 37C17 47 47 47 57 37 53 45.5 44 48.5 32 48.5 20 48.5 11 45.5 7 37Z';
      const roof = 'M15 37.5C15.5 27 22 22 32 22 42 22 48.5 27 49 37.5Z';
      return <>
        <g transform={off} fill={tone}><path d={roof} /><path d={hull} /></g>
        <g fill="none" stroke={ink} strokeWidth={1.8} strokeLinejoin="round"><path d={roof} /><path d={hull} /></g>
        <path d="M22 24.5v13M27 22.6v14.9M32 22v15.5M37 22.6v14.9M42 24.5v13M15.5 31h33" stroke={ink} strokeWidth={1.1} />
        <path d="M7 37 4.5 32M57 37l2.5-5" stroke={ink} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M9 54q3.5-2.4 7 0t7 0 7 0 7 0 7 0 7 0 7 0" fill="none" stroke={ink} strokeWidth={1.4} strokeLinecap="round" />
      </>;
    }
    case 'tile': {
      const petal = 'M32 32C28.5 27 28.5 19 32 13 35.5 19 35.5 27 32 32Z';
      return <>
        <g transform={off} fill={tone}>{Array.from({ length: 8 }, (_, i) => <path key={i} d={petal} transform={`rotate(${i * 45} 32 32)`} />)}</g>
        <g fill="none" stroke={ink} strokeWidth={1.5} strokeLinejoin="round">{Array.from({ length: 8 }, (_, i) => <path key={i} d={petal} transform={`rotate(${i * 45} 32 32)`} />)}</g>
        <circle cx={32} cy={32} r={5.5} fill={ink} />
        <circle cx={32} cy={32} r={2.2} fill={tone} />
        {[[9, 9], [55, 9], [9, 55], [55, 55]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={3} fill={tone} stroke={ink} strokeWidth={1.2} />)}
        <circle cx={32} cy={32} r={20.5} fill="none" stroke={ink} strokeWidth={1} strokeDasharray="0 4.2" strokeLinecap="round" />
      </>;
    }
    case 'arch': {
      const arch = 'M16 54V30a5 5 0 0 1 5-6 5 5 0 0 1 5-6 6 6 0 0 1 6-6 6 6 0 0 1 6 6 5 5 0 0 1 5 6 5 5 0 0 1 5 6V54';
      return <>
        <path d={arch} fill="none" stroke={tone} strokeWidth={7} strokeLinejoin="round" transform={off} />
        <path d={arch} fill="none" stroke={ink} strokeWidth={2} strokeLinejoin="round" />
        <path d="M32 6.5v4" stroke={ink} strokeWidth={1.6} strokeLinecap="round" />
        {[[20, 37], [24, 40.5], [28, 42.6], [32, 43.3], [36, 42.6], [40, 40.5], [44, 37]].map(([x, y]) =>
          <circle key={x} cx={x} cy={y} r={1.9} fill={ink} />)}
        <circle cx={32} cy={48.5} r={2.6} fill={tone} stroke={ink} strokeWidth={1.2} />
      </>;
    }
    case 'mirror': {
      const diamond = 'M32 9 55 32 32 55 9 32Z';
      return <>
        <path d={diamond} fill={tone} transform={off} />
        <path d={diamond} fill="none" stroke={ink} strokeWidth={1.8} strokeLinejoin="round" />
        <path d="M32 15 49 32 32 49 15 32Z" fill="none" stroke={ink} strokeWidth={1} strokeDasharray="2 2.4" />
        {Array.from({ length: 12 }, (_, i) => <path key={i} d="M32 21.5v-3.2" stroke={ink} strokeWidth={1.3} strokeLinecap="round" transform={`rotate(${i * 30} 32 32)`} />)}
        <circle cx={32} cy={32} r={8} fill="var(--steel)" stroke={ink} strokeWidth={1.8} />
        <path d="M28.5 29.5q2-2.2 4.5-2.4" fill="none" stroke="#fff" strokeWidth={1.4} strokeLinecap="round" opacity={.8} />
      </>;
    }
    case 'tawa':
      return <>
        <path d="M45 23 57.5 10.5" stroke={tone} strokeWidth={6} strokeLinecap="round" transform={off} />
        <path d="M45 23 57.5 10.5" stroke={ink} strokeWidth={2.4} strokeLinecap="round" />
        <circle cx={30} cy={35} r={19} fill={tone} transform={off} />
        <circle cx={30} cy={35} r={19} fill="var(--stamp-ground)" stroke={ink} strokeWidth={2} />
        <circle cx={30} cy={35} r={13} fill="#d8a766" stroke={ink} strokeWidth={1.4} />
        {[[25, 31, 1.8], [33, 29, 1.3], [34, 38, 2], [26, 40, 1.4], [30, 35, 1]].map(([x, y, r]) =>
          <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill="#7a4a22" />)}
      </>;
  }
}

/** Square block-print stamp with a carved, notched frame. Region motifs live in content/menu.ts `stamp`. */
export function RegionStamp({ stamp, tone = 'var(--saffron)', className = 'size-16', ground = 'var(--surface)' }: {
  stamp: Stamp; tone?: string; className?: string; ground?: string;
}) {
  const frame = 'M9 3.5H55L60.5 9V55L55 60.5H9L3.5 55V9Z';
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false" data-art
      style={{ ['--stamp-ground' as string]: ground }}>
      <path d={frame} fill={ground} />
      <path d={frame} fill="none" stroke={tone} strokeWidth={3} transform="translate(1.2 1.2)" />
      <path d={frame} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round" />
      <rect x={7.5} y={7.5} width={49} height={49} fill="none" stroke="currentColor" strokeWidth={.9} strokeDasharray="1 2.6" strokeLinecap="round" opacity={.8} />
      <Motif stamp={stamp} tone={tone} ink="currentColor" />
    </svg>
  );
}

