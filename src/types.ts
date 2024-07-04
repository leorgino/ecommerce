export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  category: Category;
  images: Image[];
}


export interface Category {
  id: number;
  name: string;
}

export interface Image {
  id: number;
  url: string;
}
