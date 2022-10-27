import { DataSource } from "typeorm";
import { Survey } from "../modules/surveys/infra/typeorm/entities/Survey";
import { SurveyUser } from "../modules/surveys/infra/typeorm/entities/SurveyUser";
import { User } from "../modules/users/infra/typeorm/entities/User";
import { CreateUsers1665934230905 } from './migrations/1665934230905-CreateUsers'
import { CreateSurveys1666042486178 } from "./migrations/1666042486178-CreateSurveys";
import { CreateSurveysUsers1666458934047 } from "./migrations/1666458934047-CreateSurveysUsers";

const dataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/database.sqlite",
    entities: [
        User,
        Survey,
        SurveyUser
    ],
    migrations: [
        CreateUsers1665934230905,
        CreateSurveys1666042486178,
        CreateSurveysUsers1666458934047
    ]
});

export function createConnection(host = "database"): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
}

export default dataSource;