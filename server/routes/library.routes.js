import express from "express";
import {
  createBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook,
  searchBook,
} from "../controllers/library.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/get-book/:id", getBook);
router.get("/get-books", getBooks);
router.post("/create-book", createBook);
router.put("/update-book/:id", updateBook);
router.delete("/delete-book/:id", deleteBook);

router.get("/search-book", searchBook);

export default router;
