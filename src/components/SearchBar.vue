<script setup lang="ts">
import { ref, watch } from "vue";
import Container from "./Container.vue";
import { Items } from "../../model";

const emits = defineEmits(["updateItems"]);

const keyword = ref("");
watch(keyword, () => findItems());

const findItems = async () => {
  const items: Items[] = await (window as any).db.getItems(keyword.value);
  emits("updateItems", items);
};
</script>

<template>
  <Container
    class="flex flex-row justify-evenly gap-4 bg-white border-2 p-2 border-primary rounded-lg overflow-hidden shadow-sm shadow-primary text-primary font-medium"
  >
    <input
      type="text"
      class="border-r-2 border-primary flex-grow outline-none"
      placeholder="Ketik kode item di sini"
      v-model="keyword"
    />
    <button @click="findItems">CARI</button>
  </Container>
</template>
