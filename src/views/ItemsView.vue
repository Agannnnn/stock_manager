<script setup lang="ts">
import { ref } from "vue";
import type { Items } from "../../model";
import Button from "../components/Button.vue";
import Container from "../components/Container.vue";
import ItemCard from "../components/ItemCard.vue";
import ItemForm from "../components/ItemForm.vue";
import RestockForm from "../components/RestockForm.vue";
import SearchBar from "../components/SearchBar.vue";

interface ItemForm extends Items {
  active: boolean;
}

const items = ref<Items[]>(await (window as any).db.getItems());
const itemForm = ref({
  active: false,
} as ItemForm);
const restockForm = ref({ active: false, amount: 0 });

const editItem = (oldValue: Items) => {
  itemForm.value.code = oldValue.code;
  itemForm.value.name = oldValue.name;
  itemForm.value.image = oldValue.image;
  itemForm.value.price = oldValue.price;
  itemForm.value.qty = oldValue.qty;
  itemForm.value.categories = oldValue.categories;
  itemForm.value.active = true;
};
</script>

<template>
  <ItemForm
    :code="itemForm.code"
    :name="itemForm.name"
    :image="itemForm.image"
    :qty="itemForm.qty"
    :price="itemForm.price"
    :categories="itemForm.categories"
    v-if="itemForm.active"
    @close-form="() => (itemForm.active = !itemForm.active)"
  />

  <RestockForm
    v-if="restockForm.active"
    @close-form="() => (restockForm.active = !restockForm.active)"
  />
  <br />
  <SearchBar @update-items="(newItems: Items[]) => {items = newItems}" />
  <br />
  <Container class="flex flex-row justify-end gap-3">
    <Button warning @click="() => (itemForm.active = true)">
      TAMBAH ENTRI ITEM
    </Button>
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
      @edit-item="editItem"
    />
  </Container>
</template>
