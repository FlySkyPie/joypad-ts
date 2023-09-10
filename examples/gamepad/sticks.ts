import joypad from "@joypad-ts";

type IAxisControls = {
  left: { x: number; y: number; timer?: NodeJS.Timeout };
  right: { x: number; y: number; timer?: NodeJS.Timeout };
};

const axisControls: IAxisControls = {
  left: { x: 0, y: 0 },
  right: { x: 0, y: 0 },
};

const leftStickElement = document.querySelector<SVGSVGElement>(".B10")!; // LeftStick
const rightStickElement = document.querySelector<SVGSVGElement>(".B11")!; // RightStick

const updateLeftStick = () => {
  leftStickElement.style.transform = `translate(${axisControls.left.x * 32}px,${
    axisControls.left.y * 32
  }px)`;

  if (
    Math.abs(axisControls.left.x) > 0.1 ||
    Math.abs(axisControls.left.y) > 0.1
  ) {
    leftStickElement.style.fill = "#990000";
  } else {
    leftStickElement.style.fill = "#000000";
  }
};

const updateRightStick = () => {
  rightStickElement.style.transform = `translate(${
    axisControls.right.x * 32
  }px,${axisControls.right.y * 32}px)`;

  if (
    Math.abs(axisControls.right.x) > 0.1 ||
    Math.abs(axisControls.right.y) > 0.1
  ) {
    rightStickElement.style.fill = "#990000";
  } else {
    rightStickElement.style.fill = "#000000";
  }
};

joypad.on("axis_move", ({ detail }) => {
  const { directionOfMovement, stickMoved, axisMovementValue } = detail;

  if (stickMoved === "left_stick") {
    switch (directionOfMovement) {
      case "left":
      case "right":
        axisControls.left.x = axisMovementValue;
        break;
      case "top":
      case "bottom":
        axisControls.left.y = axisMovementValue;
        break;
    }

    axisControls.left.timer && clearTimeout(axisControls.left.timer);
    axisControls.left.timer = setTimeout(() => {
      axisControls.left.x = 0;
      axisControls.left.y = 0;
      updateLeftStick();
    }, 500);
  }

  if (stickMoved === "right_stick") {
    switch (directionOfMovement) {
      case "left":
      case "right":
        axisControls.right.x = axisMovementValue;
        break;
      case "top":
      case "bottom":
        axisControls.right.y = axisMovementValue;
        break;
    }

    axisControls.right.timer && clearTimeout(axisControls.right.timer);
    axisControls.right.timer = setTimeout(() => {
      axisControls.right.x = 0;
      axisControls.right.y = 0;
      updateRightStick();
    }, 500);
  }

  updateLeftStick();
  updateRightStick();
});
