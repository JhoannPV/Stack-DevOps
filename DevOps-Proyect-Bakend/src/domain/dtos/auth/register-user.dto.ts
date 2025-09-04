export class RegisterUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) { }

    static create(object: { [key: string]: any }): RegisterUserDto {
        const { name, email, password } = object;

        return new RegisterUserDto(name, email.toLowerCase(), password);
    }
}