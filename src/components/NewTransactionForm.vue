<script setup lang="ts">
import Button from "./Button.vue";

defineEmits(["closeForm"]);
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="w-screen h-screen absolute top-0 left-0 z-10">
      <div
        class="w-screen h-screen absolute top-0 left-0"
        style="background-color: rgba(0, 0, 0, 0.5)"
        @click="$emit('closeForm')"
      ></div>
      <form
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg border-2 border-primary w-1/3"
      >
        <div class="text-primary font-medium flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <label for="select-item">PILIH ITEM TERJUAL</label>
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
          <div class="flex flex-col gap-1">
            <label for="transaction-qty">JUMLAH QTY</label>
            <input
              min="1"
              value="1"
              type="number"
              id="transaction-qty"
              placeholder="MASUKAN JUMLAH PENJUALAN"
              class="border-2 border-primary rounded-md p-2"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="transaction-buyer-name">NAMA PEMBELI</label>
            <input
              type="text"
              id="transaction-buyer-name"
              placeholder="MASUKAN NAMA PEMBELI"
              class="border-2 border-primary rounded-md p-2"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="transaction-buyer-phone">NOMOR TELEPON PEMBELI</label>
            <input
              type="tel"
              id="transaction-buyer-phone"
              placeholder="MASUKAN NOMOR TELEPON PEMBELI"
              class="border-2 border-primary rounded-md p-2"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="transaction-buyer-address">ALAMAT PEMBELI</label>
            <textarea
              rows="3"
              id="transaction-buyer-address"
              placeholder="MASUKAN ALAMAT PEMBELI"
              class="border-2 border-primary rounded-md p-2"
            ></textarea>
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
  </div>
</template>
