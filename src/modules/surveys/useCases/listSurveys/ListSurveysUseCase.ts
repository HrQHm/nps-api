import { inject, injectable } from "tsyringe";
import { Survey } from "../../infra/typeorm/entities/Survey";
import { ISurveysRepository } from "../../repositories/ISurveysRepository";

@injectable()
class ListSurveysUseCase {
    constructor(
        @inject("SurveysRepository")
        private surveysRepositry: ISurveysRepository
    ) { }

    async execute(): Promise<Survey[]> {
        const surveys = await this.surveysRepositry.list();
        return surveys;
    }
};

export { ListSurveysUseCase };