const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://226m1a4263_db_user:226m1a4263@cluster0.4qj0heh.mongodb.net/restaurantDB?retryWrites=true&w=majority";

async function testConnection() {
  try {
    console.log('Testing MongoDB Atlas connection...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connection successful!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    const doc = new TestModel({ test: 'Hello MongoDB' });
    await doc.save();
    console.log('✅ Document saved successfully!');
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
}

testConnection();