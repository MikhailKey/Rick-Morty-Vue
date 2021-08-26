<template>
  <div class="card">
    <div
      class="card-image"
      :style="{ '--bkgImage': 'url(' + character.image + ')' }"
      @click="watchCharacter"
    ></div>
    <div class="card-info">
      <p class="card-info__name">
        {{ character.name }}
      </p>
      <div class="card-info__title">
        <span>{{ character.species }} - {{ character.status }}</span>
      </div>

      <button
        v-if="alreadyInList"
        class="card-info__add"
        @click="removeFromFavourites(character.id)"
      >
        Remove from favourites
      </button>
      <button
        v-else
        class="card-info__add"
        @click="addToFavourites(character.id)"
      >
        Add to favourites
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Character } from "@/services/ApiService/Interfaces/Character";
import { mapActions, mapGetters } from "vuex";
import {
  ADD_TO_FAVOURITES,
  FAVOURITES_IDS,
  REMOVE_FROM_FAVOURITES,
} from "@/store/types";

export default defineComponent({
  name: "CharacterCard",
  props: {
    character: {
      type: Object as PropType<Character>,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      favouritesIds: FAVOURITES_IDS,
    }),
    alreadyInList(): boolean {
      return this.favouritesIds.some(
        (item: number) => item === this.character.id
      );
    },
  },
  methods: {
    ...mapActions({
      addToFavourites: ADD_TO_FAVOURITES,
      removeFromFavourites: REMOVE_FROM_FAVOURITES,
    }),
    watchCharacter() {
      this.$router.push({
        path: `/${this.character.id}`,
      });
    },
  },
});
</script>

<style lang="scss">
.card {
  border: 1px solid lightgray;

  &-image {
    width: 100%;
    height: 300px;
    background: var(--bkgImage) no-repeat center center/cover;
    cursor: pointer;
  }
  &-info {
    padding: 20px;
    text-align: start;
    &__add {
      cursor: pointer;
      margin-top: 20px;
      padding: 5px 10px;
      background: black;
      color: white;
      border-radius: 5px;
    }
  }
}
</style>
