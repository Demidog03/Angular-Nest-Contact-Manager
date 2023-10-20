import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ContactsService } from './contacts.service'
import { CreateContactDto } from './create-contact.dto'
import { Contact } from './contacts.model'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @ApiOperation({ summary: 'Contact creation' })
  @ApiResponse({ status: 200, type: Contact })
  @Post()
  create(@Body() contactDto: CreateContactDto): Promise<Contact> {
    return this.contactService.createContact(contactDto)
  }

  @ApiOperation({ summary: 'Many contacts creation' })
  @ApiResponse({ status: 200, type: [Contact] })
  @Post('/many')
  createMany(@Body() contactsDto: CreateContactDto[]): Promise<Contact[]> {
    return this.contactService.createManyContacts(contactsDto)
  }

  @ApiOperation({ summary: 'Getting all contacts' })
  @ApiResponse({ status: 200, type: [Contact] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<Contact[]> {
    return this.contactService.getAllContact()
  }
}
