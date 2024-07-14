

// import mongoose from 'mongoose'

// let isConnected = false;

// export const connectToDB = async () => {
//     // mongoose.setDriver('strictQuery', true);

//     console.log("❕ Attempt to connect to MongoDB.")
//     console.log(process.env.MONGODB_URI)
    
//     if (isConnected) {
//         console.log('✓ MongoDB is already connceted.')
//         return;
//     }

//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             dbName: 'promptia',
//             // useNewUrlParser: true,
//             // useUnifiedTopology: true,
//         })

//         isConnected = true;
        
//         console.log('✓ MongoDB connected')
//     } catch (error) {
//         console.log("⚠ Failed to connect to MongoDB.")
//         console.log(error);
//         mongoose.disconnect();
//     }
// } 