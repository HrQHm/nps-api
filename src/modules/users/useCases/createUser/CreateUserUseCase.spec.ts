import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create a user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to create a new user", async () => {
        const user = {
            name: "Test",
            email: "test@mail.com.br"
        };

        await createUserUseCase.execute(user.name, user.email);
        const createdUser = await usersRepositoryInMemory.findByEmail(user.email);
        expect(createdUser).toHaveProperty("id");
    });

    it("Should not be able to create user if already exist", async () => {
        const user = {
            name: "Test",
            email: "test@mail.com.br"
        };

        await createUserUseCase.execute(user.name, user.email);

        await expect(
            createUserUseCase.execute(user.name, user.email))
            .rejects.
            toEqual(new AppError("User already exists")
            );
    });
});