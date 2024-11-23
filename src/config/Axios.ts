import axios from "axios";
import toast from "react-hot-toast";

const instance = axios.create({
  baseURL: "http://localhost:8080/api-crochet",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    console.log(response.data.message);
    if(!response.config.url?.includes("stats")){
      toast.success(response.data.message);
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

export const doGet = (url: string) => {
  return instance.get(url);
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
