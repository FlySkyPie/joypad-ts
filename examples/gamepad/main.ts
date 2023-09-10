import joypad from "@joypad-ts";

import "./sticks";
import "./main-buttons";
import "./front-buttons";
import "./center-buttons";

const gamepadSVG = document.querySelector<SVGSVGElement>("#gampad")!;

function reportWindowSize() {
  // heightOutput.textContent = window.innerHeight.toString();
  // widthOutput.textContent = window.innerWidth.toString();
  gamepadSVG.setAttribute("width", (window.innerWidth * 0.5).toString());
  gamepadSVG.setAttribute("height", window.innerHeight.toString());
}
addEventListener("resize", reportWindowSize);
reportWindowSize();

let heading = document.getElementById("heading")!;
let message = document.getElementById("message")!;

function resetInfo() {
  heading.innerText = "No controller connected!";
  message.innerText = "Please connect a controller and press any key to start.";
}

function updateInfo(e: GamepadEvent) {
  const { gamepad } = e;

  heading.innerText = "Controller connected!";
  message.innerText = gamepad.id;
}

resetInfo();
joypad.on("connect", (e) => {
  console.log(e);
  return updateInfo(e);
});
joypad.on("disconnect", (e) => {
  console.log(e);
  return resetInfo();
});

joypad.set({
  axisMovementThreshold: 0.3,
});
