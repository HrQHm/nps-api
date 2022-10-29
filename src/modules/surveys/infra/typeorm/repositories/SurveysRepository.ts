import { Repository } from "typeorm";
import dataSource from "../../../../../database";
import { ISurveysRepository } from "../../../repositories/ISurveysRepository";
import { Survey } from "../entities/Survey";


class SurveysRepository implements ISurveysRepository {
    private repository: Repository<Survey>
    constructor() {
        this.repository = dataSource.getRepository(Survey);
    }

    async create(title: string, description: string): Promise<Survey> {
        const survey = await this.repository.create({
            title,
            description
        });

        await this.repository.save(survey);
        return survey;
    };

    async list(): Promise<Survey[]> {
        const surveys = await this.repository.find();
        return surveys;
    };

    async findById(id: string): Promise<Survey | null> {
        const survey = await this.repository.findOneBy({
            id
        });

        return survey;
    }
};

export { SurveysRepository };