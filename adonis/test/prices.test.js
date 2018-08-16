const supertest = require("supertest");
const api = supertest("http://ec2-52-40-20-31.us-west-2.compute.amazonaws.com/api");


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

    it("GET /prices?exchange=&base=&quote=&", async () => {
      const allPrices = await api.get('/prices/all');
      expect(allPrices.status).toEqual(200);
      const response = await api.get('/prices?exchange=' + allPrices.body[0].exchange_name + "&base=" + allPrices.body[0].base + "&quote=" + allPrices.body[0].quote);
      expect(response.status).toEqual(200);
      expect(response.body[0]).toHaveProperty("exchange_pair_id");
      expect(response.body[0]).toHaveProperty("exchange_name");
      expect(response.body[0]).toHaveProperty("base");
      expect(response.body[0]).toHaveProperty("quote");
      expect(response.body[0]).toHaveProperty("last_price");
      expect(response.body[0]).toHaveProperty("active");
      expect(response.body[0]).toHaveProperty("price_precision");
    })
  });