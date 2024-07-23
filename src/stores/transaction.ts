import {defineStore} from "pinia";
import {ref} from "vue";
import type {iNewItem} from "@/core/types";
import {useStore} from "@/stores/store";

export const useTransaction = defineStore("useTransaction", () => {
    const
        store = useStore(),
        selectedProducts = ref([]),
        paymentAmount = ref<number|null>(null)

    const addItem = (item : any, type : string, price : number) => {
        const newItem = ref<iNewItem>({
            product_id: item.ID as string,
            product_name: `${item.name}${type === 'price_per_pack' ? ' (Pack)' : ''}`,
            price: price,
            price_type: type,
            quantity: 1
        })

        if( !store.selectedProducts.some(product => product.product_id === item.ID && product.price_type === type) ) {
            store.selectedProducts.push(newItem.value)
        } else {
            const product = store.selectedProducts.find(product => product.product_id === item.ID && product.price_type === type)
            if( product ) product.quantity = (product.quantity ?? 1) + 1
        }
    }

    async function finalize() {

    }

    return { selectedProducts, addItem, finalize }
})