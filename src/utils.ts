// Helper functions

export const log = (...messages: string[]) => {
  if (console.warn && typeof console.warn === "function") {
    console.warn(...messages);
  } else {
    console.log(...messages);
  }
};
export const findButtonMapping = (index: number, mapping: any) => {
  let results: string[] = [];

  Object.keys(mapping).forEach((key) => {
    if (mapping[key] === index) {
      results.push(key);
    } else if (
      Array.isArray(mapping[key]) &&
      mapping[key].indexOf(index) !== -1
    ) {
      results.push(key);
    }
  });

  return results;
};

export const hasVibrationSupport = (
  vibrationActuator: GamepadHapticActuator | null
): vibrationActuator is GamepadHapticActuator => {
  return vibrationActuator &&
    vibrationActuator.type &&
    vibrationActuator.playEffect &&
    typeof vibrationActuator.playEffect === "function"
    ? true
    : false;
};

export const hasGamepadApiSupport = () => {
  return window.navigator.getGamepads &&
    typeof window.navigator.getGamepads === "function"
    ? true
    : false;
};

// export { log, findButtonMapping, hasVibrationSupport, hasGamepadApiSupport };
