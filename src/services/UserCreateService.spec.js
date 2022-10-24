import UserCreateService from "./UserCreateService";

it("user should be create", async () => {
  const user = {
    name: "User test",
    email: "user@test.com",
    password: "2645789",
  };

  const userCreateService = new UserCreateService();
  const userCreated = await userCreateService.execute(user);

  expect(userCreated).toHaveProperty("id");
});
