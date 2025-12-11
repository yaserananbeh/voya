export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''

  return d.toISOString().split('T')[0] // YYYY-MM-DD
}
