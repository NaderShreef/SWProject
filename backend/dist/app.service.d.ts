import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private readonly configService;
    constructor(configService: ConfigService);
    getMongoUri(): string;
    getDatabaseName(): string;
}
