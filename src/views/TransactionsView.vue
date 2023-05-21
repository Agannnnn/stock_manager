<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Transactions } from "../../model";
import Container from "../components/Container.vue";
import IncomeStatus from "../components/IncomeStatus.vue";
import RestockCard from "../components/RestockCard.vue";
import TransactionCard from "../components/TransactionCard.vue";

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
  <Container class="flex flex-row flex-wrap gap-2 justify-center mt-5">
    <div v-for="transaction in transactions">
      <TransactionCard
        v-if="transaction.type == 'Sell'"
        :transaction="transaction"
      />
      <RestockCard v-else :transaction="transaction" />
    </div>
  </Container>
</template>
