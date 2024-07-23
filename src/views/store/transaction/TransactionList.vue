<script setup lang="ts">
import StoreLayout from "@/views/layout/StoreLayout.vue";
import {useTransactionService} from "@/services/transaction";
import {formatDate} from "../../../core/helpers";
import {ref} from "vue";

const transaction = useTransactionService(),
    activeTransaction = ref(0)

transaction.getAll()

const setActiveTransaction = ( id : number ) => {
    activeTransaction.value = id
}

const getActiveTransactionItems = () => {
    const t = transaction.list.find(item => item.ID === activeTransaction.value)
    if( t && Object.keys( t ) )
        return t.items
    return []
}
</script>

<template>
    <StoreLayout>
        <template #contentLeft>
            <div class="flex flex-col gap-1">
                <div
                    class="transaction-item text-white p-5 break-all border-2 cursor-pointer hover:bg-gray-400"
                    v-for="item of transaction.list"
                    :key="item.ID"
                    @click="setActiveTransaction( item.ID )"
                >
                    <div class="flex flex-col gap-2">
                        <h4>Transaction ID: {{ item.ID }}</h4>
                        <h6>Items: {{ item.items.length }}</h6>
                        {{ formatDate( new Date( item.date_created ) ) }}
                    </div>
                </div>
            </div>
        </template>
        <template v-if="transaction.list && transaction.list.length">
            <DataTable :value="getActiveTransactionItems()">
                <Column field="product_name" header="Product Name">
                    <template #body="{data}">
                        <h3>{{ data.product_name }}</h3>
                    </template>
                </Column>
                <Column field="quantity" header="Qty"></Column>
                <Column field="price" header="Price">
                    <template #body="{data}">
                        ₱ {{ data.price }}
                    </template>
                </Column>
            </DataTable>
        </template>
    </StoreLayout>
</template>

<style scoped>

</style>