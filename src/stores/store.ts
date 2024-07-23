import {defineStore} from "pinia";
import ApiService from "@/core/ApiService";
import {ref} from "vue";
import type {iNewItem} from "@/core/types";

export const useStore = defineStore("useStore", () => {
    const
        isLoading = ref(false),
        products = ref([]),
        categories = ref([]),
        selectedProducts = ref<Array<iNewItem>>([]),
        paymentAmount = ref<number|null>(null),
        filter = ref({
            keyword: "",
            category: null
        })

    async function getData() {
        isLoading.value = true
        try {
            const res = await ApiService.get(`/store/get/data`)
            if( res ) {
                products.value = res.data.products
                categories.value = res.data.categories
            }
        } catch (e) {
            console.log( e )
        } finally {
            isLoading.value = false
        }
    }

    const getFinalProductsData = () => {
        return products.value.filter((item : { name: string, barcode: string }) => {
            if( filter.value.keyword ) {
                if( item.name.toLowerCase().includes(filter.value.keyword.toLowerCase()) ) return item
                if( item.barcode.toLowerCase().includes(filter.value.keyword.toLowerCase()) ) return item

                return false
            }
            return true
        })
    }

    const getTotalPrice = () =>{
        let total = 0

        selectedProducts.value.forEach(item => {
            total = total + (item.price * (item.quantity ?? 1))
        })

        return total
    }

    return { isLoading, products, selectedProducts, categories, filter, paymentAmount, getData, getTotalPrice, getFinalProductsData }
})