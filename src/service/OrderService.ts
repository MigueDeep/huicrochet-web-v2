// src/services/AuthService.ts
import { doPost, doGet, doPut, doPutId } from "../config/Axios";
import { IOrder } from "../interfaces/IOrder";


const OrderService = {

    getOrders: async () => {
        try {
            const response = await doGet("/order");
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching colors. Please try again.");
        }
    },


};


export default OrderService;
