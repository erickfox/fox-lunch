import { Menu } from './menu'
import { User } from './user'

export class AvailableTickets {
  id: number;
  status: number;
  UserId: number;
  MenuId: number;
  date: string;
  User: User;
  Menu: Menu;
}