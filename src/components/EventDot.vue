<script lang="ts" setup>
import { defineProps } from "vue";

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
</script>

<template>
  <div class="event relative">
    <svg viewBox="0 0 50 50" width="25" class="cursor-pointer">
      <!-- Solid circle with no border or stroke -->
      <circle
        class="dot"
        :class="{ 'is-active': props.isActive, 'is-latest': props.isLatest }"
        cx="25"
        cy="25"
        r="16"
      />

      <!-- Transparent circle with stroke only -->
      <circle
        v-if="props.isActive"
        class="active-ring pointer-events-none"
        cx="25"
        cy="25"
        r="22"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.event {
  --dotColor: hsl(157, 5%, 70%);

  .dot {
    fill: var(--dotColor);

    &.is-latest {
      fill: var(--highlight-color);
    }
  }

  .active-ring {
    stroke: var(--highlight-color);
    stroke-width: 5;
    fill: transparent;
  }
}
@media (prefers-color-scheme: dark) {
  .event {
    --dotColor: #355647;
  }
}
</style>
