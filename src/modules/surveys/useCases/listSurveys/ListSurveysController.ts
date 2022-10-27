import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSurveysUseCase } from "./ListSurveysUseCase";

class ListSurveysController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSurvysUseCase = container.resolve(ListSurveysUseCase);
        const surveys = await listSurvysUseCase.execute();

        return response.json(surveys);
    }
};

export { ListSurveysController };