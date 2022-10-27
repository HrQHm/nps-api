import { Column, Entity, PrimaryColumn, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidV4 } from 'uuid';
import { User } from "../../../../users/infra/typeorm/entities/User";
import { Survey } from "./Survey";

@Entity("surveys_users")
class SurveyUser {
    @PrimaryColumn()
    id?: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column()
    survey_id: string;

    @ManyToOne(() => Survey)
    @JoinColumn({ name: "survey_id" })
    survey: Survey

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
};

export { SurveyUser }