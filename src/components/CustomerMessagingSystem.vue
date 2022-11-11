<template>
  <div class="mainDiv">
    <div class="header">
      <div class="subHeader">
        <div class="inputGroupOnePage2">
          <div class="inputRadioGroup">
            <input
              v-model="sendingMedium"
              class="input"
              type="checkbox"
              id="sms"
              value="sms"
            />
            <label class="fa" for="sms">
              <font-awesome-icon icon="fa-solid fa-comment-sms" />
            </label>
          </div>
          <div class="inputRadioGroup">
            <input
              v-model="sendingMedium"
              class="input"
              type="checkbox"
              id="whatsapp"
              value="whatsapp"
            />
            <label class="fa" for="whatsapp">
              <font-awesome-icon icon="fa-brands fa-whatsapp" />
            </label>
          </div>
        </div>
        <div style="display: flex; alignitems: center">
          <button
            class="btn uploadButton"
            onclick="document.querySelector('.csvUploader').click()"
          >
            Upload a CSV File
          </button>
        </div>
        <NavigatePage> Logout </NavigatePage>
      </div>
      <input
        id="csvUploader"
        name="csvUploader"
        v-show="false"
        placeholder="hello"
        ref="inputFile"
        @change="Check($event)"
        class="csvUploader"
        type="file"
        accept=".csv"
      />
    </div>
    <div class="container">
      <div class="templateDivOnePage2">
        <div class="template">
          <p>Preview Template:</p>
          <h3>{{ finalTemplate }}</h3>
        </div>
        <div class="template">
          <p>Show Template:</p>
          <h3>{{ preview }}</h3>
        </div>
      </div>

      <div class="selectTemplate">
        <select
          class="smsTemplate"
          :disabled="!showSmsTemplates"
          @click="handleSmsTemplates($event)"
          name="templates"
          id="templates"
        >
          <option value="">Please select a SMS template</option>
          <option v-for="(key, value) in smsTemplateObj" v-bind:key="key">
            {{ value }}
          </option>
        </select>
        <select
          class="whatsappTemplate"
          :disabled="!showWhatsappTemplates"
          @click="handleWhatsappTemplates($event)"
          name="templates"
          id="templates"
        >
          <option value="">Please select a Whatsapp template</option>
          <option v-for="(key, value) in whatsappTemplateObj" v-bind:key="key">
            {{ value }}
          </option>
        </select>
        <button @click="showWarning = true" class="sendMessage">
          Send Message
        </button>
        <FinalWarning
          v-if="showWarning"
          @clicked-outside="showWarning = false"
        />
      </div>
    </div>
    <div class="footer">
      <h2 class="footer">Customer Messaging System</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { parse } from "./util";
import NavigatePage from "./NavigatePage.vue";
import { compile } from "./customTemp";
import { parse as customTemplateParse } from "./customTemp";
import { useStore } from "../store/useStore";
import { storeToRefs } from "pinia";
import router from "../router";
import { inject, onMounted } from "vue";
import type { Toast } from "vue-dk-toast";
import FinalWarning from "./FinalWarning.vue";

let sendingMedium = ref([]);
let showSmsTemplates = ref(false);
let showWhatsappTemplates = ref(false);
let preview = ref("Please select a Template");
const showWarning = ref(false);

let userName = localStorage.getItem("userName");

let inputFile = ref<HTMLInputElement | null>(null);
let fileUploaded = ref(true);

onMounted(() => {
  inputFile.value!.focus();
});

const store = useStore();
let { content, finalTemplate } = storeToRefs(store);
finalTemplate.value = "Please select a Template ";

let whatsappTemplateObj = reactive<Record<string, string>>({
  "Happy Birthday": "Hello {{Name}}, We wish you a very happy birthday today.",
  "Ganesh Chaturthi":
    "Hello {{Name}}, We wish you a very happy ganesh chaturthi.",
});

let smsTemplateObj = reactive<Record<string, string>>({
  "Loan Payment":
    "Hello {{Name}}, Your Loan of Loan Number {{LoanNumber}} is Pending for Date: {{LoanDate}}",
});

let handleWhatsappTemplates = (e: Event) => {
  if (content.value) var obj = content.value[1];

  console.log(
    compile(
      customTemplateParse(
        whatsappTemplateObj[(e.target as HTMLInputElement)!.value]
      )
    )(obj)
  );

  compile(
    customTemplateParse(
      whatsappTemplateObj[(e.target as HTMLInputElement)!.value]
    )
  )(obj) != ""
    ? (preview.value = compile(
        customTemplateParse(
          whatsappTemplateObj[(e.target as HTMLInputElement)!.value]
        )
      )(obj))
    : (preview.value = "Please select a Template");
  sessionStorage.setItem("preview", preview.value);

  finalTemplate.value =
    whatsappTemplateObj[(e.target as HTMLInputElement)!.value] != undefined
      ? whatsappTemplateObj[(e.target as HTMLInputElement)!.value]
      : "Please select a Template";
  sessionStorage.setItem("finalTemplate", finalTemplate.value);
  inputFile.value;
};

let handleSmsTemplates = (e: Event) => {
  if (content.value) var obj = content.value[1];

  console.log(
    compile(
      customTemplateParse(smsTemplateObj[(e.target as HTMLInputElement)!.value])
    )(obj)
  );

  compile(
    customTemplateParse(smsTemplateObj[(e.target as HTMLInputElement)!.value])
  )(obj) != ""
    ? (preview.value = compile(
        customTemplateParse(
          smsTemplateObj[(e.target as HTMLInputElement)!.value]
        )
      )(obj))
    : (preview.value = "Please select a Template");
  sessionStorage.setItem("preview", preview.value);

  finalTemplate.value =
    smsTemplateObj[(e.target as HTMLInputElement)!.value] != undefined
      ? smsTemplateObj[(e.target as HTMLInputElement)!.value]
      : "Please select a Template";
  sessionStorage.setItem("finalTemplate", finalTemplate.value);
  console.log(
    "Final template: ",
    finalTemplate.value,
    "templateObj[(e.target as HTMLInputElement)!.value]: ",
    smsTemplateObj[(e.target as HTMLInputElement)!.value]
  );

  inputFile.value;
};

const toast = inject<Toast>("$toast");

let Check = async (e: Event) => {
  parse(e, (result: object) => {
    content.value = result;
    console.log(content.value);
    if (content.value) {
      sessionStorage.setItem("content", JSON.stringify(content.value));
      fileUploaded.value = false;
    }
    console.log("content: ", fileUploaded.value);
  });

  toast!("CSV File Uploaded", {
    duration: 2900,
    styles: {
      marginLeft: 6 + "rem",
      marginTop: -0.5 + "rem",
      width: 17 + "rem",
      padding: 1 + "rem",
      fontWeight: "900",
      fontSize: 1.5 + "rem",
    },
    class: "huge",
    type: "success",
    positionX: "center",
    positionY: "top",
    disableClick: true,
  });

  handleMedium();
};

if (userName == "") router.push("/");

let handleMedium = () => {
  if (fileUploaded.value && (sendingMedium.value as string[]).includes("sms")) {
    showSmsTemplates.value = true;
  }
  if (
    fileUploaded.value &&
    (sendingMedium.value as string[]).includes("whatsapp")
  ) {
    showWhatsappTemplates.value = true;
  }
};
</script>

<style>
@charset "utf-8";
/*Button
  -----------------*/

.mainDiv {
  height: 100vh;
  width: 100vw;
  background: #202225;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container {
  border-radius: 1rem;
  text-align: center;
  color: #d2d2d2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50%;
  width: 100vw;
}

.container > * {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 50%;
  justify-content: center;
}

* {
  font-family: "Rubik", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
}

.footer {
  display: flex;
  height: 10%;
  justify-content: center;
  color: #d2d2d2;
}

select {
  border-radius: 0.5rem;
  outline: none;
  font-weight: 900;
  color: white;
  padding: 0.5rem;
  appearance: button;
  cursor: pointer;
  text-align: center;
  appearance: button;
}

.fa {
  font-size: 1.5rem;
}

.uploadButton {
  height: min-content;
}

.sendMessage:hover,
.uploadButton:hover {
  transition: all 0.2s;
  box-shadow: 0.05rem 0.2rem 0.1rem rgb(0, 0, 0, 0.8);
  background-color: #48c78e;
  color: white;
  transition: all 0.5s;
}

.sendMessage:active,
.uploadButton:active {
  box-shadow: 0 2px 1px white;
  background-color: #48c78e;
  color: white;
}

.subHeader {
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  background: #2f3136;
  height: 80%;
}

.inputGroupOnePage2 > * {
  width: 8rem;
  text-align: center;
  cursor: pointer;
}

.inputGroupOnePage2 {
  display: flex;
}

.inputRadioGroup:hover {
  background-color: #13181cdb;
  color: #64ca9c;
  transition: all 0.4s;
  border-bottom: 0.1rem solid #48c78e;
  margin-bottom: 0.5rem;
}

.inputRadioGroup > * {
  margin: 0rem 0.5rem;
  cursor: pointer;
}

.input {
  width: 15px;
  height: 40px;
}

.inputRadioGroup {
  margin: 0rem 0.5rem;
  font-weight: 600;
  color: #48c78e;
  border-radius: 20rem;
  padding: 0.5rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.1rem solid transparent;
  transition: 0.5s all;
}

.subHeader {
  font-size: 1.5rem;
}

.inputRadioGroup > * {
  font-size: 2.5rem;
}

.uploadButton {
  border-radius: 0.5rem;
  padding: 0.4rem;
  transition: all 0.2s;
  box-shadow: 0.05rem 0.2rem 0.1rem transparent;
  transition: all 0.5s;
}

.selectTemplate > * {
  border-radius: 0.5rem;
  padding: 0.4rem;
  transition: all 0.5s;
  font-weight: 600;
  margin: 0.5rem;
  border: 2px solid #d2d2d2;
  color: #000000;
  cursor: pointer;
  background: #d2d2d2;
}

.selectTemplate > *:hover {
  background: #202225;
  color: #d2d2d2;
}

.uploadButton {
  font-weight: 600;
  margin: 0.5rem;
  border: 3.5px solid #48c78e;
  color: #48c78e;
}

.templateDivOnePage2 h3::-webkit-scrollbar {
  display: none;
}

.templateDivOnePage2 {
  border-right: 2px solid #d0faff43;
}

.template {
  font-weight: 900;
  margin: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 40%;
  text-align: left;
}

.template h3 {
  margin-top: 1rem;
}

.template p {
  border-bottom: 1px solid #d2d2d2;
  padding: 0rem;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .inputRadioGroup > * {
    font-size: 1.5rem;
  }

  .inputRadioGroup {
    width: fit-content;
  }

  .uploadButton {
    font-size: 1rem;
  }

  .subHeader {
    flex-wrap: nowrap;
  }

  .selectTemplate > *,
  .selectTemplate > *:hover {
    width: 35vw;
    line-break: loose;
    height: fit-content;
    margin: 2rem 0rem;
  }

  .template > * {
    font-size: 0.8rem;
    width: 30vw;
  }

  .template {
    margin: 2rem 0rem;
  }
}
</style>
