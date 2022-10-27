import { Request, Response } from "express";
import { container } from "tsyringe";
import { CalculateNpsUseCase } from "./CalculateNpsUseCase";

class CalculateNpsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { survey_id } = request.params;
        const calculateNpsUseCase = container.resolve(CalculateNpsUseCase);
        const nps = await calculateNpsUseCase.execute(survey_id);

        return response.status(200).json(nps);
    }
};

export { CalculateNpsController };