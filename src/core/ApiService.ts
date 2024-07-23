import axios from "axios";

export default class ApiService {
    static init() {
        axios.defaults.baseURL = import.meta.env.VITE_API_URL
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

        if( localStorage.getItem("token") )
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
    }

    static async get( endpoint : string, params = {} ) {
        this.init()
        return await axios.get( endpoint, params )
    }

    static async post( endpoint: string, params = {} ) {
        this.init()
        return await axios.post( endpoint, params )
    }

    static async put( endpoint: string, params = {} ) {
        this.init()
        return await axios.put( endpoint, params )
    }
}