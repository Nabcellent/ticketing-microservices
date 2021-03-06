import mongoose from "mongoose";
import {PasswordService} from "../services/password.service";

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
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id

            delete ret._id
            delete ret.password
            // delete ret.__v
        }
    }
})

UserSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await PasswordService.hash(this.get('password'))

        this.set('password', hashed)
    }

    done()
})

UserSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema)

export { User }
