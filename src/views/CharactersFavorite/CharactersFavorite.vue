<template>
  <div class="favorite">
    <div v-if="favouritesLength" class="container">
      <div class="favourites-list" v-if="!error">
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
  GET_FAVOURITES,
  GET_FAVOURITES_IDS,
} from "@/store/types";
import CharacterCard from "@/components/CharacterCard/CharacterCard.vue";
export default defineComponent({
  name: "CharactersFavorite",
  components: {
    CharacterCard,
  },
  computed: {
    ...mapGetters({
      favourites: FAVOURITES,
      error: ERROR,
    }),
    favouritesLength(): number {
      return this.favourites?.length || 0;
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
  &-list {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }
}
</style>
