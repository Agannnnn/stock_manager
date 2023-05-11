import { createRouter, createWebHashHistory } from "vue-router";
import ItemsView from "./views/ItemsView.vue";
import TransactionsView from "./views/TransactionsView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: ItemsView, name: "items" },
    {
      path: "/transactions",
      component: TransactionsView,
      name: "transactions",
    },
  ],
});

export default router;
