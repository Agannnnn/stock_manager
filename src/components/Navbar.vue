<script setup lang="ts">
import Container from "./Container.vue";

const activeLinkClass = "text-gray-300 pointer-events-none";
</script>

<template>
  <nav>
    <Container class="flex justify-between items-center mt-3 mb-4">
      <div class="flex items-end gap-10">
        <h1 class="text-2xl text-primary font-bold">LOGO PERUSAHAAN</h1>
        <div class="text-lg text-primary font-medium flex flex-row gap-4">
          <RouterLink
            to="/"
            :class="$route.name === 'items' ? activeLinkClass : ''"
          >
            DAFTAR ITEM
          </RouterLink>
          <span>|</span>
          <RouterLink
            to="/transactions"
            :class="$route.name === 'transactions' ? activeLinkClass : ''"
          >
            RIWAYAT TRANSAKSI
          </RouterLink>
        </div>
      </div>
    </Container>
  </nav>
</template>
