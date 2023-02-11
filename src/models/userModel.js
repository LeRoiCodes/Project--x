
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Create user Schema
const UserSchema = mongoose.Schema(
    {
        // Defining properties of the application user
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        country:{
            type: String,
        },
        isEmployer: {
            type: Boolean,
            default: false,
            required: true
        },
        isGoogle: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,
		resetPasswordExpire: Date,
        verificationCode: String,
        isVerified: {
			type: Boolean,
			default: false,
		},
    },
    {timestamps: true},
);


UserSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) return next();
		this.password = await bcrypt.hash(this.password, 12);
	} catch (err) {
		next(err);
	}
});

// Match user password
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password reset token
UserSchema.methods.getResetPasswordToken = function () {
	// generate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// hash token and set to resetPasswordToken field
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	// set expire
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
