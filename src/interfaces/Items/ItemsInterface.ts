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

export interface Datum {
    id:       string;
    product?: Product;
    color:    Color;
    stock:    number;
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

