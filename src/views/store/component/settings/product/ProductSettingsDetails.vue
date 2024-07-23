<script setup lang="ts">
import {ref} from "vue";
import {useToastService} from "@/core/helpers";
import ApiService from "@/core/ApiService";
import {useStore} from "@/stores/store";

const
    store = useStore(),
    props = defineProps(['item']),
    { showToast } = useToastService(),
    isLoading = ref(false)

const formData = ref({
    barcode: props.item.barcode,
    name: props.item.name,
    user_id: props.item.user_id
})

const formSubmit = async () => {
    isLoading.value = true
    try {
        const res = await ApiService.put(`/product/${props.item.ID}/details`, formData.value)
        if( res ) {
           store.products = res.data.products
        }
    } catch (e) {
        if( e instanceof Error ) showToast("error", "Editing", e.message)
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
                    <FloatLabel>
                        <InputText id="barcode" class="w-full" v-model="formData.barcode" />
                        <label for="barcode">Barcode</label>
                    </FloatLabel>
                </div>
                <div class="form-field">
                    <FloatLabel>
                        <InputText id="product_name" class="w-full" v-model="formData.name" />
                        <label for="product_name">Product Name</label>
                    </FloatLabel>
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