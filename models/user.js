const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: [true, 'first name is required'] },
    lastName: { type: String },
    createdAt: { type: Date, default: new Date() },
    email: { type: String, unique: true, required: [true, 'email is required' ] },
    phone: { type: String, required: [true, 'phone is required' ] },
    age: { type: Number, required: [true, 'age is required' ] },
    genre: { type: String, required: [true, 'genre is required' ] },
    hobby: { type: String, required: [true, 'hobby is required' ] },
    password: { type: String, required: [true, 'password is required' ] }
}, {timestamps: true});

userSchema.methods.toJSON = function() {
    const user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('User', userSchema);