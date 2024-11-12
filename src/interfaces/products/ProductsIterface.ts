export interface IProduct {
    data:    Datum[];
    error:   boolean;
    status:  string;
    message: string;
}

export interface Datum {
    id:          string;
    productName: string;
    description: string;
    price:       number;
    state:       boolean;
    createdAt:   Date;
    categories:  Category[];
    items:       Item[];
}

export interface Category {
    id:    string;
    name:  string;
    state: boolean;
}

export interface Item {
    id:     string;
    color:  Color;
    stock:  number;
    images: any[];
}

export interface Color {
    id:        string;
    colorName: string;
    colorCod:  string;
    status:    boolean;
}

export interface ICreateProduct {
    productName: string;
    description: string;
    price:       number;
    state:       boolean;
    createdAt:   Date;
    categories:  string[];
}
