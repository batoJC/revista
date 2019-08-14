import { UserModel } from './user.model';
import { AuthorModel } from './author.model';

export interface AssessorModel {
    first_name: string;
    second_name: string;
    first_last_name: string;
    second_last_name: string;
    country: string;
    phone: string;
    level_education: string;
    specialty: string;
    user_id: string;
    editor_id: string;
    state: string;
    hash: string;
    id: string;
    user: UserModel;
}