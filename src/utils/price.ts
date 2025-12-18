export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function calculateDiscount(originalPrice: number, finalPrice: number): number {
  if (originalPrice <= 0) return 0
  return Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
}

export function calculateTotalPrice(
  pricePerNight: number,
  checkInDate: string,
  checkOutDate: string,
): number {
  const checkIn = new Date(checkInDate)
  const checkOut = new Date(checkOutDate)
  const diffMs = checkOut.getTime() - checkIn.getTime()
  const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  return pricePerNight * Math.max(0, nights)
}
