import joypad from "@joypad-ts";

type IButtonControls = {
    left: {
      up: { pressed: boolean; element: SVGSVGElement };
      right: { pressed: boolean; element: SVGSVGElement };
      down: { pressed: boolean; element: SVGSVGElement };
      left: { pressed: boolean; element: SVGSVGElement };
    };
    right: {
      up: { pressed: boolean; element: SVGSVGElement };
      right: { pressed: boolean; element: SVGSVGElement };
      down: { pressed: boolean; element: SVGSVGElement };
      left: { pressed: boolean; element: SVGSVGElement };
    };
  };
  
  const buttonControls: IButtonControls = {
    left: {
      up: {
        pressed: false,
        element: document.querySelector<SVGSVGElement>(".B12")!,
      },
      right: {
        pressed: false,
        element: document.querySelector<SVGSVGElement>(".B15")!,
      },
      down: {
        pressed: false,
        element: document.querySelector<SVGSVGElement>(".B13")!,
      },
      left: {
        pressed: false,
        element: document.querySelector<SVGSVGElement>(".B14")!,
      },
    },
    right: {
      up: {
        pressed: false,
        element: document.querySelector<SVGSVGElement>(".B03")!,
      },
      right: {
        pressed: false,
        element: document.querySelector<SVGSVGElement>(".B01")!,
      },
      down: {
        pressed: false,
        element: document.querySelector<SVGSVGElement>(".B00")!,
      },
      left: {
        pressed: false,
        element: document.querySelector<SVGSVGElement>(".B02")!,
      },
    },
  };
  
  const updateButtonView = () => {
    for (const button of Object.values(buttonControls.left)) {
      if (button.pressed) {
        button.element.style.fill = "#0000ff";
      } else {
        button.element.style.fill = "#ffffff";
      }
    }
  
    for (const button of Object.values(buttonControls.right)) {
      if (button.pressed) {
        button.element.style.fill = "#0000ff";
      } else {
        button.element.style.fill = "#ffffff";
      }
    }
  };
  
  joypad.on("button_press", ({ detail }) => {
    const { buttonName } = detail;
  
    if (buttonName === "button_12") {
      buttonControls.left.up.pressed = true;
    }
    if (buttonName === "button_15") {
      buttonControls.left.right.pressed = true;
    }
    if (buttonName === "button_13") {
      buttonControls.left.down.pressed = true;
    }
    if (buttonName === "button_14") {
      buttonControls.left.left.pressed = true;
    }
  
    if (buttonName === "button_3") {
      buttonControls.right.up.pressed = true;
    }
    if (buttonName === "button_1") {
      buttonControls.right.right.pressed = true;
    }
    if (buttonName === "button_0") {
      buttonControls.right.down.pressed = true;
    }
    if (buttonName === "button_2") {
      buttonControls.right.left.pressed = true;
    }
  
    updateButtonView();
  });
  
  joypad.on("button_release", ({ detail }) => {
    const { buttonName } = detail;
  
    if (buttonName === "button_12") {
      buttonControls.left.up.pressed = false;
    }
    if (buttonName === "button_15") {
      buttonControls.left.right.pressed = false;
    }
    if (buttonName === "button_13") {
      buttonControls.left.down.pressed = false;
    }
    if (buttonName === "button_14") {
      buttonControls.left.left.pressed = false;
    }
  
    if (buttonName === "button_3") {
      buttonControls.right.up.pressed = false;
    }
    if (buttonName === "button_1") {
      buttonControls.right.right.pressed = false;
    }
    if (buttonName === "button_0") {
      buttonControls.right.down.pressed = false;
    }
    if (buttonName === "button_2") {
      buttonControls.right.left.pressed = false;
    }
  
    updateButtonView();
  });
  