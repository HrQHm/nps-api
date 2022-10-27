import { inject, injectable } from "tsyringe";
import { ISurveysUsersRepository } from "../../repositories/ISurveysUsersRepository";

interface IResponse {
    detractors: number;
    promoters: number;
    passive: number;
    totalAnswers: number;
    nps: number;
};


@injectable()
class CalculateNpsUseCase {
    constructor(
        @inject("SurveysUsersRepository")
        private surveysUsersRepository: ISurveysUsersRepository
    ) { }
    async execute(id: string): Promise<IResponse> {
        const surveyUsers = await this.surveysUsersRepository.list(id);
        const detractors = surveyUsers.filter((survey) =>
            survey.value >= 0 && survey.value <= 6
        ).length;

        const promoters = surveyUsers.filter((survey) =>
            survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveyUsers.filter((survey) =>
            survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswers = surveyUsers.length;
        const nps = Number(
            (((promoters - promoters) / totalAnswers) * 100).toFixed(2)
        );

        return {
            detractors,
            promoters,
            passive,
            totalAnswers,
            nps
        };
    }
};

export { CalculateNpsUseCase };