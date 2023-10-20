import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './create-user.dto'
import { User } from './users.model'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private contactService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() contactDto: CreateUserDto): Promise<User> {
    return this.contactService.createUser(contactDto)
  }

  @ApiOperation({ summary: 'Many users creation' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('/many')
  createMany(@Body() contactsDto: CreateUserDto[]): Promise<User[]> {
    return this.contactService.createManyUsers(contactsDto)
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll(): Promise<User[]> {
    return this.contactService.getAllUsers()
  }
}
