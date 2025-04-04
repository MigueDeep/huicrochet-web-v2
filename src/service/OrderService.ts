// src/services/AuthService.ts
import { doGet, doPutId } from "../config/Axios";


const OrderService = {

    getOrders: async () => {
        try {
            const response = await doGet("/order", { showToast: false });
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching order. Please try again.");
        }
    },

    updateOrder: async (id: string, ) => {
        try {
            const response = await doPutId(`/order/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while updating the order. Please try again.");
        }
    }


};


export default OrderService;
