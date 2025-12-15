export const nightsBetween = (checkIn: string, checkOut: string) => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffMs = end.getTime() - start.getTime()
  const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  return Math.max(0, nights)
}

export const calculateTotalCost = (pricePerNight: number, checkIn: string, checkOut: string) =>
  nightsBetween(checkIn, checkOut) * pricePerNight
