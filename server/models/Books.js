const mongoose = require('mongoose');

const { Schema } = mongoose;

const BooksSchema = new Schema({
  title: String,
  body: String,
  author: String,
  stock: String,
}, { timestamps: true });

BooksSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    author: this.author,
    stock: this.stock,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Books', BooksSchema);