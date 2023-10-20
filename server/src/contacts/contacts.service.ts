import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Contact } from './contacts.model'
import { CreateContactDto } from './create-contact.dto'

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact) private contactRepository: typeof Contact,
  ) {}

  async createContact(dto: CreateContactDto): Promise<Contact> {
    return await this.contactRepository.create(dto)
  }

  async createManyContacts(dto: CreateContactDto[]): Promise<Contact[]> {
    const createdContacts: Contact[] = []
    for (const createContactDto of dto) {
      const contact = await this.contactRepository.create(createContactDto)
      createdContacts.push(contact)
    }
    return createdContacts
  }

  async getAllContact(): Promise<Contact[]> {
    return await this.contactRepository.findAll()
  }
}
