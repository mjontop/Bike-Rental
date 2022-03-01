import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as Bcryptjs from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import User from '../entities/users';
import { JwtSecret, PageSize } from '../utils';
import Bike from '../entities/bikes';

@Injectable()
export default class UsersService {

  async login({email, password}) {
    const user = await User.findOne({
      where: {email: email.toLowerCase() },
      select: ['id', 'name', 'email', 'password', 'isManager'],
    });


    if (user) {
      if (Bcryptjs.compareSync(password, user.password)) {
        console.log(user);
        return {
          ...user,
          password: undefined,
          jwt: Jwt.sign({ id: user.id }, JwtSecret, { expiresIn: '1d' }),
        };
      } else throw new HttpException('Email and password not match', 400);
    } else throw new NotFoundException();
  }

  async signup({name, email, password}) {
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = new User();
      user.email = email.toLowerCase();
      user.password = Bcryptjs.hashSync(password, 10);
      user.name = name;
      await user.save();
      return {
        ...user,
        password: undefined,
      };
    } else throw new HttpException('Email already exist', 400);
  }

  async get(p =  '1', authUser) {
    const page = Math.max(Number(p) || 1, 1);
    const users = await User.find({
      take: PageSize,
      skip: (page - 1) * PageSize,
    });

    const totalUserCount = await Bike.count();
    const pageCount = Math.ceil(totalUserCount / PageSize);

    return { users, page, pageCount };
  }

  async add({name, email, password, isManager}, authUser) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = Bcryptjs.hashSync(password, 10);
    user.isManager = isManager;
    await user.save();
    return user;
  }

  async update(id, {name, email, password, isManager}, authUser) {
    const user = await User.findOne(id);
    if(user) {
      user.name = name;
      user.email = email;
      if(password) {
        user.password = Bcryptjs.hashSync(password, 10);
      }
      user.isManager = isManager;
      await user.save();
      return user;
    } else throw new NotFoundException();
  }

  async delete(id, authUser) {
    const user = User.findOne(id);
    if (user) {
      await User.delete(id);
      return {};
    } else throw new NotFoundException();
  }

}