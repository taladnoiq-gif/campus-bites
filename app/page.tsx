'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, Clock, Star, MapPin, ArrowLeft, Plus, 
  Minus, Utensils, CheckCircle2, ChevronRight, X, ChefHat, 
  Sparkles, QrCode, UserCheck, LogOut, MessageSquare, Send,
  History, User, BarChart3, Globe, Settings, Edit3, Trash2, ShieldAlert,
  Eye, EyeOff, Image as ImageIcon, Check, ShoppingBag, Phone, Edit2, Camera,
  RotateCcw, Receipt, Power, TrendingUp, Filter, Sparkle, DollarSign, ListOrdered, Users,
  Calendar, CalendarDays, Volume2, Download, Printer, AlertCircle, UploadCloud, BellRing, FileText, RefreshCw, Loader2
} from 'lucide-react';

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxULvwVzjw9oRBTU9RxUwkhx-DtAdTv3XqI6DPtD9YfncuYdvI5qZz08vuxow-nxSlg/exec';

const translations = {
  th: {
    flag: "🇹🇭",
    langName: "ไทย",
    title: "ตลาดน้อยคิว",
    subtitle: "MSU Smart Canteen Delivery & Pick-up",
    login: "เข้าสู่ระบบ",
    register: "เปิดบัญชีใหม่",
    name: "ชื่อ - นามสกุล",
    userType: "ประเภทผู้ใช้งาน",
    username: "ชื่อผู้ใช้งาน (Username)",
    password: "รหัสผ่าน",
    student: "ผู้ซื้อ (นิสิต / บุคลากร)",
    merchant: "ร้านค้าโรงอาหาร",
    admin: "ผู้ดูแลระบบสูงสุด (Super Admin)",
    adminSubtitle: "สิทธิ์ควบคุมและจัดการระบบทั้งหมด",
    submitRegister: "สมัครสมาชิก",
    submitLogin: "เข้าสู่ระบบ",
    home: "หน้าแรก",
    history: "ประวัติสั่งซื้อ",
    profile: "โปรไฟล์ของฉัน",
    searchPlaceholder: "ค้นหาเมนูเด็ด, ร้านอาหาร...",
    allShops: "ร้านอาหารแนะนำในโรงอาหาร",
    orderFood: "สั่งเลย",
    menuList: "เมนูอาหารทั้งหมดในร้าน",
    reviewTitle: "รีวิวความอร่อย",
    submitReview: "ส่งรีวิว",
    takeaway: "ห่อกลับบ้าน 🛍️",
    dineIn: "ทานที่โต๊ะ 🍽️",
    tablePlaceholder: "ระบุเลขโต๊ะ เช่น A-12",
    totalAmount: "ยอดรวมสุทธิ",
    payPromptPay: "สแกนจ่ายพร้อมเพย์ทันที",
    confirmPay: "ยืนยันและส่งคำสั่งซื้อ",
    uploadSlipLabel: "แนบสลิปโอนเงิน (หลักฐานการชำระ):",
    orderQueue: "หมายเลขคำสั่งซื้อ",
    queueNumber: "ลำดับคิว",
    estTime: "เวลาโดยประมาณที่จะได้รับ",
    prepTimeLabel: "เวลารอโดยประมาณ (คำนวณตามรายการและคิวซ้อน)",
    backHome: "กลับสู่หน้าหลัก",
    orderHistory: "ประวัติการสั่งซื้อของฉัน",
    myProfile: "ข้อมูลโปรไฟล์และการปรับแต่ง",
    usernameLabel: "Username:",
    phoneLabel: "เบอร์โทรศัพท์:",
    bioLabel: "ความชอบด้านอาหาร (Bio):",
    notePlaceholder: "ระบุความต้องการเพิ่มเติม เช่น ไม่ผัก, เผ็ดน้อย...",
    addToCart: "เพิ่มลงตะกร้า",
    cartLabel: "ดูตะกร้าสั่งอาหาร",
    logout: "ออกจากระบบ",
    shopOrders: "คำสั่งซื้อในครัวเรียลไทม์",
    revenueToday: "ยอดขายวันนี้ (Daily)",
    revenueMonth: "ยอดขายเดือนนี้ (Monthly)",
    shopInfo: "ตั้งค่าร้านค้า",
    manageShopMenu: "จัดการข้อมูลร้าน & เมนูอาหาร",
    shopNameLabel: "ชื่อร้านค้า:",
    zoneLabel: "โซนโรงอาหาร:",
    bannerImageLabel: "เปลี่ยนรูปภาพหน้าร้าน:",
    saveShopInfo: "บันทึกข้อมูลร้าน",
    addMenuTitle: "สร้างเมนูใหม่ & แอดออนเฉพาะเมนู",
    menuNamePlaceholder: "ชื่อเมนู (เช่น ข้าวกะเพราหมูกรอบ)",
    menuDescPlaceholder: "คำบรรยายความอร่อย สด ใหม่...",
    menuPricePlaceholder: "ราคาเริ่มต้น (บาท)",
    menuImageLabel: "รูปภาพเมนูอาหาร:",
    addMenuBtn: "บันทึกเมนูนี้ลงระบบ",
    adminPanel: "ระบบผู้ดูแลระบบสูงสุด",
    deleteShopBtn: "ลบร้านค้านี้",
    addonNamePlaceholder: "ชื่อตัวเลือกเสริม (เช่น เพิ่มไข่ดาว, ทะเล)",
    addonPricePlaceholder: "ราคาเพิ่ม (บาท, 0 = ฟรี)",
    addAddonBtn: "+ เพิ่มตัวเลือก",
    optionsTitle: "ตัวเลือกเสริม & วัตถุดิบเพิ่มเติม",
    editProfileBtn: "แก้ไขโปรไฟล์",
    saveProfileBtn: "บันทึกข้อมูลส่วนตัว",
    emptyHistory: "คุณยังไม่มีประวัติการสั่งซื้อในระบบ",
    emptyShopOrders: "ยังไม่มีคำสั่งซื้อเข้ามาในขณะนี้",
    statusPending: "รอร้านตรวจสอบ",
    statusCooking: "กำลังปรุงอาหาร",
    statusReady: "อาหารเสร็จแล้ว (พร้อมรับ)",
    statusCompleted: "รับอาหารสำเร็จ",
    actionCook: "👨‍🍳 ตรวจสลิป & เริ่มทำอาหาร",
    actionReady: "🔔 เรียกคิวรับอาหาร",
    actionDone: "✔️ ลูกค้ารับอาหารแล้ว",
    customAddonPlaceholder: "ยังไม่มีตัวเลือกเสริมสำหรับเมนูนี้",
    reorderBtn: "สั่งซ้ำอีกครั้ง 🔄",
    shopStatusOpen: "ร้านเปิดให้บริการ 🟢",
    shopStatusClosed: "ร้านปิดชั่วคราว 🔴",
    toggleShopStatus: "เปลี่ยนสถานะร้าน",
    filterAll: "ทั้งหมด",
    filterActive: "กำลังปรุง/รอรับ",
    filterDone: "เสร็จสิ้นแล้ว",
    adminGlobalRevenue: "ยอดขายรวมทั้งแอปวันนี้",
    adminGlobalMonthly: "ยอดขายรวมทั้งแอปเดือนนี้",
    adminTotalOrders: "ออเดอร์รวมทุกร้าน",
    adminActiveShops: "จำนวนร้านค้าที่เปิดอยู่",
    adminAllUsers: "ผู้ใช้งานทั้งหมดในระบบ",
    adminTabOverview: "📊 สรุปยอด & สถิติ",
    adminTabShops: "🏪 จัดการร้านค้า",
    adminTabOrders: "📑 มอนิเตอร์ออเดอร์",
    adminTabUsers: "👥 จัดการผู้ใช้",
    adminTabMasterReset: "⚡ รีเซ็ตระบบทั้งหมด",
    storeBreakdownTitle: "📈 สรุปยอดขายแยกตามรายร้านค้า",
    dailyTab: "รายวัน",
    monthlyTab: "รายเดือน",
    soldOutBadge: "หมดชั่วคราว",
    availableBadge: "พร้อมขาย",
    toggleSoldOutBtn: "สลับสถานะสต็อก",
    printTicketBtn: "พิมพ์ใบเสร็จ/ติดกล่อง 🖨️",
    viewSlipBtn: "ตรวจสลิปโอนเงิน 🧾",
    exportCsvBtn: "ดาวน์โหลดรายงาน Excel (CSV) 📥",
    catAll: "ทั้งหมด 🔥",
    catRice: "อาหารตามสั่ง 🍛",
    catNoodle: "ก๋วยเตี๋ยว 🍜",
    orderReadyModalTitle: "🎉 อาหารของคุณเสร็จเรียบร้อยแล้ว!",
    orderReadyModalDesc: "กรุณานำหมายเลขคิวไปติดต่อรับอาหารที่หน้าร้านได้ทันทีครับ",
    resetSystemTitle: "⚡ ระบบรีเซ็ตค่าเริ่มต้น (Master Reset)",
    resetSystemDesc: "การดำเนินการนี้จะล้างยอดขายรายวัน/รายเดือน ลบคำสั่งซื้อทั้งหมด และลบผู้ใช้ทั้งหมด (เหลือเพียงแอดมินหลัก) ในระบบและ Google Sheets ทันที",
    executeResetBtn: "🚨 ยืนยันล้างข้อมูลและรีเซ็ตทั้งหมดทันที",
    loadingText: "กำลังซิงค์ข้อมูล..."
  },
  zh: {
    flag: "🇨🇳",
    langName: "中文",
    title: "塔莱诺伊排队",
    subtitle: "MSU 智能食堂点餐系统",
    login: "登录",
    register: "注册账号",
    name: "姓名",
    userType: "用户身份类型",
    username: "用户名 (Username)",
    password: "密码",
    student: "买家 (学生 / 教职工)",
    merchant: "食堂商家",
    admin: "超级管理员",
    adminSubtitle: "最高权限与系统重置",
    submitRegister: "确认注册",
    submitLogin: "立即登录",
    home: "首页",
    history: "订单历史",
    profile: "个人中心",
    searchPlaceholder: "搜索美味菜品、店铺...",
    allShops: "精选食堂店铺",
    orderFood: "去点餐",
    menuList: "所有菜品",
    reviewTitle: "用户评价与打分",
    submitReview: "提交评价",
    takeaway: "打包带走 🛍️",
    dineIn: "堂食用餐 🍽️",
    tablePlaceholder: "桌号 例如 A-12",
    totalAmount: "实付总额",
    payPromptPay: "PromptPay 扫码支付",
    confirmPay: "确认并提交订单",
    uploadSlipLabel: "上传付款水单 (转账凭证):",
    orderQueue: "订单编号",
    queueNumber: "排队号",
    estTime: "预计出餐时间",
    prepTimeLabel: "预计制作时间 (含排队)",
    backHome: "返回首页",
    orderHistory: "我的历史订单",
    myProfile: "个人资料与偏好设置",
    usernameLabel: "用户名:",
    phoneLabel: "手机号码:",
    bioLabel: "饮食偏好 (Bio):",
    notePlaceholder: "备注：例如 少辣、不加香菜...",
    addToCart: "加入购物车",
    cartLabel: "查看购物车",
    logout: "退出登录",
    shopOrders: "实时厨房订单",
    revenueToday: "今日销售额 (Daily)",
    revenueMonth: "本月销售额 (Monthly)",
    shopInfo: "店铺设置",
    manageShopMenu: "店铺与菜单配置",
    shopNameLabel: "店铺名称:",
    zoneLabel: "食堂区域:",
    bannerImageLabel: "上传店铺招牌图:",
    saveShopInfo: "保存店铺信息",
    addMenuTitle: "新增菜品与专属配料",
    menuNamePlaceholder: "菜品名称",
    menuDescPlaceholder: "菜品详细描述",
    menuPricePlaceholder: "起步价 (泰铢)",
    menuImageLabel: "菜品图片:",
    addMenuBtn: "保存并上架",
    adminPanel: "管理员",
    deleteShopBtn: "删除此店铺",
    addonNamePlaceholder: "配料名称 (例如 煎蛋、海鲜)",
    addonPricePlaceholder: "加价 (泰铢, 0 为免费)",
    addAddonBtn: "+ 添加配料",
    optionsTitle: "定制选项与配料",
    editProfileBtn: "编辑资料",
    saveProfileBtn: "保存修改",
    emptyHistory: "暂无历史订单",
    emptyShopOrders: "暂无新订单",
    statusPending: "待商家审核",
    statusCooking: "正在烹饪",
    statusReady: "出餐完毕 (请取餐)",
    statusCompleted: "已完成取餐",
    actionCook: "👨‍🍳 查验水单并开始出餐",
    actionReady: "🔔 叫号取餐",
    actionDone: "✔️ 已完成交付",
    customAddonPlaceholder: "该菜品暂未添加自定义配料",
    reorderBtn: "再来一单 🔄",
    shopStatusOpen: "营业中 🟢",
    shopStatusClosed: "已打烊 🔴",
    toggleShopStatus: "切换营业状态",
    filterAll: "全部",
    filterActive: "制作中/待取",
    filterDone: "已完成",
    adminGlobalRevenue: "今日总销售额",
    adminGlobalMonthly: "本月总销售额",
    adminTotalOrders: "全平台总订单数",
    adminActiveShops: "营业中店铺",
    adminAllUsers: "全平台注册用户",
    adminTabOverview: "📊 财务与概览",
    adminTabShops: "🏪 店铺管理",
    adminTabOrders: "📑 全平台订单监控",
    adminTabUsers: "👥 用户管理",
    adminTabMasterReset: "⚡ 系统重置",
    storeBreakdownTitle: "📈 各店铺销售业绩明细",
    dailyTab: "日结",
    monthlyTab: "月结",
    soldOutBadge: "已售罄",
    availableBadge: "热卖中",
    toggleSoldOutBtn: "切换售罄状态",
    printTicketBtn: "打印小票/贴纸 🖨️",
    viewSlipBtn: "核验转账凭证 🧾",
    exportCsvBtn: "导出 Excel (CSV) 报表 📥",
    catAll: "全部 🔥",
    catRice: "简餐便当 🍛",
    catNoodle: "特色面食 🍜",
    orderReadyModalTitle: "🎉 您的餐品已制作完成！",
    orderReadyModalDesc: "请凭取餐排队号前往对应档口取餐。",
    resetSystemTitle: "⚡ 系统主重置 (Master Reset)",
    resetSystemDesc: "此操作将清除所有日/月销售额、所有订单及所有用户（除最高管理员外），恢复初始状态。",
    executeResetBtn: "🚨 确认立即清除并重置所有数据",
    loadingText: "同步中..."
  },
  en: {
    flag: "🇬🇧",
    langName: "English",
    title: "Talat Noi Q",
    subtitle: "MSU Smart Canteen Hub",
    login: "Login",
    register: "Sign Up",
    name: "Full Name",
    userType: "Account Type",
    username: "Username",
    password: "Password",
    student: "Buyer (Student / Staff)",
    merchant: "Canteen Merchant",
    admin: "Super Admin",
    adminSubtitle: "Full Control & System Reset",
    submitRegister: "Create Account",
    submitLogin: "Log In",
    home: "Home",
    history: "Orders",
    profile: "My Profile",
    searchPlaceholder: "Search dishes, shops...",
    allShops: "Featured Canteen Shops",
    orderFood: "Order Now",
    menuList: "Full Menu",
    reviewTitle: "Ratings & Reviews",
    submitReview: "Submit Review",
    takeaway: "Takeaway 🛍️",
    dineIn: "Dine-in 🍽️",
    tablePlaceholder: "Table Number e.g. A-12",
    totalAmount: "Total Amount",
    payPromptPay: "Scan QR with PromptPay",
    confirmPay: "Confirm & Pay",
    uploadSlipLabel: "Upload Transfer Slip (Proof of Payment):",
    orderQueue: "Order Number",
    queueNumber: "Queue No.",
    estTime: "Estimated Prep Time",
    prepTimeLabel: "Estimated Prep Time (Including Queue)",
    backHome: "Back to Home",
    orderHistory: "My Order History",
    myProfile: "Profile & Customization",
    usernameLabel: "Username:",
    phoneLabel: "Phone Number:",
    bioLabel: "Food Bio / Taste:",
    notePlaceholder: "Special instructions e.g. Less spicy, no veggies...",
    addToCart: "Add to Cart",
    cartLabel: "View Cart",
    logout: "Sign Out",
    shopOrders: "Live Kitchen Orders",
    revenueToday: "Today's Sales (Daily)",
    revenueMonth: "This Month (Monthly)",
    shopInfo: "Shop Settings",
    manageShopMenu: "Shop & Menu Configuration",
    shopNameLabel: "Shop Name:",
    zoneLabel: "Canteen Zone:",
    bannerImageLabel: "Shop Banner Image:",
    saveShopInfo: "Save Shop Details",
    addMenuTitle: "Create Dish with Add-ons",
    menuNamePlaceholder: "Dish Name",
    menuDescPlaceholder: "Tasty description...",
    menuPricePlaceholder: "Base Price (THB)",
    menuImageLabel: "Food Photo:",
    addMenuBtn: "Publish Menu Item",
    adminPanel: "Admin",
    deleteShopBtn: "Remove Shop",
    addonNamePlaceholder: "Add-on / Meat Option",
    addonPricePlaceholder: "Price (THB, 0 = Free)",
    addAddonBtn: "+ Add Option",
    optionsTitle: "Custom Add-ons & Meats",
    editProfileBtn: "Edit Profile",
    saveProfileBtn: "Save Profile",
    emptyHistory: "No order history yet",
    emptyShopOrders: "No active orders at the moment",
    statusPending: "Pending Verification",
    statusCooking: "Cooking",
    statusReady: "Ready for Pickup",
    statusCompleted: "Completed",
    actionCook: "👨‍🍳 Verify Slip & Start Cooking",
    actionReady: "🔔 Ready (Call Queue)",
    actionDone: "✔️ Order Handed Over",
    customAddonPlaceholder: "No custom options added for this dish yet",
    reorderBtn: "Re-order 🔄",
    shopStatusOpen: "Open Now 🟢",
    shopStatusClosed: "Closed 🔴",
    toggleShopStatus: "Toggle Status",
    filterAll: "All",
    filterActive: "In Progress",
    filterDone: "Completed",
    adminGlobalRevenue: "Global Today's Revenue",
    adminGlobalMonthly: "Global Monthly Revenue",
    adminTotalOrders: "Total Platform Orders",
    adminActiveShops: "Active Open Shops",
    adminAllUsers: "Total Users",
    adminTabOverview: "📊 Financial Overview",
    adminTabShops: "🏪 Manage Shops",
    adminTabOrders: "📑 Order Monitor",
    adminTabUsers: "👥 Manage Users",
    adminTabMasterReset: "⚡ Master Reset",
    storeBreakdownTitle: "📈 Store Performance Breakdown",
    dailyTab: "Daily",
    monthlyTab: "Monthly",
    soldOutBadge: "Sold Out",
    availableBadge: "Available",
    toggleSoldOutBtn: "Toggle Sold Out",
    printTicketBtn: "Print Slip / Ticket 🖨️",
    viewSlipBtn: "Verify Slip 🧾",
    exportCsvBtn: "Export CSV Report 📥",
    catAll: "All 🔥",
    catRice: "Rice Dishes 🍛",
    catNoodle: "Noodles 🍜",
    orderReadyModalTitle: "🎉 Your Food is Ready for Pickup!",
    orderReadyModalDesc: "Please proceed to the stall with your queue ticket.",
    resetSystemTitle: "⚡ Master System Reset",
    resetSystemDesc: "This action will clear all daily/monthly revenue, delete all active orders, and remove all users except the super admin.",
    executeResetBtn: "🚨 Confirm & Clear All Data Now",
    loadingText: "Loading..."
  }
};

export type UserRole = 'STUDENT' | 'MERCHANT' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  merchantShopId?: string;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
}

export interface Review {
  id: string;
  shopId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AddonOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
  addons: AddonOption[];
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  bannerImage: string;
  isOpen: boolean;
  canteenZone: string;
  menus: MenuItem[];
}

export type DiningMode = 'DINE_IN' | 'TAKEAWAY';
export type OrderStatus = 'PENDING' | 'COOKING' | 'READY' | 'COMPLETED' | 'CANCELLED';

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  subtotal: number;
  selectedAddons: AddonOption[];
  specialInstructions?: string;
}

export interface Order {
  id: string;
  queueNumber: string;
  studentName: string;
  customerUsername: string;
  shopId: string;
  shopName: string;
  items: CartItem[];
  diningMode: DiningMode;
  tableNumber?: string;
  totalAmount: number;
  status: OrderStatus;
  estimatedReadyTime: string;
  prepDurationMin: number;
  createdAt: string;
  slipImageUrl?: string;
}

const DEFAULT_ADMIN: UserProfile = {
  id: 'a1',
  name: 'ผู้จัดการระบบสูงสุด',
  username: 'admin',
  role: 'ADMIN',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  bio: 'Super Administrator with Full Control'
};

export default function CampusBitesApp() {
  const [lang, setLang] = useState<'th' | 'zh' | 'en'>('th');
  const t = translations[lang];

  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>([DEFAULT_ADMIN]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authRole, setAuthRole] = useState<UserRole>('STUDENT');

  const [shops, setShops] = useState<Shop[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'HOME' | 'SHOP' | 'CHECKOUT' | 'TRACKING' | 'HISTORY' | 'PROFILE' | 'MERCHANT_KDS' | 'MERCHANT_REVENUE' | 'MERCHANT_SETUP' | 'ADMIN_DASHBOARD'>('HOME');
  
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [menuQty, setMenuQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  const [specialNote, setSpecialNote] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [diningMode, setDiningMode] = useState<DiningMode>('TAKEAWAY');
  const [tableNumber, setTableNumber] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [ordersQueue, setOrdersQueue] = useState<Order[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [historyFilter, setHistoryFilter] = useState<'ALL' | 'ACTIVE' | 'DONE'>('ALL');

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [transferSlipUrl, setTransferSlipUrl] = useState<string>('');
  const [readyNotificationOrder, setReadyNotificationOrder] = useState<Order | null>(null);

  const [viewingSlipOrder, setViewingSlipOrder] = useState<Order | null>(null);
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);

  const [starRating, setStarRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const [adminActiveSubTab, setAdminActiveSubTab] = useState<'OVERVIEW' | 'SHOPS' | 'ORDERS' | 'USERS' | 'MASTER_RESET'>('OVERVIEW');
  const [adminEditingShop, setAdminEditingShop] = useState<Shop | null>(null);
  const [adminEditShopName, setAdminEditShopName] = useState('');
  const [adminEditShopZone, setAdminEditShopZone] = useState('');

  const [merchantRevenueView, setMerchantRevenueView] = useState<'DAILY' | 'MONTHLY'>('DAILY');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileName, setEditProfileName] = useState('');
  const [editProfilePhone, setEditProfilePhone] = useState('');
  const [editProfileBio, setEditProfileBio] = useState('');
  const [editProfileAvatar, setEditProfileAvatar] = useState('');

  const [editShopName, setEditShopName] = useState('');
  const [editShopZone, setEditShopZone] = useState('');
  const [editShopBanner, setEditShopBanner] = useState('');
  
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuDesc, setNewMenuDesc] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState('');
  const [newMenuImage, setNewMenuImage] = useState('');
  const [tempAddons, setTempAddons] = useState<AddonOption[]>([]);
  const [newAddonName, setNewAddonName] = useState('');
  const [newAddonPrice, setNewAddonPrice] = useState('');

  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [editMenuName, setEditMenuName] = useState('');
  const [editMenuDesc, setEditMenuDesc] = useState('');
  const [editMenuPrice, setEditMenuPrice] = useState('');
  const [editMenuImage, setEditMenuImage] = useState('');

  const lastAlertedOrderId = useRef<string | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('talatnoi_current_user');
      const savedTab = localStorage.getItem('talatnoi_active_tab');
      if (savedUser) {
        const userObj: UserProfile = JSON.parse(savedUser);
        if (!userObj.merchantShopId) {
          userObj.merchantShopId = `shop-${userObj.username}`;
        }
        setCurrentUser(userObj);
        initProfileEditState(userObj);
        if (savedTab) setActiveTab(savedTab as any);
      }
    } catch (e) {}
  }, []);

  const fetchCloudData = useCallback(async () => {
    try {
      const res = await fetch(GOOGLE_SHEET_URL, { 
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (res.ok) {
        const cloudData = await res.json();

        if (cloudData.users && Array.isArray(cloudData.users)) {
          const formattedUsers: UserProfile[] = cloudData.users.map((row: any[]) => ({
            id: String(row[0] || `u-${Date.now()}`),
            name: String(row[1] || 'ผู้ใช้งาน'),
            username: String(row[2] || '').toLowerCase().trim(),
            role: (String(row[3] || 'STUDENT')) as UserRole,
            phone: String(row[4] || ''),
            merchantShopId: row[5] && row[5] !== '-' ? String(row[5]) : `shop-${String(row[2] || '').toLowerCase().trim()}`,
            avatarUrl: String(row[6] || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'),
            bio: String(row[7] || 'สมาชิกตลาดน้อยคิว')
          })).filter(u => u.username.length > 0);

          const mergedUsers = [DEFAULT_ADMIN, ...formattedUsers.filter(u => u.username !== 'admin')];
          setRegisteredUsers(mergedUsers);
          localStorage.setItem('talatnoi_q_users', JSON.stringify(mergedUsers));
        }

        if (cloudData.shops && Array.isArray(cloudData.shops)) {
          const shopMap = new Map<string, Shop>();
          cloudData.shops.forEach((row: any[]) => {
            const id = String(row[0] || '');
            const name = String(row[1] || '').trim();
            if (!id || !name) return;

            const existing = shopMap.get(id);
            const parsedMenus = row[8] ? (typeof row[8] === 'string' ? JSON.parse(row[8]) : row[8]) : [];

            if (existing) {
              const menuMap = new Map<string, MenuItem>();
              [...existing.menus, ...parsedMenus].forEach(m => menuMap.set(m.id, m));
              existing.menus = Array.from(menuMap.values());
            } else {
              shopMap.set(id, {
                id,
                name,
                category: String(row[2] || 'อาหารตามสั่ง'),
                rating: Number(row[3] || 5.0),
                reviewCount: Number(row[4] || 0),
                bannerImage: String(row[5] || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'),
                isOpen: row[6] !== false && String(row[6]).toUpperCase() !== 'FALSE',
                canteenZone: String(row[7] || 'โซนกลาง'),
                menus: parsedMenus
              });
            }
          });

          setShops(Array.from(shopMap.values()));
        }

        if (cloudData.orders && Array.isArray(cloudData.orders)) {
          const formattedOrders: Order[] = cloudData.orders.map((row: any[]) => ({
            id: String(row[0] || ''),
            queueNumber: String(row[1] || 'Q01'),
            studentName: String(row[2] || 'ลูกค้า'),
            shopName: String(row[3] || ''),
            totalAmount: Number(row[4] || 0),
            status: (String(row[5] || 'PENDING')) as OrderStatus,
            createdAt: String(row[6] || new Date().toISOString().split('T')[0]),
            customerUsername: String(row[7] || '').toLowerCase().trim(),
            shopId: String(row[8] || ''),
            items: row[9] ? (typeof row[9] === 'string' ? JSON.parse(row[9]) : row[9]) : [],
            diningMode: (row[10] || 'TAKEAWAY') as DiningMode,
            tableNumber: String(row[11] || ''),
            estimatedReadyTime: String(row[12] || '20 นาที'),
            prepDurationMin: Number(row[13] || 20),
            slipImageUrl: String(row[14] || '')
          })).filter(o => o.id.length > 0);

          formattedOrders.sort((a, b) => b.id.localeCompare(a.id));

          setOrdersQueue(formattedOrders);
          setOrderHistory(formattedOrders);
        }
      }
    } catch (e) {}
  }, [currentUser]);

  useEffect(() => {
    fetchCloudData();
    const syncInterval = setInterval(fetchCloudData, 3000);
    return () => clearInterval(syncInterval);
  }, [fetchCloudData]);

  const changeTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    localStorage.setItem('talatnoi_active_tab', tab);
  };

  const saveShopsToStorage = (updatedShops: Shop[]) => {
    setShops(updatedShops);
    try {
      localStorage.setItem('talatnoi_q_shops', JSON.stringify(updatedShops));
    } catch (e) {}
  };

  const saveUsersToStorage = (updatedUsers: UserProfile[]) => {
    setRegisteredUsers(updatedUsers);
    try {
      localStorage.setItem('talatnoi_q_users', JSON.stringify(updatedUsers));
    } catch (e) {}
  };

  const sendToGoogleSheet = async (sheetName: string, rowData: any[]) => {
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sheet: sheetName, row: rowData })
      });
    } catch (err) {}
  };

  const handleDeleteShopByAdmin = async (shopId: string) => {
    if (confirm('🚨 ยืนยันการลบร้านค้านี้ออกจากระบบและฐานข้อมูล?')) {
      setIsGlobalLoading(true);
      setLoadingMessage(t.loadingText);

      const updatedShops = shops.filter(s => s.id !== shopId);
      saveShopsToStorage(updatedShops);

      const updatedUsers = registeredUsers.map(u => u.merchantShopId === shopId ? { ...u, merchantShopId: undefined } : u);
      saveUsersToStorage(updatedUsers);

      if (currentUser && currentUser.merchantShopId === shopId) {
        const updatedCurrent = { ...currentUser, merchantShopId: undefined };
        setCurrentUser(updatedCurrent);
        localStorage.setItem('talatnoi_current_user', JSON.stringify(updatedCurrent));
      }

      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            sheet: 'Shops', 
            action: 'deleteShop', 
            shopId: shopId 
          })
        });
        alert('ลบร้านค้าสำเร็จเรียบร้อยแล้ว');
      } catch (e) {
      } finally {
        setIsGlobalLoading(false);
      }
    }
  };

  const handleAdminDeleteUser = async (userId: string, username: string) => {
    if (confirm(`ยืนยันการลบผู้ใช้งาน "${username}" ออกจากระบบและฐานข้อมูล?`)) {
      setIsGlobalLoading(true);
      setLoadingMessage(t.loadingText);

      const updatedUsers = registeredUsers.filter(u => u.id !== userId);
      saveUsersToStorage(updatedUsers);
      
      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            sheet: 'Users', 
            action: 'deleteUser', 
            userId: userId 
          })
        });
        alert(`ลบผู้ใช้งาน ${username} สำเร็จเรียบร้อย`);
      } catch (err) {
      } finally {
        setIsGlobalLoading(false);
      }
    }
  };

  const handleMasterSystemReset = async () => {
    if (confirm('🚨 คำเตือนระดับสูงสุด: คุณต้องการรีเซ็ตระบบทั้งหมด ล้างยอดขายรายวัน/รายเดือน ลบคำสั่งซื้อทั้งหมด และลบผู้ใช้งานทั้งหมดออก (เหลือเพียงแอดมินหลัก) พร้อมล้างข้อมูลใน Google Sheets ใช่หรือไม่?')) {
      setIsGlobalLoading(true);
      setLoadingMessage(t.loadingText);

      setOrdersQueue([]);
      setOrderHistory([]);
      setActiveOrder(null);
      setCart([]);

      if (currentUser) {
        saveUsersToStorage([DEFAULT_ADMIN]);
      }

      saveShopsToStorage([]);
      setReviews([]);
      setSelectedShop(null);

      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            sheet: 'Users', 
            action: 'clear_all' 
          })
        });
      } catch (err) {
      } finally {
        setIsGlobalLoading(false);
      }

      alert('⚡ รีเซ็ตระบบทั้งหมดสำเร็จเรียบร้อยแล้ว');
    }
  };

  const playSoundAlert = (textToSpeak: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en-US' : 'th-TH';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImageState: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageState(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = authUsername.trim().toLowerCase();

    setIsGlobalLoading(true);
    setLoadingMessage(t.loadingText);

    if (isRegisterMode) {
      const isUsernameTaken = registeredUsers.some(
        u => u.username.toLowerCase() === cleanUsername
      );

      if (isUsernameTaken) {
        setIsGlobalLoading(false);
        alert(`❌ Username "${authUsername}" มีผู้ใช้งานแล้ว`);
        return;
      }

      let assignedShopId: string | undefined = undefined;

      if (authRole === 'MERCHANT') {
        assignedShopId = `shop-${cleanUsername}`;
      }

      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: authName || 'ณัชชารีย์ ธราพร',
        username: cleanUsername,
        role: authRole,
        merchantShopId: assignedShopId,
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        phone: '08X-XXX-XXXX',
        bio: 'สายกินของอร่อยประจำ มมส.'
      };

      const updatedUsers = [...registeredUsers, newUser];
      saveUsersToStorage(updatedUsers);
      setCurrentUser(newUser);
      localStorage.setItem('talatnoi_current_user', JSON.stringify(newUser));
      initProfileEditState(newUser);

      await sendToGoogleSheet('Users', [newUser.id, newUser.name, newUser.username, newUser.role, newUser.phone || '-', newUser.merchantShopId || '-', newUser.avatarUrl || '', newUser.bio || '']);
      setIsGlobalLoading(false);
      changeTab(authRole === 'MERCHANT' ? 'MERCHANT_SETUP' : authRole === 'ADMIN' ? 'ADMIN_DASHBOARD' : 'HOME');
    } else {
      const found = registeredUsers.find(u => u.username.toLowerCase() === cleanUsername);
      setIsGlobalLoading(false);
      if (found) {
        if (!found.merchantShopId && found.role === 'MERCHANT') {
          found.merchantShopId = `shop-${found.username}`;
        }
        setCurrentUser(found);
        localStorage.setItem('talatnoi_current_user', JSON.stringify(found));
        initProfileEditState(found);
        if (found.role === 'MERCHANT') {
          const myShop = shops.find(s => s.id === found.merchantShopId);
          if (myShop) {
            setEditShopName(myShop.name);
            setEditShopZone(myShop.canteenZone);
            setEditShopBanner(myShop.bannerImage);
            changeTab('MERCHANT_KDS');
          } else {
            changeTab('MERCHANT_SETUP');
          }
        } else if (found.role === 'ADMIN') {
          changeTab('ADMIN_DASHBOARD');
        } else {
          changeTab('HOME');
        }
      } else {
        alert('ไม่พบ Username นี้ในระบบ กรุณาตรวจสอบหรือลงทะเบียนใหม่');
      }
    }
  };

  const initProfileEditState = (user: UserProfile) => {
    setEditProfileName(user.name);
    setEditProfilePhone(user.phone || '');
    setEditProfileBio(user.bio || '');
    setEditProfileAvatar(user.avatarUrl || '');
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    setIsGlobalLoading(true);
    setLoadingMessage(t.loadingText);

    const updatedUser: UserProfile = {
      ...currentUser,
      name: editProfileName,
      phone: editProfilePhone,
      bio: editProfileBio,
      avatarUrl: editProfileAvatar || currentUser.avatarUrl
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('talatnoi_current_user', JSON.stringify(updatedUser));
    const updatedUsers = registeredUsers.map(u => u.id === updatedUser.id ? updatedUser : u);
    saveUsersToStorage(updatedUsers);

    await sendToGoogleSheet('Users', [
      updatedUser.id, 
      updatedUser.name, 
      updatedUser.username, 
      updatedUser.role, 
      updatedUser.phone || '-', 
      updatedUser.merchantShopId || '-', 
      updatedUser.avatarUrl || '', 
      updatedUser.bio || ''
    ]);

    setIsGlobalLoading(false);
    setIsEditingProfile(false);
    alert('อัปเดตโปรไฟล์เรียบร้อยแล้ว!');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('talatnoi_current_user');
    localStorage.removeItem('talatnoi_active_tab');
    setCart([]);
    setActiveOrder(null);
    setActiveTab('HOME');
  };

  const addonTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const singleItemTotal = selectedMenu ? (selectedMenu.price + addonTotal) * menuQty : 0;
  const cartSubtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const totalCartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const calculateQueuePrepTime = (shopId: string, currentCartItems: CartItem[]) => {
    const today = new Date().toISOString().split('T')[0];
    const todayShopActiveOrders = ordersQueue.filter(
      o => o.shopId === shopId && o.createdAt === today && (o.status === 'PENDING' || o.status === 'COOKING')
    );

    let cumulativeQueueDelay = todayShopActiveOrders.length * 5;
    const totalItemsInCurrentOrder = currentCartItems.reduce((sum, item) => sum + item.quantity, 0);
    const currentOrderBaseTime = 20 + Math.max(0, (totalItemsInCurrentOrder - 1) * 2);

    return cumulativeQueueDelay + currentOrderBaseTime;
  };

  const handleAddTempAddon = () => {
    if (!newAddonName.trim()) return;
    const priceNum = parseFloat(newAddonPrice);
    const newAd: AddonOption = {
      id: `ad-${Date.now()}`,
      name: newAddonName.trim(),
      price: isNaN(priceNum) ? 0 : priceNum
    };
    setTempAddons([...tempAddons, newAd]);
    setNewAddonName('');
    setNewAddonPrice('');
  };

  const handleRemoveTempAddon = (id: string) => {
    setTempAddons(tempAddons.filter(a => a.id !== id));
  };

  const toggleAddon = (addon: AddonOption) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedMenu || !selectedMenu.isAvailable) return;
    const newItem: CartItem = {
      cartItemId: `${selectedMenu.id}-${Date.now()}`,
      menuItem: selectedMenu,
      quantity: menuQty,
      subtotal: singleItemTotal,
      selectedAddons: [...selectedAddons],
      specialInstructions: specialNote
    };
    setCart([...cart, newItem]);
    setSelectedMenu(null);
    setMenuQty(1);
    setSelectedAddons([]);
    setSpecialNote('');
  };

  const handleReorder = (ord: Order) => {
    setCart([...cart, ...ord.items]);
    const shopToSelect = shops.find(s => s.id === ord.shopId) || selectedShop;
    setSelectedShop(shopToSelect);
    changeTab('CHECKOUT');
  };

  const handleConfirmPayment = async () => {
    if (!selectedShop) return;
    setIsGlobalLoading(true);
    setLoadingMessage(t.loadingText);

    const today = new Date().toISOString().split('T')[0];

    const todayShopOrders = ordersQueue.filter(
      o => o.shopId === selectedShop.id && o.createdAt === today
    );
    const nextQueueNum = todayShopOrders.length + 1;
    const formattedQueueNumber = `Q${nextQueueNum.toString().padStart(2, '0')}`;

    const totalEstimatedWaitTime = calculateQueuePrepTime(selectedShop.id, cart);

    const now = new Date();
    now.setMinutes(now.getMinutes() + totalEstimatedWaitTime);
    const est = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} น.`;

    const newOrd: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      queueNumber: formattedQueueNumber,
      studentName: currentUser?.name || 'ณัชชารีย์ ธราพร',
      customerUsername: currentUser?.username || 'user',
      shopId: selectedShop.id,
      shopName: selectedShop.name,
      items: [...cart],
      diningMode,
      tableNumber: diningMode === 'DINE_IN' ? tableNumber : undefined,
      totalAmount: cartSubtotal,
      status: 'PENDING',
      estimatedReadyTime: est,
      prepDurationMin: totalEstimatedWaitTime,
      createdAt: today,
      slipImageUrl: transferSlipUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
    };

    const updatedQueue = [newOrd, ...ordersQueue];
    setOrdersQueue(updatedQueue);
    setOrderHistory([newOrd, ...orderHistory]);
    setCart([]);
    setTransferSlipUrl('');
    
    await sendToGoogleSheet('Orders', [newOrd.id, newOrd.queueNumber, newOrd.studentName, newOrd.shopName, newOrd.totalAmount, newOrd.status, newOrd.createdAt, newOrd.customerUsername, newOrd.shopId, JSON.stringify(newOrd.items), newOrd.diningMode, newOrd.tableNumber || '', newOrd.estimatedReadyTime, newOrd.prepDurationMin, newOrd.slipImageUrl]);
    
    setIsGlobalLoading(false);
    changeTab('TRACKING');

    if (currentUser?.role === 'MERCHANT' && currentUser?.merchantShopId === selectedShop.id) {
      playSoundAlert(`มีออเดอร์ใหม่เข้ามา คิวที่ ${newOrd.queueNumber}`);
    }
  };

  const updateMerchantOrderStatus = async (orderId: string, status: OrderStatus) => {
    const targetOrder = ordersQueue.find(o => o.id === orderId);
    const updatedQueue = ordersQueue.map(o => o.id === orderId ? { ...o, status } : o);
    setOrdersQueue(updatedQueue);
    setOrderHistory(orderHistory.map(o => o.id === orderId ? { ...o, status } : o));
    
    if (activeOrder?.id === orderId) {
      setActiveOrder({ ...activeOrder, status });
    }

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sheet: 'Orders', 
          action: 'updateOrderStatus', 
          orderId: orderId,
          status: status
        })
      });
    } catch (e) {}

    if (status === 'READY' && targetOrder) {
      if (currentUser?.username === targetOrder.customerUsername) {
        setReadyNotificationOrder(targetOrder);
        playSoundAlert(`อาหารคิวที่ ${targetOrder.queueNumber} จากร้าน ${targetOrder.shopName} เสร็จเรียบร้อยแล้วค่ะ`);
      }
    }
  };

  const toggleShopOpenStatus = (shopId: string) => {
    const updatedShops = shops.map(s => s.id === shopId ? { ...s, isOpen: !s.isOpen } : s);
    saveShopsToStorage(updatedShops);
  };

  const toggleMenuAvailableStatus = (shopId: string, menuId: string) => {
    const updatedShops = shops.map(s => {
      if (s.id === shopId) {
        return {
          ...s,
          menus: s.menus.map(m => m.id === menuId ? { ...m, isAvailable: !m.isAvailable } : m)
        };
      }
      return s;
    });
    saveShopsToStorage(updatedShops);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShop || !reviewText.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      shopId: selectedShop.id,
      userName: currentUser?.name || 'ณัชชารีย์ ธราพร',
      rating: starRating,
      comment: reviewText,
      createdAt: 'วันนี้'
    };

    const updatedReviews = [newRev, ...reviews];
    setReviews(updatedReviews);

    const shopRevList = updatedReviews.filter(r => r.shopId === selectedShop.id);
    const newAvg = Number((shopRevList.reduce((sum, r) => sum + r.rating, 0) / shopRevList.length).toFixed(1));

    const updatedShops = shops.map(s => s.id === selectedShop.id ? { ...s, rating: newAvg, reviewCount: shopRevList.length } : s);
    saveShopsToStorage(updatedShops);
    setSelectedShop({ ...selectedShop, rating: newAvg, reviewCount: shopRevList.length });
    setReviewText('');

    await sendToGoogleSheet('Reviews', [newRev.id, selectedShop.name, newRev.userName, newRev.rating, newRev.comment, newRev.createdAt]);
  };

  const handleUpdateShopInfo = async (shopId: string) => {
    if (!editShopName.trim()) {
      alert('กรุณาระบุชื่อร้านค้า');
      return;
    }

    const cleanShopId = currentUser?.merchantShopId || shopId;
    const existingShopIndex = shops.findIndex(s => s.id === cleanShopId);
    let updatedShops = [...shops];

    if (existingShopIndex >= 0) {
      updatedShops[existingShopIndex] = {
        ...updatedShops[existingShopIndex],
        name: editShopName.trim(),
        canteenZone: editShopZone || 'โซนกลาง',
        bannerImage: editShopBanner || updatedShops[existingShopIndex].bannerImage
      };
    } else {
      const newShopObj: Shop = {
        id: cleanShopId,
        name: editShopName.trim(),
        category: 'อาหารตามสั่ง',
        rating: 5.0,
        reviewCount: 0,
        bannerImage: editShopBanner || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        isOpen: true,
        canteenZone: editShopZone || 'โซนกลาง',
        menus: []
      };
      updatedShops = [newShopObj, ...updatedShops];
    }

    const uniqueMap = new Map<string, Shop>();
    updatedShops.forEach(s => {
      if (s.id === cleanShopId) {
        if (!uniqueMap.has(cleanShopId)) {
          uniqueMap.set(cleanShopId, s);
        } else {
          const existing = uniqueMap.get(cleanShopId)!;
          const menuMap = new Map<string, MenuItem>();
          [...existing.menus, ...s.menus].forEach(m => menuMap.set(m.id, m));
          existing.menus = Array.from(menuMap.values());
        }
      } else if (!uniqueMap.has(s.id)) {
        uniqueMap.set(s.id, s);
      }
    });

    const finalShops = Array.from(uniqueMap.values());
    saveShopsToStorage(finalShops);

    const current = finalShops.find(s => s.id === cleanShopId);
    if (current) {
      await sendToGoogleSheet('Shops', [current.id, current.name, current.category, current.rating, current.reviewCount, current.bannerImage, current.isOpen, current.canteenZone, JSON.stringify(current.menus)]);
    }
    
    changeTab('MERCHANT_KDS');
  };

  const handleAdminSaveShop = (shopId: string) => {
    const updatedShops = shops.map(s => s.id === shopId ? { ...s, name: adminEditShopName, canteenZone: adminEditShopZone } : s);
    saveShopsToStorage(updatedShops);
    setAdminEditingShop(null);
    alert('แอดมินอัปเดตข้อมูลร้านค้าเรียบร้อยแล้ว!');
  };

  const handleAdminDeleteMenu = (shopId: string, menuId: string) => {
    if (confirm('คุณต้องการลบเมนูนี้ออกจากร้านค้าหรือไม่?')) {
      const updatedShops = shops.map(s => {
        if (s.id === shopId) {
          return { ...s, menus: s.menus.filter(m => m.id !== menuId) };
        }
        return s;
      });
      saveShopsToStorage(updatedShops);
      const currentShop = updatedShops.find(s => s.id === shopId);
      if (currentShop) {
        sendToGoogleSheet('Shops', [currentShop.id, currentShop.name, currentShop.category, currentShop.rating, currentShop.reviewCount, currentShop.bannerImage, currentShop.isOpen, currentShop.canteenZone, JSON.stringify(currentShop.menus)]);
      }
      alert('ลบเมนูเรียบร้อยแล้ว');
    }
  };

  const openEditMenuModal = (menu: MenuItem) => {
    setEditingMenu(menu);
    setEditMenuName(menu.name);
    setEditMenuDesc(menu.description);
    setEditMenuPrice(menu.price.toString());
    setEditMenuImage(menu.imageUrl);
  };

  const handleSaveEditedMenu = async (shopId: string) => {
    if (!editingMenu || !editMenuName.trim() || !editMenuPrice) return;
    const priceNum = parseFloat(editMenuPrice);
    if (isNaN(priceNum)) return;

    const cleanShopId = currentUser?.merchantShopId || shopId;

    const updatedShops = shops.map(s => {
      if (s.id === cleanShopId) {
        return {
          ...s,
          menus: s.menus.map(m => m.id === editingMenu.id ? {
            ...m,
            name: editMenuName.trim(),
            description: editMenuDesc.trim(),
            price: priceNum,
            imageUrl: editMenuImage || m.imageUrl
          } : m)
        };
      }
      return s;
    });

    saveShopsToStorage(updatedShops);
    const currentShop = updatedShops.find(s => s.id === cleanShopId);
    if (currentShop) {
      await sendToGoogleSheet('Shops', [currentShop.id, currentShop.name, currentShop.category, currentShop.rating, currentShop.reviewCount, currentShop.bannerImage, currentShop.isOpen, currentShop.canteenZone, JSON.stringify(currentShop.menus)]);
    }

    setEditingMenu(null);
    alert('อัปเดตเมนูอาหารเรียบร้อยแล้ว!');
  };

  const handleAddNewMenu = async (shopId: string) => {
    if (!newMenuName.trim() || !newMenuPrice) {
      alert('กรุณาระบุชื่อเมนูและราคาเริ่มต้น');
      return;
    }
    const priceNum = parseFloat(newMenuPrice);
    if (isNaN(priceNum)) return;

    const cleanShopId = currentUser?.merchantShopId || shopId;

    const newMenuItem: MenuItem = {
      id: `m-${Date.now()}`,
      shopId: cleanShopId,
      name: newMenuName.trim(),
      description: newMenuDesc.trim() || 'อร่อย สะอาด สดใหม่ เครื่องแน่น',
      price: priceNum,
      imageUrl: newMenuImage.trim() ? newMenuImage : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      category: 'อาหารตามสั่ง',
      isAvailable: true,
      addons: [...tempAddons]
    };

    let shopFound = false;
    const updatedShops = shops.map(s => {
      if (s.id === cleanShopId) {
        shopFound = true;
        return { ...s, menus: [...s.menus, newMenuItem] };
      }
      return s;
    });

    if (!shopFound) {
      const newShopObj: Shop = {
        id: cleanShopId,
        name: editShopName || currentUser?.name || 'ร้านค้าของฉัน',
        category: 'อาหารตามสั่ง',
        rating: 5.0,
        reviewCount: 0,
        bannerImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        isOpen: true,
        canteenZone: editShopZone || 'โซนกลาง',
        menus: [newMenuItem]
      };
      updatedShops.push(newShopObj);
    }
    
    saveShopsToStorage(updatedShops);

    const currentShop = updatedShops.find(s => s.id === cleanShopId);
    if (currentShop) {
      await sendToGoogleSheet('Shops', [
        currentShop.id, 
        currentShop.name, 
        currentShop.category, 
        currentShop.rating, 
        currentShop.reviewCount, 
        currentShop.bannerImage, 
        currentShop.isOpen, 
        currentShop.canteenZone, 
        JSON.stringify(currentShop.menus)
      ]);
    }

    setNewMenuName('');
    setNewMenuDesc('');
    setNewMenuPrice('');
    setNewMenuImage('');
    setTempAddons([]);
    setNewAddonName('');
    setNewAddonPrice('');
    alert(`เพิ่มเมนู "${newMenuItem.name}" ลงในร้านเรียบร้อยแล้ว!`);
  };

  const handleExportCsvReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Order ID,Queue No,Customer,Shop,Total Amount,Status,Date,Dining Mode\n";

    ordersQueue.forEach(ord => {
      csvContent += `"${ord.id}","${ord.queueNumber}","${ord.studentName}","${ord.shopName}","${ord.totalAmount}","${ord.status}","${ord.createdAt}","${ord.diningMode}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `talatnoi_q_report_${currentDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const LanguageSelector = () => (
    <div className="relative inline-flex items-center bg-white/90 backdrop-blur-md border border-red-600 rounded-2xl px-2.5 py-1 shadow-md">
      <span className="mr-1 text-xs">{t.flag}</span>
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value as 'th' | 'zh' | 'en')}
        className="bg-transparent text-[11px] font-black text-red-600 outline-none cursor-pointer tracking-wider"
      >
        <option value="th" className="bg-white text-red-600">🇹🇭 ภาษาไทย</option>
        <option value="zh" className="bg-white text-red-600">🇨🇳 中文</option>
        <option value="en" className="bg-white text-red-600">🇬🇧 English</option>
      </select>
    </div>
  );

  const getStatusText = (st: OrderStatus) => {
    if (st === 'PENDING') return t.statusPending;
    if (st === 'COOKING') return t.statusCooking;
    if (st === 'READY') return t.statusReady;
    return t.statusCompleted;
  };

  const filteredOrderHistory = orderHistory.filter(ord => {
    const isOwner = currentUser ? ord.customerUsername.toLowerCase() === currentUser.username.toLowerCase() : false;
    if (!isOwner) return false;

    if (historyFilter === 'ACTIVE') return ord.status !== 'COMPLETED' && ord.status !== 'CANCELLED';
    if (historyFilter === 'DONE') return ord.status === 'COMPLETED';
    return true;
  });

  const filteredShops = shops.filter(shop => {
    if (selectedCategoryFilter === 'ALL') return true;
    return shop.category === selectedCategoryFilter;
  });

  const SlipModal = () => {
    if (!viewingSlipOrder) return null;
    return (
      <div className="fixed inset-0 z-[999] bg-red-950/80 backdrop-blur-md flex justify-center items-center p-4 animate-in fade-in">
        <div className="w-full max-w-sm bg-white border-2 border-red-600 rounded-3xl p-5 space-y-4 text-red-900 shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-black text-sm text-red-600">สลิปโอนเงิน ({viewingSlipOrder.id})</h3>
              <p className="text-[10px] text-red-700">ลูกค้า: {viewingSlipOrder.studentName} (@{viewingSlipOrder.customerUsername})</p>
            </div>
            <button onClick={() => setViewingSlipOrder(null)} className="p-1 hover:text-red-700"><X className="w-5 h-5 text-red-600" /></button>
          </div>
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-red-200 bg-white flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={viewingSlipOrder.slipImageUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'} 
              alt="Transfer Slip" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="flex justify-between items-center text-xs font-bold pt-1 bg-red-50 p-3 rounded-xl border border-red-200">
            <span>ยอดเงินที่ต้องได้รับ:</span>
            <span className="text-red-600 font-black text-base">฿{viewingSlipOrder.totalAmount}</span>
          </div>
          <button 
            onClick={() => setViewingSlipOrder(null)} 
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-xs font-bold transition-colors shadow-md"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    );
  };

  const TicketModal = () => {
    if (!printingOrder) return null;
    return (
      <div className="fixed inset-0 z-[999] bg-red-950/80 backdrop-blur-md flex justify-center items-center p-4 animate-in fade-in">
        <div className="w-full max-w-xs bg-white text-red-950 rounded-3xl p-6 space-y-4 font-mono shadow-2xl border-2 border-red-600">
          <div className="text-center space-y-1 border-b border-dashed border-red-300 pb-3">
            <h3 className="font-black text-base text-red-600">{printingOrder.shopName}</h3>
            <p className="text-[10px] text-red-700">โรงอาหารกลาง มมส. (ตลาดน้อยคิว)</p>
            <div className="pt-2">
              <span className="text-3xl font-black bg-red-600 text-white px-3 py-1 rounded-xl inline-block shadow">
                {printingOrder.queueNumber}
              </span>
            </div>
            <p className="text-xs font-bold pt-1 text-red-800">
              {printingOrder.diningMode === 'DINE_IN' ? `🍽️ ทานที่โต๊ะ ${printingOrder.tableNumber || '-'}` : '🛍️ สั่งกลับบ้าน (Takeaway)'}
            </p>
          </div>

          <div className="text-[11px] space-y-0.5 border-b border-dashed border-red-300 pb-2 text-red-900">
            <p>ออเดอร์: <strong>{printingOrder.id}</strong></p>
            <p>ผู้สั่ง: <strong>{printingOrder.studentName}</strong> (@{printingOrder.customerUsername})</p>
            <p>วันที่: {printingOrder.createdAt}</p>
            <p>เวลาทำโดยประมาณ: <strong>{printingOrder.prepDurationMin || 20} นาที</strong></p>
          </div>

          <div className="space-y-2 text-xs text-red-900">
            {printingOrder.items.map((it, idx) => (
              <div key={idx} className="space-y-0.5 border-b border-red-100 pb-1">
                <div className="flex justify-between font-bold">
                  <span>{it.quantity}x {it.menuItem.name}</span>
                  <span>฿{it.subtotal}</span>
                </div>
                {it.selectedAddons && it.selectedAddons.length > 0 && (
                  <p className="text-[10px] text-red-700 pl-3">
                    + {it.selectedAddons.map(a => `${a.name} (${a.price === 0 ? 'ฟรี' : `+฿${a.price}`})`).join(', ')}
                  </p>
                )}
                {it.specialInstructions && (
                  <p className="text-[10px] text-red-600 italic pl-3">
                    หมายเหตุ: {it.specialInstructions}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-red-300 pt-2 flex justify-between font-black text-sm text-red-600">
            <span>ยอดชำระสุทธิ:</span>
            <span>฿{printingOrder.totalAmount}</span>
          </div>

          <p className="text-[9px] text-center text-red-500">*** ขอบคุณที่ใช้บริการ ตลาดน้อยคิว ***</p>

          <div className="flex gap-2 pt-1">
            <button onClick={() => setPrintingOrder(null)} className="flex-1 bg-red-100 text-red-700 py-2.5 rounded-xl text-xs font-bold">ปิด</button>
            <button onClick={() => { window.print(); setPrintingOrder(null); }} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1 shadow-md">
              <Printer className="w-3.5 h-3.5" /> พิมพ์ Slip 🖨️
            </button>
          </div>
        </div>
      </div>
    );
  };

  const GlobalLoadingOverlay = () => {
    if (!isGlobalLoading) return null;
    return (
      <div className="fixed inset-0 z-[9999] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center space-y-3 animate-in fade-in">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
        <p className="text-sm font-black text-red-600">{loadingMessage}</p>
      </div>
    );
  };

  if (!currentUser) {
    return (
      <div className="min-h-[100dvh] w-full flex justify-center items-center p-4 font-sans relative overflow-x-hidden touch-manipulation bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/ตลาดน้อย.jpg')` }}>
        <div className="absolute inset-0 bg-red-950/40 backdrop-blur-xs" />
        <GlobalLoadingOverlay />
        <div className="absolute top-5 right-5 z-20">
          <LanguageSelector />
        </div>

        <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-7 shadow-2xl space-y-6 border-2 border-red-600 my-auto z-10">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-red-600 flex items-center justify-center text-white shadow-xl shadow-red-600/30 mx-auto font-black transform hover:scale-105 transition-transform">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-red-600 tracking-tight">{t.title}</h1>
            <p className="text-xs text-red-700 font-medium">{t.subtitle}</p>
          </div>

          <div className="flex bg-red-50 p-1.5 rounded-2xl border border-red-200">
            <button onClick={() => setIsRegisterMode(false)} className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${!isRegisterMode ? 'bg-red-600 text-white shadow-md' : 'text-red-600 hover:text-red-800'}`}>{t.login}</button>
            <button onClick={() => setIsRegisterMode(true)} className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${isRegisterMode ? 'bg-red-600 text-white shadow-md' : 'text-red-600 hover:text-red-800'}`}>{t.register}</button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {isRegisterMode && (
              <>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-red-700">{t.name}</label>
                  <input type="text" required value={authName} onChange={e => setAuthName(e.target.value)} placeholder="ณัชชารีย์ ธราพร" className="w-full bg-white border border-red-300 text-red-950 rounded-2xl px-3.5 py-2.5 text-xs focus:border-red-600 outline-none transition-colors shadow-inner" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-red-700">{t.userType}</label>
                  <select value={authRole} onChange={e => setAuthRole(e.target.value as UserRole)} className="w-full bg-white border border-red-300 text-red-950 rounded-2xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-red-600 shadow-inner">
                    <option value="STUDENT">{t.student}</option>
                    <option value="MERCHANT">{t.merchant}</option>
                    <option value="ADMIN">{t.admin}</option>
                  </select>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-red-700">{t.username}</label>
              <input 
                type="text" 
                required 
                value={authUsername} 
                onChange={e => setAuthUsername(e.target.value)} 
                placeholder="เช่น somchai99, chef_msu" 
                className="w-full bg-white border border-red-300 text-red-950 rounded-2xl px-3.5 py-2.5 text-xs outline-none focus:border-red-600 transition-colors shadow-inner" 
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-red-700">{t.password}</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={authPassword} 
                  onChange={e => setAuthPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className="w-full bg-white border border-red-300 text-red-950 rounded-2xl pl-3.5 pr-10 py-2.5 text-xs outline-none focus:border-red-600 transition-colors shadow-inner" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isGlobalLoading} className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-2xl text-xs shadow-lg shadow-red-600/30 active:scale-95 transition-all disabled:opacity-50">
              {isRegisterMode ? t.submitRegister : t.submitLogin}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (currentUser.role === 'ADMIN') {
    return (
      <div className="min-h-[100dvh] w-full bg-red-50 text-red-950 flex justify-center font-sans overflow-x-hidden touch-manipulation bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/ตลาดน้อย.jpg')` }}>
        <div className="absolute inset-0 bg-red-950/30 backdrop-blur-xs pointer-events-none" />
        <GlobalLoadingOverlay />
        <main className="w-full max-w-md bg-white min-h-[100dvh] shadow-2xl relative flex flex-col pb-20 border-x border-red-200 z-10">
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-red-200 px-4 py-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-red-100 border border-red-300 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="font-black text-sm text-red-700">{t.adminPanel}</h2>
                <p className="text-[10px] text-red-600 font-bold">{t.adminSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <button onClick={handleLogout} className="text-xs text-red-600 bg-red-50 border border-red-300 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 hover:bg-red-100 transition-colors"><LogOut className="w-3 h-3" /> {t.logout}</button>
            </div>
          </header>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-5 gap-1 bg-red-100 p-1.5 rounded-2xl text-[10px] font-black border border-red-300 text-center shadow-inner">
              <button onClick={() => setAdminActiveSubTab('OVERVIEW')} className={`py-2 rounded-xl transition-all ${adminActiveSubTab === 'OVERVIEW' ? 'bg-red-600 text-white shadow-md' : 'text-red-700 hover:text-red-900'}`}>📊 สรุป</button>
              <button onClick={() => setAdminActiveSubTab('SHOPS')} className={`py-2 rounded-xl transition-all ${adminActiveSubTab === 'SHOPS' ? 'bg-red-600 text-white shadow-md' : 'text-red-700 hover:text-red-900'}`}>🏪 ร้าน</button>
              <button onClick={() => setAdminActiveSubTab('ORDERS')} className={`py-2 rounded-xl transition-all ${adminActiveSubTab === 'ORDERS' ? 'bg-red-600 text-white shadow-md' : 'text-red-700 hover:text-red-900'}`}>📑 ออเดอร์</button>
              <button onClick={() => setAdminActiveSubTab('USERS')} className={`py-2 rounded-xl transition-all ${adminActiveSubTab === 'USERS' ? 'bg-red-600 text-white shadow-md' : 'text-red-700 hover:text-red-900'}`}>👥 ผู้ใช้</button>
              <button onClick={() => setAdminActiveSubTab('MASTER_RESET')} className={`py-2 rounded-xl transition-all ${adminActiveSubTab === 'MASTER_RESET' ? 'bg-red-700 text-white shadow-md font-black' : 'text-red-600 hover:text-red-800'}`}>⚡ รีเซ็ต</button>
            </div>

            {adminActiveSubTab === 'OVERVIEW' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-600 text-white p-4 rounded-3xl shadow-md space-y-1 border border-red-700">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-wider">{t.adminGlobalRevenue}</span>
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-2xl font-black">฿{globalDailyRevenue.toLocaleString()}</h3>
                    <p className="text-[9px] font-bold opacity-90">ยอดเฉพาะวันนี้</p>
                  </div>

                  <div className="bg-white border border-red-200 text-red-950 p-4 rounded-3xl shadow-sm space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">{t.adminGlobalMonthly}</span>
                      <CalendarDays className="w-4 h-4 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-black text-red-600">฿{globalMonthlyRevenue.toLocaleString()}</h3>
                    <p className="text-[9px] text-red-700">ยอดสะสมเดือนนี้</p>
                  </div>
                </div>

                <button 
                  onClick={handleExportCsvReport}
                  className="w-full bg-white border border-red-400 hover:border-red-600 text-red-600 p-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" /> {t.exportCsvBtn}
                </button>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white border border-red-200 p-3 rounded-2xl shadow-sm">
                    <ListOrdered className="w-4 h-4 text-red-600 mx-auto mb-1" />
                    <span className="text-[9px] text-red-700 block">{t.adminTotalOrders}</span>
                    <strong className="text-sm font-black text-red-600">{globalTotalOrdersCount}</strong>
                  </div>
                  <div className="bg-white border border-red-200 p-3 rounded-2xl shadow-sm">
                    <ChefHat className="w-4 h-4 text-red-600 mx-auto mb-1" />
                    <span className="text-[9px] text-red-700 block">{t.adminActiveShops}</span>
                    <strong className="text-sm font-black text-red-600">{globalActiveShopsCount}/{shops.length}</strong>
                  </div>
                  <div className="bg-white border border-red-200 p-3 rounded-2xl shadow-sm">
                    <Users className="w-4 h-4 text-red-600 mx-auto mb-1" />
                    <span className="text-[9px] text-red-700 block">{t.adminAllUsers}</span>
                    <strong className="text-sm font-black text-red-600">{globalTotalUsersCount}</strong>
                  </div>
                </div>

                <div className="bg-white border border-red-200 rounded-3xl p-4 space-y-3 shadow-sm">
                  <h4 className="font-black text-xs text-red-600 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-red-600" /> {t.storeBreakdownTitle}
                  </h4>
                  <div className="space-y-2">
                    {shops.length === 0 ? (
                      <p className="text-xs text-red-700 text-center py-6">ยังไม่มีร้านค้าในระบบ</p>
                    ) : (
                      shops.map(shop => {
                        const shopDailyRev = ordersQueue
                          .filter(o => o.shopId === shop.id && o.status === 'COMPLETED' && o.createdAt === currentDate)
                          .reduce((s, o) => s + o.totalAmount, 0);

                        const shopMonthlyRev = ordersQueue
                          .filter(o => o.shopId === shop.id && o.status === 'COMPLETED' && o.createdAt.startsWith(currentMonth))
                          .reduce((s, o) => s + o.totalAmount, 0);

                        const shopOrdersCount = ordersQueue.filter(o => o.shopId === shop.id).length;

                        return (
                          <div key={shop.id} className="p-3 bg-red-50 border border-red-100 rounded-2xl flex justify-between items-center text-xs">
                            <div className="space-y-0.5">
                              <strong className="text-red-950 font-bold block">{shop.name}</strong>
                              <p className="text-[10px] text-red-700">{shop.canteenZone} • รวม {shopOrdersCount} ออเดอร์</p>
                            </div>
                            <div className="text-right">
                              <span className="text-red-600 font-black block">วันนี้: ฿{shopDailyRev.toLocaleString()}</span>
                              <span className="text-red-700 text-[10px] block">เดือนนี้: ฿{shopMonthlyRev.toLocaleString()}</span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}

            {adminActiveSubTab === 'SHOPS' && (
              <div className="space-y-4 animate-in fade-in">
                {adminEditingShop && (
                  <div className="bg-white border border-red-400 p-4 rounded-3xl space-y-3 shadow-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-black text-xs text-red-600">แก้ไขข้อมูลร้าน: {adminEditingShop.name}</h4>
                      <button onClick={() => setAdminEditingShop(null)}><X className="w-4 h-4 text-red-600" /></button>
                    </div>
                    <div className="space-y-2 text-xs">
                      <input type="text" value={adminEditShopName} onChange={e => setAdminEditShopName(e.target.value)} placeholder="ชื่อร้าน" className="w-full bg-white border border-red-300 text-red-950 rounded-xl px-3 py-2 outline-none focus:border-red-600" />
                      <input type="text" value={adminEditShopZone} onChange={e => setAdminEditShopZone(e.target.value)} placeholder="โซนโรงอาหาร" className="w-full bg-white border border-red-300 text-red-950 rounded-xl px-3 py-2 outline-none focus:border-red-600" />
                      <button onClick={() => handleAdminSaveShop(adminEditingShop.id)} className="w-full bg-red-600 text-white py-2.5 rounded-xl font-black shadow">
                        {t.saveShopInfo}
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {shops.length === 0 ? (
                    <div className="text-center py-14 text-red-700 text-xs">ยังไม่มีร้านค้าในระบบ</div>
                  ) : (
                    shops.map(shop => (
                      <div key={shop.id} className="bg-white border border-red-200 rounded-3xl p-4 shadow-sm space-y-3">
                        <div className="flex gap-3.5 items-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={shop.bannerImage} alt={shop.name} className="w-14 h-14 rounded-2xl object-cover border border-red-200" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-red-100 text-red-700 font-black px-2 py-0.5 rounded-md border border-red-200">{shop.category}</span>
                              <span className={`text-[10px] font-bold ${shop.isOpen ? 'text-red-600' : 'text-red-400'}`}>{shop.isOpen ? 'เปิด' : 'ปิด'}</span>
                            </div>
                            <h4 className="font-black text-sm text-red-950 mt-1">{shop.name}</h4>
                            <p className="text-[10px] text-red-700">{shop.canteenZone} • {shop.menus.length} เมนู</p>
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-red-100">
                          <span className="text-[10px] font-bold text-red-700 uppercase block">เมนูของร้าน ({shop.menus.length})</span>
                          {shop.menus.map(m => (
                            <div key={m.id} className="flex justify-between items-center bg-red-50 px-3 py-1.5 rounded-xl text-xs border border-red-100">
                              <span className="text-red-950 font-medium">{m.name} (฿{m.price})</span>
                              <div className="flex items-center gap-2">
                                <button onClick={() => toggleMenuAvailableStatus(shop.id, m.id)} className={`text-[9px] px-2 py-0.5 rounded font-bold ${m.isAvailable ? 'bg-red-600 text-white' : 'bg-red-200 text-red-700'}`}>
                                  {m.isAvailable ? 'พร้อม' : 'หมด'}
                                </button>
                                <button onClick={() => handleAdminDeleteMenu(shop.id, m.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 pt-2 border-t border-red-100 text-xs">
                          <button 
                            onClick={() => { setAdminEditingShop(shop); setAdminEditShopName(shop.name); setAdminEditShopZone(shop.canteenZone); }}
                            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-2 rounded-xl font-bold flex items-center justify-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> แก้ไขชื่อ/โซน
                          </button>
                          <button 
                            onClick={() => toggleShopOpenStatus(shop.id)}
                            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-2 rounded-xl font-bold flex items-center justify-center gap-1"
                          >
                            <Power className="w-3.5 h-3.5" /> {shop.isOpen ? 'ปิดร้าน' : 'เปิดร้าน'}
                          </button>
                          <button 
                            onClick={() => handleDeleteShopByAdmin(shop.id)} 
                            className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-xl font-bold flex items-center justify-center shadow cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {adminActiveSubTab === 'ORDERS' && (
              <div className="space-y-3 animate-in fade-in">
                {ordersQueue.length === 0 ? (
                  <div className="text-center py-14 text-red-700 text-xs">ยังไม่มีออเดอร์ในระบบ</div>
                ) : (
                  ordersQueue.map(ord => (
                    <div key={ord.id} className="bg-white border border-red-200 rounded-3xl p-4 text-xs space-y-2.5 shadow-sm">
                      <div className="flex justify-between items-center">
                        <div>
                          <strong className="text-red-950 text-sm block">{ord.shopName}</strong>
                          <span className="text-[10px] text-red-700">{ord.id} • คิว {ord.queueNumber} ({ord.createdAt})</span>
                        </div>
                        <span className="text-[10px] bg-red-100 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full font-black">{getStatusText(ord.status)}</span>
                      </div>
                      
                      <div className="bg-red-50 p-2.5 rounded-2xl text-red-900 space-y-1 border border-red-100">
                        <p>ลูกค้า: <strong className="text-red-950">{ord.studentName}</strong> (@{ord.customerUsername})</p>
                        <p>รูปแบบ: <strong className="text-red-950">{ord.diningMode === 'DINE_IN' ? `ทานที่โต๊ะ ${ord.tableNumber || '-'}` : 'ห่อกลับบ้าน'}</strong></p>
                        <p>เวลาทำโดยประมาณ: <strong className="text-red-600">{ord.prepDurationMin || 20} นาที</strong> (เสร็จประมาณ {ord.estimatedReadyTime})</p>
                        <p>ยอดรวม: <strong className="text-red-600">฿{ord.totalAmount}</strong></p>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button 
                          type="button"
                          onClick={() => setViewingSlipOrder(ord)} 
                          className="flex-1 bg-white hover:bg-red-50 text-red-600 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border border-red-200 cursor-pointer active:scale-95 transition-all shadow-sm"
                        >
                          <Receipt className="w-3.5 h-3.5 text-red-600" /> {t.viewSlipBtn}
                        </button>
                        <button 
                          type="button"
                          onClick={() => setPrintingOrder(ord)} 
                          className="flex-1 bg-white hover:bg-red-50 text-red-600 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border border-red-200 cursor-pointer active:scale-95 transition-all shadow-sm"
                        >
                          <Printer className="w-3.5 h-3.5 text-red-600" /> {t.printTicketBtn}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {adminActiveSubTab === 'USERS' && (
              <div className="space-y-3 animate-in fade-in">
                {registeredUsers.map(user => (
                  <div key={user.id} className="bg-white border border-red-200 rounded-3xl p-4 flex items-center justify-between text-xs shadow-sm">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-red-200" />
                      <div>
                        <h4 className="font-bold text-red-950">{user.name}</h4>
                        <p className="text-[10px] text-red-700">@{user.username} • <span className="text-red-600 font-bold">{user.role}</span></p>
                      </div>
                    </div>
                    {user.id !== currentUser.id && (
                      <button onClick={() => handleAdminDeleteUser(user.id, user.username)} disabled={isGlobalLoading} className="text-white hover:bg-red-700 p-2 bg-red-600 rounded-xl cursor-pointer shadow disabled:opacity-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {adminActiveSubTab === 'MASTER_RESET' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="bg-red-50 border-2 border-red-600 rounded-3xl p-5 space-y-4 text-center shadow-md">
                  <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <RefreshCw className="w-7 h-7 animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-base text-red-600">{t.resetSystemTitle}</h3>
                    <p className="text-xs text-red-900 leading-relaxed">{t.resetSystemDesc}</p>
                  </div>

                  <button 
                    onClick={handleMasterSystemReset}
                    disabled={isGlobalLoading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3.5 rounded-2xl text-xs shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" /> {t.executeResetBtn}
                  </button>
                </div>
              </div>
            )}
          </div>

          <SlipModal />
          <TicketModal />
        </main>
      </div>
    );
  }

  if (currentUser.role === 'MERCHANT') {
    if (!currentUser.merchantShopId) {
      currentUser.merchantShopId = `shop-${currentUser.username}`;
    }
    const myShop = shops.find(s => s.id === currentUser.merchantShopId);
    const myOrders = myShop ? ordersQueue.filter(o => o.shopId === myShop.id) : [];

    const myDailyRevenue = myOrders
      .filter(o => o.status === 'COMPLETED' && o.createdAt === currentDate)
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const myMonthlyRevenue = myOrders
      .filter(o => o.status === 'COMPLETED' && o.createdAt.startsWith(currentMonth))
      .reduce((sum, o) => sum + o.totalAmount, 0);

    return (
      <div className="min-h-[100dvh] w-full bg-red-50 text-red-950 flex justify-center font-sans overflow-x-hidden touch-manipulation bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/ตลาดน้อย.jpg')` }}>
        <div className="absolute inset-0 bg-red-950/30 backdrop-blur-xs pointer-events-none" />
        <GlobalLoadingOverlay />
        <main className="w-full max-w-md bg-white min-h-[100dvh] shadow-2xl relative flex flex-col pb-20 border-x border-red-200 z-10">
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-red-200 px-4 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-black text-sm text-red-950">{myShop ? myShop.name : 'ร้านค้าของฉัน'}</h2>
                <p className="text-[10px] text-red-700">{currentUser.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {myShop && (
                <button 
                  onClick={() => toggleShopOpenStatus(myShop.id)}
                  className={`text-[10px] font-black px-2.5 py-1 rounded-xl border flex items-center gap-1 transition-colors ${myShop.isOpen ? 'bg-red-50 text-red-600 border-red-300' : 'bg-red-200 text-red-800 border-red-400'}`}
                >
                  <Power className="w-3 h-3" /> {myShop.isOpen ? t.shopStatusOpen : t.shopStatusClosed}
                </button>
              )}
              <LanguageSelector />
              <button onClick={handleLogout} className="text-xs text-red-600 bg-red-50 border border-red-300 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 cursor-pointer"><LogOut className="w-3 h-3" /></button>
            </div>
          </header>

          <div className="p-4 space-y-4">
            <div className="flex bg-red-100 p-1.5 rounded-2xl text-[11px] font-black border border-red-300 shadow-inner">
              <button onClick={() => changeTab('MERCHANT_KDS' as any)} className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'MERCHANT_KDS' ? 'bg-red-600 text-white shadow-md' : 'text-red-700'}`}>📦 KDS ({myOrders.length})</button>
              <button onClick={() => changeTab('MERCHANT_REVENUE' as any)} className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'MERCHANT_REVENUE' ? 'bg-red-600 text-white shadow-md' : 'text-red-700'}`}>💰 สรุปยอด</button>
              <button onClick={() => changeTab('MERCHANT_SETUP' as any)} className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'MERCHANT_SETUP' ? 'bg-red-600 text-white shadow-md' : 'text-red-700'}`}>⚙️ {t.manageShopMenu}</button>
              <button onClick={() => changeTab('PROFILE')} className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'PROFILE' ? 'bg-red-600 text-white shadow-md' : 'text-red-700'}`}>👤 {t.profile}</button>
            </div>

            {!myShop ? (
              <div className="bg-white border border-red-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-sm text-red-950">ยังไม่มีการตั้งค่าร้านค้า</h3>
                  <p className="text-xs text-red-700">กรุณากรอกข้อมูลร้านด้านล่างเพื่อเปิดใช้งานร้านในระบบ</p>
                </div>

                <div className="space-y-3 text-xs pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-red-700 mb-1">{t.shopNameLabel}</label>
                    <input 
                      type="text" 
                      value={editShopName} 
                      onChange={e => setEditShopName(e.target.value)} 
                      placeholder="เช่น ร้านกะเพราแซ่บเวอร์" 
                      className="w-full bg-white border border-red-300 text-red-950 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-red-600 shadow-inner font-bold" 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-red-700 mb-1">{t.zoneLabel}</label>
                    <input 
                      type="text" 
                      value={editShopZone} 
                      onChange={e => setEditShopZone(e.target.value)} 
                      placeholder="เช่น โดมแรก, โซน A" 
                      className="w-full bg-white border border-red-300 text-red-950 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-red-600 shadow-inner" 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-red-700 mb-1 flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5 text-red-600" /> {t.bannerImageLabel}
                    </label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, setEditShopBanner)} 
                      className="w-full text-xs text-red-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer" 
                    />
                    {editShopBanner && (
                      <div className="mt-2 w-24 h-24 rounded-2xl overflow-hidden border border-red-200 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={editShopBanner} alt="Shop Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => handleUpdateShopInfo(currentUser.merchantShopId || `shop-${currentUser.username}`)} 
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-black text-xs shadow-md transition-colors cursor-pointer mt-2"
                  >
                    บันทึกข้อมูลและเริ่มเปิดร้านค้า ➔
                  </button>
                </div>
              </div>
            ) : activeTab === 'MERCHANT_REVENUE' ? (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex bg-red-100 p-1 rounded-2xl border border-red-300 text-xs font-black shadow-inner">
                  <button 
                    onClick={() => setMerchantRevenueView('DAILY')} 
                    className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${merchantRevenueView === 'DAILY' ? 'bg-red-600 text-white shadow-md' : 'text-red-700'}`}
                  >
                    📅 {t.dailyTab}
                  </button>
                  <button 
                    onClick={() => setMerchantRevenueView('MONTHLY')} 
                    className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${merchantRevenueView === 'MONTHLY' ? 'bg-red-600 text-white shadow-md' : 'text-red-700'}`}
                  >
                    🗓️ {t.monthlyTab}
                  </button>
                </div>

                {merchantRevenueView === 'DAILY' ? (
                  <div className="bg-red-600 text-white p-6 rounded-3xl shadow-lg shadow-red-600/20 space-y-3 border border-red-700">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white font-black tracking-wider uppercase">{t.revenueToday}</span>
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-4xl font-black tracking-tight">฿{myDailyRevenue.toLocaleString()}</h3>
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-bold text-white">
                        <span>เป้าหมายวันนี้ ฿2,000</span>
                        <span>{Math.min(100, Math.round((myDailyRevenue / 2000) * 100))}%</span>
                      </div>
                      <div className="w-full bg-red-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-white h-full rounded-full" style={{ width: `${Math.min(100, (myDailyRevenue / 2000) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-red-200 text-red-950 p-6 rounded-3xl shadow-md space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-red-600 font-black tracking-wider uppercase">{t.revenueMonth}</span>
                      <CalendarDays className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="text-4xl font-black text-red-600 tracking-tight">฿{myMonthlyRevenue.toLocaleString()}</h3>
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-bold text-red-700">
                        <span>เป้าหมายเดือนนี้ ฿50,000</span>
                        <span>{Math.min(100, Math.round((myMonthlyRevenue / 50000) * 100))}%</span>
                      </div>
                      <div className="w-full bg-red-100 h-2 rounded-full overflow-hidden border border-red-200">
                        <div className="bg-red-600 h-full rounded-full" style={{ width: `${Math.min(100, (myMonthlyRevenue / 50000) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : activeTab === 'MERCHANT_SETUP' ? (
              <div className="space-y-4 animate-in fade-in">
                <div className="bg-white border border-red-200 rounded-3xl p-4 space-y-3 shadow-sm">
                  <h3 className="font-black text-xs text-red-600 flex items-center gap-1.5">
                    <Settings className="w-4 h-4 text-red-600" /> {t.manageShopMenu}
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-red-700 mb-1">{t.shopNameLabel}</label>
                      <input type="text" value={editShopName} onChange={e => setEditShopName(e.target.value)} placeholder="เช่น ร้านกะเพราแซ่บเวอร์" className="w-full bg-white border border-red-300 rounded-xl px-3 py-2 text-xs font-bold text-red-950 outline-none focus:border-red-600" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-red-700 mb-1">{t.zoneLabel}</label>
                      <input type="text" value={editShopZone} onChange={e => setEditShopZone(e.target.value)} placeholder="เช่น โดมแรก, โซน A" className="w-full bg-white border border-red-300 rounded-xl px-3 py-2 text-xs text-red-950 outline-none focus:border-red-600" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-red-700 mb-1 flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-red-600" /> {t.bannerImageLabel}
                      </label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, setEditShopBanner)} 
                        className="w-full text-xs text-red-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer" 
                      />
                      {(editShopBanner || myShop.bannerImage) && (
                        <div className="mt-2 w-24 h-24 rounded-2xl overflow-hidden border border-red-200 shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={editShopBanner || myShop.bannerImage} alt="Shop Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <button onClick={() => handleUpdateShopInfo(myShop.id)} className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-black text-xs transition-colors shadow cursor-pointer">
                      {t.saveShopInfo}
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-red-200 rounded-3xl p-4 space-y-3.5 shadow-sm">
                  <h3 className="font-black text-xs text-red-600 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-red-600" /> {t.addMenuTitle}
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-red-700 mb-1">ชื่อเมนูอาหาร:</label>
                      <input type="text" value={newMenuName} onChange={e => setNewMenuName(e.target.value)} placeholder={t.menuNamePlaceholder} className="w-full bg-white border border-red-300 rounded-xl px-3 py-2 text-xs text-red-950 outline-none focus:border-red-600" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-red-700 mb-1">รายละเอียด:</label>
                      <input type="text" value={newMenuDesc} onChange={e => setNewMenuDesc(e.target.value)} placeholder={t.menuDescPlaceholder} className="w-full bg-white border border-red-300 rounded-xl px-3 py-2 text-xs text-red-950 outline-none focus:border-red-600" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-red-700 mb-1">ราคาเริ่มต้น (บาท):</label>
                      <input type="number" value={newMenuPrice} onChange={e => setNewMenuPrice(e.target.value)} placeholder={t.menuPricePlaceholder} className="w-full bg-white border border-red-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-red-600" />
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-bold text-red-700 mb-1">{t.menuImageLabel}</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, setNewMenuImage)} 
                        className="w-full text-xs text-red-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer" 
                      />
                      {newMenuImage && (
                        <div className="mt-2 w-16 h-16 rounded-xl overflow-hidden border border-red-200 shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={newMenuImage} alt="Menu Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="bg-red-50 border border-red-200 p-3.5 rounded-2xl space-y-2.5 mt-2">
                      <label className="block text-[11px] font-black text-red-600">
                        {t.optionsTitle}
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={newAddonName} 
                          onChange={e => setNewAddonName(e.target.value)} 
                          placeholder={t.addonNamePlaceholder} 
                          className="flex-1 bg-white border border-red-300 text-red-950 rounded-xl px-3 py-2 text-xs outline-none focus:border-red-600" 
                        />
                        <input 
                          type="number" 
                          value={newAddonPrice} 
                          onChange={e => setNewAddonPrice(e.target.value)} 
                          placeholder={t.addonPricePlaceholder} 
                          className="w-20 bg-white border border-red-300 text-red-950 rounded-xl px-3 py-2 text-xs outline-none focus:border-red-600" 
                        />
                        <button 
                          type="button" 
                          onClick={handleAddTempAddon} 
                          className="bg-red-600 text-white px-3 py-2 rounded-xl font-black hover:bg-red-700 transition-colors shrink-0 text-xs shadow cursor-pointer"
                        >
                          {t.addAddonBtn}
                        </button>
                      </div>

                      {tempAddons.length > 0 ? (
                        <div className="space-y-1.5 pt-1">
                          {tempAddons.map(ad => (
                            <div key={ad.id} className="flex justify-between items-center bg-white border border-red-200 px-3 py-1.5 rounded-xl text-xs shadow-sm">
                              <span className="text-red-950 font-medium">{ad.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-red-600 font-bold">{ad.price === 0 ? 'ฟรี' : `+฿${ad.price}`}</span>
                                <button type="button" onClick={() => handleRemoveTempAddon(ad.id)} className="text-red-600 hover:text-red-800 p-0.5 cursor-pointer"><X className="w-3.5 h-3.5" /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-red-600 italic text-center py-1">{t.customAddonPlaceholder}</p>
                      )}
                    </div>

                    <button 
                      type="button" 
                      onClick={() => handleAddNewMenu(myShop.id)} 
                      className="w-full bg-red-600 text-white py-3 rounded-xl font-black shadow-md text-xs mt-2 active:scale-95 transition-all hover:bg-red-700 cursor-pointer"
                    >
                      {t.addMenuBtn}
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h4 className="font-extrabold text-xs text-red-700 uppercase tracking-wider">{t.menuList} ({myShop.menus.length})</h4>
                  {myShop.menus.map(m => (
                    <div key={m.id} className="p-3.5 bg-white border border-red-200 rounded-3xl flex flex-col gap-2 text-xs shadow-sm">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={m.imageUrl} alt={m.name} className="w-12 h-12 rounded-2xl object-cover border border-red-200" />
                          <div>
                            <p className="font-bold text-red-950 text-xs">{m.name}</p>
                            <p className="text-[10px] text-red-700 line-clamp-1">{m.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-red-600 block">฿{m.price}</span>
                          <button 
                            onClick={() => toggleMenuAvailableStatus(myShop.id, m.id)}
                            className={`text-[9px] font-black px-2 py-0.5 rounded-md border mt-1 cursor-pointer ${m.isAvailable ? 'bg-red-50 text-red-600 border-red-200' : 'bg-red-200 text-red-800 border-red-300'}`}
                          >
                            {m.isAvailable ? t.availableBadge : t.soldOutBadge}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-red-100">
                        <div className="flex flex-wrap gap-1">
                          {m.addons && m.addons.map(a => (
                            <span key={a.id} className="text-[9px] bg-red-50 text-red-800 px-2 py-0.5 rounded-lg border border-red-200">
                              {a.name} ({a.price === 0 ? 'ฟรี' : `+฿${a.price}`})
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEditMenuModal(m)} className="bg-red-50 text-red-600 px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1 cursor-pointer hover:bg-red-100">
                            <Edit3 className="w-3 h-3" /> แก้ไข
                          </button>
                          <button onClick={() => handleAdminDeleteMenu(myShop.id, m.id)} className="bg-red-600 text-white p-1.5 rounded-xl cursor-pointer hover:bg-red-700 shadow">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeTab === 'PROFILE' ? (
              <div className="bg-white border border-red-200 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="font-black text-sm text-red-950">{t.shopInfo}</h3>
                <div className="space-y-2 text-xs text-red-900">
                  <p><span className="text-red-600">Shop:</span> <strong>{myShop.name}</strong></p>
                  <p><span className="text-red-600">Username:</span> <strong>{currentUser.username}</strong></p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-extrabold text-xs text-red-700 uppercase tracking-wider">{t.shopOrders} ({myOrders.length})</h3>
                {myOrders.length === 0 ? (
                  <div className="text-center py-14 text-red-700 text-xs">{t.emptyShopOrders}</div>
                ) : (
                  myOrders.map(ord => (
                    <div key={ord.id} className="bg-white border border-red-200 rounded-3xl p-4 shadow-sm space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-black text-red-600">{t.queueNumber} {ord.queueNumber}</span>
                        <span className="text-[10px] bg-red-100 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full font-black">{getStatusText(ord.status)}</span>
                      </div>
                      <p className="text-xs text-red-900 font-medium">ลูกค้า: {ord.studentName} ({ord.diningMode === 'DINE_IN' ? `ทานที่โต๊ะ ${ord.tableNumber || '-'}` : 'ห่อกลับบ้าน'})</p>
                      <p className="text-[11px] text-red-600 font-bold">เวลาทำ: {ord.prepDurationMin || 20} นาที (เสร็จ {ord.estimatedReadyTime})</p>
                      
                      <div className="bg-red-50 p-2.5 rounded-2xl text-xs space-y-1.5 border border-red-100">
                        {ord.items.map((i, idx) => (
                          <div key={idx} className="flex justify-between text-red-950">
                            <div>
                              <span className="font-bold">{i.quantity}x {i.menuItem.name}</span>
                              {i.selectedAddons.length > 0 && <p className="text-[10px] text-red-600">+ {i.selectedAddons.map(a => a.name).join(', ')}</p>}
                              {i.specialInstructions && <p className="text-[10px] text-red-700 italic">"{i.specialInstructions}"</p>}
                            </div>
                            <span className="font-black text-red-600">฿{i.subtotal}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button 
                          type="button"
                          onClick={() => setViewingSlipOrder(ord)} 
                          className="flex-1 bg-white hover:bg-red-50 text-red-600 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border border-red-200 cursor-pointer active:scale-95 transition-all shadow-sm"
                        >
                          <Receipt className="w-3.5 h-3.5 text-red-600" /> {t.viewSlipBtn}
                        </button>
                        <button 
                          type="button"
                          onClick={() => setPrintingOrder(ord)} 
                          className="flex-1 bg-white hover:bg-red-50 text-red-600 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border border-red-200 cursor-pointer active:scale-95 transition-all shadow-sm"
                        >
                          <Printer className="w-3.5 h-3.5 text-red-600" /> {t.printTicketBtn}
                        </button>
                      </div>

                      <div className="flex gap-2 pt-1">
                        {ord.status === 'PENDING' && <button onClick={() => updateMerchantOrderStatus(ord.id, 'COOKING')} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-xs font-black shadow cursor-pointer">{t.actionCook}</button>}
                        {ord.status === 'COOKING' && <button onClick={() => updateMerchantOrderStatus(ord.id, 'READY')} className="flex-1 bg-red-700 text-white py-2.5 rounded-xl text-xs font-black shadow cursor-pointer">{t.actionReady}</button>}
                        {ord.status === 'READY' && <button onClick={() => updateMerchantOrderStatus(ord.id, 'COMPLETED')} className="flex-1 bg-red-900 text-white py-2.5 rounded-xl text-xs font-bold shadow cursor-pointer">{t.actionDone}</button>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <SlipModal />
          <TicketModal />
        </main>
      </div>
    );
  }

  const currentShopReviews = selectedShop ? reviews.filter(r => r.shopId === selectedShop.id) : [];

  return (
    <div className="min-h-[100dvh] w-full bg-red-50 text-red-950 flex justify-center font-sans overflow-x-hidden touch-manipulation bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/ตลาดน้อย.jpg')` }}>
      <div className="absolute inset-0 bg-red-950/30 backdrop-blur-xs pointer-events-none" />
      <GlobalLoadingOverlay />
      <main className="w-full max-w-md bg-white min-h-[100dvh] shadow-2xl relative flex flex-col pb-28 border-x border-red-200 z-10">
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-red-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white font-black shadow">
              <Utensils className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-black text-sm text-red-950 tracking-tight">{t.title}</span>
              <p className="text-[9px] text-red-600 font-bold uppercase tracking-wider">Fast Canteen Order</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <button onClick={handleLogout} className="text-xs text-red-600 bg-red-50 border border-red-300 px-3 py-1 rounded-xl font-bold flex items-center gap-1 hover:bg-red-100 cursor-pointer"><LogOut className="w-3 h-3" /> {t.logout}</button>
          </div>
        </header>

        {activeTab === 'HOME' && (
          <div className="p-4 space-y-4 animate-in fade-in">
            <div className="relative">
              <Search className="w-4 h-4 text-red-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder={t.searchPlaceholder} className="w-full bg-white border border-red-300 text-red-950 rounded-2xl pl-11 pr-4 py-3 text-xs focus:border-red-600 outline-none transition-colors shadow-inner" />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 text-[11px] font-black no-scrollbar">
              <button onClick={() => setSelectedCategoryFilter('ALL')} className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all cursor-pointer ${selectedCategoryFilter === 'ALL' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white text-red-700 border-red-300'}`}>{t.catAll}</button>
              <button onClick={() => setSelectedCategoryFilter('อาหารตามสั่ง')} className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all cursor-pointer ${selectedCategoryFilter === 'อาหารตามสั่ง' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white text-red-700 border-red-300'}`}>{t.catRice}</button>
              <button onClick={() => setSelectedCategoryFilter('ก๋วยเตี๋ยว')} className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all cursor-pointer ${selectedCategoryFilter === 'ก๋วยเตี๋ยว' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white text-red-700 border-red-300'}`}>{t.catNoodle}</button>
            </div>

            <div className="bg-red-600 rounded-3xl p-4 text-white flex justify-between items-center shadow-lg shadow-red-600/20 border border-red-700">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase bg-white text-red-600 px-2 py-0.5 rounded-full">MSU Canteen Special</span>
                <h3 className="text-base font-black tracking-tight">สั่งล่วงหน้า ไม่ต้องยืนรอคิว!</h3>
                <p className="text-[10px] font-bold opacity-90">กดสั่งแล้วมารับที่ร้านได้ทันที</p>
              </div>
              <Sparkles className="w-8 h-8 text-white shrink-0 mr-1" />
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center">
                <h2 className="font-black text-red-950 text-sm">{t.allShops}</h2>
                <span className="text-[10px] text-red-600 font-bold">{filteredShops.length} ร้าน</span>
              </div>
              
              {filteredShops.length === 0 ? (
                <div className="text-center py-16 bg-white border border-red-200 rounded-3xl p-6 shadow-sm space-y-2">
                  <Utensils className="w-10 h-10 text-red-300 mx-auto" />
                  <p className="text-xs text-red-700 font-bold">ยังไม่มีร้านค้าในระบบ</p>
                  <p className="text-[10px] text-red-600">กรุณาสมัครสมาชิกประเภท "ร้านค้าโรงอาหาร" เพื่อเปิดร้านแรกของคุณ</p>
                </div>
              ) : (
                filteredShops.map(shop => (
                  <div key={shop.id} onClick={() => { setSelectedShop(shop); changeTab('SHOP'); }} className="bg-white border border-red-200 rounded-3xl p-3.5 shadow-sm hover:border-red-600 transition-all cursor-pointer flex gap-3.5 group relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden relative shrink-0 border border-red-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={shop.bannerImage} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute bottom-1.5 left-1.5 text-[9px] bg-white/90 backdrop-blur-md text-red-600 px-2 py-0.5 rounded-md font-black flex items-center gap-0.5 border border-red-200">
                        <Clock className="w-2.5 h-2.5 text-red-600" /> ขั้นต่ำ 20m
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-md font-bold">{shop.category}</span>
                          <span className="text-xs font-black text-red-600 flex items-center gap-0.5">★ {shop.rating}</span>
                        </div>
                        <h4 className="font-black text-sm text-red-950 mt-1.5">{shop.name}</h4>
                        <p className="text-[10px] text-red-700 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3 text-red-600" /> {shop.canteenZone}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className={`text-[10px] font-bold ${shop.isOpen ? 'text-red-600' : 'text-red-400'}`}>
                          {shop.isOpen ? 'เปิดบริการ' : 'ปิดชั่วคราว'}
                        </span>
                        <span className="text-[11px] text-red-600 font-black flex items-center gap-0.5">{t.orderFood} <ChevronRight className="w-3.5 h-3.5" /></span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'SHOP' && selectedShop && (
          <div className="animate-in fade-in">
            <div className="relative h-48 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedShop.bannerImage} alt={selectedShop.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-transparent" />
              <button onClick={() => changeTab('HOME')} className="absolute top-3.5 left-3.5 w-9 h-9 rounded-2xl bg-white/90 backdrop-blur-md text-red-600 flex items-center justify-center border border-red-200 shadow-lg cursor-pointer"><ArrowLeft className="w-4 h-4" /></button>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded-md">{selectedShop.category}</span>
                <h2 className="text-lg font-black tracking-tight mt-1">{selectedShop.name}</h2>
                <div className="flex items-center gap-3 text-xs text-red-100 mt-0.5 font-medium">
                  <span className="text-white font-black">★ {selectedShop.rating} ({selectedShop.reviewCount} รีวิว)</span>
                  <span>•</span>
                  <span>{selectedShop.canteenZone}</span>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <h3 className="font-extrabold text-xs text-red-700 uppercase tracking-wider">{t.menuList}</h3>
              <div className="space-y-3">
                {selectedShop.menus.length === 0 ? (
                  <p className="text-xs text-red-700 text-center py-10">ยังไม่มีรายการเมนูในร้านนี้</p>
                ) : (
                  selectedShop.menus.map(menu => (
                    <div 
                      key={menu.id} 
                      onClick={() => { 
                        if (menu.isAvailable) {
                          setSelectedMenu(menu); 
                          setMenuQty(1); 
                          setSelectedAddons([]); 
                        }
                      }} 
                      className={`p-3.5 bg-white border rounded-3xl flex gap-3.5 transition-all group relative shadow-sm ${menu.isAvailable ? 'border-red-200 cursor-pointer hover:border-red-600' : 'border-red-100 opacity-60 cursor-not-allowed'}`}
                    >
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-xs text-red-950 group-hover:text-red-600 transition-colors">{menu.name}</h4>
                            {!menu.isAvailable && (
                              <span className="text-[9px] bg-red-100 text-red-700 border border-red-200 px-1.5 py-0.2 rounded font-black">
                                {t.soldOutBadge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-red-700 mt-1 line-clamp-2">{menu.description}</p>
                        </div>
                        <span className="font-black text-red-600 text-sm mt-3 block">เริ่มต้น ฿{menu.price}</span>
                      </div>
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-red-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={menu.imageUrl} alt={menu.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="bg-white rounded-3xl p-4 border border-red-200 space-y-3.5 mt-6 shadow-sm">
                <h4 className="font-black text-xs text-red-950 flex items-center gap-1.5"><Star className="w-4 h-4 fill-red-600 text-red-600" /> {t.reviewTitle}</h4>
                <form onSubmit={handleSubmitReview} className="space-y-2.5">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button type="button" key={star} onClick={() => setStarRating(star)} className={`text-xl cursor-pointer ${star <= starRating ? 'text-red-600' : 'text-red-200'} hover:scale-110 transition-transform`}>★</button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input type="text" required value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="เขียนความคิดเห็นของคุณ..." className="flex-1 bg-white border border-red-300 text-red-950 rounded-xl px-3 py-2 text-xs outline-none focus:border-red-600 shadow-inner" />
                    <button type="submit" className="bg-red-600 text-white px-3.5 py-2 rounded-xl text-xs font-black shrink-0 hover:bg-red-700 shadow cursor-pointer">{t.submitReview}</button>
                  </div>
                </form>
                <div className="space-y-2 pt-1">
                  {currentShopReviews.map(r => (
                    <div key={r.id} className="p-3 bg-red-50 rounded-2xl border border-red-100 text-xs space-y-0.5">
                      <div className="flex justify-between font-bold text-red-950"><span>{r.userName}</span><span className="text-red-600">{'★'.repeat(r.rating)}</span></div>
                      <p className="text-red-800 text-[11px]">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'CHECKOUT' && selectedShop && (
          <div className="p-4 space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2.5"><button onClick={() => changeTab('SHOP')} className="p-1 text-red-600 hover:text-red-800 cursor-pointer"><ArrowLeft className="w-5 h-5" /></button><h2 className="font-black text-base text-red-950">สรุปรายการคำสั่งซื้อ</h2></div>
            
            <div className="flex bg-red-100 p-1.5 rounded-2xl text-xs font-black border border-red-300 shadow-inner">
              <button onClick={() => setDiningMode('TAKEAWAY')} className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${diningMode === 'TAKEAWAY' ? 'bg-red-600 text-white shadow-md' : 'text-red-700'}`}>{t.takeaway}</button>
              <button onClick={() => setDiningMode('DINE_IN')} className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${diningMode === 'DINE_IN' ? 'bg-red-600 text-white shadow-md' : 'text-red-700'}`}>{t.dineIn}</button>
            </div>

            {diningMode === 'DINE_IN' && <input type="text" value={tableNumber} onChange={e => setTableNumber(e.target.value)} placeholder={t.tablePlaceholder} className="w-full bg-white border border-red-300 text-red-950 rounded-2xl px-4 py-3 text-xs outline-none focus:border-red-600 shadow-inner" />}

            <div className="bg-white border border-red-200 rounded-3xl p-4 space-y-2.5 text-xs shadow-sm">
              <div className="flex justify-between items-center border-b border-red-100 pb-2">
                <p className="font-black text-sm text-red-950">{selectedShop.name}</p>
                <span className="text-[10px] text-red-600 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-red-600" /> ทำอาหารประมาณ {calculateQueuePrepTime(selectedShop.id, cart)} นาที
                </span>
              </div>
              
              {cart.map(i => (
                <div key={i.cartItemId} className="flex justify-between text-red-900 py-1.5 border-b border-red-500/10">
                  <div>
                    <span className="font-bold text-red-950">{i.quantity}x {i.menuItem.name}</span>
                    {i.selectedAddons.length > 0 && <p className="text-[10px] text-red-600">+ {i.selectedAddons.map(a => a.name).join(', ')}</p>}
                    {i.specialInstructions && <p className="text-[10px] text-red-700 italic">"{i.specialInstructions}"</p>}
                  </div>
                  <span className="font-black text-red-600">฿{i.subtotal}</span>
                </div>
              ))}
              <div className="pt-2 font-black flex justify-between text-base text-red-950"><span>{t.totalAmount}</span><span className="text-red-600">฿{cartSubtotal}</span></div>
            </div>

            <div className="bg-white border border-red-200 text-red-950 rounded-3xl p-5 text-center space-y-3 shadow-sm">
              <QrCode className="w-20 h-20 mx-auto text-red-600" />
              <p className="text-xs font-bold text-red-800">{t.payPromptPay}</p>
              
              <div className="p-3 bg-red-50 rounded-2xl border border-red-200 space-y-2 text-left">
                <label className="block text-[11px] font-bold text-red-700 flex items-center gap-1">
                  <UploadCloud className="w-3.5 h-3.5 text-red-600" /> {t.uploadSlipLabel}
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(e, setTransferSlipUrl)} 
                  className="w-full text-xs text-red-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer" 
                />
                {transferSlipUrl && (
                  <div className="mt-2 w-20 h-24 rounded-xl overflow-hidden border border-red-300 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={transferSlipUrl} alt="Transfer Slip" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <button onClick={handleConfirmPayment} disabled={isGlobalLoading} className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-2xl font-black text-xs shadow-xl shadow-red-600/30 active:scale-95 transition-all disabled:opacity-50 cursor-pointer">
              {t.confirmPay} (฿{cartSubtotal})
            </button>
          </div>
        )}

        {activeTab === 'TRACKING' && activeOrder && (
          <div className="p-6 space-y-5 text-center animate-in fade-in">
            <span className="text-xs bg-red-100 text-red-700 border border-red-300 px-3 py-1 rounded-full font-black">{t.orderQueue} {activeOrder.id}</span>
            <div>
              <p className="text-xs text-red-700 font-bold uppercase">{t.queueNumber}</p>
              <h2 className="text-5xl font-black text-red-600 tracking-tight mt-1">{activeOrder.queueNumber}</h2>
            </div>
            <div className="bg-red-600 text-white p-5 rounded-3xl shadow-xl shadow-red-600/20 space-y-1 border border-red-700">
              <p className="text-xs font-bold opacity-90">{t.estTime}</p>
              <p className="text-2xl font-black">{activeOrder.estimatedReadyTime}</p>
              <p className="text-[10px] font-bold opacity-85">{t.prepTimeLabel}: {activeOrder.prepDurationMin || 20} นาที</p>
            </div>
            <p className="text-xs text-red-800">สถานะ: <span className="text-red-600 font-bold">{getStatusText(activeOrder.status)}</span></p>
            <button onClick={() => changeTab('HOME')} className="w-full py-3 bg-red-50 text-red-700 font-bold rounded-2xl text-xs border border-red-300 hover:bg-red-100 transition-colors shadow-sm cursor-pointer">{t.backHome}</button>
          </div>
        )}

        {activeTab === 'HISTORY' && (
          <div className="p-4 space-y-3.5 animate-in fade-in">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-base text-red-950">{t.orderHistory}</h3>
              <div className="flex bg-red-100 p-1 rounded-xl border border-red-300 text-[10px] font-bold shadow-inner">
                <button onClick={() => setHistoryFilter('ALL')} className={`px-2 py-1 rounded-lg cursor-pointer ${historyFilter === 'ALL' ? 'bg-red-600 text-white' : 'text-red-700'}`}>{t.filterAll}</button>
                <button onClick={() => setHistoryFilter('ACTIVE')} className={`px-2 py-1 rounded-lg cursor-pointer ${historyFilter === 'ACTIVE' ? 'bg-red-600 text-white' : 'text-red-700'}`}>{t.filterActive}</button>
                <button onClick={() => setHistoryFilter('DONE')} className={`px-2 py-1 rounded-lg cursor-pointer ${historyFilter === 'DONE' ? 'bg-red-600 text-white' : 'text-red-700'}`}>{t.filterDone}</button>
              </div>
            </div>

            {filteredOrderHistory.length === 0 ? (
              <div className="text-center py-14 space-y-2">
                <History className="w-10 h-10 text-red-300 mx-auto" />
                <p className="text-xs text-red-600">{t.emptyHistory}</p>
              </div>
            ) : (
              filteredOrderHistory.map(ord => (
                <div key={ord.id} className="bg-white border border-red-200 rounded-3xl p-4 text-xs space-y-2.5 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-sm text-red-950">{ord.shopName}</h4>
                      <p className="text-[10px] text-red-700">{ord.id} • {ord.createdAt}</p>
                    </div>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-200">
                      {getStatusText(ord.status)}
                    </span>
                  </div>

                  <div className="bg-red-50 p-2.5 rounded-2xl space-y-1 text-red-900 border border-red-100">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-[11px]">
                        <span>{it.quantity}x {it.menuItem.name} {it.selectedAddons.length > 0 && `(+${it.selectedAddons.map(a => a.name).join(', ')})`}</span>
                        <span className="font-bold text-red-950">฿{it.subtotal}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="font-black text-sm text-red-600">รวม ฿{ord.totalAmount}</span>
                    <button 
                      onClick={() => handleReorder(ord)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> {t.reorderBtn}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'PROFILE' && currentUser && (
          <div className="p-4 space-y-4 animate-in fade-in">
            <div className="bg-white border border-red-200 rounded-3xl p-6 shadow-md space-y-5 relative">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'} 
                    alt={currentUser.name} 
                    className="w-20 h-20 rounded-full object-cover border-2 border-red-600 shadow-md"
                  />
                  {isEditingProfile && (
                    <label className="absolute inset-0 bg-red-950/60 rounded-full flex items-center justify-center cursor-pointer text-white">
                      <Camera className="w-6 h-6" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, setEditProfileAvatar)} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-md border border-red-200">
                    {currentUser.role === 'STUDENT' ? t.student : currentUser.role === 'MERCHANT' ? t.merchant : t.admin}
                  </span>
                  <h3 className="text-lg font-black text-red-950 mt-1">{currentUser.name}</h3>
                  <p className="text-xs text-red-700">@{currentUser.username}</p>
                </div>
              </div>

              {!isEditingProfile ? (
                <div className="space-y-3 pt-2 border-t border-red-100 text-xs">
                  <div className="bg-red-50 p-3.5 rounded-2xl border border-red-200 space-y-1">
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">{t.bioLabel}</span>
                    <p className="text-red-900 text-xs">{currentUser.bio || 'ยังไม่ได้ระบุความชอบด้านอาหาร'}</p>
                  </div>

                  <div className="bg-red-50 p-3.5 rounded-2xl border border-red-200">
                    <span className="text-[10px] text-red-600 block">{t.phoneLabel}</span>
                    <strong className="text-red-950">{currentUser.phone || '-'}</strong>
                  </div>

                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-300 py-3 rounded-2xl font-bold flex items-center justify-center gap-1.5 transition-colors mt-2 shadow-sm cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" /> {t.editProfileBtn}
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2 border-t border-red-100 text-xs animate-in fade-in">
                  <div>
                    <label className="block text-[11px] font-bold text-red-700 mb-1">{t.name}</label>
                    <input 
                      type="text" 
                      value={editProfileName} 
                      onChange={e => setEditProfileName(e.target.value)} 
                      className="w-full bg-white border border-red-300 text-red-950 rounded-xl px-3 py-2 text-xs outline-none focus:border-red-600 shadow-inner" 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-red-700 mb-1">{t.phoneLabel}</label>
                    <input 
                      type="text" 
                      value={editProfilePhone} 
                      onChange={e => setEditProfilePhone(e.target.value)} 
                      placeholder="08X-XXX-XXXX" 
                      className="w-full bg-white border border-red-300 text-red-950 rounded-xl px-3 py-2 text-xs outline-none focus:border-red-600 shadow-inner" 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-red-700 mb-1">{t.bioLabel}</label>
                    <textarea 
                      rows={2}
                      value={editProfileBio} 
                      onChange={e => setEditProfileBio(e.target.value)} 
                      placeholder="เขียนเกี่ยวกับตัวคุณ เช่น ชอบกินรสเผ็ด, แพ้อาหารทะเล..." 
                      className="w-full bg-white border border-red-300 text-red-950 rounded-xl px-3 py-2 text-xs outline-none focus:border-red-600 shadow-inner" 
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button 
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 bg-red-100 text-red-700 py-2.5 rounded-xl font-bold border border-red-300 cursor-pointer"
                    >
                      ยกเลิก
                    </button>
                    <button 
                      onClick={handleSaveProfile}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-black shadow-md transition-colors cursor-pointer"
                    >
                      {t.saveProfileBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {editingMenu && (
          <div className="fixed inset-0 z-[999] bg-red-950/80 backdrop-blur-md flex justify-center items-center p-4 animate-in fade-in">
            <div className="w-full max-w-sm bg-white border-2 border-red-600 rounded-3xl p-5 space-y-4 text-red-950 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-sm text-red-600">แก้ไขเมนูอาหาร</h3>
                <button onClick={() => setEditingMenu(null)} className="p-1 hover:text-red-700 cursor-pointer"><X className="w-5 h-5 text-red-600" /></button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-red-700 mb-1">ชื่อเมนู:</label>
                  <input type="text" value={editMenuName} onChange={e => setEditMenuName(e.target.value)} className="w-full bg-white border border-red-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-red-600" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-red-700 mb-1">รายละเอียด:</label>
                  <input type="text" value={editMenuDesc} onChange={e => setEditMenuDesc(e.target.value)} className="w-full bg-white border border-red-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-red-600" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-red-700 mb-1">ราคา (บาท):</label>
                  <input type="number" value={editMenuPrice} onChange={e => setEditMenuPrice(e.target.value)} className="w-full bg-white border border-red-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-red-600" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-red-700 mb-1">รูปภาพเมนู:</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setEditMenuImage)} className="w-full text-xs text-red-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-red-600 file:text-white cursor-pointer" />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => setEditingMenu(null)} className="flex-1 bg-red-100 text-red-700 py-2.5 rounded-xl font-bold cursor-pointer">ยกเลิก</button>
                <button onClick={() => handleSaveEditedMenu(currentUser?.merchantShopId || '')} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-black shadow cursor-pointer hover:bg-red-700">บันทึกการแก้ไข</button>
              </div>
            </div>
          </div>
        )}

        {cart.length > 0 && activeTab !== 'CHECKOUT' && activeTab !== 'TRACKING' && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-30 animate-in slide-in-from-bottom-5">
            <button onClick={() => changeTab('CHECKOUT')} className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3.5 rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-between text-xs font-black active:scale-95 transition-all border border-red-700 cursor-pointer">
              <span className="flex items-center gap-2"><ShoppingBag className="w-4 h-4" /> {t.cartLabel} ({totalCartItemCount})</span>
              <span className="text-sm font-black">฿{cartSubtotal} ➔</span>
            </button>
          </div>
        )}

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-xl border-t border-red-200 px-6 py-3 flex justify-between items-center z-40 text-[11px] font-black text-red-700 shadow-lg">
          <button onClick={() => changeTab('HOME')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'HOME' ? 'text-red-600' : 'hover:text-red-900'}`}><Utensils className="w-4 h-4 mb-0.5" /> {t.home}</button>
          <button onClick={() => changeTab('HISTORY')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'HISTORY' ? 'text-red-600' : 'hover:text-red-900'}`}><History className="w-4 h-4 mb-0.5" /> {t.history}</button>
          <button onClick={() => changeTab('PROFILE')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'PROFILE' ? 'text-red-600' : 'hover:text-red-900'}`}><User className="w-4 h-4 mb-0.5" /> {t.profile}</button>
        </nav>

        {readyNotificationOrder && (
          <div className="fixed inset-0 z-[999] bg-red-950/80 backdrop-blur-md flex justify-center items-center p-4 animate-in zoom-in-95">
            <div className="w-full max-w-xs bg-white border-2 border-red-600 rounded-3xl p-6 space-y-4 text-center text-red-950 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-red-100 border border-red-300 flex items-center justify-center mx-auto text-red-600 shadow">
                <BellRing className="w-8 h-8 animate-bounce text-red-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-base text-red-600">{t.orderReadyModalTitle}</h3>
                <p className="text-xs text-red-800">{t.orderReadyModalDesc}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-2xl border border-red-200">
                <p className="text-[10px] text-red-700">ร้าน: <strong className="text-red-950">{readyNotificationOrder.shopName}</strong></p>
                <p className="text-2xl font-black text-red-600 mt-1">คิวที่ {readyNotificationOrder.queueNumber}</p>
              </div>
              <button 
                onClick={() => setReadyNotificationOrder(null)} 
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-black text-xs shadow-md transition-colors cursor-pointer"
              >
                รับทราบแล้ว 👍
              </button>
            </div>
          </div>
        )}

        {selectedMenu && (
          <div className="fixed inset-0 z-50 bg-red-950/80 backdrop-blur-sm flex justify-center items-end animate-in fade-in">
            <div className="w-full max-w-md bg-white border-t-2 border-red-600 rounded-t-3xl p-5 space-y-4 text-red-950 max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-sm text-red-600">{selectedMenu.name}</h3>
                <button onClick={() => setSelectedMenu(null)} className="p-1 text-red-600 hover:text-red-800 cursor-pointer"><X className="w-5 h-5" /></button>
              </div>

              <div className="w-full h-40 rounded-2xl overflow-hidden border border-red-200 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedMenu.imageUrl} alt={selectedMenu.name} className="w-full h-full object-cover" />
              </div>

              <p className="text-xs text-red-800 font-medium">{selectedMenu.description}</p>
              <p className="text-base font-black text-red-600">ราคาเริ่มต้น ฿{selectedMenu.price}</p>

              {selectedMenu.addons && selectedMenu.addons.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-red-100">
                  <h4 className="text-xs font-black text-red-600">{t.optionsTitle}</h4>
                  <div className="space-y-2">
                    {selectedMenu.addons.map(addon => {
                      const isSelected = selectedAddons.some(a => a.id === addon.id);
                      return (
                        <div 
                          key={addon.id} 
                          onClick={() => toggleAddon(addon)}
                          className={`flex justify-between items-center p-3 rounded-2xl border text-xs cursor-pointer transition-all ${isSelected ? 'bg-red-50 border-red-600 text-red-950 shadow-sm' : 'bg-white border-red-200 text-red-800 hover:border-red-400'}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${isSelected ? 'bg-red-600 border-red-600 text-white' : 'border-red-300'}`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="font-bold">{addon.name}</span>
                          </div>
                          <span className="font-black text-red-600">
                            {addon.price === 0 ? 'ฟรี' : `+฿${addon.price}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-red-700 mb-1">หมายเหตุเพิ่มเติม</label>
                <input type="text" value={specialNote} onChange={e => setSpecialNote(e.target.value)} placeholder={t.notePlaceholder} className="w-full bg-white border border-red-300 text-red-950 rounded-xl px-3 py-2 text-xs outline-none focus:border-red-600 shadow-inner" />
              </div>

              <div className="flex gap-2 pt-2">
                <div className="flex items-center gap-2 bg-red-50 p-1 rounded-2xl border border-red-200">
                  <button onClick={() => setMenuQty(Math.max(1, menuQty - 1))} className="w-8 h-8 bg-red-200 rounded-xl flex items-center justify-center text-red-800 active:scale-90 transition-transform cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
                  <span className="w-6 text-center text-xs font-black text-red-950">{menuQty}</span>
                  <button onClick={() => setMenuQty(menuQty + 1)} className="w-8 h-8 bg-red-200 rounded-xl flex items-center justify-center text-red-800 active:scale-90 transition-transform cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
                </div>
                <button onClick={handleAddToCart} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black py-3 shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer">
                  {t.addToCart} • ฿{singleItemTotal}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}