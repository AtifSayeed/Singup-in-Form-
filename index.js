const express = require("express");
const mongoose = require("mongoose");
const Registeruser = require("./model");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const cors = require('cors');
const app = express();

app.get("/", (req, res) => {
  res.send("Hello...");
});
//Connecting DB
mongoose
  .connect(
    "mongodb+srv://atifsayeed:atifsayeed@cluster0.dhvbfof.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("DB Established"));

app.use(express.json());

app.use(cors({origin:"*"}))

//posting a credentials
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    let exist = await Registeruser.findOne({ email });
    if (exist) {
      return res.send(400).send("User Already Exist");
    }
    if (password != confirmPassword) {
      return res.status(400).send("Passwords are not matching");
    }
    let newUser = new Registeruser({
      username,
      email,
      password,
      confirmPassword,
    });
    await newUser.save();
    res.status(200).send("Registered Succuessfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

//jwt token posting
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let exist = await Registeruser.findOne({ email });
    if (!exist) {
      return res.status(400).send("User Not Found");
    }
    if (exist.password !== password) {
      return res.status(400).send("Invalid Credentials");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 36000000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});
//middleware accesing tokens
app.get("/profile", middleware, async (req, res) => {
  try {
    let exist = await Registeruser.findById(req.user.id);
    if (!exist) {
      return res.status(400).send("User Not Found");
    }
    res.json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

//Setting Port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
