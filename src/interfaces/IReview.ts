export interface IReview {
    data:    Datum[];
    error:   boolean;
    status:  string;
    message: string;
}

export interface Datum {
    id:         string;
    user:       User;
    review:     string;
    stars:      number;
    reviewDate: number;
}

export interface User {
    id:       string;
    fullName: string;
    email:    string;
    birthday: Date;
    status:   boolean;
    blocked:  boolean;
    image:    Image;
}

export interface Image {
    id:       string;
    name:     string;
    type:     string;
    imageUri: string;
}
