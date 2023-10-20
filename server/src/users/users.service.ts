import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'
import { CreateUserDto } from './create-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(dto)
  }

  async createManyUsers(dto: CreateUserDto[]): Promise<User[]> {
    const createdContacts: User[] = []
    for (const createContactDto of dto) {
      const contact = await this.userRepository.create(createContactDto)
      createdContacts.push(contact)
    }
    return createdContacts
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    })
    console.log(user)
    return await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    })
  }
}
