<script setup lang="ts">
import { onBeforeUnmount, onMounted, Ref, ref } from "vue";
import DetailsView from "./components/DetailsView.vue";
import EventList from "./components/EventList.vue";
import { WindowObservableEvent } from "./types/event";

let intervalId: number | undefined = undefined;
let intervalSpeed = 50;

let eventList: Ref<WindowObservableEvent[]> = ref([]);

const selectedData = ref();

function updateEvents(): void {
  chrome.devtools.inspectedWindow.eval(
    "JSON.stringify(window.__shared__.__events__)",
    (result: string) => {
      const parsed = JSON.parse(result);
      eventList.value =
        Object.keys(parsed).map<WindowObservableEvent>((eventName) => ({
          source: eventName,
          value: parsed[eventName],
        })) ?? [];
      startInterval();
    }
  );
}

function selectData(data: any) {
  selectedData.value = data;
}

function stopInterval() {
  clearInterval(intervalId);
}

function initRunTimeListener() {
  chrome.runtime.onMessage.addListener(onDevToolsEvent);
}

function onDevToolsEvent(message: string) {
  switch (message) {
    case "onShow":
      startInterval();
      break;
    case "onHidden":
      stopInterval();
    default: {
    }
  }
}

function signalMounted() {
  chrome.runtime.sendMessage("onMounted");
}

function removeRuntimeListener() {
  chrome.runtime.onMessage.removeListener(onDevToolsEvent);
}

onMounted(async () => {
  initRunTimeListener();
  signalMounted();
  startInterval();
});

function startInterval() {
  if (intervalId) {
    stopInterval();
    intervalSpeed = 200;
  }
  intervalId = setInterval(updateEvents, intervalSpeed);
}

onBeforeUnmount(() => {
  stopInterval();
  removeRuntimeListener();
});
</script>

<template>
  <div class="flex gap-2 w-full h-full overflow-hidden">
    <div class="min-w-2-3 h-screen overflow-y-auto p-4">
      <EventList :events="eventList" @select="selectData"></EventList>
    </div>
    <div class="min-w-1-3 h-screen overflow-y-auto p-4">
      <DetailsView :data="selectedData"></DetailsView>
    </div>
  </div>
</template>
