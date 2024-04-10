import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) { }

  create(createUserDto: CreateUserDto) {
    const createUser = this.userModel.create(createUserDto);
    return createUser;
  }

  findAll() {
    const getUsers = this.userModel.find();
    const filterUsers = getUsers.where({isDeleted:{$exists:false}})
    return filterUsers;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({
      _id: id,
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    });

    if (!user) {
      return "User not exist"
    }

    return user;
  }

  update(id: String, updateUserDto: UpdateUserDto) {
    const updateSpecificUser = this.userModel.findByIdAndUpdate({ _id: id, }, updateUserDto);

    return updateSpecificUser;
  }

  remove(id: String) {
    const updateSpecificUser = this.userModel.updateOne({ _id: id, }, { $set: { isDeleted: true } });

    return updateSpecificUser;
  }
}
