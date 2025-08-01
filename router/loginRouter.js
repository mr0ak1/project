import express from "express"

import mongoose from "mongoose"

export const loginRouter = express.Router()

loginRouter.get("/", (req, res) => {
  res.render("login")
})
