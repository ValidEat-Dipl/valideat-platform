// interfaces für übrsicht, scan, tckets
export interface RestaurantOverview {
  totalScans: number
  successfulScans: number
  failedScans: number
  lastScans: RestaurantScan[]
}


export interface RestaurantScan {
  date: string
  tier: string
  costOrder: string
  status: 'OPEN' | 'CONFLICT' | 'CHECKED' | 'NEEDS_FIXING'
}


export interface RestaurantTicket {
  ticketId: number
  useDate: string
  restaurant: string
  tier: string
  status: 'OPEN' | 'CONFLICT' | 'CHECKED' | 'NEEDS_FIXING'
  costOrder: string
}


export interface RestaurantBilling {
  successful: number
  costOrders: Record<string, number>
  failed: number
}


export interface RestaurantMonthlyBilling {
  month: string
  validTickets: number
}
