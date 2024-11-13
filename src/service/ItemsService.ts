import { doGet, doPost } from "../config/Axios";
import { ICreateItem, IItemProduct } from "../interfaces/Items/ItemsInterface";

export const ItemsService = {
  getAll: async (): Promise<IItemProduct> => {
    try {
      const response = await doGet("/item/getAll");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  create: async (data: FormData): Promise<FormData> => {
    try {
      console.log(data)
      const response = await doPost("/item/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}