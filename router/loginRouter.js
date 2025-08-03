import express from "express"
import mongoose from "mongoose"
import User from "../model/user.js"
mongoose.connect("mongodb://localhost:27017/myapp")
export const loginRouter = express.Router()
export const postLoginRouter = express.Router()

loginRouter.get("/login", (req, res) => {
  res.render("login")
})

postLoginRouter.post("/login", async (req, res) => {
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
