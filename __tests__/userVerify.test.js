const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");

beforeAll(async () => {
  const url = "mongodb://127.0.0.1:27017/test5";
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
    verificationCode:"123456",
  });
  await newUser.save();
});

describe("verifying user", () => {
  const post = (phone, code) => {
    return request(app)
      .post("/api/v1/users/verify")
      .send({ phone: phone, code: code });
  };
  it("returns status code 200 when the code is correct", async () => {
    const response = await post("09303294693","123456")
    console.log(response);
    expect(response.status).toBe(200)
  });
});
