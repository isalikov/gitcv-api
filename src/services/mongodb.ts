import mongoose from 'mongoose';

mongoose.connection.on('error', (err) => console.error('MongoDB Client: Error', err));
mongoose.connection.on('connected', () => console.log('MongoDB Client: Connected'));

export default mongoose;
