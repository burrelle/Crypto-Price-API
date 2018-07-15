const supertest = require("supertest");
const api = supertest("http://0.0.0.0:3333/api");

describe("Asset Endpoints", () => {
  it("GET /assets - Get all assets", async () => {
    const response = await api.get("/coins");
    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty("asset_id");
    expect(response.body[0]).toHaveProperty("asset_name");
    expect(response.body[0]).toHaveProperty("asset_ticker");
    expect(response.body[0]).toHaveProperty("asset_website");
    expect(response.body[0]).toHaveProperty("asset_supply");
  });
});
