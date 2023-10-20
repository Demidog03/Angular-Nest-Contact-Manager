import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface ContactCreationAttrs {
  name: string
  address: string
  phone: string
  photoUrl: string
}

@Table({ tableName: 'contacts' })
export class Contact extends Model<Contact, ContactCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({ example: 'Jennifer Mendoza', description: 'Name of contact' })
  @Column({ type: DataType.STRING })
  name: string

  @ApiProperty({
    example: '91955 Mosinee Parkway, Indianapolis, IN 46278',
    description: 'Address of contact',
  })
  @Column({ type: DataType.STRING })
  address: string

  @ApiProperty({
    example: '(314) 291-6958',
    description: 'Phone number of contact',
  })
  @Column({ type: DataType.STRING })
  phone: string

  @ApiProperty({
    example: '/profiles/jennifer-mendoza.jpg',
    description: 'Photo url of contact',
  })
  @Column({ type: DataType.STRING })
  photoUrl: string
}
