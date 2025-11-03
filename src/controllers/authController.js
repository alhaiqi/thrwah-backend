const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handlelogin = (req, res) => {
    const {pwd, username} = req.body;
    if(!pwd || !username){
        res.status(400).json({message: 'username and password are required'});
    }
    const foundUser = db.findUserByUsername(username);
    if(foundUser){
       
            const match = bcrypt.compareTo(pwd, foundUser.password);
            if(!match){
                res.sendStatus(401);
            }
            else{
                //create JWTs
                const accessToken = jwt.sign(
                    {"username": foundUser.username},
                    process.env.ACCESS_TOKEN_KEY,
                    {expiresIn: '1000s'}
                );
                const refreshToken = jwt.sign(
                    {"username": foundUser.username},
                    process.env.REFRESH_TOKEN_KEY,
                    {expiresIn: '1d'}
                );
                res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
                res.json(accessToken);
            }
            
        
    

    }

}
module.exports = {handlelogin}