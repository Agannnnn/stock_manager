<script setup lang="ts">
import Container from "./Container.vue";

const activeLinkClass = "text-gray-300 pointer-events-none";
</script>

<template>
  <nav>
    <Container class="flex justify-between items-center mt-3 mb-4">
      <div class="flex items-end gap-10">
        <h1 class="text-2xl text-primary font-bold">LOGO PERUSAHAAN</h1>
        <ul class="text-lg text-primary font-medium flex flex-row gap-4">
          <li>
            <RouterLink
              to="/"
              :class="$route.name === 'items' ? activeLinkClass : ''"
            >
              DAFTAR ITEM
            </RouterLink>
          </li>
          <li>|</li>
          <li>
            <RouterLink
              to="/transactions"
              :class="$route.name === 'transactions' ? activeLinkClass : ''"
            >
              RIWAYAT TRANSAKSI
            </RouterLink>
          </li>
        </ul>
      </div>
    </Container>
  </nav>
</template>
