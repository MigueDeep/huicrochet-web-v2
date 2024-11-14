import axios from "axios";
import toast from "react-hot-toast";

const instance = axios.create({
  baseURL: "http://localhost:8080/api-crochet",
  timeout: 5000,
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
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(response.data.message);
    toast.success(response.data.message);
    return response;
  },
  (error) => {
    return Promise.reject(error);
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