import { doGet, doPost, doPut } from "../config/Axios";
import { Icategory, ICreateCategory } from "../interfaces/CategoriesInterface.ts/Category";

export const getAllCategories = async (): Promise<Icategory> => {
  try {
    const response = await doGet("/category/getAllOrderByName", { showToast: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (data: ICreateCategory): Promise<ICreateCategory> => {
  try {
    const response = await doPost("/category/create", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (data: ICreateCategory, id: string): Promise<ICreateCategory> => {
  try {
    const response = await doPut(`/category/updateName/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategoryStatus = async (id: string, newState: boolean) => {
  try {
    const response = await doPut(`/category/changeStatus/${id}`, { state: newState });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const  getAllActiveCategories = async (): Promise<Icategory> => {
  try {
    const response = await doGet("/category/getAllTrue", { showToast: false });
    return response.data;
  } catch (error) {
    throw error;
  }
}