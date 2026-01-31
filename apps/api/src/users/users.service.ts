import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';

import { User, UserDocument } from './schemas/user.schema';

export type CreateUserInput = {
  email: string;
  name: string;
  passwordHash: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async create(input: CreateUserInput): Promise<UserDocument> {
    const email = input.email.trim().toLowerCase();
    const name = input.name.trim();

    this.logger.info({ email }, 'Creating user');

    const doc = new this.userModel({
      email,
      name,
      passwordHash: input.passwordHash,
    });

    try {
      const saved = await doc.save();
      this.logger.info({ userId: saved._id.toString(), email }, 'User created');
      return saved;
    } catch (err: any) {
      if (err?.code === 11000) {
        this.logger.warn({ email }, 'User create failed: duplicate email');
        throw new ConflictException('Email already exist');
      }

      this.logger.error({ email, err }, 'User create failed: unexpected error');
      throw err;
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const normalizedEmail = email.trim().toLowerCase();
    this.logger.debug({ email: normalizedEmail }, 'Finding user by email');

    const user = await this.userModel
      .findOne({ email: normalizedEmail })
      .exec();

    if (!user) {
      this.logger.debug({ email: normalizedEmail }, 'User not found by email');
      return null;
    }

    return user;
  }
}
