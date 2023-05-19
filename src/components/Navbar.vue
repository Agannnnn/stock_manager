<script setup lang="ts">
import Container from "./Container.vue";

const style =
  "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-primary";
</script>

<template>
  <nav>
    <Container class="flex justify-between items-center mt-3 mb-4">
      <div class="flex items-end gap-10">
        <h1 class="text-2xl text-primary font-bold">LOGO PERUSAHAAN</h1>
        <div class="text-lg text-primary font-medium flex flex-row gap-4">
          <RouterLink
            to="/"
            :class="[
              style,
              $route.name == 'items' ? 'after:block' : 'after:hidden',
            ]"
          >
            DAFTAR ITEM
          </RouterLink>
          <span>|</span>
          <RouterLink
            to="/transactions"
            :class="[
              style,
              $route.name == 'transactions' ? 'after:block' : 'after:hidden',
            ]"
          >
            RIWAYAT TRANSAKSI
          </RouterLink>
        </div>
      </div>
    </Container>
  </nav>
</template>
