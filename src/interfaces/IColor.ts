export interface IColor {
    id:        string;
    colorName: string;
    colorCod:  string;
    status:    boolean;
    isSynced?: boolean;
    _id?: string; // Necesario para PouchDB
    _rev?: string; // Necesario para PouchDB
}
