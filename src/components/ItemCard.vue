<script setup lang="ts">
import { computed } from "vue";
import { Items } from "../../model";
import Button from "./Button.vue";
import CategoryButton from "./CategoryButton.vue";

const props = defineProps<{ item: Items }>();
const emits = defineEmits([
  "showEditForm",
  "showRestockForm",
  "showNewTransactionForm",
  "handleCategoryButton",
  "refreshItems",
]);

const formattedPrice = computed(() => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(props.item.price);
});
const splittedCategories = computed(() => {
  return props.item.categories?.split(",").map((category) => category.trim());
});

const deleteItem = async () => {
  const itemDeleted = await (window as any).db.deleteItem({
    code: props.item.code,
    name: props.item.name,
    categories: props.item.categories,
    qty: props.item.qty,
    price: props.item.price,
    image: props.item.image,
    transactions: props.item.transactions,
  } as Items);

  if (itemDeleted) {
    emits("refreshItems");
    return;
  }
};
</script>

<template>
  <article
    class="flex flex-row items-start gap-5 p-3 rounded-lg bg-white text-primary border-2 border-primary shadow-sm shadow-primary"
    style="grid-template-columns: 1fr 2fr 1fr"
  >
    <img v-if="item.image" :src="item.image" class="rounded-md w-[240px]" />
    <div v-else class="animate-pulse self-stretch">
      <span
        class="block bg-current w-[240px] h-full opacity-50 rounded-md"
      ></span>
    </div>

    <div
      v-if="item.code && item.name && item.categories && item.price && item.qty"
      class="flex flex-col justify-between self-stretch grow"
    >
      <div>
        <h2 class="text-3xl font-semibold">{{ item.code }}</h2>
        <h4 class="text-xl font-semibold">{{ item.name }}</h4>
        <div class="flex flex-row flex-wrap gap-1 mt-2">
          <CategoryButton
            v-for="category in splittedCategories"
            :category="category"
            @filter-by-category="
              (category) => $emit('handleCategoryButton', category)
            "
          />
        </div>
      </div>
      <div>
        <p class="font-semibold">HARGA {{ formattedPrice }}</p>
        <p class="font-semibold">TERSEDIA {{ item.qty }} BOX</p>
      </div>
    </div>
    <div v-else class="flex flex-col justify-between h-full anime-pulse">
      <div class="flex flex-col gap-2">
        <span
          class="block bg-current w-[7em] h-[1em] opacity-50 rounded-md"
        ></span>
        <span
          class="block bg-current w-[12em] h-[1em] opacity-50 rounded-md"
        ></span>
        <div class="flex gap-2">
          <span
            class="block bg-current w-[7em] h-[1em] opacity-50 rounded-md"
          ></span>
          <span
            class="block bg-current w-[7em] h-[1em] opacity-50 rounded-md"
          ></span>
          <span
            class="block bg-current w-[7em] h-[1em] opacity-50 rounded-md"
          ></span>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span
          class="block bg-current w-[4em] h-[1em] opacity-50 rounded-md"
        ></span>
        <div class="flex gap-2">
          <span
            class="block bg-current w-[7em] h-[1em] opacity-50 rounded-md"
          ></span>
          <span
            class="block bg-current w-[9em] h-[1em] opacity-50 rounded-md"
          ></span>
        </div>
      </div>
    </div>

    <div v-if="item.code" class="flex flex-row gap-2 justify-end flex-wrap">
      <!-- Transaction Button -->
      <div class="relative">
        <Button warning class="peer">TRANSAKSI</Button>
        <ul
          class="hidden active:flex peer-focus-within:flex flex-col gap-1 py-2 px-2 border-2 border-primary rounded-md bg-warning text-primary font-semibold absolute top-full right-0 mt-2 text-right w-max shadow-sm shadow-primary"
        >
          <li class="border-b-2 pb-1 border-primary">
            <RouterLink :to="`/transactions/${item.code}`">
              DAFTAR TRANSAKSI
            </RouterLink>
          </li>
          <li class="border-b-2 pb-1 border-primary">
            <button
              class="hover:text-gray-500 focus-within:text-gray-500"
              @click="$emit('showNewTransactionForm', item)"
            >
              CATAT PEMBELIAN
            </button>
          </li>
          <li>
            <button
              class="hover:text-gray-500 focus-within:text-gray-500"
              @click="$emit('showRestockForm', item)"
            >
              RESTOK ITEM
            </button>
          </li>
        </ul>
      </div>
      <!-- Edit Button -->
      <div class="relative">
        <Button warning class="peer">EDIT</Button>
        <ul
          class="hidden active:flex peer-focus-within:flex flex-col gap-1 py-2 px-2 border-2 border-primary rounded-md bg-warning text-primary font-semibold absolute top-full right-0 mt-2 text-right w-max shadow-sm shadow-primary"
        >
          <li class="border-b-2 pb-1 border-primary">
            <button
              class="hover:text-gray-500 focus-within:text-gray-500"
              @click="$emit('showEditForm', item)"
            >
              UBAH DATA
            </button>
          </li>
          <li v-if="item.transactions == 0">
            <button
              class="hover:text-gray-500 focus-within:text-gray-500"
              @click="deleteItem"
            >
              HAPUS DATA
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="flex flex-row gap-2 justify-end">
      <span
        class="block bg-current w-[9em] h-[2em] opacity-50 rounded-md"
      ></span>
      <span
        class="block bg-current w-[4em] h-[2em] opacity-50 rounded-md"
      ></span>
    </div>
  </article>
</template>
