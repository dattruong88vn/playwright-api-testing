import { expect, test } from "@playwright/test";

import AuthApi from "@/api/auth";

import { PASSWORD, USERNAME } from "@/utils/constants";

let authApi: AuthApi;

test.beforeEach(async ({ request }) => {
  authApi = new AuthApi(request);
});

test("/auth: get token success with correct user", async () => {
  const response = await authApi.getToken({
    username: USERNAME,
    password: PASSWORD,
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.token).toBeTruthy();
});

test.describe("auth rejects invalid credentials", () => {
  const invalidCases = [
    {
      name: "rejects when wrong username",
      data: { username: "wrong_username", password: PASSWORD },
    },
    {
      name: "rejects when wrong password",
      data: { username: USERNAME, password: "wrong_password" },
    },
    { name: "rejects when missing username", data: { password: PASSWORD } },
    { name: "rejects when missing password", data: { username: USERNAME } },
  ];

  for (const { name, data } of invalidCases) {
    test(name, async () => {
      const response = await authApi.getToken(data);
      expect(response.status()).toBe(200); // Restful-Booker trả 200 kèm reason khi sai thông tin, không dùng 401
      const responseBody = await response.json();
      expect(responseBody).toEqual({ reason: "Bad credentials" });
    });
  }
});
