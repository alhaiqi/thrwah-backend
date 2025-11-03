const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const {pwd, username} = req.body;
    
    if(!pwd || !username){
        return res.status(400).json({message: 'username and password are required'});
    }
    
    
    
    const foundUser = db.findUserByUsername(username);
    
    if(foundUser){
        return res.status(409).json({message: 'username already exists'});
    }
    
    const hashedpassword = bcrypt.hash(pwd, 10);
    const newUser = {'username': username, 'password': hashedpassword};
    const savedUser = db.createUser(newUser);
    
    res.status(201).json({message: 'user created successfully', username: savedUser.username});
}

module.exports = {handleRegister};
