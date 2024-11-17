export interface IItemProduct {
    data:    Datum[];
    error:   boolean;
    status:  string;
    message: string;
}

export interface Product {
    id:          string;
    productName: string;
    description: string;
    price:       number;
    state:       boolean;
    createdAt:   Date;
    categories:  Category[];
    items:       Datum[];
}

export interface ProductI {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
}
export interface Datum {
    id:       string;
    product?: Product;
    color:    Color;
    stock:    number;
    state:    boolean; 
    images:   any[];
}

export interface Category {
    id:    string;
    name:  string;
    state: boolean;
}

export interface Color {
    id:        string;
    colorName: string;
    colorCod:  string;
    status:    boolean;
}

export interface ICreateItem {
    productId: string;
    colorId:   string;
    stock:     number;
    state:     boolean;
}

