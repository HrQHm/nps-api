import { Repository, Not, IsNull } from "typeorm";
import dataSource from "../../../../../database";
import { ISurveysUsersRepository } from "../../../repositories/ISurveysUsersRepository";
import { SurveyUser } from "../entities/SurveyUser";

class SurveysUsersRepository implements ISurveysUsersRepository {
    private repository: Repository<SurveyUser>
    constructor() {
        this.repository = dataSource.getRepository(SurveyUser);
    }

    async create(user_id: string, survey_id: string): Promise<SurveyUser> {
        const surveyUser = await this.repository.create({
            user_id,
            survey_id,
        });

        await this.repository.save(surveyUser);
        return surveyUser;
    };

    async findSurveyUserByUserId(user_id: string): Promise<SurveyUser> {
        const surveyUser = await this.repository.findOne({
            where: { user_id, value: null },
            relations: ["user", "survey"]
        });

        return surveyUser;
    };


    async findSurveyUserById(id: string): Promise<SurveyUser> {
        const surveyUser = await this.repository.findOneBy({
            id
        });
        return surveyUser;
    };

    async updateSurveyUserValue(value: number, id: string): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ value })
            .where("id = :id")
            .setParameters({ id })
            .execute()
    };

    async listByIdSurvey(id: string): Promise<SurveyUser[]> {
        const surveysUsers = await this.repository.findBy({
            survey_id: id,
            value: Not(IsNull())
        });
        return surveysUsers;
    }

};

export { SurveysUsersRepository };