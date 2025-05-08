import { describe, expect, it, vi } from "vitest";
import { TestHelper } from "./helpers/test-helper";
import Card from "@/components/Card/Card.vue";
import { useCardsStore } from "@/stores/card";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

describe("Card", () => {
  const titleLocator = ".title-wrapper";
  const contentLocator = ".content";
  const deleteButtonLocator = ".delete-btn";

  const props = {
    id: 1,
    title: "Test card",
    content: "This is a test card",
  };

  it("renders properly", () => {
    const wrapper = TestHelper.mount(Card, { props });
    const title = wrapper.find(titleLocator);
    const content = wrapper.find(contentLocator);
    const deleteButton = wrapper.find(deleteButtonLocator);

    expect(title.isVisible()).toBe(true);
    expect(title.text()).toBe(props.title);

    expect(content.isVisible()).toBe(true);
    expect(content.text()).toBe(props.content);

    expect(deleteButton.exists()).toBe(false);
  });

  it("renders default text when no content provided", () => {
    const wrapper = TestHelper.mount(Card, {
      props: {
        ...props,
        content: "",
      },
    });
    const content = wrapper.find(contentLocator);

    expect(content.isVisible()).toBe(true);
    expect(content.text()).toBe("Enter the description here");
  });

  it("renders the delete button after hover on desktop", async () => {
    const wrapper = TestHelper.mount(Card, { props });

    await wrapper.trigger("mouseenter");

    const deleteButton = wrapper.find(deleteButtonLocator);

    expect(deleteButton.isVisible()).toBe(true);
  });

  it("removes the delete button after hover out on desktop", async () => {
    const wrapper = TestHelper.mount(Card, { props });

    await wrapper.trigger("mouseenter");
    await wrapper.trigger("mouseleave");

    const deleteButton = wrapper.find(deleteButtonLocator);

    expect(deleteButton.exists()).toBe(false);
  });

  it("renders the delete button by default on mobile", () => {
    const wrapper = TestHelper.mount(Card, {
      props,
      global: {
        mocks: {
          $isMobile: () => true,
        },
      },
    });
    const deleteButton = wrapper.find(deleteButtonLocator);

    expect(deleteButton.isVisible()).toBe(true);
  });

  it("removes card on delete button click", async () => {
    const pinia = createTestingPinia();
    const spy = vi.spyOn(useCardsStore(), "removeCard");
    const wrapper = mount(Card, {
      props,
      global: {
        plugins: [pinia],
        mocks: {
          $isMobile: () => true,
        },
      },
    });

    const deleteButton = wrapper.find(deleteButtonLocator);

    await deleteButton.trigger("click");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(props.id);
  });
});
