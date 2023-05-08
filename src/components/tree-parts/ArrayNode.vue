<script lang="ts" setup>
import { defineProps, ref, toRefs, watch } from "vue";
import TreeNode from "../TreeNode.vue";

const props = withDefaults(
  defineProps<{
    data: Record<string, any>;
    level: number;
    open: boolean;
  }>(),
  {
    level: 0,
    open: false,
  }
);

const { data, level } = toRefs(props);

watch(
  () => props.open,
  (newValue) => {
    isOpen.value = newValue;
  }
);

const isOpen = ref(props.open);
</script>

<template>
  <span v-if="data.length === 0">[ ]</span>
  <TreeNode
    v-else-if="data.length === 1"
    :data="data[0]"
    :level="props.level + 1"
    :open="true"
  ></TreeNode>
  <div v-else>
    <ul :class="[{ hidden: !isOpen }]" class="flex flex-col pl-8">
      <template v-for="(item, index) in data" :key="index">
        <li class="flex">
          <span>{{ index }}:</span>
          <TreeNode :data="item" :level="level + 1" :open="true"></TreeNode>
        </li>
      </template>
    </ul>
  </div>
</template>
