export interface IRevuenes {
  title: string;
  revenues: number;
  data: number[];
}

export interface Data {
  title: string;
  revenues: number;
  data: number[];
}

export interface IRevenuesRange {
  data: Data;
  error: boolean;
  status: string;
  message: string;
}
