export interface UserModel{
    id: string;
    realm: string;
    username: string;
    email: string;
    password: string;
    rol: number;
    user: UserModel;
}