import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../models/user.entity';
import { Organisation } from '../models/organisation.entity';
import { Role } from '../models/role.entity';
import { CreateUserDto } from './dto';

const DEFAULT_ROLE = 'simple';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) { }

  public async findAll(): Promise<User[]> {
    return await this.repo.find({
      relations: ['organisation'],
    });
  }

  public async createOne(dto: CreateUserDto): Promise<User> {
    const { login, name, password, organisation, roles } = dto;

    if (!name || !login || !password || !organisation) {
      const errors = { field: 'Field must be filled' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isExistFieldRoles = roles !== undefined;
    const isArrayRoles = Array.isArray(roles);
    const isArrayStringRoles = isArrayRoles
      && roles.every(role => typeof role === 'string');
    if (isExistFieldRoles && !isArrayStringRoles || isExistFieldRoles && !isArrayRoles) {
      const errors = { field: 'Roles must be array of strings' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.findOne({ login }, true);
    if (user) {
      const errors = { login: 'This login is exist' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const repoRole = getRepository(Role);
    const repoOrganisation = getRepository(Organisation);

    let orgUser = await repoOrganisation
      .findOne({ name: organisation });
    if (!orgUser) {
      const orgItem = new Organisation();
      orgItem.name = organisation;
      orgUser = await repoOrganisation.save(orgItem);
    }

    let rolesUser = [];
    const isExistRoles = roles && roles.length > 0;
    const inputRoles = isExistRoles ? roles : [DEFAULT_ROLE];
    const filterInputRoles = inputRoles
      .filter((role, index) => inputRoles.indexOf(role) === index);

    await Promise.all(filterInputRoles.map(async (role) => {
      const inputRole = role ? role : DEFAULT_ROLE;
      const existRole = await repoRole.findOne({ name: inputRole });
      if (existRole) {
        rolesUser = [...rolesUser, existRole];
      } else {
        const newRole = new Role();
        newRole.name = inputRole;
        const roleData = await repoRole.save(newRole);
        rolesUser = [...rolesUser, roleData];
      }
    }));

    const newUser = new User();
    newUser.name = name;
    newUser.login = login;
    newUser.password = await bcrypt.hash(password, 10);
    newUser.roles = rolesUser;
    newUser.organisation = orgUser;

    return await this.repo.save(newUser);
  }

  public async removeOne(id: string): Promise<User> {
    const user = await this.findOne({ id });
    try {
      await this.repo.delete(id);
      return user;
    } catch (error) {
      throw new NotFoundException(`User with ${id} not found.`);
    }
  }

  public async findOne(params: any, withoutError?: boolean): Promise<User> {
    let user: User;
    try {
      user = await this.repo.findOne(params);
    } catch (error) {}
    if (!user && !withoutError) {
      throw new NotFoundException(
        `User with ${JSON.stringify(params.where || params)} does not exist`,
      );
    }
    return user;
  }

  public async getOne(id: string): Promise<User> {
    return await this.findOne(
      {
        where: { id },
        relations: ['roles', 'organisation']
      },
      false,
    );
  }
}
