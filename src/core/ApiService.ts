import axios from "axios";

export default class ApiService {
    static init() {
        // axios.defaults.baseURL = 'http://localhost:3001/'
        axios.defaults.baseURL = 'http://192.168.56.1:3001/'
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