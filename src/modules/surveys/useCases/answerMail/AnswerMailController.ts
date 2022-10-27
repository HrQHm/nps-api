import { Request, Response } from "express";
import { container } from "tsyringe";
import { AnswerMailUseCase } from "./AnswerMailUseCase";

class AnswerMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { value } = request.params;
        const { u } = request.query;
        const answerMailUseCase = container.resolve(AnswerMailUseCase);
        const surveyUser = await answerMailUseCase.execute(String(u), value);

        return response.status(200).json(surveyUser);
    }
};

export { AnswerMailController };