<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps<{
  open: boolean | undefined;
}>();

const sign = computed(() => {
  return props.open ? "-" : "+";
});
</script>

<template>
  <span>[</span>
  <div class="w-4 inline text-center cursor-pointer">
    {{ sign }}
  </div>
  <span>]</span>
</template>
