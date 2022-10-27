import { inject, injectable } from "tsyringe";
import { ISurveysRepository } from "../../repositories/ISurveysRepository";

@injectable()
class CreateSurveyUseCase {
    constructor(
        @inject("SurveysRepository")
        private surveysRepository: ISurveysRepository
    ) { }

    async execute(title: string, description: string): Promise<void> {
        await this.surveysRepository.create(title, description);
    };
};

export { CreateSurveyUseCase };