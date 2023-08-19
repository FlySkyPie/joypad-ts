import { describe, expect, test, beforeAll, vi } from "vitest";

import { AXIS_MOVEMENT_THRESHOLD } from "../src/constants";
import joypad from "../src/joypad";
import emitter from "../src/emitter";

describe("joypad", () => {
  let changedAxisMovementThreshold;

  beforeAll(() => {
    changedAxisMovementThreshold = 0.3;
    joypad.instances = { 0: "Gamepad" } as any;
  });

  test("Check joypad instance", () => {
    expect(joypad.loopStarted).toEqual(false);

    expect(joypad.settings.axisMovementThreshold).toEqual(
      AXIS_MOVEMENT_THRESHOLD
    );

    joypad.set({ axisMovementThreshold: changedAxisMovementThreshold });
    expect(joypad.settings.axisMovementThreshold).toEqual(
      changedAxisMovementThreshold
    );

    joypad.remove(0);
    expect(joypad.instances).toEqual({});
  });

  test("trigger", () => {
    const mockPublish = vi
      .spyOn(emitter, "publish")
      .mockImplementation(() => {});

    joypad.trigger("a" as any, "b");

    expect(mockPublish).toHaveBeenCalledTimes(1);
    expect(mockPublish).toHaveBeenCalledWith("a", "b");
  });
});
