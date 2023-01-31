<template>
  <div class="relative col-span-1">
    <!-- Categorias -->

    <TransitionGroup name="list" tag="ul" class="sticky top-0 grid gap-4 p-4">
      <button
        @click="emit('category', cat)"
        class="button border-2 hover:border-blue-400"
        v-for="cat in categories"
        :key="cat"
      >
        {{ cat }}
      </button>
    </TransitionGroup>
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

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
