import joypad from "./joypad";
import {
  listenToButtonEvents,
  listenToAxisMovements,
  handleButtonEvent,
} from "./events";

class Loop {
  public id: number | null = null;

  public start = () => {
    const requestAnimationFrame = window.requestAnimationFrame;
    const { buttonEvents } = joypad;
    let gamepads = window.navigator.getGamepads();
    gamepads = Array.prototype.slice.call(gamepads);

    // Loop all the gamepads on each frame
    gamepads.forEach((gamepad, index) => {
      if (!gamepad) {
        return;
      }

      // Initialise joypad instance events if not present
      if (!buttonEvents.joypad[index]) {
        buttonEvents.joypad[index] = {};
      }

      // Update gamepad instance data
      joypad.instances[index] = gamepad;

      // Listen to button press events
      listenToButtonEvents(gamepad);

      // Listen to axis movement events
      listenToAxisMovements(gamepad);
    });

    // Handle button events on each frame
    buttonEvents.joypad.forEach((events) => {
      if (events) {
        Object.keys(events).forEach((key) => {
          handleButtonEvent(key, events);
        });
      }
    });

    // Set loop start flag and recursively call the start function on each frame
    this.id = requestAnimationFrame(this.start);
  };

  public stop(id: number | null) {
    if (id === null) {
      return;
    }

    const cancelAnimationFrame = window.cancelAnimationFrame;

    return cancelAnimationFrame(id);
  }
}

const loop = new Loop();

export default loop;
