import { expect, test } from "@playwright/test";

import { PING_ENDPOINT } from "@/utils/route";

test("ping responds with 201 Created", async ({ request }) => {
  const response = await request.get(PING_ENDPOINT);
  expect(response.status()).toBe(201);
});
