<script setup lang="ts">
const emits = defineEmits(["closeForm"]);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    emits("closeForm");
  }
});
</script>

<template>
  <div class="w-screen h-screen absolute top-0 left-0 z-10">
    <div
      class="w-screen h-screen absolute top-0 left-0"
      style="background-color: rgba(0, 0, 0, 0.5)"
      @click="$emit('closeForm')"
    ></div>
    <slot></slot>
  </div>
</template>
