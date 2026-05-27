export type UserRole = "client" | "partner" | "admin";

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image_url?: string;
  color?: string;
  order_index: number;
  is_active: boolean;
}

export interface Salon {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description?: string;
  category_id?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address: string;
  neighborhood?: string;
  city: string;
  province: string;
  latitude?: number;
  longitude?: number;
  cover_image_url?: string;
  logo_url?: string;
  rating: number;
  review_count: number;
  is_verified: boolean;
  is_active: boolean;
  is_featured: boolean;
  subscription_plan: "free" | "basic" | "premium" | "elite";
  created_at: string;
  updated_at: string;
  category?: Category;
  images?: SalonImage[];
  services?: Service[];
  professionals?: Professional[];
  working_hours?: WorkingHour[];
}

export interface SalonImage {
  id: string;
  salon_id: string;
  url: string;
  caption?: string;
  is_cover: boolean;
  order_index: number;
}

export interface Service {
  id: string;
  salon_id: string;
  category_id?: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
  price_max?: number;
  is_active: boolean;
  image_url?: string;
}

export interface Professional {
  id: string;
  salon_id: string;
  name: string;
  role?: string;
  bio?: string;
  avatar_url?: string;
  specialties?: string[];
  is_active: boolean;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export interface Booking {
  id: string;
  client_id: string;
  salon_id: string;
  service_id: string;
  professional_id?: string;
  booking_date: string;
  booking_time: string;
  duration: number;
  price: number;
  status: BookingStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
  client?: User;
  salon?: Salon;
  service?: Service;
  professional?: Professional;
}

export interface Review {
  id: string;
  client_id: string;
  salon_id: string;
  booking_id?: string;
  rating: number;
  comment?: string;
  reply?: string;
  replied_at?: string;
  is_visible: boolean;
  created_at: string;
  client?: User;
}

export interface Favorite {
  id: string;
  client_id: string;
  salon_id: string;
  created_at: string;
  salon?: Salon;
}

export interface WorkingHour {
  id: string;
  salon_id: string;
  day_of_week: number;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export interface BlockedSlot {
  id: string;
  salon_id: string;
  professional_id?: string;
  start_datetime: string;
  end_datetime: string;
  reason?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  salon_id: string;
  plan: "free" | "basic" | "premium" | "elite";
  status: "active" | "cancelled" | "expired";
  starts_at: string;
  ends_at?: string;
  price: number;
  created_at: string;
}

export interface FeaturedSalon {
  id: string;
  salon_id: string;
  position: number;
  starts_at: string;
  ends_at: string;
  salon?: Salon;
}

export interface SearchFilters {
  category?: string;
  city?: string;
  neighborhood?: string;
  rating?: number;
  price_min?: number;
  price_max?: number;
  is_open?: boolean;
  sort_by?: "rating" | "reviews" | "price_asc" | "price_desc" | "newest";
}

export const DAY_NAMES = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "Pendente",
  confirmed: "Confirmada",
  completed: "Concluída",
  cancelled: "Cancelada",
  no_show: "Não compareceu",
};

export const SUBSCRIPTION_PLAN_LABELS = {
  free: "Gratuito",
  basic: "Básico",
  premium: "Premium",
  elite: "Elite",
};
