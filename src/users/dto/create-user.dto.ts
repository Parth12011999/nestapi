import { IsNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    userName: String

    @IsString()
    password: Number
}
