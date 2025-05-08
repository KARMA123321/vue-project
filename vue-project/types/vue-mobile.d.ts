import { ComponentCustomProperties } from "vue";
import { detectMobile } from "vue-mobile-detection";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $isMobile: detectMobile;
  }
}
