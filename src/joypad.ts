import type { EventMap, JoypadItem, JoypadSettings } from "./interfaces";
import emitter from "./emitter";
import { AXIS_MOVEMENT_THRESHOLD, EventEnum } from "./constants";
import { log, hasVibrationSupport } from "./utils";

class Joypad {
  public loopStarted = false;

  public instances: Record<number, Gamepad> = {};

  public buttonEvents: { joypad: (Record<string, JoypadItem> | null)[] } = {
    joypad: [],
  };
  public settings: JoypadSettings = {
    axisMovementThreshold: AXIS_MOVEMENT_THRESHOLD,
  };

  public remove(index: number) {
    return delete this.instances[index];
  }

  public on<TEventName extends keyof EventMap & string>(
    event: EventEnum,
    callback: (...eventArg: EventMap[TEventName]) => void
  ) {
    switch (event) {
      case EventEnum.CONNECT_ALIAS:
        return emitter.subscribe(EventEnum.CONNECT_ALIAS, callback);
      case EventEnum.DISCONNECT_ALIAS:
        return emitter.subscribe(EventEnum.DISCONNECT_ALIAS, callback);
      case EventEnum.BUTTON_PRESS_ALIAS:
        return emitter.subscribe(EventEnum.BUTTON_PRESS_ALIAS, callback);
      case EventEnum.BUTTON_RELEASE_ALIAS:
        return emitter.subscribe(EventEnum.BUTTON_RELEASE_ALIAS, callback);
      case EventEnum.AXIS_MOVEMENT_ALIAS:
        return emitter.subscribe(EventEnum.AXIS_MOVEMENT_ALIAS, callback);
    }
  }

  public vibrate(gamepadInstance: Gamepad, options?: GamepadEffectParameters) {
    const { vibrationActuator } = gamepadInstance;
    const vibrationSettings = options ? options : this.settings.vibration;

    if (hasVibrationSupport(vibrationActuator)) {
      const { type } = vibrationActuator;

      return vibrationActuator.playEffect(type as any, vibrationSettings);
    } else {
      log(
        "No vibration actuator interface found - https://developer.mozilla.org/en-US/docs/Web/API/GamepadHapticActuator"
      );
    }
  }

  public set(settings: JoypadSettings) {
    const { axisMovementThreshold, vibration, customButtonMapping } = settings;

    if (axisMovementThreshold !== undefined) {
      const parsedValue =
        typeof axisMovementThreshold === "string"
          ? parseFloat(axisMovementThreshold)
          : axisMovementThreshold;

      this.settings.axisMovementThreshold = parsedValue;
    }
    this.settings.vibration = vibration;
    this.settings.customButtonMapping = customButtonMapping;
  }

  public trigger(event: EventEnum, data: unknown) {
    return emitter.publish(event, data);
  }
}

const joypad = new Joypad();

export default joypad;
