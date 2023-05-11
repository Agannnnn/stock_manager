<script setup lang="ts">
import Button from "./Button.vue";

defineEmits(["closeForm"]);
</script>

<template>
  <div class="w-screen h-screen absolute top-0 left-0 z-10">
    <div
      class="w-screen h-screen absolute top-0 left-0"
      style="background-color: rgba(0, 0, 0, 0.5)"
      @click="$emit('closeForm')"
    ></div>
    <form
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg border-2 border-primary"
    >
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col justify-between items-start gap-4">
          <img src="/Ceiling.jpg" class="rounded-md" />
          <input
            type="file"
            class="py-1 file:px-2 file:border-2 file:border-primary file:rounded-md file:bg-warning file:text-primary file:text-lg file:font-semibold file:hover:-translate-y-1 file:shadow-sm file:shadow-primary"
          />
        </div>
        <div class="text-primary font-medium flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <label for="item-code">KODE ITEM</label>
            <input
              type="text"
              id="item-code"
              placeholder="MASUKAN KODE ITEM"
              class="border-2 border-primary rounded-md p-2"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="item-code">NAMA ITEM</label>
            <input
              type="text"
              id="item-code"
              placeholder="MASUKAN NAMA ITEM"
              class="border-2 border-primary rounded-md p-2"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="item-code">QTY</label>
            <input
              type="number"
              min="1"
              id="item-code"
              placeholder="20"
              class="border-2 border-primary rounded-md p-2"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="item-code">KODE ITEM</label>
            <textarea
              type="text"
              id="item-code"
              rows="2"
              placeholder="KATEGORI 1, KATEGORI 2, KATEGORI 3, ..."
              class="border-2 border-primary rounded-md p-2"
            ></textarea>
          </div>
          <div class="flex flex-row justify-end gap-2 mt-2">
            <Button alert type="reset" @click="$emit('closeForm')">
              BATAL
            </Button>
            <Button warning type="submit"> SIMPAN </Button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
