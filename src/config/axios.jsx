import axios from "axios"

const api = axios.create({ baseURL: 'https://darisbell-backend.onrender.com/' })

export default api