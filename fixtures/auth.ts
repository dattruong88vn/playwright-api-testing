import { expect, test as base } from "@playwright/test";

import AuthApi from "@/api/auth";

import { PASSWORD, USERNAME } from "@/utils/constants";

import { ResponseAuth } from "@/models/auth";

interface AuthApiFixture {
  authApi: AuthApi;
  token: string;
}

export const test = base.extend<AuthApiFixture>({
  authApi: async ({ request }, use) => {
    const authApi = new AuthApi(request);
    await use(authApi);
  },
  token: async ({ authApi }, use) => {
    const response = await authApi.getToken({
      username: USERNAME,
      password: PASSWORD,
    });
    expect(response.status()).toBe(200);
    const responseBody: ResponseAuth = await response.json();
    expect(responseBody.token).toBeTruthy();
    await use(responseBody.token);
  },
});

export { expect };
