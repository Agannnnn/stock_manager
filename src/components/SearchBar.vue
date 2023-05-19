<script setup lang="ts">
import Container from "./Container.vue";

defineProps<{ keyword: string }>();
defineEmits(["update:keyword"]);
</script>

<template>
  <Container
    class="flex flex-row justify-evenly gap-4 bg-white border-2 p-2 border-primary rounded-lg overflow-hidden shadow-sm shadow-primary text-primary font-medium"
  >
    <input
      type="text"
      class="border-r-2 border-primary flex-grow outline-none"
      placeholder="Ketik kode item di sini"
      :value="keyword"
      @input="($event) => $emit('update:keyword', ($event.target as HTMLInputElement).value)"
    />
    <button @click="$emit('update:keyword', keyword)">CARI</button>
  </Container>
</template>
