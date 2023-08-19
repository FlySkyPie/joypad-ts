import joypad from "@joypad-ts";
import type { AxisMoveEvent } from "@joypad-ts";

let ball = document.getElementById("ball")!;
let heading = document.getElementById("heading")!;
let message = document.getElementById("message")!;
let ballMovements = { left: 0, top: 0 };

function resetInfo() {
  heading.innerText = "No controller connected!";
  message.innerText = "Please connect a controller and press any key to start.";
}

function updateInfo(e: GamepadEvent) {
  const { gamepad } = e;

  heading.innerText = "Controller connected!";
  message.innerText =
    gamepad.id + "\n\n" + "Use the left stick to move the ball.";
}

function moveBall(e: AxisMoveEvent) {
  const { directionOfMovement, stickMoved } = e.detail;
  const pixelsToMove = 6;

  if (stickMoved === "left_stick") {
    switch (directionOfMovement) {
      case "left":
        ballMovements.left += -pixelsToMove;
        ball.style.left = ballMovements.left + "px";
        break;
      case "right":
        ballMovements.left += pixelsToMove;
        ball.style.left = ballMovements.left + "px";
        break;
      case "top":
        ballMovements.top += -pixelsToMove;
        ball.style.top = ballMovements.top + "px";
        break;
      case "bottom":
        ballMovements.top += pixelsToMove;
        ball.style.top = ballMovements.top + "px";
        break;
    }
  }
}

resetInfo();
joypad.set({ axisMovementThreshold: 0.3 });
joypad.on("connect", (e) => updateInfo(e));
joypad.on("disconnect", () => resetInfo());
joypad.on("axis_move", (e) => {
  console.log(e.detail);
  return moveBall(e);
});
