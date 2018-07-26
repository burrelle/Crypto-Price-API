const supertest = require("supertest");
const api = supertest("http://0.0.0.0:3333/api");

describe("Price History Endpoints", () => {
  it("GET /assets - Get all assets", async () => {
    const response = await api.get("/prices/all");
    expect(response.status).toEqual(200);
    const exchange = response.body[0].exchange_name.toLowerCase()
    const base = response.body[0].base.toLowerCase()
    const quote = response.body[0].quote.toLowerCase()
    const history = await api.get("/prices/history?exchange=" + exchange + "&base=" + base + "&quote=" + quote);
    expect(history.body[0]).toHaveProperty("price_id");
    expect(history.body[0]).toHaveProperty("exchange_pair_id");
    expect(history.body[0]).toHaveProperty("price");
    expect(history.body[0]).toHaveProperty("bid");
    expect(history.body[0]).toHaveProperty("ask");
    expect(history.body[0]).toHaveProperty("basevolume");
    expect(history.body[0]).toHaveProperty("quotevolume");
    expect(history.body[0]).toHaveProperty("ts");
  });
});
