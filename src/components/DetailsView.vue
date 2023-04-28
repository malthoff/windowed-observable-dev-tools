<script lang="ts" setup>
import { defineProps } from "vue";
import TreeNode from "./TreeNode.vue";

const props = defineProps<{ data: any }>();
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="container">
      <TreeNode :data="data" :open="true"></TreeNode>
    </div>
  </div>
</template>
