import axios from "axios";
import { doGet } from "../config/Axios";
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
  getById: async (id: string): Promise<IItemProduct> => {
    try {
      const response = await doGet(`/item/getById/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

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

export const UpdateItem = async (id: string, formData: FormData): Promise<IItemProduct> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:8080/api-crochet/item/update/${id}`,
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

