import { AssessorModel } from './assessor.model';

export interface CommentModel {
    assessor_id: string;
    article_id: string;
    date: Date;
    body: string;
    stars: number;
    id: string;
    assessor: AssessorModel
}