import axios from "axios";
import { doGet, doPost } from "../config/Axios";
import {  IItemProduct } from "../interfaces/Items/ItemsInterface";

export const ItemsService = {
  getAll: async (): Promise<IItemProduct> => {
    try {
      const response = await doGet("/item/getAll");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};

export const createItem = async (formData: FormData): Promise<IItemProduct> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:8080/api-crochet/item/create",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

