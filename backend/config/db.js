import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    //NOTE https://www.mongodb.com/community/forums/t/option-usecreateindex-is-not-supported/123048

    const conn = await mongoose.connect(process.env.MONGO_URI, {})

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
