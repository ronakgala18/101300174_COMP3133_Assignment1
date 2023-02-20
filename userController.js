const User = require("./models/userModel");
exports.signup=async args => {
    const user = new User({
        username: args.username,
        email: args.email,
        password: args.password
    })
    try {
        await user.save()
        message = "User successfully created"
        return {
            message: message,
            user
            
        }
    } catch (err) {
        if (!args.username || !args.password || !args.email) {
            throw new Error(`Fields can not be empty`)
        }
        else if (err.code === 11000) {
            const duplicateKey = Object.keys(err.keyPattern)[0];
            throw new Error(`User with this ${duplicateKey} already exists`)

        } else if (err.name === "ValidationError") {
            throw new Error(`Invalid email format`)
        } else {
            throw new Error('An error occurred while creating the user')
        }
    }
}


exports.login=async args => {
    try {
        const user = await User.findOne({ username: args.username })

        if (user && user.password === args.password) {
            message =`User ${user.username} logged in successfully`
            return {
                message: message,
                
            }
        } else {
            message ="Invalid username or password"
            return {message:message}
        }
    } catch (err) {
        message = JSON.stringify(err.message)
        return {message:message}
    }
}
