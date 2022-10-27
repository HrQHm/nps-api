import { Repository } from "typeorm";
import dataSource from "../../../../../database";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = dataSource.getRepository(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOneBy({
            email
        });

        return user;
    }

    async create(name: string, email: string): Promise<void> {
        const user = await this.repository.create({
            name,
            email
        });

        await this.repository.save(user);
    }

};


export { UsersRepository };