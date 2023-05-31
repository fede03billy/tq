import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  // Create a User
  async create(username: string, password: string): Promise<{}> {
    const newUser = new this.userModel({ username, password});
    // TODO: handle error for duplicate username
    return newUser.save();
  }

  // Fetch All Users
   async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  // Fetch User by Id
  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  // Fetch User Group
  async findGroup(group: string): Promise<User[]> {
    return this.userModel.find({ group });
  }

  // Increment Upvotes by Id
  async upvote(id: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true },
    );
  }
}
