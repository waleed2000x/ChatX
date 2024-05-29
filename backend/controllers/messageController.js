import ConversationModel from "../models/conversation.model.js";
import MessageModel from "../models/message.model.js";
import { getReceiverSocketId } from "../sockets/sockets.js";

export async function getMessages(req, res, next) {
  try {
    const { id: userToChatId } = await req.params;
    const senderId = req.user._id;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
}

export async function sendMessage(req, res, next) {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
    });
    if (!conversation.messages) {
      conversation.messages = []; // Initialize messages array if it doesn't exist
    }
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    //? SOCLET.IO IMPLEMENTATION
    console.log(`Message sent: ${newMessage.message}`);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(200).json({ newMessage });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
}
