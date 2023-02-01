<template>
  <div>
    <label class="font-bold uppercase" :for="name">{{ name }}</label>
    <p>
      {{ value }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  value: string | number;
}>();
</script>

<style scoped></style>
