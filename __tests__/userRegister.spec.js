const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");

beforeAll(async () => {
  const url = "mongodb://127.0.0.1:27017/test4";
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
      phone: "09303294693",
      confirmPassword: "password",
    });
  };
  const postUser = (user) => {
    return request(app).post("/api/v1/users/signup").send(user);
  };
  it("returns 200 when the user is valid", async () => {
    const response = await postValidUser();
    expect(response.status).toBe(200);
  });
  it("returns response message when user is valid", async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe("کاربر جدید با موفقیت ثبت شد");
  });
  it("saves a user to the database", async () => {
    const response = await postValidUser();
    const savedUser = await User.find({});
    expect(savedUser.length).toBe(1);
  });
  it("before verification user verify status is false", async () => {
    await postValidUser();
    const savedUser = await User.find({});
    const user = savedUser[0];
    expect(user.isVerified).toBe(false);
  });
  it("hashes password", async () => {
    await postValidUser();
    const savedUser = await User.find({});
    const user = savedUser[0];
    expect(user.password).not.toBe("password");
  });
  it("returns 400 when password is not equal to password confirmation", async () => {
    const response = await postUser({
      firstName: "user11",
      lastName: "user1234",
      email: "user1@gmail.com",
      password: "password",
      phone: "09303294693",
      confirmPassword: "pass1word",
    });
    expect(response.status).toBe(400);
  });
  it("returns 400 when account with the user phone exists", async () => {
    const newUser = new User({
      firstName: "user11",
      lastName: "user1234",
      email: "user12@gmail.com",
      password: "password",
      phone: "09303294693",
      confirmPassword: "pass1word",
    }).save();
    const response = await postValidUser();
    expect(response.status).toBe(400);
  });
  it("returns 400 when account with the user email exists", async () => {
    const newUser = new User({
      firstName: "user11",
      lastName: "user1234",
      email: "user1@gmail.com",
      password: "password",
      phone: "09303294694",
      confirmPassword: "pass1word",
    }).save();
    const response = await postValidUser();
    expect(response.status).toBe(400);
  });
  it.each`
  field               |  expectedMessage 
  ${"firstName"}      |${"نام خود را وارد کنید"}
  ${"lastName"}       |${"نام خانوادگی خود را وارد کنید"}
  ${"email"}          | ${"ایمیل خود را وارد کنید"}
  ${"password"}       |${"رمز خود را وارد کنید"}
  ${"confirmPassword"}|${"رمز خود را تایید کنید"}
  ${"phone"}          |${"شماره خود را وارد کنید"}
  `("should return $expectedMessage when $field is null",async({field,expectedMessage})=>{
    const user = {
      firstName: "user11",
      lastName: "user1234",
      email: "user1@gmail.com",
      password: "password",
      phone: "09303294693",
      confirmPassword: "password",
    };
    user[field]=null
    const response = await postUser(user)
    const body = response.body
    expect(body.message[0]).toBe(expectedMessage)

  })
  it.each`
  field                | value                       | statusCode
  ${"firstName"}       | ${"us"}                     | ${400}
  ${"lastName"}        | ${"usr"}                    | ${400}
  ${"email"}           | ${"test.test.com"}          | ${400}
  ${"phone"}           | ${"1234345a"}               | ${400}
  ${"password"}        | ${"pssw"}                   | ${400}
  ${"confirmPassword"} | ${"pssw"}                   | ${400}
  `
  ("should return $statusCode when $field is invalid",async({field,value,statusCode})=>{
    const user = {
      firstName: "user11",
      lastName: "user1234",
      email: "user1@gmail.com",
      password: "password",
      phone: "09303294693",
      confirmPassword: "password",
    };
    user[field]= value
    const response = await postUser(user)
    const status = response.status
    expect(status).toBe(statusCode)
  })

  


});
