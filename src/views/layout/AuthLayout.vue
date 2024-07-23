<script setup lang="ts">

</script>

<template>
    <section class="flex w-full">
        <div class="w-1/2 h-[100vh] bg-slate-200">
            <img class="w-full h-full object-cover" src="@/assets/images/auth-image.png" alt="Store Image" />
        </div>
        <div class="w-1/2 h-[100vh] flex items-center justify-center">
            <div class="max-w-[600px] w-full mx-auto">
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>