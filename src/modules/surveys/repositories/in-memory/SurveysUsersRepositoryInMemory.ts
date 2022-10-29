import { SurveyUser } from "../../infra/typeorm/entities/SurveyUser";
import { ISurveysUsersRepository } from "../ISurveysUsersRepository";

class SurveysUsersRepositoryInMemory implements ISurveysUsersRepository {
    surveysUsers: SurveyUser[] = [];

    async create(user_id: string, survey_id: string): Promise<SurveyUser> {
        const surveyUser = new SurveyUser();
        Object.assign(surveyUser, ({
            user_id,
            survey_id
        }));

        this.surveysUsers.push(surveyUser);
        return surveyUser;
    };

    async findSurveyUserByUserId(user_id: string): Promise<SurveyUser> {
        return this.surveysUsers.find(surveyUser => surveyUser.user_id === user_id);
    };

    async findSurveyUserById(id: string): Promise<SurveyUser> {
        return this.surveysUsers.find(surveyUser => surveyUser.id === id);
    };

    async updateSurveyUserValue(value: number, id: string): Promise<void> {
        const findIndex = this.surveysUsers.findIndex((surveyUser) => surveyUser.id === id);
        this.surveysUsers[findIndex].value = value;
    };

    async listByIdSurvey(id: string): Promise<SurveyUser[]> {
        return this.surveysUsers.filter(surveyUser => surveyUser.survey_id === id && surveyUser.value !== null);
    };

};

export { SurveysUsersRepositoryInMemory };