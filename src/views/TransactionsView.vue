<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Transactions } from "../../model";
import Container from "../components/Container.vue";
import RestockCard from "../components/RestockCard.vue";
import TransactionCard from "../components/TransactionCard.vue";
import IncomeStatus from "../components/IncomeStatus.vue";

const route = useRoute();

const transactions = ref<Transactions[]>(
  await (window as any).db.getTransactions()
);

watch(
  route,
  async (route) => {
    transactions.value = await (window as any).db.getTransactions(
      route.params.code ?? null
    );
  },
  { immediate: true }
);
</script>

<template>
  <IncomeStatus
    v-if="$route.params.code"
    :item="($route.params.code as string)"
  />
  <Container class="flex flex-row flex-wrap justify-between gap-y-4 mt-5">
    <div v-for="transaction in transactions">
      <TransactionCard
        v-if="transaction.type == 'Sell'"
        :transaction="transaction"
      />
      <RestockCard v-else :transaction="transaction" />
    </div>
  </Container>
</template>
