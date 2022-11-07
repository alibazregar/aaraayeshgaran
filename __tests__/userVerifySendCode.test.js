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
  return Code.deleteMany({});
});
describe("sending verify code", () => {
  const post = (phone) => {
    return request(app)
      .post("/api/v1/users/send-verify-code")
      .send({ phone: phone });
  };
  it("generate a code when the user is valid", async () => {
    await post("09303294693");
    const createdCodes = await Code.find({});
    expect(createdCodes.length).toBe(1);
  });

  it("returns status code 200 when the user is valid", async () => {
    const response = await post("09303294693");
    expect(response.status).toBe(200);
  });
  it("returns response message when the user is valid", async () => {
    const response = await post("09303294693");
    expect(response.body.message).toBe("کد با موفقیت ارسال شد");
  });
  it("returns status code 400 when user with the phone not existed", async () => {
    const response = await post("09303294694");
    expect(response.status).toBe(400);
  });
  it("returns status code 400 when the phone is invalid", async () => {
    const response = await post("093032");
    expect(response.status).toBe(400);
  });
});
