<script setup lang="ts">
import {useStore} from "@/stores/store";
import router from "@/router";

const
    visible = defineModel('visible'),
    transaction = defineModel<any>('transaction'),
    store = useStore()

const newTransaction = () => {
    store.paymentAmount = 0
    store.selectedProducts = []
    visible.value = false
}

const goToPrintReceiptPage = () => {
    const routeData = router.resolve({ name: 'store-transaction-view-print', params: { id: transaction?.value.ID } });
    window.open(routeData.href, '_blank');

    newTransaction()
}
</script>

<template>
    <Dialog
        v-model:visible="visible"
        @hide="newTransaction"
        header="Transaction successful"
        content-class="max-w-[700px] w-full"
    >
        <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-3">
                <table class="w-full">
                    <tbody>
                        <tr>
                            <td class="font-bold">Transaction ID</td>
                            <td>{{ transaction?.ID }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold">Items</td>
                            <td>{{ transaction?.items.length }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold">Total</td>
                            <td>₱{{ transaction?.items.map((item : any) => item.quantity * item.price).reduce((partialSum : number, a: number) => partialSum + a, 0) }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold">Payment Amount</td>
                            <td>₱{{ transaction?.amount_paid }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold">Change</td>
                            <td>₱{{ transaction?.amount_paid - transaction?.items.map((item : any) => item.quantity * item.price).reduce((partialSum : number, a: number) => partialSum + a, 0) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex flex-wrap gap-3">
                <Button label="New Transaction" icon="pi pi-plus" size="small" @click="newTransaction"></Button>
                <Button
                    label="Print Receipt"
                    icon="pi pi-print"
                    severity="info"
                    size="small"
                    @click="goToPrintReceiptPage"
                ></Button>
            </div>
        </div>

    </Dialog>
</template>

<style>
td {
    @apply py-2 px-3 border-2;
}
</style>