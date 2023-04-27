const cors=require("cors")
const express=require("express");
const { connection } = require("./config/db");
const app=express();
app.use(express.json());
app.use(cors());
const passport=require("passport");
const { UserModel } = require("./Model/usermodel");
const GitHubStrategy=require("passport-github2").Strategy

app.get("/",(req,res)=>{
    res.send("Home page");
})
passport.use(new GitHubStrategy({
    clientID: '50572008d7d63dcc65d0',
    clientSecret: "ec2e8b7406cf2735e4d5fed19065c0dcd685dc9f",
    callbackURL: "http://localhost:3000/auth/github/callback",
    scope:"user:email"
  },
 async function(accessToken, refreshToken, profile, done) {
   
        console.log(profile);
        let Name=profile.displayName;
        let Email=profile.emails[0].value;
        let Payload={
            Name,Email
        }
    //     let user=new UserModel(Payload);
    //    await user.save();
      return done(null, Payload);
 }
));
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login',session: false }),
  function(req, res) {
    var token = jwt.sign({"userid":data._id}, 'masai');
    res.redirect(`http://127.0.0.1:8000/Mock-7/frontend/html/profile.html?id=${token},&name=${Payload}`);
  })

app.listen(3000,async()=>{
    try {
        await connection
        console.log("conected with DB and Port at 3000");
    } catch (error) {
        console.log(error);
    }
})