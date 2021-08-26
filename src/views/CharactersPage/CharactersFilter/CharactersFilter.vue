<template>
  <div class="char-filter">
    <Filter
      :loading="loading"
      :options="options"
      :currentValue="species"
      @changeFilter="changeFilter"
    />
    <div class="char-filter-search">
      <Search
        @changeSearch="changeSearch"
        :searchValue="searchValue"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Filter from "@/components/Filter/Filter.vue";
import Search from "@/components/Search/Search.vue";
import { mapGetters, mapActions } from "vuex";
import {
  GET_SEARCH_VALUE,
  GET_SPECIES,
  LOADING,
  SEARCH_VALUE,
  SPECIES,
} from "@/store/types";
export default defineComponent({
  name: "CharactersFilter",
  components: {
    Filter,
    Search,
  },
  data() {
    return {
      options: [
        {
          label: "All",
          value: "All",
        },
        {
          label: "Human",
          value: "Human",
        },
        {
          label: "Animal",
          value: "Animal",
        },
        {
          label: "Alien",
          value: "Alien",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      species: SPECIES,
      loading: LOADING,
      searchValue: SEARCH_VALUE,
    }),
  },
  methods: {
    ...mapActions({
      changeFilter: GET_SPECIES,
      changeSearch: GET_SEARCH_VALUE,
    }),
  },
});
</script>

<style lang="scss">
.char-filter {
  display: flex;
  width: 100%;
  background: lightgray;
  padding: 20px 30px;
  align-items: center;

  &-search {
    margin-left: 20px;
  }
}
</style>
