import Router from 'express';
import { AnswerMailController } from './modules/surveys/useCases/answerMail/AnswerMailController';
import { CalculateNpsController } from './modules/surveys/useCases/calculateNps/CalculateNpsController';
import { CreateSurveyController } from './modules/surveys/useCases/createSurvey/CreateSurveyController';
import { ListSurveysController } from './modules/surveys/useCases/listSurveys/ListSurveysController';
import { SendMailController } from './modules/surveys/useCases/sendMail/SendMailController';
import { CreateUserController } from './modules/users/useCases/createUser/CreateUserController';

const router = Router();

const createUserController = new CreateUserController();
const createSurveyController = new CreateSurveyController();
const listSurveysController = new ListSurveysController();
const sendMailController = new SendMailController();
const answerMailController = new AnswerMailController();
const calculateNpsController = new CalculateNpsController();

router.post("/user", createUserController.handle);
router.post("/survey", createSurveyController.handle);
router.get("/surveys", listSurveysController.handle);
router.post("/mail", sendMailController.handle);
router.get("/answers/:value", answerMailController.handle);
router.get("/nps/:survey_id", calculateNpsController.handle);
export { router };