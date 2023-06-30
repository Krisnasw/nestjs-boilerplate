import { AbstractEntity } from '@/shared/common/abstract.entity';
import { plainToInstance } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from '../dtos/users.dto';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar: string;

  toDto() {
    return plainToInstance(UserDto, this);
  }
}
