import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import axiosInstance from "@/services/ApiService/defaults";
import { Character } from "@/services/ApiService/Interfaces/Character";
import { CharacterResponse } from "@/services/ApiService/Interfaces/CharacterResponse";
import {
  //getters
  CHARACTER,
  CHARACTERS,
  ERROR,
  FAVOURITES_IDS,
  LOADING,
  PAGE,
  PAGES_COUNT,
  SEARCH_VALUE,
  SPECIES,
  FAVOURITES,
  //actions,
  ADD_TO_FAVOURITES,
  GET_CHARACTERS,
  GET_PAGE,
  GET_SEARCH_VALUE,
  GET_SPECIES,
  GET_URL_PARAMS,
  GET_FAVOURITES_IDS,
  REMOVE_FROM_FAVOURITES,
  GET_FAVOURITES,
  GET_CHARACTER,
  //mutations
  CHANGE_ERROR,
  CHANGE_LOADING,
  FILTER_FAVOURITES,
  UPDATE_CHARACTERS,
  UPDATE_FAVOURITES,
  UPDATE_PAGE,
  UPDATE_PAGES_COUNT,
  UPDATE_SEARCH_VALUE,
  UPDATE_SPECIES,
  UPDATE_URL_PARAMS,
  UPDATE_FAVOURITES_FROM_STORE,
  LOAD_FAVOURITES_LIST,
  UPDATE_CHARACTER,
} from "@/store/types";

// define your typings for the store state
export interface State {
  loading: boolean;
  error: string;
  page: number;
  pagesCount: number;
  characters: Character[];
  favourites: Character[];
  favouritesIds: number[];
  character: Character | null;
  params: {
    name: string;
    species: string;
  };
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
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
    character: null,
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
    [CHARACTER]: (state) => state.character,
  },
  actions: {
    async [GET_CHARACTERS]({ commit }, params) {
      params.species = params.species === "All" ? "" : params.species;
      commit(CHANGE_LOADING, true);
      await axiosInstance
        .get<CharacterResponse>("/", {
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
    [ADD_TO_FAVOURITES]({ commit }, id: number) {
      commit(UPDATE_FAVOURITES, id);
    },
    [REMOVE_FROM_FAVOURITES]({ commit }, id: number) {
      commit(FILTER_FAVOURITES, id);
    },
    [GET_FAVOURITES_IDS]({ commit }) {
      const favourites =
        JSON.parse(localStorage.getItem("favouritesIds") as string) || [];
      commit(UPDATE_FAVOURITES_FROM_STORE, favourites as number[]);
    },
    async [GET_CHARACTER]({ commit }, id: number) {
      await axiosInstance
        .get<Character>(`/${id}`)
        .then((res) => {
          commit(CHANGE_ERROR, "");
          commit(CHANGE_LOADING, false);
          commit(UPDATE_CHARACTER, res.data);
        })
        .catch(() => {
          commit(CHANGE_LOADING, false);
          commit(CHANGE_ERROR, "There is nothing here");
        });
    },
    async [GET_FAVOURITES]({ commit, state }) {
      if (state.favouritesIds.length) {
        await axiosInstance
          .get<Character[]>(`/${state.favouritesIds.join(",")}`)
          .then((res) => {
            commit(CHANGE_ERROR, "");
            commit(CHANGE_LOADING, false);
            if (!res.data.length) {
              commit(LOAD_FAVOURITES_LIST, [res.data]);
            } else {
              commit(LOAD_FAVOURITES_LIST, res.data);
            }
          })
          .catch(() => {
            commit(CHANGE_LOADING, false);
            commit(CHANGE_ERROR, "There is nothing here");
          });
      } else {
        commit(LOAD_FAVOURITES_LIST, []);
      }
    },
  },
  mutations: {
    [LOAD_FAVOURITES_LIST](state, favourites: Character[]) {
      state.favourites = favourites;
    },
    [UPDATE_CHARACTER](state, character) {
      state.character = character;
    },
    [UPDATE_FAVOURITES_FROM_STORE](state, favouritesIds: number[]) {
      state.favouritesIds = favouritesIds;
    },
    [FILTER_FAVOURITES](state, id: number) {
      state.favouritesIds = state.favouritesIds.filter((item) => item !== id);
      state.favourites = state.favourites.filter((item) => item.id !== id);
      localStorage.setItem(
        "favouritesIds",
        JSON.stringify(state.favouritesIds)
      );
    },
    [UPDATE_FAVOURITES](state, id: number) {
      state.favouritesIds.push(id);
      localStorage.setItem(
        "favouritesIds",
        JSON.stringify(state.favouritesIds)
      );
    },
    [UPDATE_URL_PARAMS](state, params) {
      state.page = Number(params.page || 1);
      state.params.name = params.name || "";
      state.params.species = params.species || "All";
    },
    [UPDATE_CHARACTERS](state, characters: Character[]) {
      state.characters = characters;
    },
    [UPDATE_PAGES_COUNT](state, count: number) {
      state.pagesCount = count;
    },
    [UPDATE_PAGE](state, page: number) {
      state.page = page;
    },
    [UPDATE_SEARCH_VALUE](state, value: string) {
      state.params.name = value;
    },
    [UPDATE_SPECIES](state, species: string) {
      state.params.species = species;
    },
    [CHANGE_LOADING](state, value: boolean) {
      state.loading = value;
    },
    [CHANGE_ERROR](state, error: string) {
      state.error = error;
    },
  },
});
