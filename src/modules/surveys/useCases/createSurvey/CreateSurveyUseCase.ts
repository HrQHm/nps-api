import { inject, injectable } from "tsyringe";
import { Survey } from "../../infra/typeorm/entities/Survey";
import { ISurveysRepository } from "../../repositories/ISurveysRepository";

@injectable()
class CreateSurveyUseCase {
    constructor(
        @inject("SurveysRepository")
        private surveysRepository: ISurveysRepository
    ) { }

    async execute(title: string, description: string): Promise<Survey> {
        const survey = await this.surveysRepository.create(title, description);
        return survey;
    };
};

export { CreateSurveyUseCase };