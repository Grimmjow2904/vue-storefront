<template>
  <div class=" ">
    Listado de elementos

    <ul v-if="products.length > 0">
      <li v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </li>
    </ul>
    <div v-else>Cargando</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import type IProducs from "@/types/IProducts";
import ProductCard from "@/components/ProductCard.vue";

const products = ref<IProducs[]>([]);

onMounted(async () => {
  try {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => (products.value = json));
  } catch (error) {}
});
</script>

<style scoped></style>
