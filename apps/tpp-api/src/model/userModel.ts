import { ValidatorProps, Schema, Model, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
  isAuthor: boolean;
  password: string;
  passwordConfirm: string;
  passwordChangedAt?: Date;
}
interface IUserMethods {
  matchPassword(
    enteredPassword: string,
    savedPassword: string
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: Date): boolean;
}

type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, 'Podaj swoje imię'],
    },
    email: {
      type: String,
      required: [true, 'Podaj swój adres email'],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v: string): boolean {
          return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(v);
        },
        message: (props: ValidatorProps) =>
          `Adres email '${props.value}' jest niepoprawny.`,
      },
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAuthor: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: [true, 'Podaj hasło'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Potwierdź hasło'],
      minlength: 8,
      validator: function (current: string): boolean {
        return current === this.password;
      },
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.method(
  'matchPassword',
  async function (enteredPassword: string, savedPassword: string) {
    return await bcrypt.compare(enteredPassword, savedPassword);
  }
);

userSchema.method('changedPasswordAfter', function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;
  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
