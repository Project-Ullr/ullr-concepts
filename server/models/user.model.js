const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Create the base user schema.
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required.'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Invalid email address."
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [8, 'Password must be at least 8 characters long.'],
        trim: true
    },
    friends: {
        type: String,
        ref: "User"
    }
},
    { timestamps: true }
)

// Then, create a virtual value to have access to the confirmation password.
UserSchema.virtual('confirmPassword')
    // Establish the getter.
    .get(() => this.confirmPassword)
    // Establish the setter.
    .set(value => this.confirmPassword = value)

// Before the validation step, check to see if password is correct.
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Confirmation Password must match Password.')
    }
    next()
})

// Lastly, before saving the user into the database, hash the password.
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})

// export the User :)
module.exports = mongoose.model('User', UserSchema)