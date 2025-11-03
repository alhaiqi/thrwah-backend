require('dotenv').config();
const jwt = require('jsonwebtoken');


const handleLogout = (req, res)=>{

    const cookie = req.cookies;
    if(!cookie?.jwt) return res.sendstatus(204);
    const refreshToken = cookie.jwt;




}
module.exports = {handleLogout}