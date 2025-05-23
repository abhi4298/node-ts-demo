import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImage: string;
    password: string;
    updated: string;
    created: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImage: { type: String },
        updated: { type: String },
        created: { type: String, required: true, default: new Date() },
    },
    { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err: any) {
        next(err);
    }
});

UserSchema.methods.comparePassword = function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);