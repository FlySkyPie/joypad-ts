import emitter from "./emitter";
import joypad from "./joypad";
import loop from "./loop";
import { STICKS, DIRECTIONS, BUTTON_MAPPING, EventEnum } from "./constants";
import { findButtonMapping } from "./utils";
import {
  AsixMovmentData,
  ButtonPressData,
  DirectionOfMovement,
  JoypadItem,
} from "./interfaces";

const initEventListeners = () => {
  window.addEventListener(EventEnum.CONNECT_NATIVE, (e) => {
    emitter.publish(EventEnum.CONNECT_ALIAS, e);

    // Start loop on gamepad connection if not already started
    if (!joypad.loopStarted) {
      joypad.loopStarted = true;
      return loop.start();
    }
  });
  window.addEventListener(EventEnum.DISCONNECT_NATIVE, (e) => {
    emitter.publish(EventEnum.DISCONNECT_ALIAS, e);

    // Remove instance and reset events on gamepad disconnection
    joypad.remove(e.gamepad.index);
    joypad.buttonEvents.joypad[e.gamepad.index] = null;

    // Stop loop if all gamepads have been disconnected
    if (!Object.keys(joypad.instances).length) {
      joypad.loopStarted = false;
      return loop.stop(loop.id);
    }
  });
  window.addEventListener(EventEnum.BUTTON_PRESS_ALIAS, (e) => {
    return emitter.publish(EventEnum.BUTTON_PRESS_ALIAS, e);
  });
  window.addEventListener(EventEnum.BUTTON_RELEASE_ALIAS, (e) => {
    return emitter.publish(EventEnum.BUTTON_RELEASE_ALIAS, e);
  });
  window.addEventListener(EventEnum.AXIS_MOVEMENT_ALIAS, (e) => {
    return emitter.publish(EventEnum.AXIS_MOVEMENT_ALIAS, e);
  });
};

export const listenToButtonEvents = (gamepad: Gamepad) => {
  gamepad.buttons.forEach((button, index) => {
    const { customButtonMapping } = joypad.settings;
    const buttonMapping = customButtonMapping
      ? customButtonMapping
      : BUTTON_MAPPING;
    const keys = findButtonMapping(index, buttonMapping);
    const { buttonEvents } = joypad;

    if (keys && keys.length) {
      keys.forEach((key) => {
        const target = buttonEvents.joypad[gamepad.index];
        if (!target) {
          return;
        }

        // If button is pressed then set press status of button
        if (button.pressed) {
          if (!target[key]) {
            target[key] = {
              pressed: true,
              hold: false,
              released: false,
            };
          }

          // Set button event data
          target[key].button = button;
          target[key].index = index;
          target[key].gamepad = gamepad;
        }

        // If button is not pressed then set release status of button
        else if (!button.pressed && target[key]) {
          target[key].released = true;
          target[key].hold = false;
        }
      });
    }
  });
};

export const listenToAxisMovements = (gamepad: Gamepad) => {
  const axisMovementEvent = (eventData: AsixMovmentData) =>
    new CustomEvent(EventEnum.AXIS_MOVEMENT_ALIAS, { detail: eventData });
  const { axisMovementThreshold } = joypad.settings;
  const { axes } = gamepad;
  const totalAxisIndexes = axes.length;
  const totalSticks = totalAxisIndexes / 2;

  axes.forEach((axis, index) => {
    if (axisMovementThreshold && Math.abs(axis) > axisMovementThreshold) {
      let stickMoved = null;
      let directionOfMovement: DirectionOfMovement = DIRECTIONS.BOTTOM;
      let axisMovementValue = axis;

      if (index < totalSticks) {
        stickMoved = STICKS.LEFT.NAME;
      } else {
        stickMoved = STICKS.RIGHT.NAME;
      }

      if (index === STICKS.LEFT.AXES.X || index === STICKS.RIGHT.AXES.X) {
        directionOfMovement = axis < 0 ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT;
      }
      if (index === STICKS.LEFT.AXES.Y || index === STICKS.RIGHT.AXES.Y) {
        directionOfMovement = axis < 0 ? DIRECTIONS.TOP : DIRECTIONS.BOTTOM;
      }

      const eventData: AsixMovmentData = {
        gamepad,
        totalSticks,
        stickMoved,
        directionOfMovement,
        axisMovementValue,
        axis: index,
      };
      return window.dispatchEvent(axisMovementEvent(eventData));
    }
  });
};

export const dispatchCustomEvent = (
  eventName: EventEnum.BUTTON_PRESS_ALIAS | EventEnum.BUTTON_RELEASE_ALIAS,
  buttonEvents: Record<string, JoypadItem>,
  buttonName: string
) => {
  const joypadEvent = (eventData: ButtonPressData) =>
    new CustomEvent(eventName, { detail: eventData });
  const { index, gamepad } = buttonEvents[buttonName];
  const eventData = {
    buttonName,
    button: buttonEvents[buttonName].button,
    index,
    gamepad,
  } as ButtonPressData;

  window.dispatchEvent(joypadEvent(eventData));
};

export const handleButtonEvent = (
  buttonName: string,
  buttonEvents: Record<string, JoypadItem>
) => {
  // Fire button press event
  if (buttonEvents[buttonName].pressed) {
    dispatchCustomEvent(EventEnum.BUTTON_PRESS_ALIAS, buttonEvents, buttonName);

    // Reset button usage flags
    buttonEvents[buttonName].pressed = false;
    buttonEvents[buttonName].hold = true;
    // Set last button press to fire button release event
    buttonEvents[buttonName].last_event = EventEnum.BUTTON_PRESS_ALIAS;
  }

  // Button being held
  else if (buttonEvents[buttonName].hold) {
  }

  // Button being released
  else if (
    buttonEvents[buttonName].released &&
    buttonEvents[buttonName].last_event === EventEnum.BUTTON_PRESS_ALIAS
  ) {
    dispatchCustomEvent(
      EventEnum.BUTTON_RELEASE_ALIAS,
      buttonEvents,
      buttonName
    );

    delete buttonEvents[buttonName];
  }
};

initEventListeners();
