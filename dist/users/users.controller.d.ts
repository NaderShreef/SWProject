import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findById(userId: string): Promise<User>;
    updateUser(userId: string, updates: Partial<User>): Promise<User>;
    deleteUser(userId: string): Promise<User>;
}
