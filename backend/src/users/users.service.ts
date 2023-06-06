import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  // Create a User
  async create(username: string, password: string): Promise<{}> {
    const newUser = new this.userModel({ username, password});
    const otherUser = await this.userModel.findOne({ username });
    if (otherUser) {
      throw new NotAcceptableException();
    }
    await newUser.save();
    const login = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
    })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {throw new NotAcceptableException(err)});
    return {
      id: login.id,
      access_token: login.access_token
    }
  }

  // Fetch All Users
   async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  // Fetch User by Id
  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  // Fetch User by Username
   async findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
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
