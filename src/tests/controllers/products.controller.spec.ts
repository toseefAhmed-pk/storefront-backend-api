import supertest from "supertest"
import { app } from "../../server"
import { Product } from "../../interfaces/products.interface"
import { User } from "../../interfaces/users.interface"

const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe("Products Controller", () => {
  const product: Product = {
    name: "Harry Potter",
    price: 100,
    category: "Books",
  }

  let _token: string

  beforeAll(async () => {
    const user: User = {
      firstname: "tauseef",
      lastname: "Ahmed",
      username: "tasueefAhmed",
      password_digest: "hello123",
    }

    const result = await request.post("/users").send(user)

    const { token } = result.body
    _token = token

    //console.log("token: ", _token);
    await request
      .post("/products")
      .send(product)
      .set("Authorization", "Bearer " + _token)
  })

  afterAll(async () => {
    await request.delete("/users")
    await request.delete("/products")
  })

  it("Should create a new Product", async () => {
    const response = await request
      .post("/products")
      .send(product)
      .set("Authorization", "Bearer " + _token)

    expect(response.status).toBe(200)
  })

  it("Gets Products list", async () => {
    const response = await request
      .get("/products")
      .set("Accept", "application/json, text/javascript, */*; q=0.01")
    expect(response.status).toBe(200)
  })

  it("Gets specific Product ", async () => {
    const response = await request
      .get("/products/1")
      .set("Accept", "application/json, text/javascript, */*; q=0.01")

    expect(response.status).toBe(200)
  })

  it("Should Update the Product", async () => {
    const response = await request
      .put("/products/1")
      .send({
        name: "Updated Name",
      })
      .set("Authorization", "Bearer " + _token)
      .set("Accept", "application/json, text/javascript, */*; q=0.01")

    expect(response.status).toBe(200)
  })

  it("Should Delete the Product", async () => {
    const response = await request
      .delete("/products/1")
      .set("Authorization", "Bearer " + _token)
      .set("Accept", "application/json, text/javascript, */*; q=0.01")

    expect(response.status).toBe(200)
  })

  it("Should Return error if Auth Token is missing", async() => {
    await request
      .post("/products")
      .send(product)
      .then((res) => {
        expect(res.status).toBe(405)
      })

    await request
      .put("/products/1")
      .send({
        name: "Updated name",
        price: 200,
      })
      .then((res) => {
        expect(res.status).toBe(405)
      })

    await request.delete("/products/1").then((res) => {
      expect(res.status).toBe(405)
    })
  })
})
