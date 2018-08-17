import { Menu } from './menu'
import { User } from './user'

export class TicketsSold {
  id: number
  status: number
  typeSale: number
  MenuId: number
  UserId: number
  userPurchaseId: number
  updatedAt: string
  UserPurchase: User
  Menu: Menu
}