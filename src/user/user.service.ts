import { Injectable, BadRequestException } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { PrismaService } from '../../prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }
    async signup(SignupUserDto: SignupUserDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                email: SignupUserDto.email
            }
        })
        if (existingUser) {
            throw new BadRequestException({ message: 'Email already registered.' })
        }
        const password = await bcrypt.hash(SignupUserDto.password, 10);
        return await this.prisma.user.create({
            data: {
                email: SignupUserDto.email,
                name: SignupUserDto.name,
                password: password
            }
        })
    }

    async login(LoginUserDto: LoginUserDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                email: LoginUserDto.email
            }
        })
        if (!existingUser) {
            throw new BadRequestException({ message: 'Invalid Credentials' })
        }
        const matchPassword = await bcrypt.compare(LoginUserDto.password, existingUser.password)
        if (!matchPassword) {
            throw new BadRequestException({ message: 'Invalid Credentials' })
        }
        const payload = { id: existingUser.id, email: existingUser.email }
        return {
            ...payload,
            accessToken: this.jwtService.sign(payload)
        }
    }

    async currentUser(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        })
        const data = {
            id: user.id,
            email: user.email
        }
        return { data }
    }
}