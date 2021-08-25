<template>
  <form class="search" @submit.prevent="changeSearch">
    <input
      class="search-input"
      :value="searchValue"
      type="text"
      placeholder="Search by name..."
      @input="updateSearch"
    />
    <button :disabled="loading" class="search-button">Search</button>
  </form>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Search",
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: false,
    },
    searchValue: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      value: "",
    };
  },

  methods: {
    changeSearch() {
      this.$emit("changeSearch", this.value);
    },
    updateSearch(e) {
      this.value = e.target.value;
    },
  },
});
</script>

<style lang="scss">
.search {
  &-input {
    padding: 6px 10px;
    border: 1px solid gray;
    border-right: none;
    outline: none;
  }

  &-button {
    cursor: pointer;
    padding: 6px 10px;
    border: 1px solid black;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
}
</style>
