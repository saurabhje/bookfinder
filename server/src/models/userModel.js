import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        requeired: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
    type: Date,
    default: Date.now, 
  },
  

})

import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

userSchema.pre('save', async function(next) {
    try {
        const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
        this.password = hash;
        next();
    }catch(err) {
        next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return bcrypt.compare(candidatePassword, this.password);
    }catch(err) {
        throw err;  
    }
}

const User = mongoose.model('User', userSchema);
export default User;