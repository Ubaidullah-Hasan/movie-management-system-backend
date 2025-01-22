import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { StatusCodes } from 'http-status-codes';

const createUserIntoDB = async (payload: TUser) => {
  const existUser = await User.isUserExistsByEmail(payload.email);

  if(existUser){
    throw new AppError(StatusCodes.BAD_REQUEST, "User already exists!");
  }

  if(payload.password !== payload.confirmPassword){
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, "Password does not match");
  }


  const user = await User.create(payload);
  return user;
};




export const UserServices = {
  createUserIntoDB,
};
