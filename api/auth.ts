import { APIRequestContext } from "@playwright/test";

import { AUTH_ENDPOINT } from "@/utils/route";

type Credentials = Partial<{ username: string; password: string }>;

class AuthApi {
  constructor(private request: APIRequestContext) {}

  getToken(data: Credentials) {
    return this.request.post(AUTH_ENDPOINT, { data });
  }
}

export default AuthApi;
