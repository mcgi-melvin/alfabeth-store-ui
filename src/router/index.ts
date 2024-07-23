import { createRouter, createWebHistory } from 'vue-router'
import auth from "@/router/auth";
import pos from "@/router/pos";
import {useUser} from "@/stores/user";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "index",
            redirect: { name: "auth-login" },
            children: [
                ...auth,
                ...pos
            ]
        },
    ]
})

router.beforeResolve(async (to, from, next) => {
    const
        user = useUser(),
        isLoggedIn = await user.isLoggedIn()

    if( to.meta.auth && !isLoggedIn && to.meta.layout !== 'Auth' ) return next({ name: "auth-login" })
    if( !to.meta.auth && isLoggedIn && to.meta.layout === 'Auth' ) return next({ name: "store-pos" })

    next()
})

export default router
