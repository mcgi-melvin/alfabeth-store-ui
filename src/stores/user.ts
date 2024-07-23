import {defineStore} from "pinia";
import {ref} from "vue";
import ApiService from "@/core/ApiService";

export const useUser = defineStore('useUser', () => {
    const current = ref({})

    async function isLoggedIn() {
        const token = localStorage.getItem("token")
        if( !token ) return false
        const res = await ApiService.get(`/auth/verify`)
        return !!res
    }

    return { current, isLoggedIn }
})