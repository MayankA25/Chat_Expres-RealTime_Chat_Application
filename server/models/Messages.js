import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    text: {
        type: mongoose.Schema.Types.String,
        default: ""
    },
    image: {
        type: mongoose.Schema.Types.String,
        default: ""
    }
},   {timestamps: true});


const Message = mongoose.model("message", messageSchema);
export default Message;