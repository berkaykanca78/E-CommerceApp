export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string;
  imageUrl?: string;
  isActive: boolean;
  createdDate: string;  // ISO date string
  updatedDate?: string; // ISO date string, optional
} 