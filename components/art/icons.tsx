import type { ReactNode, SVGProps } from 'react';

/** Small line icons drawn for the site (24px grid, 1.75px line). Decorative unless given a title by the caller. */
export type IconName = 'chilli' | 'leaf' | 'sprout' | 'gluten-free' | 'almond' | 'raindrop' | 'clock' | 'pin' | 'phone' | 'train' | 'mail' | 'arrow' | 'step';

const PATHS: Record<IconName, ReactNode> = {
  chilli: <>
    <path d="M15.4 7.1c2.3.5 3.3 2.7 2.5 5.3-1.3 4.2-5.7 8.4-13 9.6-.8.1-1.1-.8-.3-1.2 4.2-1.9 6.9-5.1 7.9-8.8.6-2.5 1.2-4.7 2.9-4.9z" />
    <path d="M15.6 7c.1-1.7.9-3 2.5-3.6M14 7.6c1.4-1 3.2-1 4.6.2" fill="none" />
  </>,
  leaf: <>
    <path d="M4.5 19.5C4.5 10.2 9.6 4.8 20 4c-.4 9.6-5.6 15.5-15.5 15.5z" />
    <path d="M4.5 19.5 14.5 9.5" fill="none" />
  </>,
  sprout: <>
    <path d="M12 21v-8.5" fill="none" />
    <path d="M12 13.2C12 9.4 9.3 7.2 4.4 7.2c0 4 2.6 6 7.6 6zM12 11c0-3.8 2.6-6.2 7.6-6.2 0 4.1-2.6 6.2-7.6 6.2z" />
  </>,
  'gluten-free': <>
    <path d="M12 21V7" fill="none" />
    <path d="M12 10c-2.4 0-3.8-1.4-3.8-3.8 2.4 0 3.8 1.4 3.8 3.8zm0 0c2.4 0 3.8-1.4 3.8-3.8-2.4 0-3.8 1.4-3.8 3.8zm0 5c-2.4 0-3.8-1.4-3.8-3.8 2.4 0 3.8 1.4 3.8 3.8zm0 0c2.4 0 3.8-1.4 3.8-3.8-2.4 0-3.8 1.4-3.8 3.8z" />
    <path d="M4 20 20 4" fill="none" strokeWidth={2.25} />
  </>,
  almond: <>
    <path d="M12 3c4.2 3 6.2 7 6.2 11a6.2 6.2 0 0 1-12.4 0c0-4 2-8 6.2-11z" />
    <path d="M12 7.5c-1.5 3-1.5 7 0 10.5" fill="none" />
  </>,
  raindrop: <path d="M12 3s6.2 7 6.2 11.2a6.2 6.2 0 0 1-12.4 0C5.8 10 12 3 12 3z" />,
  clock: <><circle cx="12" cy="12" r="8.5" fill="none" /><path d="M12 7.5V12l3.2 2" fill="none" /></>,
  pin: <><path d="M12 21.2s-6.8-6.1-6.8-11.4a6.8 6.8 0 0 1 13.6 0c0 5.3-6.8 11.4-6.8 11.4z" fill="none" /><circle cx="12" cy="9.8" r="2.4" fill="none" /></>,
  phone: <path d="M6.6 3.5h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" fill="none" />,
  train: <><rect x="5.5" y="3.5" width="13" height="14" rx="3" fill="none" /><path d="M5.5 10.5h13M9 14.5h.01M15 14.5h.01M8.5 17.5 6.5 21M15.5 17.5l2 3.5" fill="none" /></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" fill="none" /><path d="m4 6.5 8 6.5 8-6.5" fill="none" /></>,
  arrow: <path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" fill="none" />,
  step: <path d="M12 3.5 20.5 12 12 20.5 3.5 12z" />,
};

export function Icon({ name, filled = true, className = 'size-5', title, ...rest }: {
  name: IconName;
  /** Filled shapes for marks such as the chilli meter; false draws outline only. */
  filled?: boolean;
  className?: string;
  /** Accessible name; omit for decorative use beside visible text. */
  title?: string;
} & Omit<SVGProps<SVGSVGElement>, 'name'>) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor"
      strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"
      role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false" {...rest}>
      {PATHS[name]}
    </svg>
  );
}
