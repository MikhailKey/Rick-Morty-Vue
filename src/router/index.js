import { createRouter, createWebHashHistory } from "vue-router";
import CharactersList from "@/views/CharactersPage/CharactersPage.vue";
import CharactersFavorite from "@/views/CharactersFavorite/CharactersFavorite.vue";
const routes = [
    {
        path: "/",
        name: "Characters",
        component: CharactersList,
    },
    {
        path: "/about",
        name: "Favourites",
        component: CharactersFavorite,
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
//# sourceMappingURL=index.js.map