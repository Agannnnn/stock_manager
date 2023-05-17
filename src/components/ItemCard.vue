<script setup lang="ts">
import { computed } from "vue";
import Button from "./Button.vue";
import CategoryButton from "./CategoryButton.vue";
import { Item } from "../../model";

const props = defineProps<Item>();
defineEmits(["editItem"]);

const formattedPrice = computed(() => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(props.price);
});
const splittedCategories = computed(() => {
  return props.categories.split(",").map((category) => category.trim());
});

const saveForm = () => {
  if (props.code?.length > 0) updateItem();
  else saveNewItem();
};

const saveNewItem = () => {};
const updateItem = () => {};
</script>

<template>
  <article
    class="grid grid-flow-col items-start gap-5 p-3 rounded-lg bg-white text-primary border-2 border-primary shadow-sm shadow-primary"
    style="grid-template-columns: 1fr 2fr 1fr"
  >
    <img src="/Ceiling.jpg" class="rounded-md" />

    <div class="flex flex-col justify-between gap-2">
      <div>
        <h2 class="text-3xl font-semibold">{{ id }}</h2>
        <h4 class="text-xl font-semibold">{{ name }}</h4>
        <div class="flex flex-row flex-wrap mt-2">
          <CategoryButton v-for="category in categories" :category="category" />
        </div>
      </div>
      <div>
        <p class="font-semibold">HARGA {{ formattedPrice }}</p>
        <p class="font-semibold">TERSEDIA {{ qty }} BOX</p>
      </div>
    </div>
    <div class="flex flex-col gap-2 text-right">
      <RouterLink :to="`/transactions?item=${code}`">
        <Button warning>TRANSAKSI</Button>
      </RouterLink>
      <div class="relative">
        <Button warning class="peer">EDIT</Button>
        <ul
          class="hidden peer-focus-within:flex flex-col gap-1 py-2 px-2 border-2 border-primary rounded-md bg-warning text-primary font-semibold absolute top-full right-0 mt-1 text-right w-max"
        >
          <li class="border-b-2 pb-1 border-primary">
            <button
              class="hover:text-gray-500 focus-within:text-gray-500"
              @click="$emit('editItem', { code, name, categories, price, qty })"
            >
              UBAH DATA
            </button>
          </li>
          <li>
            <button class="hover:text-gray-500 focus-within:text-gray-500">
              HAPUS DATA
            </button>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
