import { SurveysRepositoryInMemory } from "../../repositories/in-memory/SurveysRepositoryInMemory";
import { CreateSurveyUseCase } from "./CreateSurveyUseCase";

let surveyRepositoryInMemory: SurveysRepositoryInMemory;
let createSurveyUseCase: CreateSurveyUseCase;

describe("Create a survey", () => {
    beforeEach(() => {
        surveyRepositoryInMemory = new SurveysRepositoryInMemory();
        createSurveyUseCase = new CreateSurveyUseCase(surveyRepositoryInMemory)
    });

    it("Should be able to create a survey", async () => {
        await createSurveyUseCase.execute("Test", "Survey Test");
        const survey = await surveyRepositoryInMemory.list();
        expect(survey).toHaveLength(1);
    });
});