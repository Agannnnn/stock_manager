<script setup lang="ts">
import Button from "./Button.vue";

defineProps<{ category: string }>();
</script>

<template>
  <RouterLink :to="`/?category=${category.toLowerCase()}`">
    <Button warning>
      {{ category }}
    </Button>
  </RouterLink>
</template>
