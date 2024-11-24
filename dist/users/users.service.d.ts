import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser(user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findById(userId: string): Promise<User | null>;
    updateUser(userId: string, updates: Partial<User>): Promise<User | null>;
    deleteUser(userId: string): Promise<User | null>;
}
