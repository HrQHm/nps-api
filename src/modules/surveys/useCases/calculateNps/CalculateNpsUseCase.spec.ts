import { SurveysUsersRepositoryInMemory } from "../../repositories/in-memory/SurveysUsersRepositoryInMemory";
import { CalculateNpsUseCase } from "./CalculateNpsUseCase";

let calculateNpsUseCase: CalculateNpsUseCase;
let surveysUsersRepositoryInMemory: SurveysUsersRepositoryInMemory;


describe("Calculate NPS", () => {
    beforeEach(() => {
        surveysUsersRepositoryInMemory = new SurveysUsersRepositoryInMemory();
        calculateNpsUseCase = new CalculateNpsUseCase(surveysUsersRepositoryInMemory);
    });

    it("Should be able to calculate nps", async () => {
        await surveysUsersRepositoryInMemory.create("user_id1", "survey1");
        await surveysUsersRepositoryInMemory.create("user_id2", "survey1");
        const userSurvey1 = await surveysUsersRepositoryInMemory.findSurveyUserByUserId("user_id1");
        const userSurvey2 = await surveysUsersRepositoryInMemory.findSurveyUserByUserId("user_id2");
        await surveysUsersRepositoryInMemory.updateSurveyUserValue(9, userSurvey1.id);
        await surveysUsersRepositoryInMemory.updateSurveyUserValue(10, userSurvey2.id);

        const nps = await calculateNpsUseCase.execute("survey1");
        expect(nps.nps >= 100).toBeTruthy();
    });
});