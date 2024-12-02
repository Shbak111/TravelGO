import axios from "axios";

export const useAxios = () => {
  const localAxios = axios.create({ baseURL: "/api" });

  localAxios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("Authorization");
    config.headers["Authorization"] = token; // Authorization 헤더 추가
    return config;
  });

  localAxios.interceptors.response.use(
    (config) => {
      const token = config.headers.authorization;
      const userId = config.headers.userid;
      const name = config.headers.username;

      if (token && token.startsWith("Bearer")) {
        sessionStorage.setItem("Authorization", token);
        sessionStorage.setItem("UserId", userId);
        sessionStorage.setItem("UserName", name);
      }
      return config;
    },
    (error) => {
      if (error.status === 401 || error.response.status === 401) {
        console.log("useAxios");
        sessionStorage.clear();
      }
      return Promise.reject(error);
    }
  );

  return localAxios;
};
