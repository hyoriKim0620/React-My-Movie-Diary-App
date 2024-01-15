import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "88bc932f34f0aec5eb8d201090bd47ff",
    language: "ko-KR",
  },
});

export default instance;
