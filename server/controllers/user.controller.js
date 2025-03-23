import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// needed for the jwt_secret from .env
dotenv.config();

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  // generate password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // check if user exists
  db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
      } else if (result.length > 0) {
        return res.status(400).json({ message: "Username already exists" });
      } else {
        const newUser = { username, password: hashedPassword };

        // create user
        db.query("INSERT INTO users SET ?", newUser, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
          } else {
            const token = generateToken(result.insertId);

            return res
              .status(201)
              .json({ message: "User created successfully", newUser, token });
          }
        });
      }
    }
  );
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and Password must be filled." });
  }

  db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    async (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.length === 0) {
        // checks if user does not exist.
        return res.status(400).json({ message: "User not found" });
      } else {
        const user = result[0];

        // compares the password with the one in the database
        if (await bcrypt.compare(password, user.password)) {
          const token = generateToken(user.id);

          return res.status(200).json({
            username: user.username,
            message: "Login successful",
            token,
          });
        } else {
          return res.status(400).json({ message: "Invalid password" });
        }
      }
    }
  );
};

export const updateUser = async (req, res) => {
  const userId = req.userId;
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  // Fetch user from the database
  db.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    async (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      let updatedUser = { username };
      const existingUser = result[0];

      // If password is provided, hash it before updating
      if (password) {
        const isSamePassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!isSamePassword) {
          const salt = await bcrypt.genSalt(10);
          updatedUser.password = await bcrypt.hash(password, salt);
        }
      }

      // Update user in the database
      db.query(
        "UPDATE users SET ? WHERE id = ?",
        [updatedUser, userId],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Database update error" });
          }

          return res.status(200).json({ message: "User updated successfully" });
        }
      );
    }
  );
};
