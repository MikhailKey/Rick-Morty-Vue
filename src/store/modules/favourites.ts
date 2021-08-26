import {
  ADD_TO_FAVOURITES,
  CHANGE_ERROR,
  CHANGE_LOADING,
  FAVOURITES,
  FAVOURITES_IDS,
  FILTER_FAVOURITES,
  GET_FAVOURITES,
  GET_FAVOURITES_IDS,
  LOAD_FAVOURITES_LIST,
  REMOVE_FROM_FAVOURITES,
  UPDATE_FAVOURITES,
  UPDATE_FAVOURITES_FROM_STORE,
} from "@/store/types";
import { Character } from "@/services/ApiService/Interfaces/Character";
import { Module } from "vuex";
import axiosInstance from "@/services/ApiService/defaults";

interface State {
  favourites: Character[];
  favouritesIds: number[];
}

export const favourites: Module<State, any> = {
  state: () => ({
    favouritesIds: [],
    favourites: [],
  }),
  getters: {
    [FAVOURITES_IDS]: (state) => state.favouritesIds,
    [FAVOURITES]: (state) => state.favourites,
  },
  actions: {
    [GET_FAVOURITES_IDS]({ commit }) {
      const favourites =
        JSON.parse(localStorage.getItem("favouritesIds") as string) || [];
      commit(UPDATE_FAVOURITES_FROM_STORE, favourites as number[]);
    },
    [ADD_TO_FAVOURITES]({ commit }, id: number) {
      commit(UPDATE_FAVOURITES, id);
    },
    [REMOVE_FROM_FAVOURITES]({ commit }, id: number) {
      commit(FILTER_FAVOURITES, id);
    },
    async [GET_FAVOURITES]({ commit, state }) {
      commit(CHANGE_LOADING, true);
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
  },
};
