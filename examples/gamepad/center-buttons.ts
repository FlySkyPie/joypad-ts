import joypad from "@joypad-ts";

type IButtonControls = {
  right: { pressed: boolean; element: SVGSVGElement };
  left: { pressed: boolean; element: SVGSVGElement };
};

const buttonControls: IButtonControls = {
  right: {
    pressed: false,
    element: document.querySelector<SVGSVGElement>(".B09")!,
  },
  left: {
    pressed: false,
    element: document.querySelector<SVGSVGElement>(".B08")!,
  },
};

const updateButtonView = () => {
  for (const button of Object.values(buttonControls)) {
    if (button.pressed) {
      button.element.style.fill = "#0000ff";
    } else {
      button.element.style.fill = "#ffffff";
    }
  }
};

joypad.on("button_press", ({ detail }) => {
  const { buttonName } = detail;

  if (buttonName === "button_8") {
    buttonControls.left.pressed = true;
  }
  if (buttonName === "button_9") {
    buttonControls.right.pressed = true;
  }

  updateButtonView();
});

joypad.on("button_release", ({ detail }) => {
  const { buttonName } = detail;

  if (buttonName === "button_8") {
    buttonControls.left.pressed = false;
  }
  if (buttonName === "button_9") {
    buttonControls.right.pressed = false;
  }

  updateButtonView();
});
