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
            <div class="w-1/3">
              <img
                :src="product.image"
                :alt="product.description"
                class="object-scale-down"
              />
            </div>
          </div>

          <ToBuy :product="product" />
        </div>
      </div>

      <h1>Articulos similares</h1>
      <ul class="my-10 grid grid-cols-4 gap-5 p-4">
        <li
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
import type IProducts from "@/types/IProducts";
import { useRoute } from "vue-router";
import ToBuy from "@/components/ToBuy.vue";

const product = ref<IProducts>();

const similar = ref<IProducts[]>();

const route = useRoute();

const err = ref(false);

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
