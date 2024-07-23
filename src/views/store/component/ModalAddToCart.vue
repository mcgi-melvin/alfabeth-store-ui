<script setup lang="ts">
import {useTransaction} from "@/stores/transaction";

const visible = defineModel('visible')
defineModel('item')

const transaction = useTransaction()
</script>

<template>
    <Dialog
        v-model:visible="visible"
        header="Select Price"
        content-class="w-[600px]"
    >
        <div class="flex flex-wrap gap-3">
            <Button v-if="item.price" :label="`Add ₱ ${item.price.value}/pc`" @click="transaction.addItem( item, 'price', item.price.value)"></Button>
            <Button v-if="item.price_per_pack" :label="`Add ₱ ${item.price_per_pack.value}/pack`" @click="transaction.addItem( item, 'price_per_pack', item.price_per_pack.value)"></Button>
        </div>
    </Dialog>
</template>

<style scoped>

</style>