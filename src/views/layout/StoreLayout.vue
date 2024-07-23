<script setup lang="ts">
import {useAuth} from "@/stores/auth";
import {ref} from "vue";
import router from "@/router";

const
    auth = useAuth(),
    items = ref([
        {
            label: "POS",
            icon: "pi pi-print",
            url: router.resolve({ name: "store-pos" }).href
        },
        {
            label: "Transactions",
            icon: "pi pi-print",
            url: router.resolve({ name: "store-transaction" }).href
        },
        {
            label: "Products",
            icon: "pi pi-shopping-bag",
            items: [
                {
                    label: "Add",
                    icon: "pi pi-plus",
                    command: () => {
                        console.log( "Add Product" )
                    }
                }
            ]
        },
        {
            label: "Snacks",
            icon: "pi pi-heart-fill",
            items: [
                {
                    label: "Add",
                    icon: "pi pi-plus",
                },
                {
                    label: "POS",
                    icon: "pi pi-print"
                }
            ]
        }
    ])
</script>

<template>
    <header id="store_header" class="relative z-[2] h-[40px] bg-secondary border-b-white border-b">
        <div class="flex items-center justify-between">
            <div class="w-1/2">
                <slot name="headerLeft">
                    <Menubar :model="items" class="!bg-transparent !p-0"></Menubar>
                </slot>
            </div>
            <div class="w-1/2">
                <slot name="headerRight">
                    <div class="text-right">
                        <Button icon="pi pi-sign-out" size="small" text @click="auth.logout"></Button>
                    </div>
                </slot>
            </div>
        </div>
    </header>
    <main id="store_main" class="h-[calc(100vh-40px)] bg-white">
        <div class="flex h-full">
            <section class="w-[15%] bg-secondary h-full overflow-y-auto flex flex-col gap-1 p-1">
                <slot name="contentLeft"></slot>
            </section>
            <section class="w-[40%] h-full">
                <slot></slot>
            </section>
            <section class="w-[45%] bg-gray-200 h-full">
                <slot name="contentRight"></slot>
            </section>
        </div>
    </main>
</template>

<style>
#store_header .p-menubar-item-label {
    color: var(--p-menubar-item-icon-color)
}
</style>

<style scoped>

</style>