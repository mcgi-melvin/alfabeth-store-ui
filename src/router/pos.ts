export default [
    {
        path: "store",
        name: "store",
        meta: { layout: "store", auth: true },
        children: [
            {
                path: "pos",
                name: "store-pos",
                component: () => import("@/views/store/StorePos.vue")
            },
            {
                path: "transaction",
                name: "store-transaction",
                redirect: { name: "store-transaction-list" },
                children: [
                    {
                        path: "list",
                        name: "store-transaction-list",
                        component: () => import("@/views/store/transaction/TransactionList.vue")
                    },
                    {
                        path: ":id",
                        name: "store-transaction-view",
                        component: () => import("@/views/store/transaction/TransactionView.vue"),
                    },
                    {
                        path: ":id/print",
                        name: "store-transaction-view-print",
                        component: () => import("@/views/store/transaction/TransactionPrint.vue"),
                        meta: { layout: "store", auth: false }
                    }
                ]
            }
        ]
    }
]