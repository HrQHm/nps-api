import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendMailUseCase } from "./SendMailUseCase";

class SendMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, survey_id } = request.body;
        const sendMailUseCase = container.resolve(SendMailUseCase);
        const surveyUser = await sendMailUseCase.execute(email, survey_id);

        return response.status(201).json(surveyUser);
    };
};

export { SendMailController };