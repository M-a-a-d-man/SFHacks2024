import mongoose from 'mongoose';

async function connectDB(){
    try{
        await mongoose.connect('mongodb://localhost:3000/mongodb+srv://nainghtet0123:j9yumg8HxZ1lSThP@sfsu2024.5vhnv57.mongodb.net/?retryWrites=true&w=majority&appName=SFSU2024',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    }catch(error){
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }

}

export default connectDB;
