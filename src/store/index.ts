import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import axiosInstance from "@/services/ApiService/defaults";
import { Character } from "@/services/ApiService/Interfaces/Character";
import { CharacterResponse } from "@/services/ApiService/Interfaces/CharacterResponse";
import { favourites } from "@/store/modules/favourites";
import { filters } from "@/store/modules/filters";
import {
  //getters
  CHARACTER,
  CHARACTERS,
  ERROR,
  LOADING,
  //actions,
  GET_CHARACTERS,
  GET_CHARACTER,
  //mutations
  CHANGE_ERROR,
  CHANGE_LOADING,
  UPDATE_CHARACTERS,
  UPDATE_PAGES_COUNT,
  UPDATE_CHARACTER,
} from "@/store/types";

// define your typings for the store state
interface State {
  loading: boolean;
  error: string;
  characters: Character[];
  character: Character | null;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    favourites,
    filters,
  },
  state: {
    loading: false,
    error: "",
    characters: [],
    character: null,
  },
  getters: {
    [ERROR]: (state) => state.error,
    [LOADING]: (state) => state.loading,
    [CHARACTERS]: (state) => state.characters,
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
    async [GET_CHARACTER]({ commit }, id: number) {
      commit(CHANGE_LOADING, true);
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
  },
  mutations: {
    [UPDATE_CHARACTER](state, character) {
      state.character = character;
    },
    [UPDATE_CHARACTERS](state, characters: Character[]) {
      state.characters = characters;
    },
    [CHANGE_LOADING](state, value: boolean) {
      state.loading = value;
    },
    [CHANGE_ERROR](state, error: string) {
      state.error = error;
    },
  },
});
