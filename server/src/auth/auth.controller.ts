import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '../users/create-user.dto'
import { AuthService } from './auth.service'

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(
    @Body() loginDto: Omit<CreateUserDto, 'admin'>,
  ): Promise<{ token: string }> {
    return this.authService.login(loginDto)
  }

  @Post('/register')
  register(
    @Body() registerDto: Omit<CreateUserDto, 'admin'>,
  ): Promise<{ token: string }> {
    return this.authService.register(registerDto)
  }
}
