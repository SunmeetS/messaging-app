<template>
    <Table />
</template>

<script setup lang="ts">
import { useStore } from "@/store/useStore";
import { storeToRefs } from "pinia";
import { inject, onMounted, onUpdated, ref, watchEffect } from "vue";
import Table from "./Table.vue";

// let store = useStore();
// let { content } = storeToRefs(store)
// let data = content._rawValue
// // let headings = data[0]
// console.log(data);


// onMounted(() => {
//     console.log('mounted')
//     for (let i = 0; i < headings.length; i++) {
//         let obj = { text: "", value: "" };
//         // console.log(data[0][i])
//         obj["text"] = data[0][i]
//         obj["value"] = data[0][i];

//         data[0].splice(i, 1, obj)
//     }
// })

//    console.log("Heading  : ",headings)

//     for(let i = 0; i<headings.length; i++){
//         let obj = {text:"", value: ""};
//       obj["text"] = data[0][i]
//       obj["value"] = data[0][i];      
//       data[0].splice(i, 1, obj)
// }
// let body = document.querySelector('body')
// let table = document.createElement("table")
// let head = document.createElement("thead")
// let tbody = document.createElement("tbody")
// let row = document.createElement("tr");

// body.appendChild(table).appendChild(head).appendChild(row)
// console.log(data)

// data[0].forEach((ele: string)=>{

//     let heading = document.createElement("th")
//     let space = document.createElement("&nbsp")
//     heading.innerText = ele
//     row.appendChild(heading)

// })
// data.shift()
// console.log("Not Heading ",data[0]);

// data.forEach(()=>{

// })

</script>

<style>

</style>