import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default:'' },
    pincode: { type: String, default:'' },
    state: { type: String, default:'' },
    city: { type: String, default:'' },
    phone: { type: String, default:'' },

}, { timestamps: true });


export default mongoose.models.User || mongoose.model("User", UserSchema);