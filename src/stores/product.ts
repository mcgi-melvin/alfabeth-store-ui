import {defineStore} from "pinia";
import {ref} from "vue";

export const useProduct = defineStore('useProduct', () => {
    const
        list = ref([]),
        selectedItem = ref({}),
        modal = ref({
            settings: false
        })

    function toggleSettingsModal( item : object = {} ) {
        modal.value.settings = !modal.value.settings
        selectedItem.value = item
        if( !modal.value.settings ) selectedItem.value = {}
    }

    return { list, selectedItem, modal, toggleSettingsModal }
})