import { forwardRef, Module } from '@nestjs/common'
import { ContactsService } from './contacts.service'
import { ContactsController } from './contacts.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Contact } from './contacts.model'
import { AuthModule } from '../auth/auth.module'

@Module({
  providers: [ContactsService],
  controllers: [ContactsController],
  imports: [
    SequelizeModule.forFeature([Contact]),
    forwardRef(() => AuthModule),
  ],
})
export class ContactsModule {}
