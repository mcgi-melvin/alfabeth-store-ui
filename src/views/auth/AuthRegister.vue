<script setup lang="ts">
import InputGroup from 'primevue/inputgroup';
import InputGroupAddOn from 'primevue/inputgroupaddon';
import MailIcon from "@/assets/icons/MailIcon.vue";
import UserIcon from "@/assets/icons/UserIcon.vue";
import KeyIcon from "@/assets/icons/KeyIcon.vue";
import {ref} from "vue";
import axios from "axios";
import {useToast} from "primevue/usetoast";
import ApiService from "@/core/ApiService";
import {useToastService} from "@/core/helpers";

const form = ref({
        email: null,
        username: null,
        first_name: null,
        last_name: null,
        password: null,
        password_confirm: null,
        role: "admin"
    }),
    isLoading = ref(false),
    { showToast } = useToastService()

const formSubmit = async () => {
    isLoading.value = true
    try {
        const res = await ApiService.post('/auth/register', form.value)
        if( res )
            showToast("success", "Registration", res.data.message)
    } catch (e) {
        if( e instanceof Error )
            showToast("error", "Registration Error", e.message)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <form @submit.prevent="formSubmit">
        <div class="flex flex-col gap-4">
            <input-group>
                <input-group-add-on>
                    <MailIcon class="w-[15px]" />
                </input-group-add-on>
                <InputText type="email" placeholder="Enter email address" v-model="form.email" required />
            </input-group>
            <input-group>
                <input-group-add-on>
                    <UserIcon class="w-[15px]" />
                </input-group-add-on>
                <InputText placeholder="Enter username" v-model="form.username" required />
            </input-group>

            <div class="flex gap-4">
                <input-group>
                    <input-group-add-on>
                        <svg class="w-[12px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M64 32C28.7 32 0 60.7 0 96V256 448c0 17.7 14.3 32 32 32s32-14.3 32-32V288H224c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V96H288c17.7 0 32-14.3 32-32s-14.3-32-32-32H64z"/>
                        </svg>
                    </input-group-add-on>
                    <InputText placeholder="Enter first name" v-model="form.first_name" />
                </input-group>
                <input-group>
                    <input-group-add-on>
                        <svg class="w-[12px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M64 32c17.7 0 32 14.3 32 32V416H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32z"/>
                        </svg>
                    </input-group-add-on>
                    <InputText placeholder="Enter last name" v-model="form.last_name" />
                </input-group>
            </div>

            <input-group>
                <input-group-add-on>
                    <KeyIcon class="w-[15px]" />
                </input-group-add-on>
                <Password placeholder="Enter password" toggle-mask v-model="form.password" required />
            </input-group>
            <input-group>
                <input-group-add-on>
                    <KeyIcon class="w-[15px]" />
                </input-group-add-on>
                <Password placeholder="Retype password" toggle-mask :feedback="false" v-model="form.password_confirm" />
            </input-group>
            <Button type="submit" class="justify-center gap-3">
                <span>Sign Up</span>
                <ProgressSpinner v-if="isLoading" class="w-[20px] h-[20px] mx-0" />
            </Button>
        </div>
    </form>
</template>

<style scoped>

</style>