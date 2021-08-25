<template>
  <div class="filter">
    <div
      v-for="option in options"
      :key="option.value"
      :class="{
        'filter-option': true,
        'filter-option__active': currentValue === option.value,
      }"
    >
      <input
        :disabled="loading"
        :checked="currentValue === option.value"
        type="radio"
        :id="option.value"
        :value="option.value"
        @change="$emit('changeFilter', option.value)"
      />
      <label :for="option.value">{{ option.label }}</label>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Filter",
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: false,
    },
    options: {
      required: true,
      default: [],
    },
    currentValue: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.filter {
  display: flex;
  &-option {
    input {
      display: none;
    }

    label {
      border: 1px solid black;
      padding: 5px 10px;
      border-right: none;
      cursor: pointer;
    }

    &__active {
      label {
        background: black;
        color: white;
      }
    }

    &:first-child {
      label {
        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;
      }
    }

    &:last-child {
      label {
        border-right: 1px solid black;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
      }
    }
  }
}
</style>
