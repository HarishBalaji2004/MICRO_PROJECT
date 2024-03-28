var express = require("express");
var router = express.Router();

const credential = {
    email : ["harish@gmail.com", "balaji@gmail.com", "har@gmail.com"],
    password : ["admin123", "balaji123", "har123"],
}

// login user
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const emailIndex = credential.email.indexOf(email);
    if(emailIndex > -1 && credential.password[emailIndex] === password){
        req.session.user = email;
        res.redirect('/route/dashboard');
    } else {
        res.end("Invalid Username or Password! Please provide a valid username and password.")
    }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    } else {
        res.send("Unauthorized User")
    }
})

// route for logout
router.get('/logout', (req ,res) => {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        } else {
            res.render('base', { title: "Express", logout: "Logout Successfully...!"})
        }
    })
})

module.exports = router;
