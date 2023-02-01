import { describe, it, expect, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";

import TheHeader from "../TheHeader.vue";
import { createPinia, setActivePinia } from "pinia";

describe("TheHeader", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("cart starts at 0", () => {
    const wrapper = mount(TheHeader);
    expect(wrapper.find("#totalItems").text()).toBe("0");
  });
});
