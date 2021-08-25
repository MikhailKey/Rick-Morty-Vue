import { createStore } from "vuex";
import axiosInstance from "@/services/ApiService/defaults";
import { CHARACTERS, ERROR, FAVOURITES_IDS, LOADING, PAGE, PAGES_COUNT, SEARCH_VALUE, SPECIES, FAVOURITES, 
//actions,
ADD_TO_FAVOURITES, GET_CHARACTERS, GET_PAGE, GET_SEARCH_VALUE, GET_SPECIES, GET_URL_PARAMS, GET_FAVOURITES_IDS, REMOVE_FROM_FAVOURITES, GET_FAVOURITES, 
//mutations
CHANGE_ERROR, CHANGE_LOADING, FILTER_FAVOURITES, UPDATE_CHARACTERS, UPDATE_FAVOURITES, UPDATE_PAGE, UPDATE_PAGES_COUNT, UPDATE_SEARCH_VALUE, UPDATE_SPECIES, UPDATE_URL_PARAMS, UPDATE_FAVOURITES_FROM_STORE, LOAD_FAVOURITES_LIST, } from "@/store/types";
// define injection key
export const key = Symbol();
export const store = createStore({
    state: {
        loading: false,
        error: "",
        params: {
            name: "",
            species: "All",
        },
        page: 1,
        pagesCount: 0,
        characters: [],
        favouritesIds: [],
        favourites: [],
    },
    getters: {
        [ERROR]: (state) => state.error,
        [LOADING]: (state) => state.loading,
        [CHARACTERS]: (state) => state.characters,
        [SPECIES]: (state) => state.params.species,
        [SEARCH_VALUE]: (state) => state.params.name,
        [PAGES_COUNT]: (state) => state.pagesCount,
        [PAGE]: (state) => state.page,
        [FAVOURITES_IDS]: (state) => state.favouritesIds,
        [FAVOURITES]: (state) => state.favourites,
    },
    actions: {
        async [GET_CHARACTERS]({ commit }, params) {
            params.species = params.species === "All" ? "" : params.species;
            commit(CHANGE_LOADING, true);
            await axiosInstance
                .get("/", {
                params,
            })
                .then((res) => {
                commit(CHANGE_ERROR, "");
                commit(CHANGE_LOADING, false);
                commit(UPDATE_CHARACTERS, res.data.results);
                commit(UPDATE_PAGES_COUNT, res.data.info.pages);
            })
                .catch(() => {
                commit(CHANGE_LOADING, false);
                commit(CHANGE_ERROR, "There is nothing here");
            });
        },
        [GET_PAGE]({ commit, dispatch, state }, page = null) {
            commit(UPDATE_PAGE, page);
            dispatch(GET_CHARACTERS, {
                name: state.params.name,
                species: state.params.species,
                page,
            });
        },
        [GET_SEARCH_VALUE]({ commit, dispatch, state }, name = "") {
            commit(UPDATE_SEARCH_VALUE, name);
            dispatch(GET_CHARACTERS, {
                name,
                species: state.params.species,
                page: state.page,
            });
        },
        [GET_SPECIES]({ commit, dispatch, state }, species = "") {
            commit(UPDATE_SPECIES, species);
            dispatch(GET_CHARACTERS, {
                name: state.params.name,
                species,
                page: state.page,
            });
        },
        [GET_URL_PARAMS]({ commit }, params) {
            commit(UPDATE_URL_PARAMS, params);
        },
        [ADD_TO_FAVOURITES]({ commit }, id) {
            commit(UPDATE_FAVOURITES, id);
        },
        [REMOVE_FROM_FAVOURITES]({ commit }, id) {
            commit(FILTER_FAVOURITES, id);
        },
        [GET_FAVOURITES_IDS]({ commit }) {
            const favourites = JSON.parse(localStorage.getItem("favouritesIds")) || [];
            commit(UPDATE_FAVOURITES_FROM_STORE, favourites);
        },
        async [GET_FAVOURITES]({ commit, state }) {
            if (state.favouritesIds.length) {
                axiosInstance
                    .get(`/${state.favouritesIds.join(",")}`)
                    .then((res) => {
                    commit(CHANGE_ERROR, "");
                    commit(CHANGE_LOADING, false);
                    if (!res.data.length) {
                        commit(LOAD_FAVOURITES_LIST, [res.data]);
                    }
                    else {
                        commit(LOAD_FAVOURITES_LIST, res.data);
                    }
                })
                    .catch(() => {
                    commit(CHANGE_LOADING, false);
                    commit(CHANGE_ERROR, "There is nothing here");
                });
            }
            else {
                commit(LOAD_FAVOURITES_LIST, []);
            }
        },
    },
    mutations: {
        [LOAD_FAVOURITES_LIST](state, favourites) {
            state.favourites = favourites;
        },
        [UPDATE_FAVOURITES_FROM_STORE](state, favouritesIds) {
            state.favouritesIds = favouritesIds;
        },
        [FILTER_FAVOURITES](state, id) {
            state.favouritesIds = state.favouritesIds.filter((item) => item !== id);
            state.favourites = state.favourites.filter((item) => item.id !== id);
            localStorage.setItem("favouritesIds", JSON.stringify(state.favouritesIds));
        },
        [UPDATE_FAVOURITES](state, id) {
            state.favouritesIds.push(id);
            localStorage.setItem("favouritesIds", JSON.stringify(state.favouritesIds));
        },
        [UPDATE_URL_PARAMS](state, params) {
            state.page = Number(params.page || 1);
            state.params.name = params.name || "";
            state.params.species = params.species || "All";
        },
        [UPDATE_CHARACTERS](state, characters) {
            state.characters = characters;
        },
        [UPDATE_PAGES_COUNT](state, count) {
            state.pagesCount = count;
        },
        [UPDATE_PAGE](state, page) {
            state.page = page;
        },
        [UPDATE_SEARCH_VALUE](state, value) {
            state.params.name = value;
        },
        [UPDATE_SPECIES](state, species) {
            state.params.species = species;
        },
        [CHANGE_LOADING](state, value) {
            state.loading = value;
        },
        [CHANGE_ERROR](state, error) {
            state.error = error;
        },
    },
});
//# sourceMappingURL=index.js.map