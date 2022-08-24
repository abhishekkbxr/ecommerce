import mongoose from 'mongoose';


const connectDb =  handler => (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }

    mongoose.connect(process.env.MONGO_URI, () => {
        console.log("connected")
    }).catch((err) => { console.log(err) })

}

export default connectDb;