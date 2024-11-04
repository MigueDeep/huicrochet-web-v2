import { doGet, doPost } from "../config/Axios";
import { Icategory, ICreateCategory } from "../interfaces/CategoriesInterface.ts/Category";

export const getAllCategories = async (): Promise<Icategory> => {
  try {
    const response = await doGet("/category/getAll");
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
