<template>
  <div style="margin: 5rem">
    <EasyDataTable :headers="headers" :items="items" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store/useStore";
import { defineComponent, onBeforeMount, onMounted } from "vue";
import { storeToRefs } from "pinia";
import type { Header, Item } from "vue3-easy-data-table";

let store = useStore();
let { content } = storeToRefs(store);
if (content.value)
  localStorage.setItem("content", JSON.stringify(content.value));

let Content = JSON.parse(localStorage.getItem("content")!);

let data = Content;
let headings: Object[] = data == undefined ? "" : data[0];

const headers: Object[] = headings;

const items: Item[] = data.slice(1);
</script>
