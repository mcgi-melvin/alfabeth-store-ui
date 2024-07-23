<script setup lang="ts">
import {markRaw, ref} from "vue";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import ProductSettingsBrand from "@/views/store/component/settings/product/ProductSettingsBrand.vue";
import ProductSettingsPrice from "@/views/store/component/settings/product/ProductSettingsPrice.vue";
import ProductSettingsCategory from "@/views/store/component/settings/product/ProductSettingsCategory.vue";
import ProductSettingsDetails from "@/views/store/component/settings/product/ProductSettingsDetails.vue";

const
    visible = defineModel('visible'),
    item = defineModel('item'),
    tabs = ref([
        { name: "Details", component: markRaw(ProductSettingsDetails)},
        { name: "Price", component: markRaw(ProductSettingsPrice)},
        { name: "Category", component: markRaw(ProductSettingsCategory)},
        { name: "Brand", component: markRaw(ProductSettingsBrand)},
    ])
</script>

<template>
    <Dialog
        v-model:visible="visible"
        content-class="w-[600px]"
        header="Product Settings"
    >
        <Tabs value="0">
            <TabList>
                <Tab v-for="(tab, index) in tabs" :value="`${index}`">{{ tab.name }}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel v-for="(tab, index) in tabs" :value="`${index}`">
                    <component :is="tab.component" :item="item" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Dialog>
</template>

<style scoped>

</style>