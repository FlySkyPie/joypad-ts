import { EventEnum } from "./constants";

export type JoypadItem = {
  index?: number;
  gamepad?: Gamepad;
  pressed: boolean;
  hold: boolean;
  released: boolean;
  last_event?: EventEnum;
  button?: GamepadButton;
};

export interface ButtonPressData {
  button: GamepadButton;
  buttonName: string;
  gamepad: Gamepad;
  /**
   * @case 0: A
   * @case 1: B
   * @case 2: X
   * @case 3: Y
   * @case 4: LT
   * @case 5: RT
   * @case 6: LB
   * @case 7: RB
   * @case 8: SELECT
   * @case 9: START
   * @case 10: Left stick pressed button
   * @case 11: Right stick pressed button
   * @case 12: D-pad up
   * @case 13: D-pad down
   * @case 14: D-pad left
   * @case 15: D-pad right
   * @case 16: Vendor button 1
   * @case 17: Vendor button 2
   */
  index: number;
}

export interface ButtonPressEvent extends CustomEvent {
  detail: ButtonPressData;
}

export type DirectionOfMovement = "top" | "bottom" | "left" | "right";

export type StickMoved = "left_stick" | "right_stick";

export interface AsixMovmentData {
  /**
   * @case 0: Horizontal axis for left stick (negative left/positive right)
   * @case 1: Vertical axis for left stick (negative up/positive down)
   * @case 2: Horizontal axis for right stick (negative left/positive right)
   * @case 3: Vertical axis for right stick (negative up/positive down)
   */
  axis: number;
  axisMovementValue: number;
  directionOfMovement: DirectionOfMovement;
  gamepad: Gamepad;
  stickMoved: StickMoved;
  totalSticks: number;
}

export interface AxisMoveEvent extends CustomEvent {
  detail: AsixMovmentData;
}

export interface JoypadSettings {
  vibration?: {
    startDelay: number;
    duration: number;
    weakMagnitude: number;
    strongMagnitude: number;
  };
  axisMovementThreshold?: number;
  customButtonMapping?: Record<string, number>;
}

export type EventMap = {
  "gamepadconnected": [event: GamepadEvent];
  "connect": [event: GamepadEvent];
  "gamepaddisconnected": [event: GamepadEvent];
  "disconnect": [event: GamepadEvent];

  "button_press": [event: ButtonPressEvent];
  "button_release": [event: ButtonPressEvent];
  "axis_move": [event: AxisMoveEvent];
};
