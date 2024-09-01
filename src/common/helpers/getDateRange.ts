export function getDateRange(start: Date | undefined, end: Date | undefined) {
  // Limit 7 days
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  if (!start || !end) return;
  const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  const differenceInDays = Math.floor((utc2 - utc1) / _MS_PER_DAY);
  // Difference limit is 7
  if (differenceInDays > 7) return;
  return { start, end };
}
