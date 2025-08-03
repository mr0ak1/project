import express from "express"
import mongoose from "mongoose"
import User from "../model/user.js"
mongoose.connect("mongodb://localhost:27017/myapp")
export const signUpRouter = express.Router()
export const getSignUpRouter = express.Router()
export const postSignUpRouter = express.Router()

signUpRouter.get("/", (req, res) => {
  res.render("signup")
})

getSignUpRouter.get("/sign-up", (req, res) => {
  res.render("signup")
})

postSignUpRouter.post("/sign-up", async (req, res) => {
  const {name, email, password} = req.body
  const newUser = new User({name, email, password})
  await newUser.save()
  console.log(newUser)
  res.redirect("login")
})
