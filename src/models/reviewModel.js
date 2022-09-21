const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({

    bookId: {
        type: ObjectId,
        require: true,
        ref: 'Book'
    },
    reviewedBy: {
        type: String,
        require: true,
        default: 'Guest',
        value: {
            type: String  // I have doubt in this isko confirm krna
        }
    },
    reviewedAt: {
        type: Date,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    review: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema)
