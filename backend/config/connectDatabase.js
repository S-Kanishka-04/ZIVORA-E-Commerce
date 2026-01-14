const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to host: ' + con.connection.host);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = connectDatabase;
