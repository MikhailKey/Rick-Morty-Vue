<template>
  <div class="pagination">
    <p class="pagination-page">Page {{ currentPage }} of {{ max }}</p>
    <button
      :disabled="loading"
      @click="changePage(countMinus)"
      :class="{
        'pagination-button': true,
        'pagination-button__disabled': currentPage === 1,
      }"
    >
      Prev
    </button>
    <button
      :disabled="loading"
      @click="changePage(countPlus)"
      :class="{
        'pagination-button': true,
        'pagination-button__next': true,
        'pagination-button__disabled': currentPage === max,
      }"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: false,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    changePage(result: number) {
      if (
        (result === 1 && this.currentPage === 1) ||
        (result === this.max && this.currentPage === this.max)
      ) {
        return;
      }
      this.$emit("changePage", result);
    },
  },
  computed: {
    countMinus(): number {
      return this.currentPage !== 1 ? this.currentPage - 1 : 1;
    },
    countPlus(): number {
      return this.currentPage !== this.max ? this.currentPage + 1 : this.max;
    },
  },
});
</script>

<style lang="scss">
.pagination {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 20px 0;

  &-page {
    padding-right: 20px;
  }
  &-button {
    cursor: pointer;
    border: none;
    background: none;
    &__next {
      margin-left: 10px;
    }

    &__disabled {
      color: lightgray;
    }
  }
}
</style>
