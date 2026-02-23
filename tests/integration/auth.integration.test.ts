/** @jest-environment node */
import "../__setup__/msw/server";
import { http, HttpResponse } from "msw";
import { server } from "../__setup__/msw/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/**
 * Integration tests for API interactions using MSW (Mock Service Worker).
 *
 * MSW intercepts real HTTP calls so we test our fetch/axios logic
 * without hitting the actual backend.
 */

// Simple fetch wrapper matching what the app will use
async function registerUser(payload: { email: string; password: string; name: string }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { status: response.status, data: await response.json() };
}

describe("Auth API — MSW integration", () => {
  it("registers a user successfully", async () => {
    const { status, data } = await registerUser({
      email: "msw@example.com",
      password: "password123",
      name: "MSW User",
    });

    expect(status).toBe(201);
    expect(data.token).toBe("mock-jwt-token");
    expect(data.user.email).toBe("msw@example.com");
  });

  it("returns 400 when required fields are missing", async () => {
    // Override handler for this specific test
    server.use(
      http.post(`${API_URL}/auth/register`, () =>
        HttpResponse.json({ error: "Missing required fields" }, { status: 400 })
      )
    );

    const { status, data } = await registerUser({ email: "", password: "", name: "" });

    expect(status).toBe(400);
    expect(data.error).toBeDefined();
  });
});
