import "./events";
import joypad from "./joypad";
import { log, hasGamepadApiSupport } from "./utils";

export default joypad;

if (!hasGamepadApiSupport()) {
  log(
    "Your browser does not support the Gamepad API " +
      "- https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API"
  );
}
