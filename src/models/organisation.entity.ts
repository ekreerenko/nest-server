import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'Organisation' })
export class Organisation extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @OneToMany(() => User, user => user.id)
  users: User[];
}
