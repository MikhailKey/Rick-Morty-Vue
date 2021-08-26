<template>
  <div class="characters">
    <CharactersFilter />
    <Loader v-if="loading" />
    <div class="container" v-else>
      <div v-if="!error">
        <div class="characters-list">
          <CharacterCard
            v-for="character in characters"
            :key="character.id"
            :character="character"
          />
        </div>
        <Pagination
          @changePage="getPage"
          :max="pagesCount"
          :currentPage="page"
          :loading="loading"
        />
      </div>
      <div class="characters-list" v-else>{{ error }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import {
  CHARACTERS,
  PAGE,
  PAGES_COUNT,
  GET_CHARACTERS,
  GET_PAGE,
  ERROR,
  LOADING,
  SEARCH_VALUE,
  SPECIES,
  GET_URL_PARAMS,
  GET_FAVOURITES_IDS,
} from "@/store/types";
import Pagination from "@/components/Pagination/Pagination.vue";
import CharactersFilter from "@/views/CharactersPage/CharactersFilter/CharactersFilter.vue";
import CharacterCard from "@/components/CharacterCard/CharacterCard.vue";
import Loader from "@/components/Loader/Loader.vue";

export default defineComponent({
  name: "CharactersList",
  components: {
    CharactersFilter,
    CharacterCard,
    Pagination,
    Loader,
  },

  computed: {
    ...mapGetters({
      characters: CHARACTERS,
      page: PAGE,
      searchValue: SEARCH_VALUE,
      species: SPECIES,
      pagesCount: PAGES_COUNT,
      error: ERROR,
      loading: LOADING,
    }),
  },
  methods: {
    ...mapActions({
      getCharacters: GET_CHARACTERS,
      getPage: GET_PAGE,
      getURLParams: GET_URL_PARAMS,
      getFavouritesIds: GET_FAVOURITES_IDS,
    }),
    updateURLParams(value: string | number, key: string) {
      this.$router.push({
        path: "/",
        query: {
          ...this.$route.query,
          [key]: value,
        },
      });
    },
  },
  mounted() {
    this.getCharacters(this.$route.query);
    this.getURLParams(this.$route.query);
    this.getFavouritesIds();
  },
  watch: {
    page(value: number) {
      this.updateURLParams(value, "page");
    },
    searchValue(value: string) {
      this.updateURLParams(value, "name");
    },
    species(value: string) {
      this.updateURLParams(value, "species");
    },
  },
});
</script>

<style lang="scss">
.characters {
  width: 100%;

  &-list {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }
}
</style>
