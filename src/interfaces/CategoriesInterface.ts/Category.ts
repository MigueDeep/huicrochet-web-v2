export interface Icategory {
    data:    Datum[];
    error:   boolean;
    status:  string;
    message: string;
}

export interface Datum {
    id:    string;
    name:  string;
    state: boolean;
}

export interface ICreateCategory {
    state: boolean;
    name:  string;
}
