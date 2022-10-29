import { SurveyUser } from "../infra/typeorm/entities/SurveyUser";

interface ISurveysUsersRepository {
    create(user_id: string, survey_id: string): Promise<SurveyUser>;
    findSurveyUserByUserId(user_id: string): Promise<SurveyUser>;
    findSurveyUserById(id: string): Promise<SurveyUser>;
    updateSurveyUserValue(value: number, id: string): Promise<void>;
    listByIdSurvey(id: string): Promise<SurveyUser[]>;
};

export { ISurveysUsersRepository };