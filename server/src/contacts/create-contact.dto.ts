import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateContactDto {
  @ApiProperty({ example: 'Jennifer Mendoza', description: 'Name of contact' })
  @IsString({ message: 'Name should be string' })
  readonly name: string

  @ApiProperty({
    example: '91955 Mosinee Parkway, Indianapolis, IN 46278',
    description: 'Address of contact',
  })
  @IsString({ message: 'Address should be string' })
  readonly address: string

  @ApiProperty({
    example: '(314) 291-6958',
    description: 'Phone number of contact',
  })
  @IsString({ message: 'Phone number should be string' })
  readonly phone: string

  @ApiProperty({
    example: '/profiles/jennifer-mendoza.jpg',
    description: 'Photo url of contact',
  })
  @IsString({ message: 'Photo url should be string' })
  readonly photoUrl: string
}
