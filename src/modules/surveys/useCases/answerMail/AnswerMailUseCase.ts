import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { SurveyUser } from "../../infra/typeorm/entities/SurveyUser";
import { ISurveysUsersRepository } from "../../repositories/ISurveysUsersRepository";

@injectable()
class AnswerMailUseCase {
    constructor(
        @inject("SurveysUsersRepository")
        private surveyUsersRepository: ISurveysUsersRepository
    ) { }
    async execute(id: string, value: number): Promise<SurveyUser> {
        const surveyUserExist = await this.surveyUsersRepository.findSurveyUserById(id);

        if (!surveyUserExist) {
            throw new AppError("Survey user doest not exists");
        };

        await this.surveyUsersRepository.updateSurveyUserValue(value, id);
        const surveyUserUpdated = await this.surveyUsersRepository.findSurveyUserById(id);
        return surveyUserUpdated;

    }
};

export { AnswerMailUseCase }