import { UserModel } from './user.model';

export interface AuthorModel {
    first_name: string;
    second_name: string;
    first_last_name: string;
    second_last_name: string;
    country: string;
    phone: string;
    level_education: string;
    afilation: string;
    user_id: string;
    state: string;
    hash: string;
    id: string;
    user: UserModel;
}