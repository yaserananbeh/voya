export function startOfToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function addDays(date: Date, amount: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + amount)
  return d
}

export function formatDateForApi(date: Date): string {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatDistanceToNow(date: Date, opts?: { addSuffix?: boolean }): string {
  const now = new Date().getTime()
  const diffMs = now - date.getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'today'
  const base = `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'}`
  if (!opts?.addSuffix) return base
  return diffDays > 0 ? `${base} ago` : `in ${base}`
}

export function formatDateForDisplay(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) {
      return dateStr
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}
