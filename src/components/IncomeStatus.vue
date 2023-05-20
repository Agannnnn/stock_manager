<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { Items } from "../../model";
import Container from "./Container.vue";

const props = defineProps<{ item: string }>();

const item = ref<Items>(await (window as any).db.getItem(props.item));

const formattedPrice = computed(() => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(item.value.price);
});
</script>

<template>
  <Container
    class="bg-white p-3 mt-4 border-2 border-primary shadow-sm shadow-primary rounded-md flex flex-row items-center gap-10"
  >
    <ul>
      <li class="text-4xl font-bold mb-2">{{ item.code }}</li>
      <li class="text-lg font-medium">Nama {{ item.name }}</li>
      <li class="text-lg font-medium">Teredia {{ item.qty }}</li>
      <li class="text-lg font-medium">Harga {{ formattedPrice }}</li>
    </ul>
  </Container>
</template>
