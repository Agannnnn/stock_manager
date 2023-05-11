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
      <div class="text-primary font-medium flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <label for="select-item">PILIH ITEM YANG DI-RESTOCK</label>
          <select
            id="select-item"
            class="border-2 border-primary p-2 rounded-md text-primary"
          >
            <option
              v-for="item in [
                { code: 'WP9', name: 'Wood P9' },
                { code: 'WP10', name: 'Wood P10' },
              ]"
              :value="item.code"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-row gap-3">
          <div class="flex flex-col gap-1">
            <label for="item-current-qty">QTY TERSEDIA</label>
            <input
              type="number"
              id="item-current-qty"
              value="10"
              class="border-2 border-primary rounded-md p-2 bg-gray-200 text-gray-500"
              readonly
              disabled
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="item-restock-qty">QTY MASUK</label>
            <input
              type="number"
              id="item-restock-qty"
              placeholder="MASUKAN QTY MASUK"
              class="border-2 border-primary rounded-md p-2"
            />
          </div>
        </div>
        <div class="flex flex-row justify-end gap-2 mt-2">
          <Button type="reset" alert @click="$emit('closeForm')">
            BATAL
          </Button>
          <Button type="submit" warning> SIMPAN </Button>
        </div>
      </div>
    </form>
  </div>
</template>
