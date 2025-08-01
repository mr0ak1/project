import express from "express"
import mongoose from "mongoose"
import User from "./model/user.js"
const app = express()

mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then((data) => console.log("connected to db"))
  .catch((err) => console.log(err))
