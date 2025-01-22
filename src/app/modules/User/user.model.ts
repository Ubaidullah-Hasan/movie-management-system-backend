/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { USER_ROLE, USER_STATUS } from './user.constant';
import { TUser, UserModel } from './user.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const userSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: [USER_ROLE.super_admin, USER_ROLE.user],
      default: USER_ROLE.user,
    },
    status: {
      type: String,
      enum: USER_STATUS,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  },
);

// Add a custom error handler for unique constraint

userSchema.post("save", function (
  error: any,
  doc: any,
  next: (err?: Error) => void
) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const value = error.keyValue[field];
    const errorMessage = `The ${field} "${value}" is already taken. Please use a unique ${field}.`;

    next(new AppError(StatusCodes.BAD_REQUEST, errorMessage));
  } else {
    next(error);
  }
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.salt_round),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// isExisting user by email or username
userSchema.statics.isUserExistsByEmailOrUserName = async function (identifier: string) {

  return await User.findOne({
    $or: [{ email: identifier }, { userName: identifier }]
  }).select('+password');

};


userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};


export const User = model<TUser, UserModel>('User', userSchema);
