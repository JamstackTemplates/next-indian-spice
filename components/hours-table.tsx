'use client';
import { useEffect, useState } from 'react';
import { DAYS, zonedDay, type Day, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Weekly hours. In the browser today's row is marked in the business zone, refreshed every minute; static output marks nothing. */
export function HoursTable({ hours, className = '', compact = false }: { hours: readonly OpeningHours[]; className?: string; compact?: boolean }) {
  const [today, setToday] = useState<Day | undefined>(undefined);
  useEffect(() => {
    const update = () => setToday(zonedDay(site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);
  return (
    <table className={`w-full border-collapse tabular ${className}`}>
      <caption className="sr-only">Opening hours for each day of the week</caption>
      <tbody>
        {DAYS.map(day => {
          const entry = hours.find(item => item.day === day);
          const isToday = day === today;
          return (
            <tr key={day} aria-current={isToday ? 'date' : undefined}
              className={`border-b border-dotted border-current/25 last:border-0 ${isToday ? 'bg-turmeric/25 font-semibold' : ''}`}>
              <th scope="row" className={`text-left font-medium ${compact ? 'py-1 pr-3' : 'py-2.5 pr-4 pl-2'}`}>
                {compact ? day.slice(0, 3) : day}
                {isToday ? <span className="ml-2 text-[.78rem] font-semibold tracking-[.12em] uppercase">Today</span> : null}
              </th>
              <td className={`text-right ${compact ? 'py-1' : 'py-2.5 pr-2'}`}>
                {entry?.opens && entry.closes ? <>{entry.opens}<span aria-hidden="true">–</span><span className="sr-only"> to </span>{entry.closes}</> : 'Closed'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
