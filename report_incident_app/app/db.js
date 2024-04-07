import mongoose from 'mongoose';

async function connectDB(){
    try{
        const password = 'j9yumg8HxZ1lSThP'; // Your actual password
        const encodedPassword = encodeURIComponent(password);

        // Use the encoded passexitword in the connection string
        const url = `mongodb+srv://nainghtet0123:${encodedPassword}@sfsu2024.5vhnv57.mongodb.net/?retryWrites=true&w=majority&appName=SFSU2024`;

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // console.log('MongoDB connected');
    }catch(error){
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }

}

export default connectDB;
