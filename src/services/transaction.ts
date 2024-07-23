import {defineStore} from "pinia";
import ApiService from "@/core/ApiService";
import {useStore} from "@/stores/store";
import {ref} from "vue";

export const useTransactionService = defineStore("useTransactionService", () => {
    const
        store = useStore(),
        transaction = ref({})

    async function get(id : string) {
        try {
            const res = await ApiService.get(`/transaction/${id}`)
            if( res ) transaction.value = res.data
        } catch (e) {
            console.log( e )
        }
    }

    return { transaction, get }
})