import mongoose, { Document } from "mongoose";

interface UserType extends Document {
    username: string,
    email: string,
};

const UserSchema = new mongoose.Schema<UserType>({
    username: String,
    email: String
});

// mongoose.models = {};
let User: mongoose.Model<UserType> = mongoose.models.Users || mongoose.model('User', UserSchema);

export default User;
