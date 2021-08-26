<template>
  <div class="favourites">
    <div v-if="favouritesLength" class="container">
      <Loader v-if="loading" />
      <div class="favourites-list" v-else-if="!error">
        <CharacterCard
          v-for="favorite in favourites"
          :key="favorite.id"
          :character="favorite"
        />
      </div>
    </div>
    <div v-else class="favorite-empty">
      <h4 class="favorite-empty__title">You haven't added any cards</h4>
      <img class="favorite-empty__image" src="@/assets/giphy.gif" alt="sad" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import {
  ERROR,
  FAVOURITES,
  FAVOURITES_IDS,
  GET_FAVOURITES,
  GET_FAVOURITES_IDS,
  LOADING,
} from "@/store/types";
import Loader from "@/components/Loader/Loader.vue";
import CharacterCard from "@/components/CharacterCard/CharacterCard.vue";
export default defineComponent({
  name: "CharactersFavorite",
  components: {
    CharacterCard,
    Loader,
  },
  computed: {
    ...mapGetters({
      favourites: FAVOURITES,
      favouritesId: FAVOURITES_IDS,
      error: ERROR,
      loading: LOADING,
    }),
    favouritesLength(): number {
      return this.favouritesId?.length || 0;
    },
  },
  methods: {
    ...mapActions({
      getFavouritesIds: GET_FAVOURITES_IDS,
      getFavourites: GET_FAVOURITES,
    }),
  },
  mounted() {
    this.getFavouritesIds();
    this.getFavourites();
  },
});
</script>

<style lang="scss">
.favourites {
  margin-bottom: 50px;
  &-list {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }
}
</style>
