import supertest from "supertest"
import { app } from "../../server"
const request = supertest(app)

describe("Users Controller", () => {
  const user = {
    firstname: "tauseef",
    lastname: "ahmed",
    username: "tasueefAhmed",
    password: "hello123",
  }

  let _token: string // = process.env.token as string;

  beforeAll(async () => {
    await request.delete("/users")
    const user = {
      firstname: "tauseef",
      lastname: "Ahmed",
      username: "tasueefAhmed",
      password: "hello123",
    }

    const result = await request.post("/users").send(user)

    const { token } = result.body
    _token = token
  })

  afterAll(async () => {
    await request.delete("/users")
  })

  it("Should create a new order", async () => {
    const response = await request.post("/users").send(user)

    expect(response.status).toBe(200)
  })

  it("Gets Users list", async () => {
    const response = await request
      .get("/users")
      .set("Authorization", "Bearer " + _token)

    expect(response.status).toBe(200)
  })

  it("Gets specific User ", async () => {
    const response = await request
      .get("/users/1")
      .set("Authorization", "Bearer " + _token)

    expect(response.status).toBe(200)
  })

  it("Should Update the User", async () => {
    const response = await request
      .put("/users/1")
      .send({
        username: "Updated Name",
      })
      .set("Authorization", "Bearer " + _token)

    expect(response.status).toBe(200)
  })

  it("Should return error if login information is incorrect", async () => {
    const response = await request
      .get("/users/authenticate")
      .set("Authorization", "Bearer " + _token)

    expect(response.status).toBe(404)
  })

  it("Should Delete the User", async () => {
    const response = await request
      .delete("/users/1")
      .set("Authorization", "Bearer " + _token)

    expect(response.status).toBe(200)
  })

  it("Should Return error if Auth Token is missing", async() => {
    await request.get("/users").then((res) => {
      expect(res.status).toBe(405)
    })

    await request.get("/users/1").then((res) => {
      expect(res.status).toBe(405)
    })

    await request
      .put("/users/1")
      .send({
        firstname: user.firstname + "update",
        lastname: user.lastname + "update",
      })
      .then((res) => {
        expect(res.status).toBe(405)
      })

    await request.delete("/users/1").then((res) => {
      expect(res.status).toBe(405)
    })
  })
})
