<script setup lang="ts">
import Button from "./Button.vue";

defineProps<{ category: string }>();
defineEmits(["filterByCategory"]);
</script>

<template>
  <Button @click="$emit('filterByCategory', category)" warning>
    {{ category }}
  </Button>
</template>
