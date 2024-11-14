// src/services/AuthService.ts
import { doGet } from "../config/Axios";


const UserService = {

    getUsers: async () => {
        try {
            const response = await doGet("/auth/getAll");
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching users. Please try again.");
        }
    },

};


export default UserService;
