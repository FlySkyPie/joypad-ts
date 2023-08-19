import joypad from "@joypad-ts";

let ball = document.getElementById("ball");
let heading = document.getElementById("heading");
let message = document.getElementById("message");

function resetInfo(e) {
  heading.innerText = "No controller connected!";
  message.innerText =
    "Please connect a controller and press any key to start.";
}

function updateInfo(e) {
  const { gamepad } = e;

  heading.innerText = "Controller connected!";
  message.innerText =
    gamepad.id + "\n\n" + "Press button_0 to make the ball jump.";
}

function bounceBall() {
  ball.style.transform = "translateY(-50px)";
}

function setCustomButtonMapping() {
  // If browser is firefox
  if (window.navigator.userAgent.includes("Firefox")) {
    return {
      button_0: 1,
    };
  } else {
    return null;
  }
}

resetInfo();
joypad.set({
  axisMovementThreshold: 0.3,
  customButtonMapping: setCustomButtonMapping(),
});
joypad.on("connect", (e) => updateInfo(e));
joypad.on("disconnect", (e) => resetInfo(e));
joypad.on("button_press", (e) => {
  console.log(e.detail);
  const { buttonName } = e.detail;

  if (buttonName === "button_0") {
    bounceBall();
  }
});
ball.addEventListener("transitionend", () => {
  ball.style.transform = "translateY(0px)";
});