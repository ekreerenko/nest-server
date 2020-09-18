import { Column, Entity, JoinTable, ManyToOne, ManyToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Organisation } from './organisation.entity';
import { Role } from './role.entity';

@Entity({ name: 'User' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 128 })
  login: string;

  @Column({ type: 'varchar', length: 128, select: false })
  password: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  @ManyToOne(() => Organisation, org => org.users)
  organisation: Organisation;
}
