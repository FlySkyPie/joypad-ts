import { describe, expect, test } from "vitest";

import {
  log,
  findButtonMapping,
  hasVibrationSupport,
  hasGamepadApiSupport,
} from "../src/utils";

describe("helpers", () => {
  test("Check helper methods", () => {
    expect(typeof log).toEqual("function");

    expect(typeof findButtonMapping).toEqual("function");

    expect(hasVibrationSupport(null)).toEqual(false);

    expect(hasGamepadApiSupport()).toEqual(false);
  });
});
