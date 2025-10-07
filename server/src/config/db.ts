import mongoose from "mongoose"

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        console.log("mongoDb connected succesfulluy")
    }
    catch (error) {
        console.log("mongoDB connection failed", error)
    }
}
export default connectDB