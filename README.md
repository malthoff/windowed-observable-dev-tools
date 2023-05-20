# Windowed Observable Developer Tools Extension

## Introduction

You use [windowed-observable](https://github.com/luistak/windowed-observable) for communication between your micro-frontends? Then this is your chrome browser extension to visualize the events.

### Features

- New tab in your Chrome dev tools
- Shows all event namespaces
- Shows all events in each namespace
- Details view for every event with collapsable nested properties
- Live update of new incoming events

### Chrome extension store

The extension will be available in the chrome extension store soon, when V1.0 is ready.

### Installation

As the extension is not yet in the Chrome Extension Store or when just want to get the latest version just do the following to install the extension today:

Clone the repo onto your local machine

```
git clone https://github.com/malthoff/windowed-observable-dev-tools.git
```

Change the directory to windowed-observable-dev-tools

```
cd windowed-observable-dev-tools
```

Install the dependencies

```
yarn install
```

Create a build

```
yarn build
```

Add the extension to Chrome by pointing to the /dist folder following these instructions:

[Install chrome extension locally](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)

### Features planned (unordered list)

- Keyboard navigation in event dots
- Visualize different event types in same event namespace in event dot list
- Filtering event details with keyword input
- Display number of observers for each namespace
- Visualize events that differ (or not differ) from the previous event.
- Porting the extension to Firefox / Edge / Safari
- Retrigger events from dev tools panel.
- to be continued
