const test = require("node:test");
const assert = require("node:assert/strict");

const baseUrl = process.env.API_URL || "http://localhost:5000";

test("health endpoint confirms that the API is available", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, "ok");
});

test("products endpoint returns an array of stored products", async () => {
  const response = await fetch(`${baseUrl}/api/products`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.ok(Array.isArray(body));
});
