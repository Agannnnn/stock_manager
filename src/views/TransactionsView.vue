<script setup lang="ts">
import { ref } from "vue";
import Button from "../components/Button.vue";
import Container from "../components/Container.vue";
import NewTransactionForm from "../components/NewTransactionForm.vue";

const newTransactionFormOpen = ref(false);
</script>

<template>
  <NewTransactionForm
    v-if="newTransactionFormOpen"
    @close-form="() => (newTransactionFormOpen = !newTransactionFormOpen)"
  />
  <br />
  <Container
    class="flex flex-row items-center justify-between gap-4 bg-white border-2 p-2 border-primary rounded-lg overflow-hidden shadow-sm shadow-primary text-primary font-medium"
  >
    <p class="text-lg">FILTER</p>
    <div class="font-bold flex flex-row gap-4 items-center">
      <div class="inline-flex flex-row items-center gap-2">
        <label for="dari">DARI</label>
        <input
          type="date"
          id="dari"
          class="px-2 border-2 border-primary rounded-md text-primary text-lg font-semibold hover:-translate-y-1 shadow-sm shadow-primary bg-warning"
        />
      </div>
      &minus;
      <div class="inline-flex flex-row items-center gap-2">
        <label for="sampai">SAMPAI</label>
        <input
          type="date"
          id="sampai"
          class="px-2 border-2 border-primary rounded-md text-primary text-lg font-semibold hover:-translate-y-1 shadow-sm shadow-primary bg-warning"
        />
      </div>
    </div>
  </Container>
  <br />
  <Container class="flex flex-row justify-end">
    <Button warning @click="() => (newTransactionFormOpen = true)"
      >TAMBAH TRANSAKSI</Button
    >
  </Container>
  <br />
  <Container class="flex flex-row flex-wrap items-start gap-3">
    <div
      class="border-2 border-primary bg-white p-3 rounded-lg shadow-sm shadow-primary flex flex-col justify-start"
    >
      <h2 class="text-xl font-semibold underline underline-offset-2 mb-1">
        KODE ITEM
      </h2>
      <p class="font-medium">10 Box - Rp 200.000,00</p>
      <p class="font-medium">
        {{ Intl.DateTimeFormat("id-ID").format(new Date()) }}
      </p>
      <div class="border border-primary my-1"></div>
      <p class="font-medium underline underline-offset-2">DIBELI</p>
      <p class="font-medium">Nama Pembeli</p>
      <p class="font-medium">Nomor Telepon</p>
      <p class="font-medium">Alamat</p>
    </div>

    <div
      class="border-2 border-primary bg-white p-3 rounded-lg shadow-sm shadow-primary flex flex-col justify-start"
    >
      <h2 class="text-xl font-semibold underline underline-offset-2 mb-1">
        KODE ITEM
      </h2>
      <p class="font-medium">Nama Item</p>
      <p class="font-medium">
        {{ Intl.DateTimeFormat("id-ID").format(new Date()) }}
      </p>
      <div class="border border-primary my-1"></div>
      <p class="font-medium underline underline-offset-2">RESTOK</p>
      <p class="text-2xl">10 > 20 Box</p>
    </div>
  </Container>
</template>
