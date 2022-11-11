import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("dataStore", () => {
  const content = ref();
  const finalTemplate = ref();
  const userName = ref();
  return { content, finalTemplate, userName };
});
