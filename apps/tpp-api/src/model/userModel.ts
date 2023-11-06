import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(v);
      },
      message: (props) =>
        `The email '${props.value}' in the field '${props.path}' is not valid!`,
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
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Potwierdź hasło'],
    minlength: 8,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
