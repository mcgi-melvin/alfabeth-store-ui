<script setup lang="ts">
import {formatDate} from "@/core/helpers";

defineProps(['transaction_id', 'payment', 'total', 'products'])
</script>

<template>
    <section>
        <table style="margin-bottom: 10px">
            <tbody>
            <tr>
                <td><span style="font-family:'Times New Roman',Times,serif; font-size: 7pt; font-weight: 700;">RojieRichRishy Sari-sari Store</span></td>
            </tr>
            <tr>
                <td>
                    <span style="font-family:'Times New Roman',Times,serif; font-size: 4pt">{{ formatDate( new Date() ) }}</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span style="font-family:'Times New Roman',Times,serif; font-size: 6pt">Transaction ID: {{ transaction_id }}</span>
                </td>
            </tr>
            </tbody>
        </table>
        <table class="table" style="table-layout: fixed; width: 100%; font-family: Arial, serif;">
            <thead>
                <tr>
                    <th style="width: 65%; font-size: 7pt;">Product</th>
                    <th style="font-size: 7pt;">Qty</th>
                    <th style="font-size: 7pt;">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in products" :key="item.ID">
                    <td>{{ item.product_name }}</td>
                    <td style="text-align: right">{{ item.quantity }}</td>
                    <td style="text-align: right">P{{ item.price * (item.quantity ?? 1) }}</td>
                </tr>
                <tr>
                    <td><strong>Total</strong></td>
                    <td></td>
                    <td class="text-right">P{{ total }}</td>
                </tr>
                <tr>
                    <td><strong>Payment</strong></td>
                    <td></td>
                    <td class="text-right">P{{ payment }}</td>
                </tr>
                <tr>
                    <td><strong>Change</strong></td>
                    <td></td>
                    <td class="text-right">P{{ payment - total }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
@media print
{
    table { page-break-after:auto }
    tr    { page-break-inside:avoid; page-break-after:auto }
    td    { page-break-inside:avoid; page-break-after:auto }
    thead { display:table-header-group }
    tfoot { display:table-footer-group }

    th, h6 {
        border: 1px solid #f4f4f4;
        font-family:'Times New Roman',Times,serif;
    }

    td, p {
        border: 1px solid #f4f4f4;
        font-family:'Times New Roman',Times,serif;
        font-size: 6pt;
    }
}
</style>