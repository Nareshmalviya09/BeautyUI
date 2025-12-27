import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT interceptor (as per your base code)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
// INTERCEPTOR -- object  hai ye axios deta hai. ye use hota request ko catch kerne ke liye taki hum token attach ker sake. (thoda aur structure ke bare me padho) 
// DIFF - HTTP VS HTTPS --> encrypted request jati hai https me aur text format me jata hai http me. 
// a) conversion from http to https - defaut connfig change kerni hogi.
// b) ssl certification generate kerna
// ASYNC DEFER -- 
// ASYNC AWAIT 
// COMPONENT BASED STRUCTURE -- 