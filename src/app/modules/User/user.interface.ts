import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  email: string;
  userName:string;
  password: string;
  role?: keyof typeof USER_ROLE;
  status?: 'in-progress' | 'blocked';
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  //instance methods for checking if the user exist
  isUserExistsByUsername(userName: string): Promise<TUser>;

}

export type TUserRole = keyof typeof USER_ROLE;
