const express = require("express")
const app = express()
const UserRouter = require("./Routes/UserRouter")

const PORT = process.env.PORT || 3001;
const passport = require('passport')
const expressSession = require("express-session")
const {initializingPassport} = require("./passportConfig")


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
require("./dbConnect")

initializingPassport(passport);
app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}))
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/users", UserRouter)

app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`);
})