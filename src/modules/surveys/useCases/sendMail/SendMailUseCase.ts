import { inject, injectable } from "tsyringe";
import { resolve } from 'path';
import { AppError } from "../../../../errors/AppError";
import SendMailService from "../../../../services/SendMailService";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { ISurveysRepository } from "../../repositories/ISurveysRepository";
import { ISurveysUsersRepository } from "../../repositories/ISurveysUsersRepository";
import { SurveyUser } from "../../infra/typeorm/entities/SurveyUser";
import { IMailProvider } from "../../../../services/MailProvider/IMailProvider";

@injectable()
class SendMailUseCase {
    constructor(
        @inject("SurveysUsersRepository")
        private surveysUsersRepository: ISurveysUsersRepository,
        @inject("SurveysRepository")
        private surveysRepository: ISurveysRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("SendMailProvider")
        private sendMailProvider: IMailProvider
    ) { }

    async execute(email: string, survey_id: string): Promise<SurveyUser> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User not exist");
        };

        const survey = await this.surveysRepository.findById(survey_id);

        if (!survey) {
            throw new AppError("Survey not exist");
        };

        const npsPath = resolve(__dirname, "..", "..", "views", "emails", "npsMail.hbs");

        const surveyUserAlreadyExists = await this.surveysUsersRepository.findSurveyUserByUserId(user.id);

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        };

        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await this.sendMailProvider.sendMail(email, survey.title, variables, npsPath);
            return surveyUserAlreadyExists;
        };

        const surveyUser = await this.surveysUsersRepository.create(
            user.id,
            survey_id
        );

        variables.id = surveyUser.id;
        await this.sendMailProvider.sendMail(email, survey.title, variables, npsPath);
        return surveyUser;
    };
};

export { SendMailUseCase };