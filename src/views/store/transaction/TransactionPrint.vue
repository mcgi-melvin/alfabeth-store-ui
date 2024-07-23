<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import ReceiptPrint from "@/views/store/component/ReceiptPrint.vue";
import {useVueToPrint} from "vue-to-print";
import {useTransactionService} from "@/services/transaction";

const
    route = useRoute(),
    transactionService = useTransactionService(),
    componentRef = ref()

transactionService.get( route.params.id as string )

const cTransaction = computed(() => transactionService.transaction as { ID: string, items: Array<any>, amount_paid: number })

const { handlePrint } = useVueToPrint({
    content: () => componentRef.value,
    documentTitle: "Receipt",
    removeAfterPrint: true
});
</script>

<template>
    <div class="w-full h-[100vh] bg-gray-100 py-10">
        <div class="toolbar max-w-[400px] mx-auto w-full pb-10 bg-gray-100 flex flex-wrap items-center gap-3">
            <Button severity="secondary" icon="pi pi-arrow-left" @click="$router.go(-1)" size="small" />
            <Button icon="pi pi-print" @click="handlePrint" size="small" />
        </div>
        <div id="receipt" class="max-w-[400px] mx-auto w-full bg-white" ref="componentRef">
            <ReceiptPrint
                :transaction_id="cTransaction.ID"
                :total="cTransaction.items.map(item => item.quantity * item.price).reduce((a, b) => a + b, 0)"
                :payment="cTransaction.amount_paid"
                :products="cTransaction.items"
            />
        </div>
    </div>
</template>

<style scoped>
@media print {
    .toolbar {
        display: none;
    }
}
</style>