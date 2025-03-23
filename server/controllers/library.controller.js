import db from "../config/db.js";

export const createBook = (req, res) => {
  const { book_name, book_description, book_author } = req.body;
  const user_id = req.userId;
  const newBook = { user_id, book_name, book_description, book_author };

  if (!book_name || !book_description || !book_author) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("INSERT INTO books SET ?", newBook, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      newBook.id = result.insertId;
      return res
        .status(201)
        .json({ message: "Book created successfully", newBook });
    }
  });
};

export const getBooks = (req, res) => {
  const id = req.userId;

  db.query("SELECT * FROM books WHERE user_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json(result);
    }
  });
};

export const getBook = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM books WHERE id = ? AND user_id = ?",
    [id, req.userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json(result);
      }
    }
  );
};

export const updateBook = (req, res) => {
  const { id } = req.params;
  const { book_name, book_description, book_author } = req.body;
  const updateBook = { book_name, book_description, book_author };

  db.query(
    "SELECT * FROM books WHERE id = ? AND user_id = ?",
    [id, req.userId],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.length === 0) {
        return res.status(400).json({ message: "Book not found" });
      }

      db.query(
        "UPDATE books SET ? WHERE id = ? AND user_id = ?",
        [updateBook, id, req.userId],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            return res.status(200).json({
              id,
              message: "Book updated successfully",
              updateBook,
            });
          }
        }
      );
    }
  );
};

export const deleteBook = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM books WHERE id = ? AND user_id = ?",
    [id, req.userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return res
          .status(200)
          .json({ id, result, message: "Book deleted successfully" });
      }
    }
  );
};

export const searchBook = (req, res) => {
  const { query } = req.query;

  db.query(
    "SELECT * FROM books WHERE book_name LIKE ? AND user_id = ?",
    [`%${query}%`, req.userId],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      return res.status(200).json(result);
    }
  );
};
