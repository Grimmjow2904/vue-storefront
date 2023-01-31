<template>
  <div class="flex flex-col">
    <h1 class="mx-2 w-1/2 border-b-2">Productos</h1>

    <div class="relative grid grid-cols-6">
      <TheFilter @category="byCat" />
      <div class="col-span-5">
        <ul v-if="products.length > 0" class="grid grid-cols-3 gap-4 p-4">
          <li v-for="product in products" :key="product.id">
            <ProductCard :product="product" />
          </li>
        </ul>
        <div class="flex h-96 w-5/6 items-center justify-center" v-else>
          <h1 class="">Cargando..</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import type IProducs from "@/types/IProducts";
import ProductCard from "@/components/ProductCard.vue";
import TheFilter from "@/components/TheFilter.vue";

const products = ref<IProducs[]>([]);

const byCat = (name: string) => {
  const temp = products.value;
  try {
    products.value = [];

    fetch("https://fakestoreapi.com/products/category/" + name)
      .then((res) => res.json())
      .then((json) => {
        products.value = json;
      });
  } catch (error) {
    products.value = temp;
    alert("Error de busqueda");
  }
};

onMounted(async () => {
  try {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => (products.value = json));
  } catch (error) {}
});
</script>

<style scoped></style>
