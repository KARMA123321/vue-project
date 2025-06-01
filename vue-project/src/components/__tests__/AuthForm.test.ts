import { describe, it, expect, vi } from "vitest";
import AuthForm from "@/components/AuthForm/AuthForm.vue";
import { TestHelper } from "@/components/__tests__/helpers/test-helper";
import type { DOMWrapper } from "@vue/test-utils";
import { AuthApi } from "@/api/auth-api";

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    go: vi.fn(),
  }),
}));

const emailLocator = "input[id='email']";
const passwordLocator = "input[id='password']";
const submitButtonLocator = "input[type='submit']";

const email = "pdd@example.com";
const password = "123";

describe("AuthForm", () => {
  it("renders properly", () => {
    const wrapper = TestHelper.mount(AuthForm, {
      props: { email, password },
    });

    const emailLabel = wrapper.find("label[for='email']");
    const emailInput = wrapper.find(emailLocator) as DOMWrapper<HTMLInputElement>;
    const passwordLabel = wrapper.find("label[for='password']");
    const passwordInput = wrapper.find(passwordLocator) as DOMWrapper<HTMLInputElement>;
    const submit = wrapper.find(submitButtonLocator) as DOMWrapper<HTMLInputElement>;

    expect.soft(emailLabel.isVisible()).toBe(true);
    expect.soft(emailLabel.text()).toBe("Email");
    expect.soft(emailInput.isVisible()).toBe(true);
    expect.soft(emailInput.element.value).toBe("pdd@example.com");

    expect.soft(passwordLabel.isVisible()).toBe(true);
    expect.soft(passwordLabel.text()).toBe("Password");
    expect.soft(passwordInput.isVisible()).toBe(true);
    expect.soft(passwordInput.element.value).toBe("123");
    expect.soft(passwordInput.element.type).toBe("password");

    expect.soft(submit.isVisible()).toBe(true);
    expect.soft(submit.element.value).toBe("Submit");
  });

  it("types in the email and password fields", async () => {
    const wrapper = TestHelper.mount(AuthForm);

    const emailInput = wrapper.find(emailLocator) as DOMWrapper<HTMLInputElement>;
    const passwordInput = wrapper.find(passwordLocator) as DOMWrapper<HTMLInputElement>;

    await emailInput.setValue(email);
    await passwordInput.setValue(password);

    expect.soft(emailInput.element.value).toBe(email);
    expect.soft(passwordInput.element.value).toBe(password);
  });

  it("makes auth request on submit", async () => {
    const spy = vi.spyOn(AuthApi, "login").mockResolvedValue(new Response(null, { status: 200 }));
    const wrapper = TestHelper.mount(AuthForm, {
      props: { email, password },
    });

    await wrapper.trigger("submit");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(email, password);
  });

  it.each([
    { email: "incorrect@example.com", password },
    { email, password: "incorrect" },
    { email: "incorrect@example.com", password: "incorrect" },
  ])("shows the error message when the form is submitted with invalid data", async (formData) => {
    const errorLocator = "p[class*='msg']";
    const errorMessage = "Login or password is incorrect";

    const wrapper = TestHelper.mount(AuthForm, {
      props: formData,
    });

    await wrapper.trigger("submit");

    const error = wrapper.find(errorLocator);

    expect(error.isVisible()).toBe(true);
    expect(error.html()).toContain(errorMessage);
  });
});
