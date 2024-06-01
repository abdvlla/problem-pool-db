if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const flash = require("express-flash");

const User = require("./models/user");
const authenticationMethods = require("./public/javascripts/authentication");

// Import initializePassport function
const initializePassport = require("./routes/passport-setup");

// Import routers
const indexRouter = require("./routes/index");
const poolRouter = require("./routes/pools");

// Initialize Passport and session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// Call initializePassport function
initializePassport(
  passport,
  async (email) => await User.findOne({ email }),
  async (id) => await User.findById(id)
);

// Login route
app.get("/login", authenticationMethods.ensureNotAuthenticated, (req, res) => {
  res.render("authentication/login.ejs", { title: "Login" });
});

// Register route
// app.get('/register', authenticationMethods.ensureNotAuthenticated, (req, res) => {
//   res.render('authentication/register.ejs', { title: 'Register' });
// });

// Registration form submission
// app.post('/register', authenticationMethods.ensureNotAuthenticated,, async (req, res) => {
//   try {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);
//       const user = new User({
//           name: req.body.name,
//           email: req.body.email,
//           password: hashedPassword,
//       });
//       await user.save();
//       res.redirect('/login');
//   } catch (error) {
//       console.error(error);
//       res.redirect('/register');
//   }
// });

// Login route (POST)
app.post(
  "/login",
  authenticationMethods.ensureNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Logout route
app.delete("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect("/login");
    }
    res.redirect("/login");
  });
});

// Routers uses
app.use("/", indexRouter);
app.use("/pools", poolRouter);
app.get("*", authenticationMethods.ensureAuthenticated, (req, res) => {
  res.redirect("/");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Connected! Go to http://localhost:${PORT}`);
});
