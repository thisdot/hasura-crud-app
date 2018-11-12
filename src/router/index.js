import Vue from "vue";
import Router from "vue-router";
import store from "./../store";
import { authService } from "./../services/AuthService";

import Home from "./../home/Home.vue";
import Callback from "./../auth/Callback.vue";
import RecipeList from "./../recipes/RecipeList.vue";
import CreateOrEditRecipe from "./../recipes/CreateOrEditRecipe.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback
    },
    {
      path: "/recipes",
      name: "recipes",
      component: RecipeList,
      children: [
        {
          path: "/:recipeId",
          name: "editRecipe",
          component: CreateOrEditRecipe
        }
      ]
    },
    // otherwise redirect to home
    { path: "*", redirect: "/" }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/", "/home", "/callback"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters["account/getUser"];
  
  if (authRequired && !loggedIn) {
    authService.setReturnUrl(to.fullPath);
    store.dispatch("account/login");
  }

  next();
});
