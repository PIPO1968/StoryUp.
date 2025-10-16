const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: String,
    bio: String,
    user_type: { type: String, default: 'user' },
    school: String,
    grade: String,
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    is_verified: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);