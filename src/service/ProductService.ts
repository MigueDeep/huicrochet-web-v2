import { doGet, doPost } from "../config/Axios";

import { ICreateProduct, IProduct } from "../interfaces/products/ProductsIterface";


export const ProductServices = {
  getAll: async (): Promise<IProduct> => {
    try {
      const response = await doGet("/product/getAll");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (data: ICreateProduct): Promise<ICreateProduct> => {
    try {
      const response = await doPost("/product/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}
