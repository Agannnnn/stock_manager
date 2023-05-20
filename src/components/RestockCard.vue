<script setup lang="ts">
import { Transactions } from "../../model";
import Button from "./Button.vue";

defineProps<{ transaction: Transactions }>();
</script>

<template>
  <div
    class="border-2 border-primary shadow-sm shadow-primary rounded-md p-3 bg-white flex flex-col gap-2"
  >
    <div class="flex flex-row items-center gap-2">
      <span class="font-medium">RESTOK ITEM</span>
      <Button warning class="self-start">
        <RouterLink :to="`/transactions/${transaction.item}`">
          {{ transaction.item }}
        </RouterLink>
      </Button>
    </div>
    <p class="font-bold text-2xl">{{ transaction.qty }} BOX</p>
    <p class="self-end">{{ transaction.timestamp?.toLocaleString() }}</p>
  </div>
</template>
