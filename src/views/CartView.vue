<template>
  <div>
    <div v-if="store.cart.length == 0">
      <h1>Su carrito no contine elementos</h1>
    </div>
    <div v-else>
      <h1 class="mx-2 w-1/2 border-b-2">Su pedido</h1>

      <div class="grid grid-cols-6 p-4">
        <div class="col-span-1">
          <h2 class="font-bold uppercase">total</h2>
          {{ store.totalPrice }} $
          <button @click="makeOrder" class="button border-2 bg-orange-500">
            Comprar
          </button>
        </div>
        <div class="col-span-5 grid grid-cols-1 gap-5">
          <div
            class="grid grid-cols-5 gap-4"
            v-for="item in store.cart"
            :key="item.product.id"
          >
            <div class="col-span-4 flex">
              <div class="w-1/4">
                <img
                  :src="item.product.image"
                  :alt="item.product.description"
                  class="h-full w-full object-scale-down"
                />
              </div>
              <div class="w-full overflow-hidden text-ellipsis p-4">
                <h2 class="font-bold">
                  {{ item.product.title }}
                </h2>
                <p>{{ item.product.description }}</p>
              </div>
            </div>

            <div class="col-span-1 flex flex-col font-bold">
              <div class="flex items-center justify-between">
                <button
                  @click="remove(item.product, 1)"
                  class="button border-2"
                >
                  -
                </button>

                <label for="cantidad">Cantidad {{ item.cuantity }}</label>
                <button @click="add(item.product)" class="button border-2">
                  +
                </button>
              </div>
              <label class="text-center" for="tota">
                $ {{ item.cuantity * item.product.price }}</label
              >
              <button
                @click="remove(item.product, item.cuantity)"
                class="button bg-red-700 text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import type IProducts from "@/types/IProducts";

const store = useCartStore();

const makeOrder = () => {
  store.makeOrder();
  alert("Su compra se ha realizado");
};

const add = (product: IProducts) => {
  store.addCart(product, 1);
};

const remove = (product: IProducts, cant: number) => {
  store.removeCart(product, cant);
};
</script>

<style scoped></style>
