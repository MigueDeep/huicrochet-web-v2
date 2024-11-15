export interface IUser {
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
