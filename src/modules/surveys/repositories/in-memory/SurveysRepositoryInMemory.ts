import { Survey } from "../../infra/typeorm/entities/Survey";
import { ISurveysRepository } from "../ISurveysRepository";

class SurveysRepositoryInMemory implements ISurveysRepository {
    surveys: Survey[] = [];
    async create(title: string, description: string): Promise<Survey> {
        const survey = new Survey();
        Object.assign(survey, ({
            title,
            description
        }));

        this.surveys.push(survey);
        return survey;
    };

    async list(): Promise<Survey[]> {
        return this.surveys;
    };

    async findById(id: string): Promise<Survey> {
        return this.surveys.find(survey => survey.id === id);
    };

};

export { SurveysRepositoryInMemory };