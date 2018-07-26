const supertest = require("supertest");
const api = supertest("http://0.0.0.0:3333/api");


describe("Price Endpoints", () => {
    it("GET /prices/all - Get all prices", async () => {
      const response = await api.get("/prices/all");
      expect(response.status).toEqual(200);
      expect(response.body[0]).toHaveProperty("exchange_pair_id");
      expect(response.body[0]).toHaveProperty("exchange_name");
      expect(response.body[0]).toHaveProperty("base");
      expect(response.body[0]).toHaveProperty("quote");
      expect(response.body[0]).toHaveProperty("last_price");
      expect(response.body[0]).toHaveProperty("active");
      expect(response.body[0]).toHaveProperty("price_precision");
    });
  });