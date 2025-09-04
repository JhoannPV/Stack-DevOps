import { AuthRepository, CustomError, RegisterUserDto, SignToken, UserToken } from "../..";
import { JwtAdapter } from "../../../config";

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>,
}

export class RegisterUser implements RegisterUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) { }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        //Crear el usuario
        const user = await this.authRepository.register(registerUserDto);

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