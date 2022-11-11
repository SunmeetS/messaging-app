import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";
import "vue3-easy-data-table/dist/style.css";
import DKToast from "vue-dk-toast";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'


library.add(faUserSecret, fab, fas );

const pinia = createPinia();

import Vue3EasyDataTable from "vue3-easy-data-table";

loadFonts();
const app = createApp(App);
app.use(router).use(vuetify).mount("#app");
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);

app.component("EasyDataTable", Vue3EasyDataTable);
app.use(vue3GoogleLogin, {
  clientId:
    "1088220316742-efl0g9p5836c60312v3f6694v7igh0rb.apps.googleusercontent.com",
});

app.use(DKToast);
