import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Set up a mock service worker that intercepts API requests
export const worker = setupWorker(...handlers);