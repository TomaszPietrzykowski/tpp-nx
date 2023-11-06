import mongoose, { ValidatorProps } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
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
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
