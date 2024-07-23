import {defineStore} from "pinia";
import {useUser} from "@/stores/user";
import router from "@/router";

export const useAuth = defineStore('useAuth', () => {
    const user = useUser()

    function login( data : {
        ID: string,
        date_created: string,
        email: string,
        first_name: string,
        last_name: string,
        password: string,
        role: string,
        session?: {
            ID: string,
            token: string,
            user_id: string,
            expired: number,
            date_created: string,
        },
        username: string
    } ) {
        if( data.hasOwnProperty('session') && data.session ) {
            localStorage.setItem('token', data.session.token)
            delete data.session
        }
        user.current = data
    }

    function logout() {
        localStorage.clear()
        router.go(0)
    }

    return { login, logout }
})