import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
export const app = createApp(App)

import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara';
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from "primevue/tooltip"
import 'primeicons/primeicons.css'

app.use(VueAxios, axios)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true, theme: { preset: Lara } })
app.use(ToastService)
app.use(ConfirmationService)

app.directive('tooltip', Tooltip)

app.mount('#app')
