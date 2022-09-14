const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");

beforeAll(async () => {
  const url = "mongodb://127.0.0.1:27017/test1";
  await mongoose.connect(url, { useNewUrlParser: true });
});
beforeEach(async () => {
  return User.deleteMany({});
});
describe("user registeration", () => {
  const postValidUser = () => {
    return request(app).post("/api/v1/users/signup").send({
      firstName: "user11",
      lastName: "user1234",
      email: "user1@gmail.com",
      password: "password",
      phone:"09303294693",

    });
  };
  const postUser = (user)=>{
    return request(app).post("/api/v1/users/signup").send(user)
  }
  it("returns 200 when the user is valid", async() => {
    const response = await postValidUser()
    expect(response.status).toBe(200);

  })
 
});
