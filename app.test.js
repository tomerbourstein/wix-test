const request = require("supertest");
const app = require("./server");

jest.mock("./data.json", () => require("./mock_data.json"), { virtual: true });

describe("GET /tickets", () => {
  it("should get 5 tickets based on pagination", async () => {
    const res = await request(app).get("/tickets").send();
    expect(res.body.total).toEqual(5);
  });
});

describe("GET /tickets/title", () => {
  it("should get ticket based on query:title", async () => {
    const res = await request(app)
      .get("/tickets/title")
      .query({ title: "Ticket10" })
      .send();

    expect(res.body.results[0].title).toEqual("Ticket10");
  });
  it("should get ticket based on query:title ignoring cases", async () => {
    const res = await request(app)
      .get("/tickets/title")
      .query({ title: "ticket10" })
      .send();

    expect(res.body.results[0].title).toEqual("Ticket10");
  });
});

describe("GET /tickets/time", () => {
  it("should get ticket based on to and from query", async () => {
    const res = await request(app)
      .get("/tickets/time")
      .query({ from: "0", to: "1" })
      .send();

    expect(res.body.total).toEqual(2);
  });
  it("should get no tickets if to>from", async () => {
    const res = await request(app)
      .get("/tickets/time")
      .query({ from: "1", to: "0" })
      .send();

    expect(res.body.total).toEqual(0);
  });
});

describe("GET /tickets/search", () => {
  it("should get ticket based on query in title", async () => {
    const res = await request(app)
      .get("/tickets/search")
      .query({ query: "Ticket10" })
      .send();

    expect(res.body.results[0].title).toEqual("Ticket10");
  });
  it("should get ticket based on query in content", async () => {
    const content = "Content10";
    const res = await request(app)
      .get("/tickets/search")
      .query({ query: content })
      .send();

    expect(res.body.results[0].content).toEqual("content10");
  });
  it("should get ticket based on query in email", async () => {
    const res = await request(app)
      .get("/tickets/search")
      .query({ query: "test0@example.com" })
      .send();

    expect(res.body.results[0].userEmail).toEqual("test0@example.com");
  });
});
