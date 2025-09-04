import { AuthRepository, CustomError, LoginUserDto, SignToken, UserToken } from "../..";
import { JwtAdapter } from "../../../config";

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

export class LoginUser implements LoginUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) { }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.login(loginUserDto);

        const expiredToken: number = 60 * 60 * 2; // 2 horas
        const token = await this.signToken({ id: user.id }, expiredToken);

        if (!token) {
            throw CustomError.internalServer('Error generating token');
        }

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