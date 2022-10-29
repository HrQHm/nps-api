import { IMailProvider } from "../IMailProvider";

class SendMailProviderInMemory implements IMailProvider {
    private message: any[] = [];

    async sendMail(to: string, subject: string, variables: object, path: string): Promise<void> {
        this.message.push({
            to,
            subject,
            variables,
            path
        });
    }

};

export { SendMailProviderInMemory };