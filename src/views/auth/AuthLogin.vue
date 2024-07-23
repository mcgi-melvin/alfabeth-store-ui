<script setup lang="ts">
import UserIcon from "@/assets/icons/UserIcon.vue";
import KeyIcon from "@/assets/icons/KeyIcon.vue";
import {onMounted, ref} from "vue";
import ApiService from "@/core/ApiService";
import {useToastService} from "@/core/helpers";
import {useAuth} from "@/stores/auth";
import {useUser} from "@/stores/user";
import router from "@/router";

const
    { showToast } = useToastService(),
    isLoading = ref(false),
    user = useUser(),
    auth = useAuth(),
    form = ref({
        username: null,
        password: null
    })

const formSubmit = async () => {
    isLoading.value = true
    const params = new URLSearchParams( form.value as any )
    try {
        const res = await ApiService.get(`/auth/login?${params.toString()}`)
        showToast(res.data.severity, 'Logging In', res.data.message)
        if( res ) auth.login( res.data.user )
    } catch (e) {
        if( e instanceof Error)
            showToast('error', "Login Error", e.message)
    } finally {
        isLoading.value = false
        router.go(0)
    }
}
</script>

<template>
    <form enctype="application/x-www-form-urlencoded" @submit.prevent="formSubmit">
        <div class="flex flex-col gap-4">
            <input-group>
                <input-group-addon>
                    <UserIcon class="w-[15px]" />
                </input-group-addon>
                <InputText placeholder="Enter Username" v-model="form.username" />
            </input-group>
            <input-group>
                <input-group-addon>
                    <KeyIcon class="w-[15px]" />
                </input-group-addon>
                <Password placeholder="Enter Password" toggle-mask :feedback="false" v-model="form.password" />
            </input-group>
            <Button type="submit" class="justify-center gap-3">
                <span>Login</span>
                <ProgressSpinner v-if="isLoading" class="!w-[20px] !h-[20px] !mx-0 text-white" />
            </Button>
        </div>
    </form>
</template>

<style scoped>

</style>