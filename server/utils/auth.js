const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config');

module.exports = (context) => {
    // console.log(context.req.headers.authorization)
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if(token) {
            try{
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            }
            catch{
                throw new AuthenticationError(' Token cannot be verified- Login Again', {
                    errors: {
                        timeout: "Timed-out, Login Again."
                    }
                });
            }
        }
        else {
            throw new AuthenticationError('Invalid/Expired token');
        }
    }
    else throw new AuthenticationError('Auth Header is not provided');