<script setup lang="ts">
import StoreLayout from "@/views/layout/StoreLayout.vue";
import {useStore} from "@/stores/store";
import {computed, ref} from "vue";
import {useConfirm} from "primevue/useconfirm";
import {useToastService} from "@/core/helpers";
import ModalAddToCart from "@/views/store/component/ModalAddToCart.vue";
import ModalProductSettings from "@/views/store/component/ModalProductSettings.vue";
import type {iNewItem} from "@/core/types";
import ModalFinalizeTransaction from "@/views/store/component/ModalFinalizeTransaction.vue";
import {useTransaction} from "@/stores/transaction";
import ApiService from "@/core/ApiService";
import {useProduct} from "@/stores/product";

const
    confirm = useConfirm(),
    { showToast } = useToastService(),
    store = useStore(),
    product = useProduct(),
    transaction = useTransaction(),
    modal = ref<string | any>({
        productSettings: false,
        addToCart: false,
        finalizeTransaction: false,
        selectedItem: {}
    })

store.getData()

const products = computed(() => store.getFinalProductsData())

const removeProduct = ( index : number ) => {
    store.selectedProducts.splice(index, 1)
}

const removeAllProduct = () => {
    confirm.require({
        message: "Are you sure to delete all items",
        header: "Confirmation",
        acceptLabel: "Yes",
        rejectProps: {
            label: "No, thanks!",
            severity: "secondary"
        },
        accept: () => {
            store.selectedProducts = []
            showToast("success", "Deleting Items", "All items deleted")
        },
    })
}

const getChange = computed(() => (store.paymentAmount ?? 0) - store.getTotalPrice())

const finalize = () => {
    confirm.require({
        message: "Are you sure to finalize this transaction?",
        header: "Confirmation",
        acceptLabel: "Yes",
        rejectProps: {
            label: "Not yet!",
            severity: "secondary"
        },
        async accept() {
            const res = await ApiService.post(`/transaction`, { amount_paid: store.paymentAmount, products: store.selectedProducts })
            if( res ) {
                showToast("success", "Transaction", res.data.message)
                openModal(res.data.transaction, 'finalizeTransaction')
            }
        },
    })
}

const openModal = (item : object, modalComponent : string) => {
    modal.value.selectedItem = item
    modal.value[modalComponent] = true
}
</script>

<template>
    <StoreLayout>
        <template #contentLeft>
            <template v-if="store.categories && store.categories.length">
                <template v-for="(category) in store.categories">
                    <Button class="w-full border-none" severity="secondary" :label="category['name']" v-tooltip="category['description']" raised />
                </template>
            </template>
            <template v-else>
                <div class="text-center">
                    <ProgressSpinner
                        style="width: 50px; height: 50px"
                        strokeWidth="3"
                        fill="transparent"
                        animationDuration=".5s"
                        aria-label="Custom ProgressSpinner"
                    />
                </div>
            </template>
        </template>
        <div class="product-search">
            <input class="bg-gray-100 text-black outline-0 w-full h-[50px] px-3 py-2" placeholder="Enter Product Name / Barcode" v-model="store.filter.keyword" />
        </div>
        <div class="p-3 h-[calc(100%-50px)] overflow-y-auto">
            <template v-if="products && products.length">
                <DataView
                    :value="products"
                    :lazy="store.isLoading"
                    :paginator="true"
                    paginator-position="top"
                    :rows="products.length / 5"
                >
                    <template #list="slotProps">
                        <div class="flex flex-col">
                            <div v-for="(item, index) in slotProps.items" :key="index">
                                <div
                                    class="flex flex-col sm:flex-row sm:items-center p-3 gap-4 bg-white"
                                    :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }"
                                >
                                    <div class="md:w-20 relative">
                                        <img class="block xl:block mx-auto rounded w-full" src="@/assets/images/product-image-placeholder.png" :alt="item.name" />
                                        <Tag value="Category" severity="secondary" class="absolute top-[2px] dark:!bg-surface-900 !text-[8px]"></Tag>
                                    </div>
                                    <div class="flex flex-col md:flex-row justify-between flex-1 gap-6">
                                        <div class="flex flex-row md:flex-col justify-between items-start gap-2 w-[70%]">
                                            <div class="flex flex-col gap-2">
                                                <div class="text-lg text-black font-medium">{{ item.name }}</div>
                                                <div class="flex gap-3">
                                                    <span
                                                        v-if="item.price && item.price.value"
                                                        class="font-semibold text-primary"
                                                    >₱ {{ item.price ? item.price.value : 0 }}/pc</span>
                                                    <span
                                                        v-if="item.price_per_pack && item.price_per_pack.value"
                                                        class="font-semibold text-green-500"
                                                    >₱ {{item.price_per_pack.value }}/pack</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-col md:items-end w-[30%]">
                                            <div class="mb-3">
                                                <Button icon="pi pi-cog" severity="help" size="small" @click="product.toggleSettingsModal( item )" text></Button>
                                            </div>
                                            <div class="flex flex-row-reverse md:flex-row gap-2 mt-4">
                                                <Button
                                                    icon="pi pi-shopping-cart"
                                                    label="Add to list"
                                                    class="flex-auto md:flex-initial whitespace-nowrap"
                                                    size="small"
                                                    @click="openModal(item, 'addToCart')"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>
            </template>
            <template v-else>
                <div class="text-center">
                    <ProgressSpinner
                        style="width: 50px; height: 50px"
                        strokeWidth="3"
                        fill="transparent"
                        animationDuration=".5s"
                        aria-label="Custom ProgressSpinner"
                    />
                </div>
            </template>
        </div>
        <template #contentRight>
            <div class="flex flex-col justify-between h-full">
                <div class="h-[calc(100%-100px)] overflow-y-auto">
                    <DataTable :value="store.selectedProducts" :loading="store.isLoading">
                        <template #header>
                            <div class="text-right">
                                <Button
                                    severity="danger"
                                    icon="pi pi-trash"
                                    label="Delete all item"
                                    size="small"
                                    @click="removeAllProduct"
                                    :disabled="store.selectedProducts.length < 2"
                                ></Button>
                            </div>
                        </template>
                        <Column field="product_name" header="Product">
                            <template #body="{ data }">
                                {{ data.product_name }} <span v-if="data.price "></span>
                            </template>
                        </Column>
                        <Column field="quantity" header="Quantity">
                            <template #body="{ index }">
                                <InputNumber
                                    input-class="w-[100px]"
                                    v-model="store.selectedProducts[index].quantity"
                                    :min="1"
                                    show-buttons
                                ></InputNumber>
                            </template>
                        </Column>
                        <Column field="price" header="Price" style="width: 100px">
                            <template #body="{ data, index }">
                                <div v-if="(store.selectedProducts[index].quantity ?? 1) < 2">
                                    <span class="block font-bold">₱ {{ data.price }}</span>
                                </div>
                                <div v-else>
                                    <span class="block font-bold">₱ {{ data.price * (store.selectedProducts[index].quantity ?? 1) }}</span>
                                    <span class="block text-[12px]">₱ {{ data.price }}/each</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="Action">
                            <template #body="{ index }">
                                <Button severity="danger" icon="pi pi-trash" size="small" @click="removeProduct( index )"></Button>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="checkout bg-tertiary flex items-center justify-between w-full h-[100px] p-3">
                    <div class="total text-xl text-black font-bold">
                        <h4>Total</h4>
                        <h3 class="text-[30px]">₱ {{ store.getTotalPrice() }}</h3>
                    </div>
                    <div class="change text-xl text-black font-bold" v-if="store.paymentAmount">
                        <h4>Change</h4>
                        <h3 class="text-[30px]">₱ {{ getChange }}</h3>
                    </div>
                    <div class="flex gap-1">
                        <InputNumber
                            v-if="store.selectedProducts && store.selectedProducts.length"
                            v-model="store.paymentAmount"
                            placeholder="Enter payment amount"
                            input-class="w-[150px]"
                        />
                        <Button
                            :disabled="store.selectedProducts && !store.selectedProducts.length || !store.paymentAmount"
                            label="Finalize"
                            icon="pi pi-send"
                            iconPos="right"
                            @click="finalize"
                        />
                    </div>
                </div>
            </div>
        </template>
    </StoreLayout>
    <template v-if="modal.addToCart">
        <ModalAddToCart v-model:visible="modal.addToCart" v-model:item="modal.selectedItem" />
    </template>
    <ModalProductSettings v-model:visible="product.modal.settings" v-model:item="product.selectedItem" />
    <ModalFinalizeTransaction v-model:visible="modal.finalizeTransaction" v-model:transaction="modal.selectedItem" />
</template>

<style>
.p-dataview-paginator-top {
    @apply sticky top-[-13px] z-[1]
}
</style>

<style scoped>

</style>