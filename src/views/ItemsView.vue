<script setup lang="ts">
import { ref, watch } from "vue";
import { Items } from "../../model";
import Button from "../components/Button.vue";
import Container from "../components/Container.vue";
import SearchBar from "../components/SearchBar.vue";
import ItemCard from "../components/ItemCard.vue";

const keyword = ref("");
const items = ref(
  (await (window as any).db.getItems(keyword.value)) as Items[]
);

watch(keyword, async (val) => {
  items.value = await (window as any).db.getItems(val);
});

watch(keyword, (val) => {});
</script>

<template>
  <!-- <ItemForm
    v-if="itemForm.active"
    @close-form="() => (itemForm.active = !itemForm.active)"
  /> -->

  <!-- <RestockForm
    v-if="restockForm.active"
    @close-form="() => (restockForm.active = !restockForm.active)"
  /> -->
  <br />
  <SearchBar v-model:keyword="keyword" />
  <br />
  <Container class="flex flex-row justify-end gap-3">
    <Button> TAMBAH ENTRI ITEM </Button>
  </Container>
  <br />
  <Container class="flex flex-col gap-3">
    <ItemCard
      v-for="item in items"
      :code="item.code"
      :name="item.name"
      :image="item.image ?? ''"
      :categories="item.categories"
      :price="Number.parseInt(`${item.price}`)"
      :qty="Number.parseInt(`${item.qty}`)"
    />
  </Container>
</template>
