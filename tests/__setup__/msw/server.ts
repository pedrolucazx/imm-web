import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// Start server before all tests in any file that imports this module
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

// Reset handlers after each test to avoid state pollution
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());
