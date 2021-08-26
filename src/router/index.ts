import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CharactersList from "@/views/CharactersPage/CharactersPage.vue";
import CharactersFavorite from "@/views/CharactersFavorite/CharactersFavorite.vue";
import CharacterDetail from "@/views/CharacterDetail/CharacterDetail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Characters",
    component: CharactersList,
  },
  {
    path: "/:id",
    name: "CharacterDetail",
    component: CharacterDetail,
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: CharactersFavorite,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
