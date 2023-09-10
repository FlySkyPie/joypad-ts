import joypad from "@joypad-ts";

type IButtonControls = {
  L1: { pressed: boolean; element: SVGSVGElement };
  L2: { pressed: boolean; element: SVGSVGElement };
  R1: { pressed: boolean; element: SVGSVGElement };
  R2: { pressed: boolean; element: SVGSVGElement };
};

const buttonControls: IButtonControls = {
  L1: {
    pressed: false,
    element: document.querySelector<SVGSVGElement>(".L1")!,
  },
  L2: {
    pressed: false,
    element: document.querySelector<SVGSVGElement>(".L2")!,
  },
  R1: {
    pressed: false,
    element: document.querySelector<SVGSVGElement>(".R1")!,
  },
  R2: {
    pressed: false,
    element: document.querySelector<SVGSVGElement>(".R2")!,
  },
};

const updateButtonView = () => {
  for (const button of Object.values([buttonControls.L1, buttonControls.R1])) {
    if (button.pressed) {
      button.element.style.fill = "#0000ff";
    } else {
      button.element.style.fill = "#000000";
    }
  }

  for (const button of Object.values([buttonControls.L2, buttonControls.R2])) {
    if (button.pressed) {
      button.element.setAttribute("height", "59.761375");
      button.element.setAttribute(
        "y",
        (-0.0000076293945 + 59.761375 * (1 - 1)).toString()
      );
    } else {
      button.element.setAttribute("height", "0");
      button.element.setAttribute(
        "y",
        (-0.0000076293945 + 59.761375 * (1 - 0)).toString()
      );
    }
  }
};

joypad.on("button_press", ({ detail }) => {
  const { buttonName } = detail;

  if (buttonName === "button_6") {
    buttonControls.L2.pressed = true;
  }
  if (buttonName === "button_4") {
    buttonControls.L1.pressed = true;
  }
  if (buttonName === "button_7") {
    buttonControls.R2.pressed = true;
  }
  if (buttonName === "button_5") {
    buttonControls.R1.pressed = true;
  }

  updateButtonView();
});

joypad.on("button_release", ({ detail }) => {
  const { buttonName } = detail;

  if (buttonName === "button_6") {
    buttonControls.L2.pressed = false;
  }
  if (buttonName === "button_4") {
    buttonControls.L1.pressed = false;
  }
  if (buttonName === "button_7") {
    buttonControls.R2.pressed = false;
  }
  if (buttonName === "button_5") {
    buttonControls.R1.pressed = false;
  }
  updateButtonView();
});
