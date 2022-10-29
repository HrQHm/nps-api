import { AppError } from "../../../../errors/AppError";
import { SurveysUsersRepositoryInMemory } from "../../repositories/in-memory/SurveysUsersRepositoryInMemory";
import { AnswerMailUseCase } from "./AnswerMailUseCase";

let answerMailUseCase: AnswerMailUseCase;
let surveysUsersRepositoryInMemory: SurveysUsersRepositoryInMemory;

describe("Answer mail survey", () => {
    beforeEach(() => {
        surveysUsersRepositoryInMemory = new SurveysUsersRepositoryInMemory();
        answerMailUseCase = new AnswerMailUseCase(surveysUsersRepositoryInMemory);
    });

    it("Should be able to answer mail survey", async () => {
        await surveysUsersRepositoryInMemory.create("user_id1", "survey1");
        const userSurvey1 = await surveysUsersRepositoryInMemory.findSurveyUserByUserId("user_id1");
        const surveyUpdated = await answerMailUseCase.execute(userSurvey1.id, 10);
        expect(surveyUpdated.value = 10).toBeTruthy();
    });

    it("Should not be able to answer mail if survey user doest not exist", async () => {
        await expect(answerMailUseCase.execute("test", 10)).rejects.toEqual(new AppError("Survey user doest not exists"));
    })
});