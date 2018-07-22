const supertest = require("supertest");
const api = supertest("http://0.0.0.0:3333/api");


describe("Exchanges Endpoints", () => {
    it("GET /exchanges - Get all exchanges", async () => {
      const response = await api.get("/exchanges");
      expect(response.status).toEqual(200);
      expect(response.body[0]).toHaveProperty("exchange_id");
      expect(response.body[0]).toHaveProperty("exchange_name");
      expect(response.body[0]).toHaveProperty("countries");
      expect(response.body[0]).toHaveProperty("exchange_url");
    });
  
    it("GET /exchanges/:exchanges - Get a specific exchange", async () => {
      const findExchange = await api.get("/exchanges");
      expect(findExchange.status).toEqual(200);
      let specificExchange = findExchange.body[0].exchange_name;
      const response = await api.get('/exchanges/' + specificExchange);
      expect(response.body).toHaveProperty("exchange_id");
      expect(response.body).toHaveProperty("exchange_name");
      expect(response.body).toHaveProperty("countries");
      expect(response.body).toHaveProperty("exchange_url");
      expect(response.body.exchange_name).toEqual(specificExchange);
    });
  });