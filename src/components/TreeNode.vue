<script lang="ts" setup>
import { computed, defineProps } from "vue";
import ArrayNode from "./tree-parts/ArrayNode.vue";
import ObjectNode from "./tree-parts/ObjectNode.vue";

const props = withDefaults(
  defineProps<{
    data: any;
    level: number;
    open?: boolean;
  }>(),
  {
    level: 0,
    open: false,
  }
);

const isArray = computed(() => {
  return Array.isArray(props.data);
});

const isObject = computed(() => {
  return typeof props.data === "object";
});

const isOther = computed(() => {
  return !isArray && !isObject;
});
</script>

<template>
  <template v-if="isArray">
    <ArrayNode :data="props.data" :open="props.open"></ArrayNode>
  </template>

  <template v-else-if="isObject">
    <ObjectNode :data="props.data" :open="props.open"></ObjectNode>
  </template>

  <template v-else="isOther">
    <span class="ml-2">{{ props.data }}</span>
  </template>
</template>

<style lang="scss" scoped>
ul,
li {
  padding-left: 0.25rem;
}
</style>
