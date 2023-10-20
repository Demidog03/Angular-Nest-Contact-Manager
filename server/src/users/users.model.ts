import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface UserCreationAttrs {
  username: string
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({ example: 'Dave89', description: 'Username' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string

  @ApiProperty({ example: false, description: 'Is user an admin' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  admin: boolean

  @ApiProperty({
    example: 'vmsaevsdvsjia',
    description: 'User password',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string
}
