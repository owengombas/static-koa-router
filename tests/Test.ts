import Axios, { AxiosInstance } from "axios";
import { Start } from "./App/App";

describe("Test", () => {
  let requester: AxiosInstance;

  beforeAll(async () => {
    requester = Axios.create({
      baseURL: "http://localhost:1337/public"
    });
    await Start();
  });

  it("should serve as static", async () => {
    const index = (await requester.get("/")).data;
    const page = (await requester.get("/pages/first-page.html")).data;
    expect(index).toBe("hello world");
    expect(page).toBe("my first page");
  });
});
