import type { JoypadItem } from "./interfaces";
import emitter from "./emitter";
import { AXIS_MOVEMENT_THRESHOLD, EventEnum, EventMap } from "./constants";
import { log, hasVibrationSupport } from "./utils";

class Joypad {
  public loopStarted = false;
  public instances: Record<number, any> = {};
  public buttonEvents: { joypad: (Record<any, JoypadItem> | null)[] } = {
    joypad: [],
  };
  public settings: any = { axisMovementThreshold: AXIS_MOVEMENT_THRESHOLD };

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

  public vibrate(gamepadInstance: Gamepad, options: any) {
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

  public set(settings: any) {
    const { axisMovementThreshold, vibration, customButtonMapping } = settings;
    const parsedValue = parseFloat(axisMovementThreshold);

    if (!isNaN(parsedValue)) {
      this.settings.axisMovementThreshold = parsedValue;
    }
    this.settings.vibration = vibration;
    this.settings.customButtonMapping = customButtonMapping;
  }

  public trigger(event: any, data: any) {
    return emitter.publish(event, data);
  }
}

const joypad = new Joypad();

export default joypad;
