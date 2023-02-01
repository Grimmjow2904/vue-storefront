<template>
  <div class="flex flex-col items-center justify-around">
    <h2 class="text-center font-bold">Caracteristicas</h2>
    <p class="my-4">
      {{ product.description }}
    </p>

    <div class="my-5 grid w-full grid-cols-2 gap-4">
      <DetailLabel :value="product.category" :name="'category'" />
      <DetailLabel :value="product.rating.rate" :name="'rating'" />
    </div>

    <div class="grid w-full grid-cols-4 gap-4">
      <DetailLabel :value="product.price" :name="'price'" />

      <input
        v-model="cantidad"
        type="number"
        name="cantidad"
        min="1"
        class="h-full self-center justify-self-end border-2 text-end"
      />

      <div class="flex items-center">
        <label class="font-bold uppercase" for="price">total</label>
        <output id="total" class="mx-4"> ${{ total }} </output>
      </div>

      <button @click="buyClick" class="button bg-orange-500">Comprar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DetailLabel from "@/components/DetailLabel.vue";
import { useCartStore } from "@/stores/cart";
import type IProducts from "@/types/IProducts";
import { ref, computed } from "vue";

const props = defineProps<{
  product: IProducts;
}>();

const cart = useCartStore();

const cantidad = ref(1);

const total = computed(() => {
  return (cantidad.value * props.product.price).toFixed(2);
});

const buyClick = () => {
  if (props.product) {
    cart.addCart(props.product, cantidad.value);
    cantidad.value = 1;
  }
};
</script>

<style scoped></style>
