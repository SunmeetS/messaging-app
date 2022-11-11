<template>
  <div class="mainLogin">
    <div class="pleaseSignIn">
      <p>Please Sign In to Continue:</p>
    </div>
    <div class="card">
      <div class="card-body">
        <GoogleLogin @click="event($event)" :callback="callback" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "../router";
import { decodeCredential, googleLogout } from "vue3-google-login";

var user: any;
let userName = localStorage.getItem("userName");

function event(e: Event) {
  console.log(e);
}

const callback = (response: any) => {
  user = response;
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response);
  const userData: any = decodeCredential(response.credential);
  console.log("Handle the userData", userData.hd);
  if (userData.hd != "kinaracapital.com") {
    googleLogout();
    user = "";
  }
  user = userData.given_name;
  localStorage.setItem("userName", user);
  router.push("customerMessagingSystem");
};

if (userName != "") router.push("customerMessagingSystem");
</script>

<style>
body {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2f3136 !important;
}

.card {
  border: none;
  background-color: black;
  display: flex;
  justify-content: center;
  width: 98vw;
  border-radius: 50rem;
  height: 10vh;
}

.card-body {
  display: flex;
  justify-content: center;
  padding: 1rem 0rem;
}

.mainLogin {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  flex-direction: column;
  margin-bottom: 4rem;
}

.mainLogin > * {
  margin-bottom: 0.8rem;
}

.pleaseSignIn {
  display: flex;
  width: 100vw;
  justify-content: center;
}

.mainLogin p {
  font-size: 1.2rem;
  color: white;
  text-align: center;
  letter-spacing: 0.1rem;
  border-bottom: 2px solid white;
  width: fit-content;
}
</style>
