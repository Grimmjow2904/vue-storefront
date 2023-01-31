<template>
  <div
    class="flex h-[40vh] flex-col rounded-md border-2 p-3 shadow-md transition-all duration-300 hover:-translate-y-2"
  >
    <div class="h-2/5">
      <img
        :src="product.image"
        :alt="product.description"
        class="h-full w-full object-scale-down"
      />
    </div>
    <h2 class="h-1/5 text-center">{{ product.title }}</h2>

    <!-- <p class="my-2 flex-1 overflow-hidden text-ellipsis">
      {{ product.description }}
    </p> -->
    <div class="grid grid-cols-2 px-2">
      <label class="text-end"> Category : {{ product.category }} </label>
      <label class="text-end"> Rating : {{ product.rating.rate }} </label>
    </div>
    <label for="price" class="w-full p-4 text-end">$ {{ product.price }}</label>
    <div class="grid grid-cols-2">
      <button @click="detailClick(product.id)" class="button border-2">
        Detalles
      </button>
      <button @click="buyClick" class="button bg-orange-500">Comprar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import type IProducts from "@/types/IProducts";
import { useRouter } from "vue-router";

interface Props {
  product: IProducts;
}

const props = defineProps<Props>();

const cart = useCartStore();

const buyClick = () => {
  cart.addCart(props.product, 1);
};

const router = useRouter();

const detailClick = (id: number) => {
  router.push({
    name: "product",
    params: { id: id },
  });
};
</script>

<style scoped></style>
