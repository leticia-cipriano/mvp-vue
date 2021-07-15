import axios from "axios";

const http = axios.create({
    baseURL: "http://viacep.com.br/ws/"
})

export default http
