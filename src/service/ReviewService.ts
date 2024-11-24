import { doGet, } from "../config/Axios";
import { IReview } from "../interfaces/IReview";


export const ReviewService = {
  getReviewsByProduct : async (id: string):  Promise<IReview> => {
    try{
      const response  =  await doGet(`/review/product/${id}`);
      console.log(response)
      return response.data
    }catch (error){
      throw error;

    }
  }
}