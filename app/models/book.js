const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: String, required: true},
        year: {type: Number, required: true},
        pages: {type: Number, required: true},
        createAt: {type: Date, default: new Date.now},
    },
    { versionKey: false }
);

BookSchema.pre('save', next => {
    now = new Date();
    if (!this.createAt) {
        this.createAt = now;
    }
    next();
})

model.exports = mongoose.model('book', BookSchema);