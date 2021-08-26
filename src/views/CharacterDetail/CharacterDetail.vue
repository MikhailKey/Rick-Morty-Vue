<template>
  <div class="container">
    <Loader v-if="loading" />
    <div v-else>
      <div class="character" v-if="characterLoaded">
        <div class="character-info">
          <h2 class="character-info__name">{{ character.name }}</h2>
          <div class="character-info__detail">
            <p>{{ character.species }} - {{ character.status }}</p>
          </div>
          <p class="character-info__location">
            Last known location: {{ character.location.name }}
          </p>
          <p class="character-info__episode">
            First see in:
            <a :href="character.episode[0]" target="_blank">{{
              character.episode[0]
            }}</a>
          </p>
          <button
            v-if="alreadyInList"
            class="character-add"
            @click="removeFromFavourites(character.id)"
          >
            Remove from favourites
          </button>
          <button
            v-else
            class="character-add"
            @click="addToFavourites(character.id)"
          >
            Add to favourites
          </button>
        </div>
        <div
          class="character-image"
          :style="{ '--bkgImage': 'url(' + character.image + ')' }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import {
  ADD_TO_FAVOURITES,
  CHARACTER,
  ERROR,
  FAVOURITES_IDS,
  GET_CHARACTER,
  LOADING,
  REMOVE_FROM_FAVOURITES,
} from "@/store/types";
import Loader from "@/components/Loader/Loader.vue";
export default defineComponent({
  name: "CharacterDetail",
  components: {
    Loader,
  },
  computed: {
    ...mapGetters({
      character: CHARACTER,
      loading: LOADING,
      error: ERROR,
      favouritesIds: FAVOURITES_IDS,
    }),
    episode(): string {
      return this.character.episode[0];
    },
    alreadyInList(): boolean {
      return this.favouritesIds.some(
        (item: number) => item === this.character.id
      );
    },
    characterLoaded(): boolean {
      return this.character !== null;
    },
  },
  watch: {
    loading(value) {
      console.log(value);
    },
  },
  methods: {
    ...mapActions({
      getCharacter: GET_CHARACTER,
      addToFavourites: ADD_TO_FAVOURITES,
      removeFromFavourites: REMOVE_FROM_FAVOURITES,
    }),
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.getCharacter(id);
  },
});
</script>

<style lang="scss">
.character {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgray;
  padding-left: 20px;

  &-add {
    cursor: pointer;
    margin-top: 20px;
    padding: 5px 10px;
    background: black;
    color: white;
    border-radius: 5px;
  }
  &-info {
    flex-basis: 60%;
    text-align: start;
    &__name {
      margin: 0;
    }
  }
  &-image {
    width: 250px;
    height: 250px;
    background: var(--bkgImage) no-repeat center center/cover;
  }
}
</style>
