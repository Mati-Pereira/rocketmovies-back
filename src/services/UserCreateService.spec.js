import UserCreateService from "./UserCreateService";
import userRepositoryInMemory from "../repositories/UserRepositoryInMemory";

it("user should be create", async () => {
  const user = {
    name: "User test",
    email: "user@test.com",
    password: "2645789",
  };

  const userCreateService = new UserCreateService(userRepositoryInMemory);
  const userCreated = await userCreateService.execute(user);

  expect(userCreated).toHaveProperty("id");
});
