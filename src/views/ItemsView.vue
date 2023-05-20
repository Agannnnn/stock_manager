<script setup lang="ts">
import { ref, watch } from "vue";
import { Items } from "../../model";
import Button from "../components/Button.vue";
import Container from "../components/Container.vue";
import ItemCard from "../components/ItemCard.vue";
import ItemForm from "../components/ItemForm.vue";
import NewTransactionForm from "../components/NewTransactionForm.vue";
import RestockForm from "../components/RestockForm.vue";
import SearchBar from "../components/SearchBar.vue";

const keyword = ref("");
const items = ref(
  (await (window as any).db.getItems(keyword.value)) as Items[]
);
const saveItem = ref<{ open: boolean; item?: Items }>({ open: false });
const restockItem = ref<{ open: boolean; item?: Items }>({ open: false });
const newTransaction = ref<{ open: boolean; item?: Items }>({ open: false });

const refreshItems = async () => {
  items.value = (await (window as any).db.getItems(keyword.value)) as Items[];
};
const showSaveForm = (item: Items) => {
  saveItem.value.open = true;
  saveItem.value.item = item;
};
const closeSaveForm = () => {
  saveItem.value.open = false;
  refreshItems();
};
const showRestockForm = (item: Items) => {
  restockItem.value.open = true;
  restockItem.value.item = item;
};
const closeRestockForm = () => {
  restockItem.value.open = false;
  refreshItems();
};
const showNewTransactionForm = (item: Items) => {
  newTransaction.value.open = true;
  newTransaction.value.item = item;
};
const closeNewTransactionForm = () => {
  newTransaction.value.open = false;
  refreshItems();
};

watch(keyword, async (val) => {
  items.value = await (window as any).db.getItems(val);
});
</script>

<template>
  <ItemForm
    v-if="saveItem.open"
    :item="saveItem.item"
    @close-form="closeSaveForm"
  />

  <RestockForm
    v-if="restockItem.open"
    :item="restockItem.item"
    @close-form="closeRestockForm"
  />

  <NewTransactionForm
    v-if="newTransaction.open"
    :item="newTransaction.item"
    @close-form="closeNewTransactionForm"
  />
  <br />
  <SearchBar v-model:keyword="keyword" />
  <br />
  <Container class="flex flex-row justify-end gap-3">
    <Button warning @click="saveItem.open = true"> TAMBAH ENTRI ITEM </Button>
  </Container>
  <br />
  <Container class="flex flex-col gap-3">
    <ItemCard
      v-for="item in items"
      :item="item"
      @handle-category-button="(category) => (keyword = category)"
      @refresh-items="refreshItems"
      @show-edit-form="showSaveForm"
      @show-new-transaction-form="showNewTransactionForm"
      @show-restock-form="showRestockForm"
    />
  </Container>
</template>
