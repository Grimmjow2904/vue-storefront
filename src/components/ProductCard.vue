<template>
  <div>
    {{ product.id }}
  </div>
</template>

<script setup lang="ts">
import type IProducts from "@/types/IProducts";

interface Props {
  product: IProducts;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
