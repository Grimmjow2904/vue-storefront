import { describe, it, expect, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";

import ToBuy from "../ToBuy.vue";
import { createPinia, setActivePinia } from "pinia";

describe("ToBuy", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("it calculate price to 2 decimals", async () => {
    const wrapper = mount(ToBuy, {
      props: {
        product: {
          id: 5,
          title: "string",
          price: 3.5676,
          description: "stringasdsad",
          category: "string",
          image: "string",
          rating: {
            rate: 5,
            count: 7,
          },
        },
      },
    });
    await wrapper.find("input[type=number]").setValue("4");
    expect(wrapper.find("#total").text()).toBe("$14.27");
  });
});
