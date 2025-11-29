const request = require("supertest");
const app = require("../app");

describe("Auth Flow", () => {
  it("redirects to Google OAuth on /auth/google", async () => {
    const res = await request(app).get("/auth/google");
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("accounts.google.com");
  });

  it("blocks protected routes without login", async () => {
    const res = await request(app).get("/dashboard");
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("/login");
  });
});
