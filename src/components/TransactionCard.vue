<script setup lang="ts">
import { Transactions } from "../../model";
import Button from "./Button.vue";

defineProps<{ transaction: Transactions }>();
</script>

<template>
  <div
    class="border-2 border-primary shadow-sm shadow-primary rounded-md p-3 bg-white flex flex-row gap-5"
  >
    <div class="flex flex-col gap-3">
      <Button warning class="self-start">
        <RouterLink :to="`/transactions/${transaction.item}`">
          {{ transaction.item }}
        </RouterLink>
      </Button>
      <ul class="font-medium text-primary">
        <li>DIBELI OLEH {{ transaction.cust_name?.toUpperCase() }}</li>
        <li>TELEPON {{ transaction.cust_phone }}</li>
        <li>ALAMAT {{ transaction.cust_address?.toUpperCase() }}</li>
      </ul>
    </div>
    <div class="self-stretch w-1 bg-primary rounded-lg"></div>
    <div class="flex flex-col justify-center font-medium">
      <span>ITEM DIBELI</span>
      <span class="font-bold text-xl">{{ transaction.qty }} BOX</span>
      <span class="self-end mt-3 font-normal">{{
        transaction.timestamp?.toLocaleString()
      }}</span>
    </div>
  </div>
</template>
