import mongoose from 'mongoose';
const FlashcardSchema = new mongoose.Schema({
  flashinfo: {
    type: String,
    required: true,
  },
});
export default mongoose.model('flashcard', FlashcardSchema);
