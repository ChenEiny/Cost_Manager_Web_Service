// Chen Einy:209533785
// Adir Mintz:316579549

const mongoose = require('mongoose');
const categories = ["food", "health", "housing", "sport", "education", "transportation", "other"];

/* user Schema build for users in the models*/
const userSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    birthday: Date,
});

/* cost Schema build for items in the new collection and requirements for them to add in the new models*/
const costSchema = new mongoose.Schema({
    user_id: {
      type: Number,
      required: [true, 'User ID is required'],
      min: [1, 'User ID must be a positive number'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1900, 'Year must be greater than or equal to 1900'],
      max: [2024, 'Year must be less than or equal to 2024'],
    },
    month: {
      type: Number,
      required: [true, 'Month is required'],
      min: [1, 'Month must be between 1 and 12'],
      max: [12, 'Month must be between 1 and 12'],
    },
    day: {
      type: Number,
      required: [true, 'Day is required'],
      min: [1, 'Day must be between 1 and 31'],
      max: [31, 'Day must be between 1 and 31'],
    },
    id: {
      type: Number,
      required: [true, 'ID is required'],
      min: [1, 'ID must be a positive number'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minLength: [1, 'Description must have at least 1 character'],
      maxLength: [1000, 'Description must have at most 1000 characters'],
    },
    category: {
      type: String,
      enum: {
        values: categories,
        message: 'Invalid category',
      },
      required: [true, 'Category is required'],
    },
    sum: {
      type: Number,
      required: [true, 'Sum is required'],
      min: [0, 'Sum must be a non-negative number'],
    },
  },  { versionKey: false });

const schemas = {
  User: mongoose.model('User', userSchema),
  Cost: mongoose.model('Cost', costSchema),
};

module.exports = schemas;