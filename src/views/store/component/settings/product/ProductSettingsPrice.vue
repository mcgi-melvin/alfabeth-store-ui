<script setup lang="ts">
import {ref} from "vue";
import ApiService from "@/core/ApiService";
import {useToastService} from "@/core/helpers";
import {useStore} from "@/stores/store";

const
    store = useStore(),
    props = defineProps(['item']),
    { showToast } = useToastService(),
    isLoading = ref(false)

const formData = ref({ price: null, price_per_pack: null })

if( props.item.hasOwnProperty('price') )
    formData.value.price = props.item.price.value

if( props.item.hasOwnProperty('price_per_pack') )
    formData.value.price_per_pack = props.item.price_per_pack.value

const formSubmit = async () => {
    isLoading.value = true
    try {
        const res = await ApiService.post(`/product/${props.item.ID}/price`, formData.value)
        if( res ) {
            store.products = res.data.products
            showToast("success", "Product Edit Price", res.data.message)
        }
    } catch (e) {
        if( e instanceof Error ) showToast("error", "Product Edit", e.message)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="py-5">
        <form @submit.prevent="formSubmit">
            <div class="flex flex-col gap-10">
                <div class="form-field">
                    <InputGroup>
                        <InputGroupAddon>₱</InputGroupAddon>
                        <FloatLabel>
                        <InputNumber v-model="formData.price" />
                                <label>Price</label>
                        </FloatLabel>
                    </InputGroup>
                </div>
                <div class="form-field">
                    <InputGroup>
                        <InputGroupAddon>₱</InputGroupAddon>
                        <FloatLabel>
                            <InputNumber v-model="formData.price_per_pack" />
                            <label>Price per pack</label>
                        </FloatLabel>
                    </InputGroup>
                </div>
                <div class="form-button">
                    <Button type="submit" label="Save" icon="pi pi-save" size="small" :loading="isLoading" />
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>