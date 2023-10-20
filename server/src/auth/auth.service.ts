import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateUserDto } from '../users/create-user.dto'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { User } from '../users/users.model'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(
    loginDto: Omit<CreateUserDto, 'admin'>,
  ): Promise<{ token: string }> {
    const user = await this.validateUser(loginDto)
    return this.generateToken(user)
  }

  async register(
    registerDto: Omit<CreateUserDto, 'admin'>,
  ): Promise<{ token: string }> {
    const candidate = await this.userService.getUserByUsername(
      registerDto.username,
    )
    if (candidate) {
      throw new HttpException(
        'User with this username is already exist',
        HttpStatus.BAD_REQUEST,
      )
    }
    const hashPassword = await bcrypt.hash(registerDto.password, 10)
    const user = await this.userService.createUser({
      ...registerDto,
      admin: false,
      password: hashPassword,
    })
    return this.generateToken(user)
  }

  private generateToken(user: User): { token: string } {
    const payload = { username: user.username, id: user.id }
    return {
      token: this.jwtService.sign(payload),
    }
  }

  private async validateUser(
    validateUserDto: Omit<CreateUserDto, 'admin'>,
  ): Promise<User> {
    const user = await this.userService.getUserByUsername(
      validateUserDto.username,
    )
    const passwordEquals = await bcrypt.compare(
      validateUserDto.password,
      user.password,
    )
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'User not found or invalid password',
    })
  }
}
