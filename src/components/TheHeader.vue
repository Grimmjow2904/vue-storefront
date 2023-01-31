<template>
  <header class="flex justify-end">
    <nav class="">
      <ul class="flex p-3">
        <li class="nav-item">Products</li>
        <li class="nav-item">Categories</li>
        <li class="nav-item relative">
          <label for="items" class="absolute -right-3 -top-3">{{
            cart.totalItems
          }}</label>
          Cart
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();
</script>

<style scoped></style>
