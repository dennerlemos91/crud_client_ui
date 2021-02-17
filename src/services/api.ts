import axios from "axios";

const api = axios.create({
  baseURL: "https://cooperforte-api.herokuapp.com/",
});

export default api;
