const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const multer = require('multer')

module.exports = {
    register: (request, response) => {
        User.create(request.body)
            .then(newUser => {
                // Create userToken
                const userToken = jwt.sign({
                    id: newUser._id
                },
                    process.env.JWT_KEY
                )
                // Then send it as a cookie. :)
                response
                    .cookie("userToken", userToken, { httpOnly: true })
                    .json({ message: 'User created successfully', user: newUser })
            })
            .catch(error => response.json({ message: 'Error creating user', error: error }))
    },

    login: async (request, response) => {
        const user = await User.findOne({ email: request.body.email })

        // First we need to check if the user exists.
        if (user === null) {
            // email doesn't exist within users collection.
            return response.sendStatus(400)
        }

        // Now we need to check if the password is correct.
        const passwordCheck = await bcrypt.compare(request.body.password, user.password)

        if (!passwordCheck) {
            // password did not match :(
            return response.sendStatus(400)
        }

        // finally, if we made it this far, the password was correct.
        const userToken = jwt.sign({
            id: user._id
        },
            process.env.JWT_KEY
        )

        response
            .cookie("userToken", userToken, { httpOnly: true })
            .json({ message: 'User logged in successfully', user: user })
    },

    logout: (request, response) => {
        response.clearCookie('userToken')
        response.sendStatus(200)
    },

    getLoggedInUser: (request, response) => {
        const decodedJWT = jwt.decode(request.cookies.userToken, {
            complete: true
        })

        User.findOne({ _id: decodedJWT.payload.id })
            .then(user => response.json(user))
            .catch(error => response.json(error))
    },

    getAll: (request, response) => {
        User.find({})
            .then(allUsers => response.json(allUsers))
            .catch(error => response.json(error))
    },

    addFriend: (request, response) => {
        User.findOne({ _id: request.params.id })
            .then(friend => {
                User.findOneAndUpdate({ _id: request.body.userid, friends: { $ne: friend._id } }, { $push: { friends: friend._id } })
                response.json(friend)
            })
            .catch(error => response.json(error))
    }
}