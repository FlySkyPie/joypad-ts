export enum EventEnum {
  CONNECT_NATIVE = "gamepadconnected",
  CONNECT_ALIAS = "connect",
  DISCONNECT_NATIVE = "gamepaddisconnected",
  DISCONNECT_ALIAS = "disconnect",
  BUTTON_PRESS_ALIAS = "button_press",
  BUTTON_RELEASE_ALIAS = "button_release",
  AXIS_MOVEMENT_ALIAS = "axis_move",
}

export const STICKS = {
  LEFT: {
    NAME: "left_stick",
    AXES: {
      X: 0,
      Y: 1,
    },
  },
  RIGHT: {
    NAME: "right_stick",
    AXES: {
      X: 2,
      Y: 3,
    },
  },
} as const;

export const DIRECTIONS = {
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
} as const;

export const BUTTON_MAPPING = {
  button_0: 0,
  button_1: 1,
  button_2: 2,
  button_3: 3,
  button_4: 4,
  button_5: 5,
  button_6: 6,
  button_7: 7,
  button_8: 8,
  button_9: 9,
  button_10: 10,
  button_11: 11,
  button_12: 12,
  button_13: 13,
  button_14: 14,
  button_15: 15,
  button_16: 16,
  button_17: 17,
};

export const AXIS_MOVEMENT_THRESHOLD = 0.8;
