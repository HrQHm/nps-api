import { Survey } from "../infra/typeorm/entities/Survey";


interface ISurveysRepository {
    create(title: string, description: string): Promise<Survey>;
    list(): Promise<Survey[]>;
    findById(id: string): Promise<Survey | null>;
}

export { ISurveysRepository }