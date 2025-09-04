import { AuthRepository, CustomError, RegisterUserDto, SignToken, UserToken } from "../..";
import { JwtAdapter } from "../../../config";
import { Request } from "express";

interface RenewUseCase {
    execute(req: Request): Promise<UserToken>;
}

export class RenewToken implements RenewUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) { }

    async execute(req: Request): Promise<UserToken> {
        //Verificar que el refresh token sea valido
        const user = await this.authRepository.renewToken(req);

        //Token
        const expiredToken: number = 60 * 60 * 2; // 2 horas
        const token = await this.signToken({ id: user.id }, expiredToken);
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }
    }

}