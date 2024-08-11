interface ICreateUserDto {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    email: string,
    phoneNumber: string,
    roles?: string[]
}

export default ICreateUserDto