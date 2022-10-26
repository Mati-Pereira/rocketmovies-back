import UserCreateService from "./UserCreateService";
import userRepositoryInMemory from "../repositories/UserRepositoryInMemory";
import AppError from "../utils/AppError";

describe("UserCreateService", () => {
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
  it("user should not be able to create a email while there is a email in database", async () => {
    const user1 = {
      name: "User1",
      email: "user@test.com",
      password: "4564561",
    };
    const user2 = {
      name: "User2",
      email: "user@test.com",
      password: "4554456",
    };
    const userCreateService = new UserCreateService(userRepositoryInMemory);
    await userCreateService.execute(user1);
    expect(async () => {
      await userCreateService.execute(user2);
    }).rejects.toEqual(new AppError("Este e-mail já está em uso."));
  });
});
