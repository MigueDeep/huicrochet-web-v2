export interface IOrder {
    id:              string;
    shoppingCart:    ShoppingCart;
    orderDate:       Date;
    totalPrice:      number;
    orderState:      string;
    shippingAddress: ShippingAddress;
    paymentMethod:   PaymentMethod;
    orderDetails:    OrderDetails;
}

export interface OrderDetails {
    additionalProp1: AdditionalProp;
    additionalProp2: AdditionalProp;
    additionalProp3: AdditionalProp;
}

export interface AdditionalProp {
}

export interface PaymentMethod {
    id:             string;
    cardType:       string;
    cardNumber:     string;
    expirationDate: string;
    last4Numbers:   string;
    cvv:            string;
    status:         boolean;
}

export interface ShippingAddress {
    id:             string;
    user:           User;
    state:          string;
    city:           string;
    zipCode:        string;
    district:       string;
    street:         string;
    number:         string;
    phoneNumber:    string;
    defaultAddress: boolean;
    status:         boolean;
}

export interface User {
    id:       string;
    fullName: string;
    email:    string;
    birthday: Date;
    image:    Image;
}

export interface Image {
    id:       string;
    name:     string;
    type:     string;
    imageUri: string;
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
