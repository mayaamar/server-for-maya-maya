import request from "supertest";
import app from "../src/index";
import { StatusCodes } from "http-status-codes";

describe("Items routes", () => {
    it("should get item by id", async () => {
        const item = {
            name: "EggRoll",
            price: 25,
            stock: 100,
            category: "Food",
            supplier: "658d9abd292472a6681f7a11",
        };
        const result = await request(app)
            .post("/items")
            .set("Accept", "application/json")
            .send(item)
        expect(result.status).toBe(StatusCodes.CREATED);
        expect(result.body).toHaveProperty("_id");
    });
});
