import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/testPaperOne",
    name: "TestPaper",
    component: () => import("../views/TestPaperOne.vue")
  }
];

const router = new VueRouter({
  base: "/coco/",
  mode: "history",
  routes
});

export default router;
