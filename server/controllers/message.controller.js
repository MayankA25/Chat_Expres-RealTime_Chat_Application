import Message from "../models/Messages.js"
import User from "../models/User.js";
import { getReceiverSocketId, io } from "../utils/socket.js";


export const getUsers = async (req, res)=>{
    try{
        var foundUsers = await User.find({  });
    }catch(e){
        return res.status(500).json({ msg: "Internal Server Error" })
    }
    // console.log("UserId: ", req.session.userId)
    foundUsers = foundUsers.filter((element)=>{
        // console.log(element._id.toString())
        return element._id.toString() !== req.session.userId
    })
    return res.status(200).json({ foundUsers })
}

export const getMessages = async (req, res)=>{
    // console.log(req.body);
    const { senderId, receiverId } = req.body;

    

    if(!senderId || !receiverId) return res.status(400).json({ msg: "Please Provide Sender ID as well as Receiver ID" })

    const foundMessages = await Message.find({
        $or: [
            {senderId: senderId, receiverId: receiverId},
            {senderId: receiverId, receiverId: senderId}
        ]
    });

    res.status(200).json({ foundMessages });
}


export const sendMessage = async(req, res)=>{
    const { senderId, receiverId, text, image } = req.body;
    
    const newMessage = await Message.create({
        senderId,
        receiverId,
        text,
        image,
    });

    try{
        var savedMessage = await newMessage.save();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", savedMessage);
        }
    }catch(e){
        return res.status(500).json({ msg: "Internal Server Error" })
    }

    return res.status(200).json({ savedMessage })

    
}