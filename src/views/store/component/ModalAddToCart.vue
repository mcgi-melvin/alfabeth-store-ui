<script setup lang="ts">
import {useTransaction} from "@/stores/transaction";
import {onMounted, ref, defineModel} from "vue";

const visible = defineModel('visible')
const i = defineModel<any>('item')

const transaction = useTransaction()
const price = ref<number>(0),
    price_per_pack = ref<number>(0)

onMounted(() => {
    if( i.value.hasOwnProperty('price') && Object.keys( i.value.price ) )
        price.value = i.value.price.value

    if( i.value.hasOwnProperty('price_per_pack') && Object.keys( i.value.price_per_pack ) )
        price_per_pack.value = i.value.price_per_pack.value
})
</script>

<template>
    <Dialog
        v-model:visible="visible"
    >
        <template #header>
            <div class="flex flex-col gap-2">
                <h3 class="m-0">Select Price</h3>
                <h6 class="m-0 text-[14px] font-bold">{{ item.name }}</h6>
            </div>
        </template>
        <div class="flex flex-col gap-7">
            <div class="flex gap-2">
                <InputNumber v-model="price" />
                <Button :label="`Add ₱ ${price}/pc`" @click="transaction.addItem( item, 'price', price)"></Button>
            </div>
            <div v-if="item.price_per_pack" class="flex gap-2">
                <InputNumber v-model="price_per_pack" />
                <Button :label="`Add ₱ ${price_per_pack}/pack`" @click="transaction.addItem( item, 'price_per_pack', price_per_pack)"></Button>
            </div>

        </div>
    </Dialog>
</template>

<style scoped>

</style>