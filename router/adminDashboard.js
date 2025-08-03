import express from "express"
import mongoose from "mongoose"
import User from "../model/user.js"
mongoose.connect("mongodb://localhost:27017/myapp")

export const adminDeleteUser = express.Router()
export const adminCreateUser = express.Router()
export const adminSubmitUser = express.Router()

adminDeleteUser.post("/delete-user", async (req, res) => {
  await User.findByIdAndDelete(req.body.userId)
  const allUsers = await User.find()
  return res.render("admin", {users: allUsers})
})

adminCreateUser.get("/create", (req, res) => {
  res.render("create")
})

adminSubmitUser.post("/submit-create", async (req, res) => {
  const {name, email, password} = req.body
  const newUser = new User({name, email, password})
  await newUser.save()
  console.log(newUser)
  await User.findByIdAndDelete(req.body.userId)
  const allUsers = await User.find()
  return res.render("admin", {users: allUsers})
})
