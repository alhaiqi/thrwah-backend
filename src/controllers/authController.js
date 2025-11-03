const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const {pwd, username} = req.body;
    
    if(!pwd || !username){
        return res.status(400).json({message: 'username and password are required'});
    }
    
    const foundUser = db.findUserByUsername(username);
    
    if(!foundUser){
        return res.sendStatus(401);
    }
    
    const match = bcrypt.compare(pwd, foundUser.password);
    
    if(!match){
        return res.sendStatus(401);
    }
    
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
    
     //db.saveRefreshToken(foundUser.id, refreshToken);
    
    res.cookie('jwt', refreshToken, {
        httpOnly: true, 
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    });
    
    res.json({accessToken});
}

module.exports = {handleLogin};