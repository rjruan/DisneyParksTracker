const request = require("supertest");
const app = require("../app");
const { createUserAndGetToken, createRideForUser } = require("./helpers");

describe("Access Control for Rides", () => {
  let userA, userB, tokenA, tokenB, rideA, rideB;

  beforeAll(async () => {
    userA = await createUserAndGetToken();
    userB = await createUserAndGetToken();

    tokenA = userA.token;
    tokenB = userB.token;

    rideA = await createRideForUser(userA.id);
    rideB = await createRideForUser(userB.id);
  });

  it("prevents user A from accessing user B’s ride", async () => {
    const res = await request(app)
      .get(`/rides/${rideB.id}`)
      .set("Authorization", `Bearer ${tokenA}`);

    expect(res.status).toBe(403);
  });

  it("prevents user A from deleting user B’s ride", async () => {
    const res = await request(app)
      .delete(`/rides/${rideB.id}`)
      .set("Authorization", `Bearer ${tokenA}`);

    expect(res.status).toBe(403);
  });
});