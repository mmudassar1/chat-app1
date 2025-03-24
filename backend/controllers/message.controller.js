import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const sendMessage = async (req, res) => {
try {
    const {message} = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]}
    })
    
    if(!conversation){
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message
    })
    if(newMessage){
        conversation.messages.push(newMessage._id);
    }

    // this will run parallel
    await Promise.all([conversation.save(),newMessage.save()])
    // await conversation.save()
    // await newMessage.save()

    res.status(200).json({message: "message send successfully", newMessage})

} catch (error) {
    console.log("Error in send message controller", error)
    res.status(500).json({message:"Internal server error"})
}}


export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Find the conversation between the sender and receiver
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        // Check if the conversation exists
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        // Return the messages from the conversation
        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessage controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};