import {defineStore} from "pinia";
import ApiService from "@/core/ApiService";
import {useStore} from "@/stores/store";
import {ref} from "vue";

export const useTransactionService = defineStore("useTransactionService", () => {
    const
        store = useStore(),
        transaction = ref({}),
        list = ref([]),
        loading = ref(false);

    async function get(id : string) {
        try {
            const res = await ApiService.get(`/transaction/${id}`)
            if( res ) transaction.value = res.data
        } catch (e) {
            console.log( e )
        }
    }

    async function getAll() {
        loading.value = true
        try {
            const res = await ApiService.get(`/transactions`)
            list.value = res.data
        } catch (e) {
            console.log( e )
        } finally {
            loading.value = false
        }
    }

    return { transaction, list, getAll, get }
})