import mongoose from "mongoose"
import { Schema } from "mongoose"

const userSchema = new Schema({
    fullName: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    profilePic: {
        type: mongoose.Schema.Types.String,
        default: ""
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)
export default User;