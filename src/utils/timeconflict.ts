export type Meeting = {
  days: string[];   
  start: number | null; 
  end: number | null;   
};

export const parseDays = (daysStr: string): string[] => {
  const out: string[] = [];
  let i = 0;
  while (i < daysStr.length) {
    if (daysStr.startsWith("Th", i)) { out.push("Th"); i += 2; }
    else if (daysStr.startsWith("Tu", i)) { out.push("Tu"); i += 2; }
    else if (daysStr.startsWith("Su", i)) { out.push("Su"); i += 2; }
    else if (daysStr.startsWith("Sa", i)) { out.push("Sa"); i += 2; }
    else { out.push(daysStr[i]); i += 1; } 
  }
  return out;
};

const toMinutes = (t: string): number => {
  const [H, M] = t.split(":").map((s) => +s.trim());
  return H * 60 + M;
};

export const parseMeeting = (meet?: string | null): Meeting => {
  if (!meet || !meet.trim()) {
    return { days: [], start: null, end: null }; 
  }
  const [daysPart, timesPart] = meet.trim().split(/\s+/, 2);
  if (!timesPart) return { days: [], start: null, end: null };

  const [s, e] = timesPart.split("-");
  const start = toMinutes(s);
  const end = toMinutes(e);

  return {
    days: parseDays(daysPart),
    start,
    end,
  };
};

export const daysOverlap = (a: Meeting, b: Meeting): boolean =>
  a.days.some((d) => b.days.includes(d));

export const timesOverlap = (a: Meeting, b: Meeting): boolean => {
  if (a.start == null || a.end == null || b.start == null || b.end == null) return false;
  return a.start < b.end && b.start < a.end;
};

export const hasConflict = (
  c1: { term: string; meets?: string | null },
  c2: { term: string; meets?: string | null }
): boolean => {
  if (c1.term !== c2.term) return false;
  const m1 = parseMeeting(c1.meets);
  const m2 = parseMeeting(c2.meets);
  if (m1.days.length === 0 || m2.days.length === 0) return false; // 空 meeting 不冲突
  return daysOverlap(m1, m2) && timesOverlap(m1, m2);
};

export const conflictsWithAnySelected = <T extends { term: string; meets?: string | null }>(
  target: T,
  selected: T[]
): boolean => selected.some((s) => hasConflict(target, s));
