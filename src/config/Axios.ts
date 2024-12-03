import axios from "axios";
import toast from "react-hot-toast";
import DatabaseService from "../service/DatabaseService";

const instance = axios.create({
  baseURL: "http://localhost:8080/api-crochet",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

declare module "axios" {
  export interface AxiosRequestConfig {
    showToast?: boolean;
  }
}

instance.interceptors.request.use(
  async (config) => {
    const isOnline = navigator.onLine;
    if (!isOnline && config.method === "post" && config.data) {
      // Guarda la solicitud en la base local
      await DatabaseService.add({
        _id: new Date().toISOString(),
        endpoint: config.url,
        data: config.data,
      });
      return Promise.reject(new Error("Sin conexión: solicitud almacenada localmente."));
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    const backendMessage = error.response?.data?.message || error.message || "Error al realizar la operación";
    toast.error(backendMessage);
    return Promise.reject(new Error(error.message || "Error al realizar la operación"));
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.config.showToast !== false) {
      if(!response.config.url?.includes("/item/getById/") && !response.config.url?.includes("/stats/visits/") && !response.config.url?.includes("/product/getById/") && !response.config.url?.includes("/review/")
    ){
      toast.success(response.data.message);
    }
    }
    return response;
  },
  (error) => {
    const backendMessage =
      error.response?.data?.message || error.message || "Error al realizar la operación";
    toast.error(backendMessage);
    return Promise.reject(new Error(backendMessage));
  }
);

export const doGet = (url: string, config?: object) => {
  return instance.get(url, config);
};


export const doGetId = (url: string, id: string) => {
  return instance.get(`${url}${id}`);
};

export const doPost = (url: string, data: any) => {
  return instance.post(url, data);
};

export const doPut = (url: string, data: any) => {
  return instance.put(url, data);
};

export const doPutId = (url: string) => {
  return instance.put(url);
};

export const doDelete = (url: string) => {
  return instance.delete(url);
};
