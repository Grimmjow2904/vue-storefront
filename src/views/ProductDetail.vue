<template>
  <div>
    <div v-if="err">
      <h1>El producto que busca no existe</h1>
    </div>
    <div v-else-if="product">
      <h1 class="mx-2 w-1/2 border-b-2">Detalles de {{ product?.title }}</h1>

      <div>
        <div class="grid grid-cols-2 gap-4 p-4">
          <div class="flex items-center justify-center">
            <div class="w-1/2">
              <img
                :src="product.image"
                :alt="product.description"
                class="object-scale-down"
              />
            </div>
          </div>

          <div class="flex flex-col items-center justify-center">
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
                class="w-1/2 justify-self-end border-2 text-end"
              />
              <DetailLabel :value="product.price * cantidad" :name="'total'" />

              <button @click="buyClick" class="button bg-orange-500">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
      <ul class="my-10 grid grid-cols-4 gap-5 p-4">
        <li
          @click="similarClick(item.id)"
          v-for="item in similar"
          :key="item.id"
          class="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-4 shadow-lg transition-all duration-300 hover:-translate-y-4"
        >
          <div class="w-1/2">
            <img
              :src="item.image"
              :alt="item.description"
              class="object-scale-down"
            />
          </div>
          <h1>{{ item.title }}</h1>
        </li>
      </ul>
    </div>

    <div v-else="">
      <h1>Buscando..</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import DetailLabel from "@/components/DetailLabel.vue";
import type IProducts from "@/types/IProducts";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

const product = ref<IProducts>();

const similar = ref<IProducts[]>();

const route = useRoute();
const router = useRouter();

const cart = useCartStore();

const cantidad = ref(1);

const err = ref(false);

const buyClick = () => {
  if (product.value) {
    cart.addCart(product.value, cantidad.value);
    cantidad.value = 1;
  }
};

const similarClick = (id: number) => {
  router.push({
    name: "product",
    params: { id: id },
  });
  fetch("https://fakestoreapi.com/products/" + id)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      product.value = json;
    })
    .catch((error) => {
      err.value = true;
      console.log("El producto no existe", error);
    });
};

watch(product, async (newProduct) => {
  if (newProduct) {
    fetch(
      "https://fakestoreapi.com/products/category/" +
        newProduct.category +
        "/?limit=4"
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        similar.value = json;
      })
      .catch((error) => {
        console.log("No existen productos similares", error);
      });
  }
});

onMounted(async () => {
  fetch("https://fakestoreapi.com/products/" + route.params.id)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      product.value = json;
    })
    .catch((error) => {
      err.value = true;
      console.log("El producto no existe", error);
    });
});
</script>
