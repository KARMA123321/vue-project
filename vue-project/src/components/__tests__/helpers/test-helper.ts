import { createTestingPinia } from "@pinia/testing";
import { mount, type ComponentMountingOptions } from "@vue/test-utils";
import VueMobileDetection from "vue-mobile-detection";

export class TestHelper {
  static mount(component: any, props: ComponentMountingOptions<any, unknown> = {}) {
    return mount(component, {
      global: {
        plugins: [createTestingPinia(), VueMobileDetection],
      },
      ...props,
    });
  }
}
