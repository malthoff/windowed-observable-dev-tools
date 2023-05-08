<script lang="ts" setup>
import { computed, defineProps, ref } from "vue";
import TreeNode from "../TreeNode.vue";
import FolderToggle from "./FolderToggle.vue";

const props = withDefaults(
  defineProps<{
    data: Record<string, any>;
    level: number;
    open?: boolean;
  }>(),
  {
    level: 0,
    open: false,
  }
);

function toggle(key: string) {
  const currentOpenState = openStates.value.get(key);
  openStates.value.set(key, !currentOpenState);
}

const openStates = ref(
  new Map(Object.keys(props.data).map((key) => [key, false]))
);

const objectPreview = computed(() => {
  const maxShown = 3;
  const keys = Object.keys(props.data);
  const listOfKeys = keys.filter((key, index) => index < maxShown).join(", ");
  const hasMore = keys.length > maxShown;
  const additionals = hasMore ? "..." : "";
  return `{ ${listOfKeys}${additionals} }`;
});

function isArrayWithContent(data: unknown): boolean {
  if (!Array.isArray(data)) {
    return false;
  }
  return Array.isArray(data) && data.length > 1;
}

function isObject(data: any) {
  return (
    !Array.isArray(data) && typeof data === "object" && Object.keys(data).length
  );
}
</script>

<template>
  <template v-if="props.open">
    <ul>
      <template v-for="(key, index) in Object.keys(props.data)" :key="index">
        <li>
          <span
            class="pr-2 user-select-none"
            @click="toggle(key)"
            v-if="
              isArrayWithContent(props.data[key]) || isObject(props.data[key])
            "
          >
            <FolderToggle :open="openStates.get(key)"></FolderToggle>
          </span>
          <span class="key font-bold">{{ key }}</span>
          <span class="pr-2 pl-1"
            >:
            <span v-if="isArrayWithContent(props.data[key])" class=""
              >({{ props.data[key].length }})
            </span></span
          >
          <TreeNode
            :data="props.data[key]"
            :level="props.level + 1"
            :open="openStates.get(key)"
          ></TreeNode>
        </li>
      </template>
    </ul>
  </template>
  <template v-else>
    <span class="">{{ objectPreview }}</span>
  </template>
</template>
<style lang="scss" scoped>
.key {
  color: var(--highlight-color);
}
</style>
