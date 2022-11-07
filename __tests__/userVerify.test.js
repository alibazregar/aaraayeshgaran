const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");
const Code = require("../src/models/code");

beforeAll(async () => {
  const url = "mongodb://127.0.0.1:27017/test3";
  await mongoose.connect(url, { useNewUrlParser: true });
});
beforeEach(async () => {
  await User.deleteMany({});
  const newUser = new User({
    firstName: "user11",
    lastName: "user1234",
    email: "user1@gmail.com",
    password: "password",
    phone: "09303294693",
    confirmPassword: "password",
  });
  await newUser.save();
  const newCode = new Code({
    phone: "09303294693",
    code: "123456",
  });
  await newCode.save();
});
describe("verifying user", () => {
  const post = (phone, code) => {
    return request(app)
      .post("/api/v1/users/verify")
      .send({ phone: phone, code: code });
  };
  it("returns status code 200 when the code is correct", async () => {
    const response = await post("09303294693","123456")
    expect(response.status).toBe(200)
  });
});
