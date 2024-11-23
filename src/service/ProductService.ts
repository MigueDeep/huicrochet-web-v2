import { doGet, doPost, doPut } from "../config/Axios";

import { ICreateProduct, IProduct, IUpdateProduct } from "../interfaces/products/ProductsIterface";


export const ProductServices = {
  getAll: async (): Promise<IProduct> => {
    try {
      const response = await doGet("/product/getAll", { showToast: false });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (data: ICreateProduct): Promise<ICreateProduct> => {
    try {
      console.log(data)
      const response = await doPost("/product/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllActive: async (): Promise<IProduct> => {
    try {
      const response = await doGet("/product/getActiveProducts", { showToast: false });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  changeStatus: async (id: string, newState: boolean) => {
    try {
      const response = await doPut(`/product/deactivateProduct/${id}`, { state: newState });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

 update: async (id: string, data: IUpdateProduct) => {
    try {
      console.log(data)
      const response = await doPut(`/product/update/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await doGet(`/product/getById/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },



}
