<script setup lang="ts">
defineProps<{ alert?: boolean; warning?: boolean }>();
</script>

<template>
  <button
    :class="[
      'px-2 border-2 border-primary rounded-md text-primary text-lg font-semibold hover:-translate-y-1 shadow-sm shadow-primary',
      {
        'bg-warning': warning,
        'bg-alert': alert,
        'bg-white': !warning && !alert,
      },
    ]"
  >
    <slot></slot>
  </button>
</template>
