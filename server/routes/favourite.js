import express from "express";
const router = express.Router();
import User from "../models/user.js";
import authenticateToken from "./userAuth.js";

//add book to favourite
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      res
        .status(200)
        .json({ message: "Book is already in your favourite list" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    res.status(200).json({ message: "Book added to favourite list" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete book from favourite
router.put(
  "/remove-book-from-favourite",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid, id } = req.headers;
      const userData = await User.findById(id);
      const isBookFavourite = userData.favourites.includes(bookid);
      if (isBookFavourite) {
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
      }
      res.status(200).json({ message: "Book removed from favourite list" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//get favourite books of a particular user
router.get(
    "/get-favourite-books",
    authenticateToken,
    async (req, res) => {
      try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "Success",
            data: favouriteBooks,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured" });
      }
    }
  );
export default router;
