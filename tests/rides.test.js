const request = require("supertest");
const app = require("../app");
const { createUserAndGetToken } = require("./helpers");

describe("Ride API", () => {
  let token;

  beforeAll(async () => {
    const user = await createUserAndGetToken();
    token = user.token;
  });

  it("creates a ride", async () => {
    const res = await request(app)
      .post("/rides")
      .set("Authorization", `Bearer ${token}`)
      .send({
        pickup: "Home",
        destination: "Airport",
        date: "2025-01-01",
        time: "10:00"
      });

    expect(res.status).toBe(201);
    expect(res.body.pickup).toBe("Home");
  });

  it("requires all fields", async () => {
    const res = await request(app)
      .post("/rides")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
  });
});