import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
    create(name: string, email: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}

export { IUsersRepository }