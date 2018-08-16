const supertest = require("supertest");
const api = supertest("http://ec2-52-40-20-31.us-west-2.compute.amazonaws.com/api");

describe("Asset Endpoints", () => {
  it("GET /assets - Get all assets", async () => {
    const response = await api.get("/assets");
    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty("asset_id");
    expect(response.body[0]).toHaveProperty("asset_name");
    expect(response.body[0]).toHaveProperty("asset_ticker");
    expect(response.body[0]).toHaveProperty("asset_website");
    expect(response.body[0]).toHaveProperty("asset_circ_supply");
    expect(response.body[0]).toHaveProperty("asset_total_supply");
    expect(response.body[0]).toHaveProperty("exchanges");
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
    expect(response.body).toHaveProperty("asset_circ_supply");
    expect(response.body).toHaveProperty("asset_total_supply");
    expect(response.body).toHaveProperty("exchanges");
    expect(response.body.asset_ticker).toEqual(specificAsset);
  });

  it("GET /assets - Ascending by asset_total_supply", async () => {
    const response = await api.get("/assets?orderByTotalSupply=true");
    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty("asset_id");
    expect(response.body[0]).toHaveProperty("asset_name");
    expect(response.body[0]).toHaveProperty("asset_ticker");
    expect(response.body[0]).toHaveProperty("asset_website");
    expect(response.body[0]).toHaveProperty("asset_circ_supply");
    expect(response.body[0]).toHaveProperty("asset_total_supply");
    expect(response.body[0]).toHaveProperty("exchanges");
    let element = [];
    for (let index = 0; index < response.body.length; index++) {
      if (response.body[index].asset_total_supply != null)
        element.push(response.body[index].asset_total_supply);
    }
    let unique = element.filter((v, i, a) => a.indexOf(v) === i); 
    let isAscending = a => a.slice(1).map((e, i) => e > a[i]).every(x => x);
    expect(isAscending(unique)).toBe(true);
  });
});
