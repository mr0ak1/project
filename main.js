import express from "express"
import mongoose from "mongoose"
import User from "./model/user.js"
import {
  getSignUpRouter,
  postSignUpRouter,
  signUpRouter,
} from "./router/signUpRouter.js"
import {loginRouter, postLoginRouter} from "./router/loginRouter.js"
import {
  adminCreateUser,
  adminDeleteUser,
  adminSubmitUser,
} from "./router/adminDashboard.js"
const app = express()
mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then((data) => console.log("connected to db"))
  .catch((err) => console.log(err))

app.set("view engine", "ejs")
app.set("views", "./views")

app.use(express.urlencoded())
app.use(signUpRouter)

app.use(getSignUpRouter)

app.use(postSignUpRouter)

app.use(loginRouter)
app.use(postLoginRouter)

app.use(adminDeleteUser)

app.use(adminCreateUser)

app.use(adminSubmitUser)

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})
