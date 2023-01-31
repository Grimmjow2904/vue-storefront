<template>
  <div class="w-1/6">
    <!-- Categorias -->
    <div class="grid gap-4 p-4">
      <button
        @click="emit('category', cat)"
        class="button border-2 hover:border-blue-400"
        v-for="cat in categories"
        :key="cat"
      >
        {{ cat }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const priceMax = ref(20);

// type-based
const emit = defineEmits<{
  (e: "category", name: string): void;
}>();

const categories = ref<string[]>([]);

onMounted(async () => {
  try {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => (categories.value = json));
  } catch (error) {}
});
</script>
