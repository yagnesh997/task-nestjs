import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class SignupUserDto {
    @IsNotEmpty({
        message: 'Username is required',
    })
    name: string;

    @IsNotEmpty()
    @IsString({
        message: 'Email must be a string',
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20, {
        message: 'password too weak',
    })
    password: string;
}