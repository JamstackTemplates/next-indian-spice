import type { ReactNode } from 'react';
import { PrintBorder } from './art/print';

/** Inner-page heading on a dabu-dot field: eyebrow, large title and lede, with optional art to the right. */
export function PageHead({ eyebrow, title, children, id, art, border = 'buta' }: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Illustration shown to the right on wide screens and above the title on small ones. */
  art?: ReactNode;
  border?: 'buta' | 'lotus';
}) {
  return (
    <header className="dabu relative overflow-hidden">
      <div className={`wrap grid items-end gap-6 pt-[clamp(2rem,5vw,4rem)] pb-[clamp(1.5rem,3vw,2.5rem)] ${art ? 'md:grid-cols-[1fr_auto]' : ''}`}>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={id} className="mt-3 mb-4 max-w-[16ch] text-[clamp(2.8rem,7vw,5.2rem)]">{title}</h1>
          {children ? <div className="max-w-(--measure) text-[clamp(1.08rem,1.6vw,1.25rem)] text-muted">{children}</div> : null}
        </div>
        {art ? <div className="-mb-2 justify-self-start max-md:order-first md:justify-self-end">{art}</div> : null}
      </div>
      <PrintBorder kind={border} className="text-primary dark:text-turmeric" />
    </header>
  );
}
