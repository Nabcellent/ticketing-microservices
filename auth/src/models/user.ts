import mongoose, {Model} from "mongoose";
import {string} from "joi";

//  An interface describing the properties required to create a user.
interface UserAttrs {
    email: string;
    password: string
}

//  An interface that describes the properties that a user model has.
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

//  An interface that describes the properties that a User Document has.
interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema)

export { User }