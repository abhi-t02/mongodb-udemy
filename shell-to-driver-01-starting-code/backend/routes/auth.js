const Router = require("express").Router;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { getDB } = require("../db/db");

const router = Router();

const createToken = () => {
  return jwt.sign({}, "secret", { expiresIn: "1h" });
};

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  // Check if user login is valid
  // If yes, create token and return it to client
  getDB
    .collection("users")
    .findOne({ email })
    .catch((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed, invalid username or password.",
        });
      }

      bcrypt.compare(pw, user.password, (err, success) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication failed, invalid username or password.",
          });
        }
        const token = createToken();
        return res
          .status(200)
          .json({ token: token, user: { email: "dummy@dummy.com" } });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signup", (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  // Hash password before storing it in database => Encryption at Rest
  bcrypt
    .hash(pw, 12)
    .then((hashedPW) => {
      // Store hashedPW in database

      getDB()
        .collection("users")
        .insertOne({ email, password: hashedPW })
        .then((user) => {
          const token = createToken();
          return res
            .status(201)
            .json({ token: token, user: { email: "dummy@dummy.com" } });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Creating the user failed." });
    });
  // Add user to database
});

module.exports = router;
