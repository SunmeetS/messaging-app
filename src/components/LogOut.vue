<template>
  <div class="mainDivLogout">
    <div class="main">
      <div class="logout">You have been Succesfully Logged Out.</div>
    </div>
    <NavigatePage position="absolute" top="5%" left="90%"> Login </NavigatePage>
  </div>
</template>

<script setup lang="ts">
import { googleLogout } from "vue3-google-login";
import NavigatePage from "./NavigatePage.vue";
googleLogout();
localStorage.setItem("userName", "");

console.log("userName is: ", localStorage.getItem("userName"));
</script>

<style>
.main {
  width: 350px;
  height: 500px;
  background-color: #202225 !important;
  overflow: hidden;
  background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38")
    no-repeat center/ cover;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mainDivLogout {
  height: 100vh;
  width: 100vw;
  background-color: #2f3136;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logout {
  background-color: rgb(255, 255, 255);
  font-weight: 600;
  border-radius: 1rem;
  padding: 1rem;
}
</style>
