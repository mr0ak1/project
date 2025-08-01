import express from "express"
import mongoose from "mongoose"
import User from "./model/user.js"
const app = express()

mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then((data) => console.log("connected to db"))
  .catch((err) => console.log(err))

app.set("view engine", "ejs")
app.set("views", "./views")

app.use(express.urlencoded())
app.get("/", (req, res) => {
  res.render("signup")
})

app.get("/sign-up", (req, res) => {
  res.render("signup")
})
app.post("/sign-up", async (req, res) => {
  const {name, email, password} = req.body
  const newUser = new User({name, email, password})
  await newUser.save()
  console.log(newUser)
  res.redirect("login")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.post("/login", async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if (!user || user.password !== password) {
    return res.status(401).redirect("/login")
  }
  console.log("User logged in:", user)
  if (user.email === "admin@sgvu.com" && user.password === password) {
    const allUsers = await User.find()
    return res.render("admin", {users: allUsers})
  }
  res.render("success", {username: user.name})
})

app.post("/delete-user", async (req, res) => {
  await User.findByIdAndDelete(req.body.userId)
  const allUsers = await User.find()
  return res.render("admin", {users: allUsers})
})

app.get("/create", (req, res) => {
  res.render("create")
})
