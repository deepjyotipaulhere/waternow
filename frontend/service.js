import axios from "axios";

const service=axios.create({
    baseURL: 'http://192.168.170.247:5000'
})

export default service