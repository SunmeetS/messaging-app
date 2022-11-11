<template>
  <a
    :style="{ position: position, top: top, left: left }"
    @click="handleRouting"
    ref="button"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "../router";

let props = defineProps(["position", "top", "left"]);
let position = ref(props.position),
  left = ref(props.left),
  top = ref(props.top);

console.log(position);

let button = ref<HTMLInputElement | null>(null);

onMounted(() => {
  button.value!.focus();
});

let handleRouting = () => {
  if (button.value!.innerText === "Logout") {
    router.push(button.value!.innerText);
  } else {
    router.push("/");
  }
};
</script>

<style>
a {
  color: #48c78e;
  cursor: pointer;
  transition: 0.5s all;
  font-weight: 900;
  font-size: 1.2rem;
  border-bottom: 0.1rem solid transparent;
  text-align: center;
  background: #2f3136;
  padding: 0.7rem 1.2rem;
}

a:hover {
  transition: 0.5s all;
  border-bottom: 0.1rem solid #48c78e;
  text-align: center;
  background: #13181cdb;
  margin-bottom: 0.5rem;
  border-radius: 20rem;
}
</style>
