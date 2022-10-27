import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSurveyUseCase } from "./CreateSurveyUseCase";

class CreateSurveyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { title, description } = request.body;
        const createSurveyUseCase = container.resolve(CreateSurveyUseCase);
        await createSurveyUseCase.execute(title, description);

        return response.status(201).send();
    }
};

export { CreateSurveyController };