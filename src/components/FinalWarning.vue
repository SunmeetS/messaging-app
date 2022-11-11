<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="transparent">
    <div class="mainDivSendMessage">
      <div>
        <p>
          You are about to send the message to alot of people, Please make
          <br />
          sure the message is correct.
        </p>
      </div>
      <div class="templatePreviewSendMessage">
        <h2>Template Preview</h2>
        <h5>{{ preview }}</h5>
      </div>

      <div class="btnDiv">
        <button @click="emit('clickedOutside')" class="close">Close</button>

        <button
          @click="emit('clickedOutside')"
          :onclick="submitData"
          class="send"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import Axios from "axios";
import { compile, parse as customTemplateParse } from "./customTemp";
import type { Toast } from "vue-dk-toast";
const toast = inject<Toast>("$toast");

const preview = sessionStorage.getItem("preview")!;
let content: Array<Object> = JSON.parse(sessionStorage.getItem("content")!);
const emit = defineEmits(["clickedOutside"]);
let finalTemplate = sessionStorage.getItem("finalTemplate")!;
let batchNumber = ref(0);

let arr: Array<object>;
setTimeout(() => {
  console.log(batchNumber.value);
  arr = content.map((obj) => ({
    message: compile(customTemplateParse(finalTemplate))(obj),
    phoneNumber: compile(customTemplateParse("{{PhoneNumber}}"))(obj),
  }));
}, 100);

content.shift();

let submitData = async () => {
  await Axios({
    url: "http://localhost:3000/",
    method: "post",
    data: {
      arr,
    },
  }).then((res) => {
    {
      console.log(res.data);
      toast!(res.data.message, {
        duration: 2900,
        styles: {
          marginLeft: 2 + "rem",
          marginTop: -0.5 + "rem",
          width: 27 + "rem",
          padding: 1 + "rem",
          fontWeight: "900",
          fontSize: 1.5 + "rem",
        },
        class: "huge",
        type: (res.data.message as string).includes("failed")
          ? "error"
          : "success",
        positionX: "center",
        positionY: "top",
        disableClick: true,
      });
    }
    console.log(res);
  });

  await Axios.get("http://localhost:3000/temporaryprocessqueue");
};
</script>

<style>
.warning {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 2rem;
  width: fit-content;
}

.mainDivSendMessage:nth-child(1) {
  color: #d2d2d2 !important;
  font-weight: 900 !important;
}

.transparent {
  background-color: #000000d8 !important;
  min-width: 120vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -0.5rem;
  left: -10vw;
}

.warning span {
  font-size: 1.5rem;
}

.mainDivSendMessage {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  width: 350px;
  height: 500px;
  background: #202225;
  box-shadow: 0.1rem 0.2rem 0.2rem black;
  border-radius: 1rem;
  padding: 0rem 1rem;
}

.mainDivSendMessage > * {
  margin: 0.5rem;
}

.close {
  font-weight: 600;
  padding: 0.5rem 2rem;
  transition: all 0.2s ease-out;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  border: 3px solid rgba(255, 56, 56, 0.815);
  color: rgb(255, 56, 56, 0.815);
  transition: 0.3s all;
}

.close:hover {
  background: rgb(255, 56, 56, 0.815);
  color: white;
}

.btnDiv > * {
  margin: 1rem;
  font-weight: 900 !important;
}

.send {
  font-weight: 600;
  padding: 0.5rem 2rem;
  transition: all 0.2s ease-out;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: #f3f3f3;
  transition: 0.3s all;
  border: 3px solid #41ce00 !important;
}

.send:hover {
  background: #41ce00;
}

.close:hover,
.send:hover {
  box-shadow: 0rem 0.1rem 0.2rem rgb(232, 232, 232);
  transition: 0.3s all;
}

.close:active {
  box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.2);
  background-color: rgb(251, 167, 167) !important;
}

.templatePreviewSendMessage {
  border: 1.5px solid rgb(18, 18, 20);
  padding: 0.5rem;
  border-radius: 1rem;
  max-width: fit-content;
  background-color: rgb(255, 255, 255);
  color: black;
}

.templatePreviewSendMessage h3 {
  text-decoration: underline;
  color: rgb(79, 52, 52);
  font-weight: 500;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .mainDivSendMessage {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    width: fit-content;
    max-width: 80%;
    height: fit-content;
    max-height: 80%;
    box-shadow: 0.1rem 0.2rem 0.2rem black;
    border: 1.5px solid black;
  }
}
</style>
