import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('CONTACTS')
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  // @Column({
  //   name: 'email_address',
  //   type: 'varchar',
  //   length: 100,
  //   nullable: true,
  // })
  // emailAddress: string;

  // @Column({
  //   name: 'phone number',
  //   type: 'number',
  //   length: 10,
  //   nullable: false
  // })
  // contact: number;

  @Column({default: true})
  active: boolean;
}

