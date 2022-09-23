const mongoose = require("mongoose");
const bookModel = require("../models/bookModel");
const BookModel = require('../models/bookModel')
const ReviewModel = require("../models/reviewModel")


//----------------------create review-------------------------
const reviews = async (req, res) => {
    try {
        let data = req.body;


        let bookId = req.params.bookId
        if (!mongoose.Types.ObjectId.isValid(bookId)) { return res.status(400).send({ status: false, msg: "bookId is not valid" }) }

        const book = await BookModel.findById(bookId)
        if (!book) return res.status(404).send({ status: false, message: "No book found from this bookId" })

        if (book.isDeleted == true) return res.status(404).send({ status: false, message: "the book is already deleted" });

        if (!data.bookId) data.bookId = book._id;
        if (!data.reviewedBy) data.reviewedBy = "Guest";
        if (!data.reviewedAt) data.reviewedAt = new Date;

        const updatebook = await BookModel.findOneAndUpdate({ _id: data.bookId }, { $inc: { reviews: +1 } }, { new: true }).lean();
        const newreview = await ReviewModel.create(data);
        // console.log(newreview);
        // console.log(data);
        if (updatebook.isDeleted == true)
            res.status(201).send({ status: true, message: "the book is already deleted" });

        updatebook.reviewsdata = newreview;
        return res.status(201).send({ status: true, message: "Success", data: updatebook })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//-------------------------update review--------------------------------

const updateReview = async function (req, res) {
    try {
        let bookId = req.params.bookId;
        if (!mongoose.Types.ObjectId.isValid(bookId)) return res.status(400).send({ status: false, msg: "bookId is not valid" })

        let reviewId = req.params.reviewId
        if (!mongoose.Types.ObjectId.isValid(reviewId)) return res.status(400).send({ status: false, msg: "reviewId is not valid" })

        let reviewData = req.body
        let { review, rating, reviewedBy } = reviewData

        //-----check for request body-----
        if (Object.keys(reviewData).length == 0) return res.status(404).send({ status: false, msg: "please add some data for updates!!!" })

        //----check if book exist in collection or not------
        const book = await BookModel.findById(bookId)

        if (!book) return res.status(404).send({ status: false, msg: "No Book with this bookId was found in the reviewModel" })

        if (bookId.isDeleted == true) return res.status(404).send({ status: false, msg: "Book is already deleted!!!" })

        const rev = await ReviewModel.findById(reviewId)
        if (!rev) return res.status(404).send({ status: false, msg: "No reviews with this reviewID was found in the reviewModel" })

        if (reviewId.isDeleted == true) return res.status(404).send({ status: false, msg: "reviews are already deleted!!" })

        if (!/^\s*([1-5]){1}\s*$/.test(rating)) return res.status(404).send({ status: false, msg: "ratings not accepted!!!" })

        let updateReview = await ReviewModel.findOneAndUpdate({ _id: reviewId, isDeleted: false },
            {
                $set: {
                    review: review, rating: rating, reviewedBy: reviewedBy, reviewedAt: new Date
                }
            }, { new: true })

        if (!updateReview) return res.status(404).send({ status: false, msg: "Something went wrong!!!!" })

        return res.status(201).send({ status: true, msg: "Updated the reviews!!!!" })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = { reviews, updateReview }

//====================================delete review==============================================================

const deleteReview = async function (req, res) {
    try {
        let { bookId, reviewId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, msg: "please end valid bookid" })
        }
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).send({ status: false, msg: "please end valid reviewid" })
        }
        let checkBook = await bookModel.findOne({ _id: bookId, isDeleted: false });
        if (!checkBook) {
            return res.status(404).send({ status: false, msg: "book not found" })
        }

        let checkReview = await ReviewModel.find({ _id: reviewId, bookId, isDeleted: false });
        await ReviewModel.findByIdAndUpdate(
            { _id: reviewId },
            { $set: { isDeleted: true, deletedAt: new Date() } }
        );
        await BookModel.findByIdAndUpdate(
            { _id: bookId },
            { reviews: checkBook.reviews - 1 } 
        );
        if (!checkReview) {
            return res.status(404).send({ status: false, msg: "No review found for this book " })
        }
        return res.status(200).send({ status: true, msg: "reveiws has been deleted" })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }

}

module.exports.deleteReview = deleteReview