<script lang="ts" setup>
import {
  Ref,
  defineEmits,
  defineProps,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
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

function showDetails(eventTypeIndex: number, eventIndex: number) {
  activeEvent.value = { eventTypeIndex, eventIndex };
  broadcastActiveEvent();
}

function broadcastActiveEvent() {
  const type = props.events.find(
    (_, index) => index === activeEvent.value?.eventTypeIndex
  );

  const event = type?.value.find(
    (_, index) => index === activeEvent.value?.eventIndex
  );

  if (event) {
    emit("select", event);
  }
}

function onKeyUp(event: KeyboardEvent) {
  if (!!activeEvent) {
    switch (event.key) {
      case "ArrowLeft":
        activatePreviousEvent();
        break;
      case "ArrowRight":
        activeNextEvent();
        break;
    }

    broadcastActiveEvent();
  }
}

function activatePreviousEvent() {
  if (!!activeEvent.value && activeEvent.value.eventIndex > 0) {
    activeEvent.value.eventIndex--;
  }
}

function activeNextEvent() {
  const currentEventNamespace = props.events.find(
    (_, index) => index === activeEvent.value?.eventTypeIndex
  );
  if (!currentEventNamespace) {
    return;
  }

  const maxEventIndex = currentEventNamespace.value.length - 1;

  if (!!activeEvent.value && activeEvent.value.eventIndex < maxEventIndex) {
    activeEvent.value.eventIndex++;
  }
}

function initKeyboardNavigation() {
  document.addEventListener("keyup", onKeyUp);
}

onMounted(() => {
  initKeyboardNavigation();
});

onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp);
});
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
                @click="showDetails(eventTypeIndex, eventIndex)"
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
