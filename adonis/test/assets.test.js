const supertest = require("supertest");
const api = supertest("http://ec2-52-89-90-170.us-west-2.compute.amazonaws.com/api");

describe("Asset Endpoints", () => {
  it("GET /assets - Get all assets", async () => {
    const response = await api.get("/assets");
    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty("asset_id");
    expect(response.body[0]).toHaveProperty("asset_name");
    expect(response.body[0]).toHaveProperty("asset_ticker");
    expect(response.body[0]).toHaveProperty("asset_website");
    expect(response.body[0]).toHaveProperty("asset_supply");
  });

  it("GET /assets/:asset - Get a specific asset", async () => {
    const findAsset = await api.get("/assets");
    expect(findAsset.status).toEqual(200);
    let specificAsset = findAsset.body[0].asset_ticker;
    const response = await api.get('/assets/' + specificAsset);
    expect(response.body).toHaveProperty("asset_id");
    expect(response.body).toHaveProperty("asset_name");
    expect(response.body).toHaveProperty("asset_ticker");
    expect(response.body).toHaveProperty("asset_website");
    expect(response.body).toHaveProperty("asset_supply");
    expect(response.body.asset_ticker).toEqual(specificAsset);
  });
});
