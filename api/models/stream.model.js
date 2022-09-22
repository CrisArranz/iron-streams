const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateURL = {
  validator: function(image){
      try {
          new URL(image);
          return true;
      } catch(error){
          return false;
      }
  },
}

const streamSchema = new Schema({
  title: {
    type: String,
    required: 'Title is required',
    trim: true,
    maxLength: [100, 'Title cannot has more than 100 chars']
  },
  author:{
    type: String,
    required: `Author is required`,
    trim: true,
    maxLength: [30, `Author cannot has more than 30 chars`]
  },
  url: {
    type: String,
    required: `URL is required`,
    default: 'https:www.google.es',
    validate: validateURL
  },
  description: {
    type: String,
    trim: true,
    minLength: [5, `Description need at least 5 chars`]
  },
  views: {
    type: Number
  },
  category: {
    type: String,
    trim: true,
    required: `Category is required`
  },
  duration: {
    type: Number
  },
  thumbnail: {
    type: String,
    validate: validateURL
  },
  private: {
    type: Boolean,
    required: `Private is required`
  }
}, { timestamps: true, toJSON: {
  transform: (doc, ret) => {
    delete ret.__v;
    ret.id = ret._id;
    delete ret._id;

    return ret;
  }
}
});

const Stream = mongoose.model('stream', streamSchema);

module.exports = Stream;