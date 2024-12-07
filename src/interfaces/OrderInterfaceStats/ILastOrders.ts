export interface ILastOrders {
    data:    Datum[];
    error:   boolean;
    status:  string;
    message: string;
}

export interface Datum {
    id:                   string;
    shoppingCart:         ShoppingCart;
    orderDate:            number;
    estimatedDeliverDate: number;
    totalPrice:           number;
    orderState:           string;
}

export interface ShoppingCart {
    id:        string;
    bought:    boolean;
    total:     number;
    cartItems: CartItem[];
}

export interface CartItem {
    id:       string;
    item:     Item;
    quantity: number;
}

export interface Item {
    id:      string;
    product: Product;
    color:   Color;
    stock:   number;
    state:   boolean;
    images:  Image[];
}

export interface Color {
    id:        string;
    colorName: string;
    colorCod:  string;
    status:    boolean;
}

export interface Image {
    id:       string;
    name:     string;
    type:     string;
    imageUri: string;
}

export interface Product {
    id:          string;
    productName: string;
    description: string;
    price:       number;
    state:       boolean;
    createdAt:   Date;
    categories:  Category[];
}

export interface Category {
    id:    string;
    name:  string;
    state: boolean;
}
