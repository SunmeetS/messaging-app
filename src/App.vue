<script setup lang="ts">
import { ref, provide } from "vue";
import { RouterView } from "vue-router";

let data = ref();
function updateData(content: any) {
  data.value = content;
}

provide("data", {
  data,
  updateData,
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
