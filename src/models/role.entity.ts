import { Entity, Column, ManyToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'Role' })
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @ManyToMany(() => User, user => user.roles)
  users: User[];
}
