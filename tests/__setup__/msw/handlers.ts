import { http, HttpResponse } from "msw";
import type { RegisterInput, LoginInput } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const handlers = [
  http.post(`${API_URL}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as RegisterInput;

    if (!body.email || !body.password || !body.name) {
      return HttpResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    return HttpResponse.json(
      {
        token: "mock-jwt-token",
        user: {
          id: "00000000-0000-0000-0000-000000000001",
          email: body.email,
          name: body.name,
        },
      },
      { status: 201 }
    );
  }),

  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as LoginInput;

    if (body.email === "wrong@example.com") {
      return HttpResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    return HttpResponse.json({
      token: "mock-jwt-token",
      user: {
        id: "00000000-0000-0000-0000-000000000001",
        email: body.email,
        name: "Test User",
      },
    });
  }),

  http.post(`${API_URL}/auth/refresh`, () => {
    return HttpResponse.json({
      token: "new-mock-jwt-token",
      user: {
        id: "00000000-0000-0000-0000-000000000001",
        email: "user@example.com",
        name: "Test User",
      },
    });
  }),

  http.post(`${API_URL}/auth/logout`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
