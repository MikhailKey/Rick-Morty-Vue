<template>
  <div class="header">
    <div class="header-navigation">
      <router-link to="/">Characters</router-link>
      |
      <router-link to="/favourites">Favourites</router-link>
    </div>
    <div class="header-favourites">
      <HeartIcon />
      <span class="header-favourites__count">{{ favouritesCount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeartIcon from "@/components/Header/HeartIcon.vue";
import { mapGetters } from "vuex";
import { FAVOURITES_IDS } from "@/store/types";

export default defineComponent({
  name: "Header",
  components: {
    HeartIcon,
  },
  data() {
    return {
      count: 0,
    };
  },
  filters: {
    favourites(value) {
      return value.length;
    },
  },
  computed: {
    ...mapGetters({
      favourites: FAVOURITES_IDS,
    }),
    favouritesCount(): number {
      return this.favourites.length;
    },
  },
});
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 60px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;

  &-favourites {
    display: flex;
    align-items: center;
    &__count {
      color: white;
      display: block;
      margin-left: 10px;
    }
  }

  a {
    font-weight: bold;
    color: gray;
    text-decoration: none;

    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>
