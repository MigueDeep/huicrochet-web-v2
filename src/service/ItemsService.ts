import axios from "axios";
import { doGet, doPut } from "../config/Axios";
import {  IItemProduct } from "../interfaces/Items/ItemsInterface";
import { IItem } from "../interfaces/Items/ItemById";
import toast from "react-hot-toast";

export const ItemsService = {
  getAll: async (): Promise<IItemProduct> => {
    try {
      const response = await doGet("/item/getAll",  { showToast: false });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id: string): Promise<IItem> => {
    try {
      const response = await doGet(`/item/getById/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  chngeStatus: async (id: string, newState: boolean) => {
    try {
      const response = await doPut(`/item/deactivateItem/${id}`, { state: newState });
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
      "http://34.203.104.87:8080/api-crochet/item/create",
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
      `http://34.203.104.87:8080/api-crochet/item/update/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response.data.error) {
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

