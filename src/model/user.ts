import { Schema, Model, Document, model } from "mongoose";
import bcrypt from "bcryptjs";
import HttpError from "../utils/HttpError";

const SALT_ROUND = process.env.SALT_ROUND as string;

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface IUserDocument extends IUser, Document {}

interface IUserModel extends Model<IUserDocument> {
  findByCredentials: (
    email: string,
    password: string
  ) => Promise<IUserDocument>;
}

const userSchema = new Schema<IUserDocument, IUserModel>({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError.Unauthorized();
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw HttpError.Unauthorized();
  }

  return user;
};

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, parseInt(SALT_ROUND));
  }

  next();
});

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
