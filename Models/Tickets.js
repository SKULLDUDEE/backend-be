import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: { type: String, enum: ['user', 'bot'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ticketSchema = new Schema({
  ticketNumber: { 
    type: String, 
    unique: true,
    default: function() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');

      return `${year}-0-${month}${day}`;
    }
  },
  raisedBy: { type: Schema.Types.ObjectId, ref: 'BotUser', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['open', 'in-progress', 'resolved', 'closed'], default: 'open' },
  messages: [messageSchema]
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);