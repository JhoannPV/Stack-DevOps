export class LoginUserDto {
    constructor(
        public email: string,
        public password: string,
    ) { }

    static create(object: { [key: string]: any }): LoginUserDto {
        const { email, password } = object;

        return new LoginUserDto(email.toLowerCase(), password);
    }
}