import { Hook, Main, Trigger } from "./core";

const initTrigger = () => {
  Trigger.resetTriggers();
  Trigger.setTriggers();
};

// @ts-expect-error
global.initTrigger = initTrigger;
// @ts-expect-error
global.main = Main.exec;
// @ts-expect-error
global.onOpen = Hook.onOpen;
// @ts-expect-error
global.openSettings = Hook.openSettings;
// @ts-expect-error
global.saveProperties = Hook.saveProperties;
// @ts-expect-error
global.resetTriggers = Trigger.resetTriggers;
