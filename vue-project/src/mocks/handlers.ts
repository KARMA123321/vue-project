import { users } from "@/constants/auth-data";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost/api/auth/login", async ({ request }) => {
    const authData = request.headers.get("Authorization")?.split(" ")[1];

    if (!authData) {
      return HttpResponse.json(
        {
          error: "No authorization header provided",
        },
        {
          status: 401,
        },
      );
    }

    const [email, password] = atob(authData).split(":");

    const isValid = users.valid.find((user) => user.email === email && user.password === password);

    if (isValid) {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Set-Cookie": `token=123456789; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`,
        },
      });
    } else {
      return HttpResponse.json(
        {
          error: "Invalid email or password",
        },
        {
          status: 401,
        },
      );
    }
  }),
];
