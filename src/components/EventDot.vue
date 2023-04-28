<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    isLatest: boolean;
    isActive: boolean;
  }>(),
  {
    isLatest: false,
    isActive: false,
  }
);

const color = computed(() => (props.isLatest ? "#08dd7a" : "#355647"));
</script>

<template>
  <div class="relative">
    <svg viewBox="0 0 50 50" width="25" class="cursor-pointer">
      <!-- Solid circle with no border or stroke -->
      <circle cx="25" cy="25" r="16" :fill="color" />

      <!-- Transparent circle with stroke only -->
      <circle
        v-if="props.isActive"
        class="pointer-events-none"
        cx="25"
        cy="25"
        r="22"
        stroke="#08dd7a"
        stroke-width="5"
        fill="transparent"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped></style>
