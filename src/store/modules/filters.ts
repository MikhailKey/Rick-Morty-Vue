import { Module } from "vuex";
import {
  GET_CHARACTERS,
  GET_PAGE,
  GET_SEARCH_VALUE,
  GET_SPECIES,
  GET_URL_PARAMS,
  PAGE,
  PAGES_COUNT,
  SEARCH_VALUE,
  SPECIES,
  UPDATE_PAGE,
  UPDATE_PAGES_COUNT,
  UPDATE_SEARCH_VALUE,
  UPDATE_SPECIES,
  UPDATE_URL_PARAMS,
} from "@/store/types";

interface State {
  page: number;
  pagesCount: number;
  params: {
    name: string;
    species: string;
  };
}
export const filters: Module<State, any> = {
  state: () => ({
    page: 1,
    pagesCount: 0,
    params: {
      name: "",
      species: "All",
    },
  }),
  getters: {
    [SPECIES]: (state) => state.params.species,
    [SEARCH_VALUE]: (state) => state.params.name,
    [PAGES_COUNT]: (state) => state.pagesCount,
    [PAGE]: (state) => state.page,
  },
  actions: {
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
  },
  mutations: {
    [UPDATE_URL_PARAMS](state, params) {
      state.page = Number(params.page || 1);
      state.params.name = params.name || "";
      state.params.species = params.species || "All";
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
  },
};
