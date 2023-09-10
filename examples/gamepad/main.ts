import joypad from "@joypad-ts";

import "./sticks";
import "./main-buttons";

const gamepadSVG = document.querySelector<SVGSVGElement>("#gampad")!;

function reportWindowSize() {
  // heightOutput.textContent = window.innerHeight.toString();
  // widthOutput.textContent = window.innerWidth.toString();
  gamepadSVG.setAttribute("width", (window.innerWidth * 0.5).toString());
  gamepadSVG.setAttribute("height", window.innerHeight.toString());
}
addEventListener("resize", reportWindowSize);
reportWindowSize();

const buttonElements = [
  document.querySelector<SVGSVGElement>(".B10")!, // LeftStick
  document.querySelector<SVGSVGElement>(".B11")!, // RightStick
  document.querySelector<SVGSVGElement>(".R1")!,
  document.querySelector<SVGSVGElement>(".R2")!,

  // RightButtons
  document.querySelector<SVGSVGElement>(".B03")!,
  document.querySelector<SVGSVGElement>(".B02")!,
  document.querySelector<SVGSVGElement>(".B01")!,
  document.querySelector<SVGSVGElement>(".B00")!,

  // LeftButtons
  document.querySelector<SVGSVGElement>(".B12")!,
  document.querySelector<SVGSVGElement>(".B14")!,
  document.querySelector<SVGSVGElement>(".B15")!,
  document.querySelector<SVGSVGElement>(".B13")!,

  // CenterButtons
  document.querySelector<SVGSVGElement>(".B08")!,
  document.querySelector<SVGSVGElement>(".B09")!,
  document.querySelector<SVGSVGElement>(".R2")!,
  document.querySelector<SVGSVGElement>(".L2")!,
];

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
