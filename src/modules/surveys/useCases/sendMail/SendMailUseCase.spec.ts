import { UsersRepositoryInMemory } from "../../../users/repositories/in-memory/UsersRepositoryInMemory";
import { SurveysRepositoryInMemory } from "../../repositories/in-memory/SurveysRepositoryInMemory";
import { SurveysUsersRepositoryInMemory } from "../../repositories/in-memory/SurveysUsersRepositoryInMemory";
import { SendMailUseCase } from "./SendMailUseCase";
import SendMailService from "../../../../services/SendMailService";
import "dotenv/config";
import { SendMailProviderInMemory } from "../../../../services/MailProvider/in-memory/SendMailProviderInMemory";
import { AppError } from "../../../../errors/AppError";

let sendMailUseCase: SendMailUseCase;
let surveysUsersRepositoryInMemory: SurveysUsersRepositoryInMemory;
let surveyRepositoryInMemory: SurveysRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let mailProviderInMemory: SendMailProviderInMemory;

describe("Send Mail Survey", () => {
    beforeEach(() => {
        surveyRepositoryInMemory = new SurveysRepositoryInMemory();
        surveysUsersRepositoryInMemory = new SurveysUsersRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        mailProviderInMemory = new SendMailProviderInMemory();
        sendMailUseCase = new SendMailUseCase(
            surveysUsersRepositoryInMemory,
            surveyRepositoryInMemory,
            usersRepositoryInMemory,
            mailProviderInMemory
        );
    });

    it("Should be able to send mail", async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

        await usersRepositoryInMemory.create("Test", "test@mail.com.br");
        const survey = await surveyRepositoryInMemory.create("Test", "Survey Test");

        await sendMailUseCase.execute("test@mail.com.br", survey.id);
        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send mail if user does not exist", async () => {
        await expect(sendMailUseCase.execute("test@mail.com.br", "survey_id"))
            .rejects
            .toEqual(new AppError("User not exist"));
    });

    it("Should not be able to send mail if survey does not exist", async () => {
        await usersRepositoryInMemory.create("Test", "test@mail.com.br");
        await expect(sendMailUseCase.execute("test@mail.com.br", "survey_id"))
            .rejects
            .toEqual(new AppError("Survey not exist"));
    });
});