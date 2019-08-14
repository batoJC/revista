import { UserModel } from './user.model';

export interface EditorModel {
    first_name: string;
    second_name: string;
    first_last_name: string;
    second_last_name: string;
    country: string;
    phone: string;
    level_education: string;
    user_id: string;
    id: string;
    user: UserModel;
}