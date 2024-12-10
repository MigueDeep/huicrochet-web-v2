export interface IViews {
    title:  string;
    visits: number;
    data:   number[];
}


export interface IViewsRange {
    data:    Data;
    error:   boolean;
    status:  string;
    message: string;
}

export interface Data {
    title:  string;
    visits: number;
    data:   number[];
}

export interface IRevenuesRange {
  data: Data;
  error: boolean;
  status: string;
  message: string;
}