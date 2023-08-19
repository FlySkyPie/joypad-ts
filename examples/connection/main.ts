import joypad from "@joypad-ts";

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
