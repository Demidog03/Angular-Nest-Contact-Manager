import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'Dave89', description: 'Username' })
  @IsString({ message: 'Username should be string' })
  readonly username: string

  @ApiProperty({ example: false, description: 'Is user an admin' })
  @IsBoolean({ message: 'admin should be boolean' })
  readonly admin: boolean

  @ApiProperty({
    example: 'vmsaevsdvsjia',
    description: 'password',
  })
  @IsString({ message: 'Password should be string' })
  readonly password: string
}
