import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];


    async create(name: string, email: string): Promise<void> {
        const user = new User();
        Object.assign(user, ({
            name,
            email
        }));

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email)
    }

};

export { UsersRepositoryInMemory };