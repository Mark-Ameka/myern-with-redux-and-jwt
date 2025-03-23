import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/library";

// get books
export const getBooks = createAsyncThunk(
  "book/get-books",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/get-books`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get book
export const getBook = createAsyncThunk(
  "book/get-book",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/get-book/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create book
export const createBook = createAsyncThunk(
  "book/create-book",
  async (book, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/create-book`, book, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { message, newBook } = res.data;

      return { message, newBook };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update book
export const updateBook = createAsyncThunk(
  "book/update-book",
  async ({ id, newBook }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/update-book/${id}`, newBook, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete book
export const deleteBook = createAsyncThunk(
  "book/delete-book",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/delete-book/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// search book
export const searchBook = createAsyncThunk(
  "book/search-book",
  async (query, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/search-book?query=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    book: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetMessages: (state) => {
      state.success = null;
      state.error = null;
    },
    resetBooks: (state) => {
      state.books = [];
      state.book = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get books
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // get book
      .addCase(getBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload[0];
      })
      .addCase(getBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // create book
      .addCase(createBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.books.push(action.payload.newBook);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // update book
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );

        if (index !== -1) {
          state.books[index] = action.payload.updateBook;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // delete book
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.books = state.books.filter(
          (book) => book.id !== action.payload.id
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // search book
      .addCase(searchBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(searchBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { resetMessages, resetBooks } = bookSlice.actions;

export default bookSlice.reducer;
