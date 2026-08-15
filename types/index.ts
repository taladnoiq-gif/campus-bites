export type UserRole = 'STUDENT' | 'MERCHANT';

export interface User {
  id: string;
  name: string;
  studentId?: string;
  email: string;
  role: UserRole;
  merchantShopId?: string;
}

export interface MenuItemOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItemOptionGroup {
  id: string;
  title: string;
  required: boolean;
  maxSelect?: number;
  options: MenuItemOption[];
}

export interface MenuItem {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  optionGroups?: MenuItemOptionGroup[];
  isAvailable: boolean;
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  estimatedPrepTimeMin: number;
  bannerImage: string;
  isOpen: boolean;
  canteenZone: string;
  menus: MenuItem[];
}

export type DiningMode = 'DINE_IN' | 'TAKEAWAY';
export type OrderStatus = 'PENDING' | 'COOKING' | 'READY' | 'COMPLETED' | 'CANCELLED';

export interface SelectedOption {
  groupId: string;
  groupTitle: string;
  optionId: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: SelectedOption[];
  specialInstructions?: string;
  subtotal: number;
}

export interface Order {
  id: string;
  queueNumber: string;
  studentId: string;
  studentName: string;
  shopId: string;
  shopName: string;
  items: CartItem[];
  diningMode: DiningMode;
  tableNumber?: string;
  totalAmount: number;
  status: OrderStatus;
  estimatedReadyTime: string;
  createdAt: string;
  promptPayRef: string;
}