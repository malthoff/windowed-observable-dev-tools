export type WindowObservableEvent = {
  source: string;
  value: WinObsEvent[];
};

export type WinObsEvent = {
  type: string;
  payload: any;
};
