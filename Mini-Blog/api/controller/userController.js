const Author = require('../models/user')

const register = async (req,res)=>{
    try {        
        const authorTaken = await validateEmail(req.body.email);
        if(authorTaken) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
        
        const newAuthor = new Author({
            ...req.body
        });

        await newAuthor.save();
        return res.status(201).json({
            message: "Account successfully created",
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    } 
}


const login = async(req,res)=>{
    try {
        let { email, password } = req.body;
        if( !email || !password ){
            res.status(401).json({msg: 'please provide required details'})
        }
        const author = await Author.findOne({ email });
        if(!author) {
            res.status(404).json({
                message: "Failed login attempt"
            })
        }
        let isMatch = await author.matchPasswords(password);
        if(isMatch) {
            let profile = {
                email: author.email,
                name: author.name,
            };
            let result = {
                author: profile,
                token:sendToken(author, res)
            };
            return res.status(200).json({
                ...result,
                message: "Login success",
            });
        } else {
            return res.status(403).json({
                message: "Failed login attempt"
            })
        }
    } catch(err) {
        console.log(err);
    }
    
}


const validateEmail = async (email) => {
    let author = await Author.findOne({ email });
    if(author) {
        return true;
    } else {
        return false;
    }
};

const sendToken = (author,res)=>{
    const token = author.getSignedJwtToken()
    res.json({token})
}

module.exports = {
    register,
    login
}


