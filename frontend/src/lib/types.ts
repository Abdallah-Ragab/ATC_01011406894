
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export type Language = 'en' | 'ar';
export type ThemeMode = 'light' | 'dark';
