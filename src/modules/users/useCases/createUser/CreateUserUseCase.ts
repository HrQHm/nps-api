import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import * as yup from 'yup';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(name: string, email: string): Promise<void> {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });


        try {
            await schema.validate({ name, email }, { abortEarly: false })
        } catch (err: any) {
            throw new AppError(err);
        }


        const userAlreadyExist = await this.usersRepository.findByEmail(email);

        if (userAlreadyExist) {
            throw new AppError("User already exists")
        }
        await this.usersRepository.create(name, email);
    }
};

export { CreateUserUseCase };