export interface IItem {
    data:    Data;
    error:   boolean;
    status:  string;
    message: string;
}

export interface Data {
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
