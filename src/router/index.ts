import { createRouter, createWebHistory } from "vue-router";
import LogoutVue from "@/components/LogOut.vue";
import LoginPageVue from "@/components/LoginPage.vue";
import NavigatePageVue from "@/components/NavigatePage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LoginPageVue,
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutVue,
    },
    {
      path: "/customerMessagingSystem",
      name: "customerMessagingSystem",
      component: () => import("../components/CustomerMessagingSystem.vue"),
    },
  ],
});

export default router;
