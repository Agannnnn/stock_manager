<script setup lang="ts">
import { ref } from "vue";
import AddItemForm from "../components/AddItemForm.vue";
import Button from "../components/Button.vue";
import Container from "../components/Container.vue";
import ItemCard from "../components/ItemCard.vue";
import RestockForm from "../components/RestockForm.vue";
import SearchBar from "../components/SearchBar.vue";

const addItemFormOpen = ref(false);
const restockFormOpen = ref(false);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    addItemFormOpen.value = false;
    restockFormOpen.value = false;
  }
});

const openEditItemForm = (previousData: {
  id: string;
  name: string;
  categories: string[];
  price: number;
  qty: number;
}) => {};
</script>

<template>
  <AddItemForm
    v-if="addItemFormOpen"
    @close-form="() => (addItemFormOpen = !addItemFormOpen)"
  />

  <RestockForm
    v-if="restockFormOpen"
    @close-form="() => (restockFormOpen = !restockFormOpen)"
  />
  <br />
  <SearchBar />
  <br />
  <Container class="flex flex-row justify-end gap-3">
    <Button warning @click="() => (restockFormOpen = true)">
      TAMBAH STOK ITEM
    </Button>
    <Button warning @click="() => (addItemFormOpen = true)">
      TAMBAH ENTRI ITEM
    </Button>
  </Container>
  <br />
  <Container class="flex flex-col gap-3">
    <ItemCard
      id="AWAWA"
      name="PVC"
      :categories="['Black']"
      :price="200000"
      :qty="10"
    />
  </Container>
</template>
