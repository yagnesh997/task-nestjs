import {
    IsNotEmpty,
    IsString
} from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsString({
        message: 'Email must be a string',
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}