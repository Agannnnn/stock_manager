<script setup lang="ts">
import { computed } from "vue";
import Button from "./Button.vue";
import CategoryButton from "./CategoryButton.vue";

interface Items {
  code: string;
  name: string;
  image: string;
  qty: number;
  price: number;
  categories: string;
  transactions?: number;
}
const props = defineProps<Items>();
const emits = defineEmits([
  "editItem",
  "restockItem",
  "filterByCategory",
  "refreshItems",
]);

const formattedPrice = computed(() => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(props.price);
});
const splittedCategories = computed(() => {
  return props.categories?.split(",").map((category) => category.trim());
});

const deleteItem = async () => {
  const itemDeleted = await (window as any).db.deleteItem({
    code: props.code,
    name: props.name,
    categories: props.categories,
    qty: props.qty,
    price: props.price,
    image: props.image,
    transactions: props.transactions,
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
    <img v-if="image" :src="image" class="rounded-md w-[240px]" />
    <div v-else class="animate-pulse self-stretch">
      <span
        class="block bg-current w-[240px] h-full opacity-50 rounded-md"
      ></span>
    </div>

    <div
      v-if="code && name && categories && price && qty"
      class="flex flex-col justify-between self-stretch grow"
    >
      <div>
        <h2 class="text-3xl font-semibold">{{ code }}</h2>
        <h4 class="text-xl font-semibold">{{ name }}</h4>
        <div class="flex flex-row flex-wrap gap-1 mt-2">
          <CategoryButton
            v-for="category in splittedCategories"
            :category="category"
            @filter-by-category="
              (category) => $emit('filterByCategory', category)
            "
          />
        </div>
      </div>
      <div>
        <p class="font-semibold">HARGA {{ formattedPrice }}</p>
        <p class="font-semibold">TERSEDIA {{ qty }} BOX</p>
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

    <div v-if="code" class="flex flex-row gap-2 justify-end flex-wrap">
      <!-- Transaction Button -->
      <div class="relative">
        <Button warning class="peer">TRANSAKSI</Button>
        <ul
          class="hidden active:flex peer-focus-within:flex flex-col gap-1 py-2 px-2 border-2 border-primary rounded-md bg-warning text-primary font-semibold absolute top-full right-0 mt-2 text-right w-max shadow-sm shadow-primary"
        >
          <li class="border-b-2 pb-1 border-primary">
            <RouterLink :to="`/transactions/${code}`">
              DAFTAR TRANSAKSI
            </RouterLink>
          </li>
          <li class="border-b-2 pb-1 border-primary">
            <button class="hover:text-gray-500 focus-within:text-gray-500">
              CATAT PEMBELIAN
            </button>
          </li>
          <li>
            <button class="hover:text-gray-500 focus-within:text-gray-500">
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
              @click="
                $emit('editItem', {
                  code,
                  name,
                  image,
                  categories,
                  price,
                  qty,
                } as Items)
              "
            >
              UBAH DATA
            </button>
          </li>
          <li v-if="transactions == 0">
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
