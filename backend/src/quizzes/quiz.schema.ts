import { Schema } from 'mongoose';

const QuizSchema = new Schema({
  quizId: {
    type: String,
    required: true,
    unique: true,
  },
  moduleId: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Object, // Adjust to the structure of the question objects
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default QuizSchema;
