const supertest = require("supertest");
const api = supertest("http://0.0.0.0:3333/api");


describe("Pairs Endpoints", () => {
  it("GET /pairs - Get all pairs", async () => {
    const response = await api.get("/pairs");
    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty("pair_id");
    expect(response.body[0]).toHaveProperty("base");
    expect(response.body[0]).toHaveProperty("quote");
  });

  it("GET /pairs - Limit number of pairs to 10", async () => {
    const response = await api.get("/pairs?limit=10");
    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty("pair_id");
    expect(response.body[0]).toHaveProperty("base");
    expect(response.body[0]).toHaveProperty("quote");
    expect(response.body.length).toBe(10);
  });


  it("GET /pairs - Ascending by pair_id", async () => {
    const response = await api.get("/pairs?orderBy=pair_id");
    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty("pair_id");
    expect(response.body[0]).toHaveProperty("base");
    expect(response.body[0]).toHaveProperty("quote");
    let element = [];
    for (let index = 0; index < response.body.length; index++) {
      element.push(response.body[index].pair_id);
    }
    let isAscending = a => a.slice(1).map((e, i) => e > a[i]).every(x => x);
    expect(isAscending(element)).toBe(true);
  });
});
