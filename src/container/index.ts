import { container } from 'tsyringe';
import { SurveysRepository } from '../modules/surveys/infra/typeorm/repositories/SurveysRepository';
import { SurveysUsersRepository } from '../modules/surveys/infra/typeorm/repositories/SurveysUsersRepository';
import { ISurveysRepository } from '../modules/surveys/repositories/ISurveysRepository';
import { ISurveysUsersRepository } from '../modules/surveys/repositories/ISurveysUsersRepository';
import { UsersRepository } from '../modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../modules/users/repositories/IUsersRepository';
import { IMailProvider } from '../services/MailProvider/IMailProvider';
import { SendMailProvider } from '../services/MailProvider/implementations/SendMailProvider';

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ISurveysRepository>(
    "SurveysRepository",
    SurveysRepository
);

container.registerSingleton<ISurveysUsersRepository>(
    "SurveysUsersRepository",
    SurveysUsersRepository
);


container.registerSingleton<IMailProvider>(
    "SendMailProvider",
    SendMailProvider
);