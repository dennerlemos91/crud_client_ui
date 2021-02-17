import axios from "axios";
import tokenService from "./token.service";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { Authorization: "Bearer " + tokenService.getToken() },
});

export default api;
