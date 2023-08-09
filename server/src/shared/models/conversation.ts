import mongoose from "mongoose";

const conversationsSchema = new mongoose.Schema({
  kagwaveId: {type: String, required: true},
  conversations: {type: Array},
}, {collection: 'messages'});

const Conversations = mongoose.model("Conversations", conversationsSchema);
export default Conversations;