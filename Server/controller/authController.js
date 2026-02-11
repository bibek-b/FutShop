import UserModel from "../model/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
    
    const { username, email, password, confirmPassword } = req.body;

    if(!username || !email || !password || !confirmPassword){
        return res.status(400).json({error: "All fields are required!"})
    }

    if(password.length < 8) {
        return res.status(400).json({error: "Password should not be less than 8 characters. "})
    }

    if(password !== confirmPassword) {
        return res.status(400).json({error: "Passwords do not match!"})
    }

    try {
        const isEmailExists = await UserModel.findOne({email});

        if(isEmailExists){
            return res.status(409).json({error: "Email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({username, email, password: hashedPassword});

        return res.status(201).json({message: "User registration successfully!"})
    } catch (error) {
        return res.status(500).json(error);
    }

}


export const Login = async (req, res) => {

    const { email, password } = req.body;


    if(!email || !password){
        return res.status(400).json({error: "All fields are required"});
    }

    if(password.length < 8) {
        return res.status(400).json({error: "Passoword should not be less than 8 characters. "})
    }

    try {
        const user = await UserModel.findOne({email});

        if(!user) {
            return res.status(404).json({error: "No account found with this email. Please register first!"})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return res.status(404).json({error: "Password is invalid!"});
        }

        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: "1d"});

        res.cookie("token", token, {
            // httpOnly: true,
            maxAge: 24*60*60*1000
        })
        return res.status(200).json({message: "Login successfull!"});
        
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const Logout =  (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({message: "Logged out successfully!"})
}