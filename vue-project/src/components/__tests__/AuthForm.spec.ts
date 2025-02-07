import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import AuthForm from "@/components/AuthForm/AuthForm.vue";

describe("AuthForm", () => {
  it("renders properly", () => {
    const wrapper = mount(AuthForm, { props: { email: "pdd@example.com", password: "123", } })

    const email = wrapper.find("input[id='email']");
    const password = wrapper.find("input[id='password']");

    // expect.soft(email).toContain('pdd@example.com');
    // expect.soft(password).toHaveLength(3);
  });
});
