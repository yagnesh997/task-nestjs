import {
    Controller,
    Get,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Res,
    UseGuards,
    Req
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Controller('api')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/users/signup')
    @UsePipes(ValidationPipe)
    async signup(@Body() SignupUserDto: SignupUserDto, @Res() res: any) {
        res.json(await this.userService.signup(SignupUserDto))
    }

    @Post('/users/login')
    @UsePipes(ValidationPipe)
    async login(@Body() LoginUserDto: LoginUserDto, @Res() res: any) {
        res.json(await this.userService.login(LoginUserDto))
    }

    @Get('/users/me')
    @UseGuards(AccessTokenGuard)
    @UsePipes(ValidationPipe)
    async currentUser(@Req() req: any, @Res() res: any) {
        res.json(await this.userService.currentUser(req.user.email))
    }

    @Get('/random-joke')
    @UseGuards(AccessTokenGuard)
    @UsePipes(ValidationPipe)
    async randomjoke(@Req() req: any, @Res() res: any) {
        const url = 'https://api.chucknorris.io/jokes/random'
        res.redirect(url)
    }

    @Get('/users/logout')
    @UseGuards(AccessTokenGuard)
    @UsePipes(ValidationPipe)
    async logout(@Req() req: any, @Res() res: any) {
        delete req.session;
        res.json({ msg: 'The user session has ended' })
    }
}