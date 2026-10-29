// fixtures/index.ts
import { mergeTests } from "@playwright/test";

import { test as authTest } from "./auth";
import { test as bookingTest } from "./booking";

export const test = mergeTests(authTest, bookingTest);
export { expect } from "@playwright/test";
