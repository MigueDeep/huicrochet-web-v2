// src/services/AuthService.ts
import { doPost, doGet, doPut } from "../config/Axios";
import { IColor } from "../interfaces/IColor";


const ColorService = {

    createColor: async (data: IColor) => {
        try {
            const response = await doPost("/color", data);
            return response.data;
        } catch (ex) {
            throw new Error("An error occurred while creating color. Please try again.");  
        }
    },
    

    getColors: async () => {
        try {
            const response = await doGet("/color");
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching colors. Please try again.");
        }
    },


    updateColor: async (id: string, data: IColor) => {
        try {
            const response = await doPut(`/color/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while updating color. Please try again.");
        }
    }

};


export default ColorService;
