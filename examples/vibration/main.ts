import joypad from "@joypad-ts";
let heading = document.getElementById("heading");
let message = document.getElementById("message");
let vibrateButton = document.getElementById("vibrate");

function resetInfo(e) {
  heading.innerText = "No controller connected!";
  message.innerText =
    "Please connect a controller and press any key to start.";
}

function updateInfo(e) {
  const { gamepad } = e;

  heading.innerText = "Controller connected!";
  message.innerText =
    gamepad.id +
    "\n\n" +
    "Press the blue button on the screen to make the connected controllers vibrate.";
}

function vibrateController() {
  const connectedControllers = window.joypad.instances;

  if (Object.keys(connectedControllers).length) {
    Object.keys(connectedControllers).forEach((controller) => {
      const gamepadInstance = connectedControllers[controller];
      const options = {
        startDelay: 0,
        duration: 2000,
        weakMagnitude: 1,
        strongMagnitude: 1,
      };

      console.log(gamepadInstance);
      // These options override the global vibration settings
      joypad.vibrate(gamepadInstance, options);
    });
  }
}

resetInfo();
vibrateButton.addEventListener("click", vibrateController);
joypad.set({
  // Global vibration settings
  vibration: {
    startDelay: 500,
    duration: 3000,
    weakMagnitude: 1,
    strongMagnitude: 1,
  },
});
joypad.on("connect", (e) => updateInfo(e));
joypad.on("disconnect", (e) => resetInfo(e));