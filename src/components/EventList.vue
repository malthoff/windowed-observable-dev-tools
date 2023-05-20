<script lang="ts" setup>
import { Ref, defineEmits, defineProps, ref } from "vue";
import { WinObsEvent, WindowObservableEvent } from "../types/event";
import EventDot from "./EventDot.vue";

const props = defineProps<{ events: WindowObservableEvent[] }>();

const emit = defineEmits<{
  (e: "select", data: any): void;
}>();

type ActiveEvent = {
  eventTypeIndex: number;
  eventIndex: number;
};

const activeEvent: Ref<ActiveEvent | undefined> = ref();

function showDetails(
  event: WinObsEvent,
  eventTypeIndex: number,
  eventIndex: number
) {
  activeEvent.value = { eventTypeIndex, eventIndex };
  emit("select", event);
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <template v-for="(item, eventTypeIndex) in props.events" :key="item.source">
      <div class="flex gap-8 item-center items-center">
        <!-- Event source-->
        <div class="clip p-4 w-1-4 flex-shrink-0 break-words self-stretch">
          {{ item.source }}
        </div>
        <!-- Dots for each event entry-->
        <div class="flex gap-6 flex-wrap">
          <template v-for="(entry, eventIndex) in item.value" :key="eventIndex">
            <div>
              <EventDot
                :title="entry.type"
                :isLatest="eventIndex === item.value.length - 1"
                :isActive="
                  eventIndex === activeEvent?.eventIndex &&
                  eventTypeIndex === activeEvent.eventTypeIndex
                "
                @click="showDetails(entry, eventTypeIndex, eventIndex)"
              ></EventDot>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.clip {
  border-radius: 0.25rem;
  background-color: #bbb2b22e;
}
</style>
