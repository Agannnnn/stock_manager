<script setup lang="ts">
import { ref, watch } from "vue";
import { Items } from "../../model";
import Button from "../components/Button.vue";
import Container from "../components/Container.vue";
import ItemCard from "../components/ItemCard.vue";
import ItemForm from "../components/ItemForm.vue";
import SearchBar from "../components/SearchBar.vue";

const keyword = ref("");
const items = ref(
  (await (window as any).db.getItems(keyword.value)) as Items[]
);
const saveItem = ref<{ open: boolean; item?: Items }>({ open: false });
const restockItem = ref<{ open: boolean; item?: Items }>({ open: false });

const closeSaveItem = async () => {
  saveItem.value.open = false;
  items.value = (await (window as any).db.getItems(keyword.value)) as Items[];
};

watch(keyword, async (val) => {
  items.value = await (window as any).db.getItems(val);
});
</script>

<template>
  <ItemForm
    v-if="saveItem.open"
    @close-form="closeSaveItem"
    :code="saveItem.item?.code"
    :name="saveItem.item?.name"
    :image="saveItem.item?.image"
    :qty="saveItem.item?.qty"
    :price="saveItem.item?.price"
    :categories="saveItem.item?.categories"
  />

  <!-- <RestockForm
    v-if="restockForm.active"
    @close-form="() => (restockForm.active = !restockForm.active)"
  /> -->
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
      :code="item.code"
      :name="item.name"
      :image="item.image ?? ''"
      :categories="item.categories"
      :price="Number.parseInt(`${item.price}`)"
      :qty="Number.parseInt(`${item.qty}`)"
      :transactions="Number.parseInt(`${item.transactions}`) ?? 0"
      @filter-by-category="(category) => (keyword = category)"
    />
  </Container>
</template>
