import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity, LoginUserDto } from "../../domain";
import { Request } from "express";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private readonly authDatasource: AuthDatasource,
    ) { }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }
    renewToken(req: Request): Promise<UserEntity> {
        return this.authDatasource.renewToken(req);
    }

}