const bcrypt = require('bcrypt');

const handleregister = (req, res) => {
    const {pwd, username} = req.body;
    if(!pwd || !username){
        res.status(400).json({message: 'username and password are required'});
    }
    const foundUser = db.findUserByUsername(username);
    if(foundUser){
        res.status(409).json({message: 'username already exists'});
    }
    const hashedpassword = bcrypt.hash(pwd, 10);
    const newUser = {'username': username, 'password': hashedpassword}
    const savedUser = db.createUser(newUser); 
}