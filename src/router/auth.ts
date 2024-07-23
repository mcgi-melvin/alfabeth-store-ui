export default [
    {
        path: "/auth",
        name: "auth",
        component: () => import("@/views/layout/AuthLayout.vue"),
        redirect: { name: 'auth-login' },
        meta: { layout: 'Auth', auth: false },
        children: [
            {
                path: "login",
                name: "auth-login",
                component: () => import("@/views/auth/AuthLogin.vue")
            },
            {
                path: "register",
                name: "auth-register",
                component: () => import("@/views/auth/AuthRegister.vue")
            },
            {
                path: "forgot-password",
                name: "auth-forgot-password",
                component: () => import("@/views/auth/AuthForgotPassword.vue")
            }
        ]
    }
]