import { CommentModel } from './comment.model';

export interface ArticleModel {
    title: string;
    abstract: string;
    key_words: string;
    authors: string[];
    author_id: string;
    publishing_id: string;
    date: Date;
    state: string;
    file: string;
    assessors: string[];
    comments: CommentModel[];
    id: string;
}